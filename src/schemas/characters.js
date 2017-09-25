import { getCharacters, addCharacter } from '../services/GOTService'

const typeDefs = `
  type Character {
    id: String!
    name: String
    gender: Gender 
  }

  type Gender {
    name: String
  }

  input inputGender {
    name: String
  }
`

const resolvers = {
  Query: {
    characters() {
      return getCharacters()
        .then(res => res.data)
    }
  },
  Mutation: {
    addCharacter(root, args) {
      return addCharacter(args).then(res => {
        return res.data
      })
    }
  }
}

export {
  typeDefs,
  resolvers,
}
