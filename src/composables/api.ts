import axios from 'axios'

export const getRequest = async (endpoint: string) => {
    const response = await axios.get(endpoint)

    return response.data
}

export const deleteRequest = async (endpoint: string) => {
    const response = await axios.delete(`${endpoint}`)

    return response.data
}