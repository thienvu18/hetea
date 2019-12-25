import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Contract } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, contract

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  contract = await Contract.create({})
})

test('POST /contracts 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, tutor: 'test', tutee: 'test', hours: 'test', price: 'test', startDate: 'test', endDate: 'test', status: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.tutor).toEqual('test')
  expect(body.tutee).toEqual('test')
  expect(body.hours).toEqual('test')
  expect(body.price).toEqual('test')
  expect(body.startDate).toEqual('test')
  expect(body.endDate).toEqual('test')
  expect(body.status).toEqual('test')
})

test('POST /contracts 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /contracts 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /contracts 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /contracts/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${contract.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(contract.id)
})

test('GET /contracts/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${contract.id}`)
  expect(status).toBe(401)
})

test('GET /contracts/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /contracts/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${contract.id}`)
    .send({ access_token: userSession, tutor: 'test', tutee: 'test', hours: 'test', price: 'test', startDate: 'test', endDate: 'test', status: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(contract.id)
  expect(body.tutor).toEqual('test')
  expect(body.tutee).toEqual('test')
  expect(body.hours).toEqual('test')
  expect(body.price).toEqual('test')
  expect(body.startDate).toEqual('test')
  expect(body.endDate).toEqual('test')
  expect(body.status).toEqual('test')
})

test('PUT /contracts/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${contract.id}`)
  expect(status).toBe(401)
})

test('PUT /contracts/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: userSession, tutor: 'test', tutee: 'test', hours: 'test', price: 'test', startDate: 'test', endDate: 'test', status: 'test' })
  expect(status).toBe(404)
})

test('DELETE /contracts/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${contract.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /contracts/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${contract.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /contracts/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${contract.id}`)
  expect(status).toBe(401)
})

test('DELETE /contracts/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
