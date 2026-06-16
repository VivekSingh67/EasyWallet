import axios from "axios"
import BASE_URL from "../config/config"


const addFund = async (data) => {
    try {
        const res = await axios.post(`${BASE_URL}/api/addFund`, data)
        return res.data
    } catch (error) {
        return error.response.data
    }
}

const getFunds = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/api/getFunds`)
        return res.data
    } catch (error) {
        return error.response.data
    }
}

const editFund = async (id, data) => {
    try {
        const res = await axios.put(`${BASE_URL}/api/editFund/${id}`, data)
        return res.data
    } catch (error) {
        return error.response.data
    }
}

const deleteFund = async (id) => {
    try {
        const res = await axios.post(`${BASE_URL}/api/deleteFund/${id}`)
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export default { addFund, getFunds , editFund, deleteFund};