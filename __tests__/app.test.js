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

describe('GET /api/photos/:username', () => {
  it('should return an array of photo objects where user id matches request', async () => {
    return supertest(app).get('/api/photos/joeybloggs')
    .expect(200).then((response) => {
      expect(response._body.length).toBe(2)
    })
  })
  it('should return an empty array if user exists but has no photos', async () => {
    return supertest(app).get('/api/photos/gryffindor')
    .expect(200).then((response) => {
      expect(response._body.length).toBe(0)
    })
  })
  it('should return 404 if username does not exist', async () => {
    return supertest(app).get('/api/photos/fakeuser')
    .expect(404)
  })
})

describe('GET /api/users/:username', () => {
    it('should return an array of single user object corresponding to username', async () => {
        return supertest(app).get('/api/users/gryffindor')
        .expect(200).then((response) => {
            expect(response._body.length).toBe(1)
            expect(response._body[0].firstname).toBe('Harry');
            expect(response._body[0].surname).toBe('Potter')})
        })
      it('should return 404 if username but does not exist', async () => {
        return supertest(app).get('/api/users/fakeuser')
        .expect(404).then((response) => {
          expect(response._body).toBe('No such user found')
        })
      })
    });

describe('POST /api/photos', () => {
  it('should return status 201 and posted photo object when posting a photo with all fields filled', () => {
    const newPhoto = {
      "photo_url": "https://images.unsplash.com/photo-1682686581776-b6ebee7c150e",
     "location": {
       "lat": 7.634567,
       "long": -35.53215
     },
     "taken_by": "franthestan",
     "photo_type": "air",
     "date_taken": "2024-01-05",
     "flight_code": "BA123",
     "flight_origin": "LHR",
     "flight_dest": "FCO",
     "remarks": "A flight from London to Rome"
           }
    return supertest(app).post('/api/photos').send(newPhoto)
    .expect(201).then((response) => {
      const reqKeys = ["photo_url", "location", "taken_by", "photo_type", "date_taken", "flight_code", "flight_origin", "flight_dest", "remarks", "_id", "__v"]
      expect(Object.getOwnPropertyNames(response._body)).toEqual(reqKeys);
  })
})
  it('should return status 201 and posted photo object when posting a photo with all required fields filled', () => {
    const newPhoto = {
      "photo_url": "https://images.unsplash.com/photo-1682686581776-b6ebee7c150e",
     "location": {
       "lat": 7.634567,
       "long": -35.53215
     },
     "taken_by": "franthestan",
     "photo_type": "air",
     "date_taken": "2024-01-05",
     "flight_origin": "LHR",
     "flight_dest": "FCO",
           }
    return supertest(app).post('/api/photos').send(newPhoto)
    .expect(201).then((response) => {
      const reqKeys = ["photo_url", "location", "taken_by", "photo_type", "date_taken", "flight_origin", "flight_dest", "_id", "__v"]
      expect(Object.getOwnPropertyNames(response._body)).toEqual(reqKeys);
  })
  })
  it('should return status 400 when trying to post photo with missing required fields', () => {
    const newPhoto = {
     "taken_by": 2}
     return supertest(app).post('/api/photos').send(newPhoto)
     .expect(400)
  })
  it('should return status 400 when trying to post photo with invalid fields', () => {
    const newPhoto = {
      "photo_url": "https://images.unsplash.com/photo-1682686581776-b6ebee7c150e",
     "location": {
       "lat": 'loremipsum',
       "long": 'loremipsum'
     },
     "taken_by": "franthestan",
     "photo_type": "air",
     "date_taken": "2024-01-05",
     "flight_code": "BA123",
     "flight_origin": "LHR",
     "flight_dest": "FCO",
     "remarks": "A flight from London to Rome"
           }
     return supertest(app).post('/api/photos').send(newPhoto)
     .expect(400)
  })
})

describe.only('POST /api/users', () => {
  it('should return status 201 and posted user object when creating a new user with all fields filled', () => {
    const newUser = {}
    return supertest(app).post('/api/users').send(newUser)
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
    mongoose.connect(process.env.DATABASE_URL);
})

afterAll(() => {
    mongoose.connection.close()})
    