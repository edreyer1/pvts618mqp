import * as request from 'supertest'

import app from '../app'
import { connection } from '../controllers/readingControllers'


describe("Routes", () => {

  beforeAll(done => {
    done()
  })
  afterAll(done => {
    connection.end()
    done()  
  })

  test("Get average of readings", async () => {
    const res = await request(app).get("/avg")
    expect(res.status).toBe(200)
    expect(res.body.averageTempature).not.toBe(null)
    expect(res.body.averageHumidity).not.toBe(null)
  })

  test("Get max of readings", async () => {
    const res = await request(app).get("/max")
    expect(res.status).toBe(200)
    expect(res.body.maxTempature).not.toBe(null)
    expect(res.body.maxHumidity).not.toBe(null)
  })

  test("Get min of readings", async () => {
    const res = await request(app).get("/min")
    expect(res.status).toBe(200)
    expect(res.body.minTempature).not.toBe(null)
    expect(res.body.minHumidity).not.toBe(null)
  })

  test("Get sum of readings", async () => {
    const res = await request(app).get("/sum")
    expect(res.status).toBe(200)
    expect(res.body.sumTempature).not.toBe(null)
    expect(res.body.sumHumidity).not.toBe(null)
  })
})