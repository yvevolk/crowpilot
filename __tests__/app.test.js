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
  it('should return an array of photos corresponding to date query', () => {
    return supertest(app).get('/api/photos?date_taken=2024-01-02')
    .expect(200).then((response) => {
      expect(response._body.length).toBe(2)
    })
  })
  it('should return an array of photos corresponding to flight origin query', () => {
    return supertest(app).get('/api/photos?flight_origin=JFK')
    .expect(200).then((response) => {
      expect(response._body.length).toBe(2)
    })
  })
  it('should return an array of photos corresponding to 2 different queries', () => {
    return supertest(app).get('/api/photos?flight_origin=JFK&date_taken=2024-01-01')
    .expect(200).then((response) => {
      expect(response._body.length).toBe(1)
      expect(response._body[0].flight_code).toBe("AA1234")
    })
  })
  });

describe('GET /api/photos/:user_id', () => {
  it('should return an array of photo objects where user id matches request', async () => {
    return supertest(app).get('/api/photos/1')
    .expect(200).then((response) => {
      expect(response._body.length).toBe(2)
    })
  })
  it('should return an empty array if user exists but has no photos', async () => {
    return supertest(app).get('/api/photos/3')
    .expect(200).then((response) => {
      expect(response._body.length).toBe(0)
    })
  })
  it('should return 404 if user_id is valid but does not exist', async () => {
    return supertest(app).get('/api/photos/99')
    .expect(404)
  })
  it('should return 400 if user_id is invalid', async () => {
    return supertest(app).get('/api/photos/abc')
    .expect(400).then((response) => {
      expect(response._body.message).toBe('Bad request')
    })
  })
})

describe('GET /api/users/:user_id', () => {
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
        .expect(400).then((response) => {
          expect(response._body.message).toBe('Bad request')
        })
      })
    });

describe('POST /api/photos', () => {
  it('should return status 201 and posted photo object when posting a valid photo', () => {
    const newPhoto = {
      "photo_url": "https://images.unsplash.com/photo-1682686581776-b6ebee7c150e",
     "location": {
       "lat": 7.634567,
       "long": -35.53215
     },
     "taken_by": 2,
     "photo_type": "air",
     "date_taken": "2024-01-05",
     "flight_code": "BA123",
     "flight_origin": "LHR",
     "flight_dest": "FCO",
     "remarks": "A flight from London to Rome"
           }
    return supertest(app).post('/api/photos').send(newPhoto)
    .expect(201)
  })
})


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
    