import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Tutor } from '.'

const app = () => express(apiRoot, routes)

let tutor

beforeEach(async () => {
  tutor = await Tutor.create({})
})

test('POST /tutors 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, user_id: 'test', address: 'test', bio: 'test', skills: 'test', pricePerHour: 'test', tagline: 'test', rating: 'test', taughtContract: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.user_id).toEqual('test')
  expect(body.address).toEqual('test')
  expect(body.bio).toEqual('test')
  expect(body.skills).toEqual('test')
  expect(body.pricePerHour).toEqual('test')
  expect(body.tagline).toEqual('test')
  expect(body.rating).toEqual('test')
  expect(body.taughtContract).toEqual('test')
})

test('POST /tutors 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /tutors 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /tutors/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${tutor.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(tutor.id)
})

test('GET /tutors/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /tutors/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${tutor.id}`)
    .send({ access_token: masterKey, user_id: 'test', address: 'test', bio: 'test', skills: 'test', pricePerHour: 'test', tagline: 'test', rating: 'test', taughtContract: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(tutor.id)
  expect(body.user_id).toEqual('test')
  expect(body.address).toEqual('test')
  expect(body.bio).toEqual('test')
  expect(body.skills).toEqual('test')
  expect(body.pricePerHour).toEqual('test')
  expect(body.tagline).toEqual('test')
  expect(body.rating).toEqual('test')
  expect(body.taughtContract).toEqual('test')
})

test('PUT /tutors/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${tutor.id}`)
  expect(status).toBe(401)
})

test('PUT /tutors/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, user_id: 'test', address: 'test', bio: 'test', skills: 'test', pricePerHour: 'test', tagline: 'test', rating: 'test', taughtContract: 'test' })
  expect(status).toBe(404)
})

test('DELETE /tutors/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${tutor.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /tutors/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${tutor.id}`)
  expect(status).toBe(401)
})

test('DELETE /tutors/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
