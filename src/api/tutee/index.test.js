import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Tutee } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, tutee

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  tutee = await Tutee.create({})
})

test('POST /tutees 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, user_id: 'test', address: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.user_id).toEqual('test')
  expect(body.address).toEqual('test')
})

test('POST /tutees 401 (admin)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession })
  expect(status).toBe(401)
})

test('POST /tutees 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /tutees 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /tutees 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /tutees 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /tutees/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${tutee.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(tutee.id)
})

test('GET /tutees/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${tutee.id}`)
  expect(status).toBe(401)
})

test('GET /tutees/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /tutees/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${tutee.id}`)
    .send({ access_token: userSession, user_id: 'test', address: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(tutee.id)
  expect(body.user_id).toEqual('test')
  expect(body.address).toEqual('test')
})

test('PUT /tutees/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${tutee.id}`)
  expect(status).toBe(401)
})

test('PUT /tutees/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: userSession, user_id: 'test', address: 'test' })
  expect(status).toBe(404)
})

test('DELETE /tutees/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${tutee.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /tutees/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${tutee.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /tutees/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${tutee.id}`)
  expect(status).toBe(401)
})

test('DELETE /tutees/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
