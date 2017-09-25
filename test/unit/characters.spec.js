import sinon from 'sinon'
import { expect } from 'chai'
import rootSchemas from '../../src/schemas/rootSchema'
import {
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull
}  from 'graphql'
import * as GOTService from '../../src/services/GOTService'

describe('Test schema', () => {
  it ('has correct input gender' , () =>{
    //console.log(rootSchemas._typeMap.inputGender.getFields())
    expect(rootSchemas._typeMap.inputGender.getFields().name.type).to.deep.equals(GraphQLString)
  })
  it('has correct character schema', () => {
     const characterSchema = rootSchemas._typeMap.Character.getFields()
     const genderType = rootSchemas._typeMap.Gender
     expect(characterSchema).to.have.property('name')
     expect(characterSchema).to.have.property('id')
     expect(characterSchema).to.have.property('gender')
     expect(characterSchema.name.type).to.deep.equals(GraphQLString)
     expect(characterSchema.id.type).to.deep.equals(new GraphQLNonNull(GraphQLString))
     expect(characterSchema.gender.type).to.deep.equals(genderType)
  })

  it('has correct gender schema', () => {
    
  })
})

describe('Test resolvers', () => {
  let mockGOTService 

  beforeEach(function () {
      mockGOTService = sinon.mock(GOTService)
  });

  afterEach(function () {
      mockGOTService.restore()
  });

  it('has correct characters query', (done) => {
    const expected = [
      {
        "id": "1",
        "name": "John Snow",
        "gender": {
          "name": "Male"
        }
      },
      {
        "id": "2",
        "name": "Sansa Stark",
        "gender": {
          "name": "Female"
        }
      }
    ] 
    const respones = [
      {
        "id": "1",
        "name": "John Snow",
        "gender": {
          "name": "Male"
        }
      },
      {
        "id": "2",
        "name": "Sansa Stark",
        "gender": {
          "name": "Female"
        }
      }
    ]
    mockGOTService.expects('getCharacters').once().returns(Promise.resolve({
      data:respones
    }))
    //console.log(rootSchemas._typeMap.Query.getFields().characters.resolve.toString())
    const queryCharacters = rootSchemas._typeMap.Query.getFields().characters
    const mockGetCharacters = sinon.mock(queryCharacters)
    queryCharacters.resolve().then(
      data => {
        mockGOTService.verify()
        expect(data).to.deep.equals(expected)
        done()
      }
    )
    .catch(error => {
        done(error)
    })
  })
})
