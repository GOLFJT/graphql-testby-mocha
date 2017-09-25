import { makeExecutableSchema } from 'graphql-tools'
import {
  typeDefs as charactersTypeDefs,
  resolvers as charactersResolvers,
} from './characters'

const typeDefs = `
  ${charactersTypeDefs}

  type Query {
    characters: [Character]
  }
  
  type Mutation{
    addCharacter(id:String, name:String, gender:inputGender): Character
  }
`

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: charactersResolvers,
})

export default schema
