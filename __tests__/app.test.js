require('dotenv').config()
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app.js')

describe('GET /api/photos', () => {
  it('should return an array of photo objects', async () => {
    return supertest(app).get('/api/photos')  
    .expect(200).then((response) => {
        expect(response.body.length).toBe(3)})
    })
  it('should return photo objects in order of date, newest first', () => {
    return supertest(app).get('/api/photos')
    .expect(200).then((response) => {
      expect(response.body).toBeSortedBy('date_taken', {descending: true})
    })
  })
  it('should return an array of photos corresponding to date query', () => {
    return supertest(app).get('/api/photos?date_taken=2024-01-02')
    .expect(200).then((response) => {
      expect(response.body.length).toBe(2)
    })
  })
  it('should return an array of photos corresponding to flight origin query', () => {
    return supertest(app).get('/api/photos?flight_origin=JFK')
    .expect(200).then((response) => {
      expect(response.body.length).toBe(2)
    })
  })
  it('should return an array of photos corresponding to 2 different queries', () => {
    return supertest(app).get('/api/photos?flight_origin=JFK&date_taken=2024-01-01')
    .expect(200).then((response) => {
      expect(response.body.length).toBe(1)
      expect(response.body[0].flight_code).toBe("AA1234")
    })
  })
  });

describe('GET /api/photos/:username', () => {
  it('should return an array of photo objects where username matches request', async () => {
    return supertest(app).get('/api/photos/joeybloggs')
    .expect(200).then((response) => {
      expect(response.body.length).toBe(2)
    })
  }),
  it.only('should return photo objects in order of date, newest first', () => {
    return supertest(app).get('/api/photos/joeybloggs')
    .expect(200).then((response) => {
      expect(response.body).toBeSortedBy('date_taken', {descending: true})
    })
  })
  it('should return an empty array if username exists but has no photos', async () => {
    return supertest(app).get('/api/photos/gryffindor')
    .expect(200).then((response) => {
      expect(response.body.length).toBe(0)
    })
  })
  it('should return 404 if username does not exist', async () => {
    return supertest(app).get('/api/photos/fakeuser')
    .expect(404)
  })
})

describe('GET /api/users/:username', () => {
    it('should return a single user object corresponding to username', async () => {
        return supertest(app).get('/api/users/franthestan')
        .expect(200).then((response) => {
            expect(response.body.firstname).toBe('Fran');
            expect(response.body.surname).toBe('Stan')})
        })
      it('should return 404 if username does not exist', async () => {
        return supertest(app).get('/api/users/fakeuser')
        .expect(404).then((response) => {
          expect(response.body.message).toBe('No such user exists')
        })
      })
    });

describe('POST /api/photos', () => {
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
      expect(Object.getOwnPropertyNames(response.body)).toEqual(reqKeys);
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

describe('POST /api/users', () => {
  it('should return status 201 and posted user object when creating user with all required fields filled', () => {
    const newUser = {
    "firstname": "Donald",
    "surname": "Duck",
    "username": "donald_duck",
    "email": "donald@example.com",
    "phone": "07777777777",
    "home_airport": "MCO",
  }
    return supertest(app).post('/api/users').send(newUser)
    .expect(201).then((response) => {
      const reqKeys = ["firstname", "surname", "username", "email", "phone", "avatar_url","home_airport", "_id",  "acc_created", "__v"]
      expect(Object.getOwnPropertyNames(response.body)).toEqual(reqKeys);
    })
  })
  it('should return status 400 when trying to create user with missing required fields', () => {
    const newUser = {
      "firstname": "Donald",
      "surname": "Duck",
      "email": "donald@example.com",
      "phone": "07777777777",
      "home_airport": "MCO",
    }
    return supertest(app).post('/api/users').send(newUser)
    .expect(400)
  })
  it('should return status 400 when trying to create user with invalid required fields', () => {
    const newUser = {
      "firstname": "Donald",
      "surname": "Duck",
      "username": ["user", "name"],
      "email": "donald@example.com",
      "phone": "07777777777",
      "home_airport": "MCO",
    }
    return supertest(app).post('/api/users').send(newUser)
    .expect(400)
  })
})

describe('PATCH /api/users/:username',() => {
  it('should return status code 200 and updated user when patching one field on a user', () => {
    const patchedUser = {"phone": "07777777778"}
    return supertest(app).patch('/api/users/joeybloggs').send(patchedUser)
    .expect(200).then((response) => {
      expect(response.body.phone).toBe("07777777778");
    })
  })
  it('should return status code 200 and updated user when patching multiple fields on a user', () => {
    const patchedUser = {"firstname": "Joseph", "phone": "07777777779"}
    return supertest(app).patch('/api/users/joeybloggs').send(patchedUser)
    .expect(200).then((response) => {
      expect(response.body.phone).toBe("07777777779");
      expect(response.body.firstname).toBe("Joseph");
    })
  })
})

describe('PATCH /api/photos/:photo', () => {
  it('should return status code 200 and single photo object when patching one field on a photo', () => {
    const patchedPhoto = {"remarks": "This is a new remark"}
    return supertest(app).patch('/api/photos/65b426673ff971bf4418533e').send(patchedPhoto)
    .expect(200).then((response) => {
      expect(response.body.remarks).toBe('This is a new remark')
    })
  })
  it('should return status code 200 and single photo object when patching multiple fields on a photo', () => {
    const patchedPhoto = {"flight_dest": "MCO", "remarks": "I flew to Orlando"}
    return supertest(app).patch('/api/photos/65b426673ff971bf4418533e').send(patchedPhoto)
    .expect(200).then((response) => {
      expect(response.body.flight_dest).toBe('MCO')
      expect(response.body.remarks).toBe('I flew to Orlando')
    })
  })
  it('should return status code 404 when trying to patch a photo that does not exist', () => {
    const patchedPhoto = {"flight_dest": "MCO"}
    return supertest(app).patch('/api/photos/abcde12345').send(patchedPhoto)
    .expect(404)
  })
})

describe('DELETE /api/photos/:photo', () => {
  it('should return status code 204 when deleting a photo', () => {
    return supertest(app).delete('/api/photos/65b42539ddfbdc105a6a8706')
    .expect(204)
  })
  it('should return status code 404 when trying to delete a photo that does not exist', () => {
    return supertest(app).delete('/api/photos/12345abcde')
    .expect(404)
  })
})

describe('GET /api', () => {
  it('should return status 200 and contents of endpoints.json', async () => {
    return supertest(app).get('/api')
    .expect(200).then((response) => {
      expect(response.body.hasOwnProperty('GET /api')).toBe(true)
      expect(response.body.hasOwnProperty('GET /api/photos')).toBe(true)
      expect(response.body.hasOwnProperty('GET /api/photos/:username')).toBe(true)
    })
  })
})


describe('invalid endpoint', () => {
    it('should return status 404 and an error message when trying to get invalid endpoint', async () => {
      return supertest(app).get('/api/abc')
      .expect(404).then((response) => {
        expect(response.body.message).toBe('Invalid endpoint')
      })
  })
    });

beforeAll(() => {
    mongoose.connect(process.env.DATABASE_URL);
})

afterAll(() => {
    mongoose.connection.close()})
    

 