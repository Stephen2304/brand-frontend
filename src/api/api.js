import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8000/api'
})

const makeApiPostCall = async (endpoint, data, isMedia = false, id) => {
    let contentType = isMedia ? 'multipart/form-data' : 'application/json'
    let url = id ? `${endpoint}/${id}` : endpoint

    const response = await api.post(url, data, {
        headers: {
            'Content-Type': contentType
        }
    })
    return response
}

const makeApiPutCall = async (endpoint, data, isMedia = false) => {
    let contentType = isMedia ? 'multipart/form-data' : 'application/json'

    if (isMedia) {
        const response = await api.post(endpoint, data, {
            headers: {
                'Content-Type': contentType
            }
        })
        return response
    }

    const response = await api.put(endpoint, data, {
        headers: {
            'Content-Type': contentType
        }
    })
    return response
}

const makeApiGetCall = async (endpoint, id) => {
    let url = id ? `${endpoint}/${id}` : endpoint
    const response = await api.get(url)
    return response
}

const makeApiDeleteCall = async (endpoint) => {
    const response = await api.delete(endpoint)
    return response
}

export { api, makeApiPostCall, makeApiGetCall, makeApiDeleteCall, makeApiPutCall } 