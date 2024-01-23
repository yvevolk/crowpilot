require('dotenv').config()
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app.js')

describe('GET /api/photos', () => {
  it('should return an array of photo objects', async () => {
    return supertest(app).get('/api/photos')
    .expect(200).then((response) => {
        expect(response._body.length).toBe(3)})
    })
  });

describe('GET /api/photos/:user_id', () => {
  it('should return an array of photo objects where user id matches request', async () => {
    return supertest(app).get('/api/photos/1')
    .expect(200).then((response) => {
      expect(response._body.length).toBe(2)
    })
  })
  it('should return an empty array if user has no photos', async () => {
    return supertest(app).get('/api/photos/3')
    .expect(200).then((response) => {
      expect(response._body.length).toBe(0)
    })
  })
})

describe.only('GET /api/users/:user_id', () => {
    it('should return an array of single user object corresponding to unique id', async () => {
        return supertest(app).get('/api/users/5')
        .expect(200).then((response) => {
            const firstname = (response._body[0].firstname)
            expect(response._body.length).toBe(1)
            expect(firstname).toBe('Mickey')})
        })
      it('should return 404 if user_id is valid but does not exist', async () => {
        return supertest(app).get('/api/users/99')
        .expect(404).then((response) => {
          expect(response._body).toBe('No such user found')
        })
      })
      it('should return 400 if user_id is invalid', async () => {
        return supertest(app).get('/api/users/abc')
        .expect(400)
      })
    });

describe('invalid endpoint', () => {
    it('should return status 404 and an error message when trying to get invalid endpoint', async () => {
      return supertest(app).get('/api/abc')
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
    