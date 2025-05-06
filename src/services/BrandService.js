import { makeApiGetCall, makeApiPostCall, makeApiPutCall, makeApiDeleteCall } from '../api/api'

const endpoint = '/brands'
const countryConfigEndpoint = '/country-configs'

const BrandService = {
    async getBrands() {
        const res = await makeApiGetCall(endpoint)
        return res.data.data
    },
    async getSpecificBrand(id) {
        const res = await makeApiGetCall(endpoint, id)
        return res.data.data
    },
    async getCountryConfigs() {
        const res = await makeApiGetCall(countryConfigEndpoint)
        return res.data.data
    },
    async addBrand(formData) {
        const res = await makeApiPostCall(endpoint, formData, true)
        return res.data.data
    },
    async updateBrand(id, formData) {
        const res = await makeApiPutCall(`${endpoint}/${id}`, formData, true)
        return res.data.data
    },
    async deleteBrand(id) {
        const res = await makeApiDeleteCall(`${endpoint}/${id}`)
        return res.data.data
    }
}

export default BrandService 