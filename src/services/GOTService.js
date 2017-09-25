import axios from 'axios'
import { GOT_SERVICE } from '../constants/endpoints'

const getCharacters = () => axios.get(`${GOT_SERVICE}/characters`)

const addCharacter  = args => axios.post(`${GOT_SERVICE}/characters`,args)


export { 
    addCharacter,
    getCharacters
}