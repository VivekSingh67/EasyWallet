import axios from "axios";
import BASE_URL from "../config/config";
const withdrawMoney = async (transactionData) => {
    try {
        const res = await axios.post(`${BASE_URL}/api/withdraw`, transactionData);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export default { withdrawMoney };