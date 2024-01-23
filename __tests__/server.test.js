require('dotenv').config()
const mongoose = require('mongoose')
const Photo = require('../models/user_models.js')
const supertest = require('supertest')
const server = require('../server.js')

describe('GET /api/photos', () => {
  it('should return an array of photo objects', async () => {
    return supertest(server).get('/api/photos')
    .expect(200).then((response) => {
        expect(response._body.length).toBe(3)
    })
})
  });

describe('GET /api/users', () => {
    it('should return an array of user objects', async () => {
        return supertest(server).get('/api/users')
        .expect(200).then((response) => {
            expect(response._body.length).toBe(5)
        })
    })
})

describe('GET /api/users/:user_id', () => {
    it('should return an array of single user object corresponding to unique id', async () => {
        return supertest(server).get('/api/users/5')
        .expect(200).then((response) => {
            const firstname = (response._body[0].firstname)
            expect(response._body.length).toBe(1)
            expect(firstname).toBe('Mickey')})
        })
    })


describe('invalid endpoint', () => {
    it('should return status 404 and an error message when trying to get invalid endpoint', async () => {
      return supertest(server).get('/api/abc')
      .expect(404).then((response) => {
        expect(response._body.message).toBe('Invalid endpoint')
      })
  })
    });

beforeAll(() => {
    mongoose.connect(process.env.DATABASE_URL)
})

afterAll(() => {
    mongoose.connection.close();
    })