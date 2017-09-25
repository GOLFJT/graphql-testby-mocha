import sinon from 'sinon'
import { expect } from 'chai'
import supertest from 'supertest'
import axios from 'axios'
import server from '../../src/server'
import { GOT_SERVICE } from '../../src/constants/endpoints'

describe('Test query', () => {
  let mockAxios

  beforeEach(function () {
    mockAxios = sinon.mock(axios)
  });

  afterEach(function () {
    mockAxios.restore()
  });

  it('has correct characters query', (done) => {

    const queryGetCharecters = `
      query {
        characters {
          id
          name
          gender {
            name
          }
        }
      }
    `
    const expected = {
      characters: [
        {
          id: '1',
          name: 'John Snow',
          gender: {
            name: 'Male'
          }
        },
        {
          id: '2',
          name: 'Sansa Stark',
          gender: {
            name: 'Female'
          }
        }
      ]
    }

    const responseGetCharecters = [
      {
        id: '1',
        name: 'John Snow',
        gender: {
          name: 'Male'
        }
      },
      {
        id: '2',
        name: 'Sansa Stark',
        gender: {
          name: 'Female'
        }
      }
    ]
    

    mockAxios.expects('get').withArgs(`${GOT_SERVICE}/characters`).once().returns(Promise.resolve({
      data: responseGetCharecters
    }))

    supertest.agent(server)
    .post('/graphql')
    .send({
      query: queryGetCharecters
    })
    .expect(200)
    .then(res => {
      mockAxios.verify()
      expect(res.body.data).to.deep.equals(expected)
      done()
    })
    .catch(err => {
      done(err)
    })

  })

  it('check addcharacters mutation', (done) => {
    
        const mutationAddCharecters = `
          mutation {
            addCharacter(id: "22", name: "golf", gender: { name: "Male" }) {
              id
              name
              gender {
                name
              }
            } 
          }
        `
        const expected = {
          addCharacter: 
            {
              id: '22',
              name: 'golf',
              gender: {
                name: 'Male'
              }
            }
        }

        const responseAddCharecter = {
              id: '22',
              name: 'golf',
              gender: {
                name: 'Male'
              }
        }
        

        mockAxios.expects('post').withArgs(`${GOT_SERVICE}/characters`,{ id: '22', name: 'golf', gender: { name: 'Male' } }).once().returns(Promise.resolve({
          data: responseAddCharecter
        }))
    
        supertest.agent(server)
        .post('/graphql')
        .send({
          query: mutationAddCharecters
        })
        //.expect(200)
        .then(res => {
          mockAxios.verify()
          console.log(res.body)
          expect(res.body.data).to.deep.equals(expected)
          done()
        })
        .catch(err => {
          done(err)
        })
    
      })
})