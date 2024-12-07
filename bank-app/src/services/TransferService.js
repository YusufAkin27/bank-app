import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:8080/bank/transfer';

// Para gönderme işlemi
const sendMoney = async (transferData) => {
    try {
        const token = Cookies.get('authToken'); // Kullanıcı oturum token'ı

        if (!token) {
            throw new Error('Oturum token bulunamadı. Lütfen giriş yapın.');
        }

        const response = await axios.post(`${API_URL}/sendMoney`, transferData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.data.success) {
            return { success: true, message: response.data.message };
        } else {
            return { success: false, message: response.data.message };
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Para gönderme sırasında bir hata oluştu.';
        return { success: false, message: errorMessage };
    }
};

// Tüm transfer işlemlerini getirme
const getAllTransfers = async () => {
    try {
        const token = Cookies.get('authToken'); // Kullanıcı oturum token'ı

        if (!token) {
            throw new Error('Oturum token bulunamadı. Lütfen giriş yapın.');
        }

        const response = await axios.get(`${API_URL}/getAll`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Transfer işlemlerini getirme sırasında bir hata oluştu.';
        return { success: false, message: errorMessage };
    }
};

export { sendMoney, getAllTransfers };
