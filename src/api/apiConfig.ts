import axios from 'axios'

// 14c5c1fc-3916-4e09-a79c-cde38802b177
// 8ecf30a1-174b-4665-8ef2-1c1ab75dcb24
const apiConfig = {
  baseUrl: 'https://kinopoiskapiunofficial.tech/api/',
  apiKey: '8ecf30a1-174b-4665-8ef2-1c1ab75dcb24'
}

// todo fix any

export const FetchData = async (type: string): Promise<any> => {
  const link = `${apiConfig.baseUrl}${type}`
  return await axios.get(link, {
    headers: {
      'X-API-KEY': apiConfig.apiKey,
      'Content-Type': 'application/json'
    }
  })
}

export default FetchData
