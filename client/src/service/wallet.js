import axios from "axios";
import BASE_URL from "../config/config";

const getCategories = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/api/categories`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

const withdrawMoney = async (transactionData) => {
    try {
        const res = await axios.post(`${BASE_URL}/api/withdraw`, transactionData);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

const getWithdrawnMoneyData = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/api/getWithdrawnMoneyData`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
} 


const editWithdrawMoney = async (id, transactionData) => {
    try {
        const res = await axios.put(`${BASE_URL}/api/editWithdrawnMoneyData/${id}`, transactionData);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

const deleteWithdrawnMoneyData = async (id) => {
    try {
        const res = await axios.delete(`${BASE_URL}/api/deleteWithdrawnMoneyData/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export default { getCategories, withdrawMoney, getWithdrawnMoneyData, editWithdrawMoney, deleteWithdrawnMoneyData };