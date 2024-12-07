import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:8080/bank/cards/creditCard';

// Ortak hata yönetim fonksiyonu
const handleError = (error) => {
    return {
        success: false,
        message: error.response?.data?.message || error.message || 'Bir hata oluştu.',
    };
};

// Token alma ve doğrulama
const getToken = () => {
    const token = Cookies.get('authToken');
    if (!token) {
        throw new Error("Token bulunamadı. Lütfen giriş yapınız.");
    }
    return token;
};

// Yeni kredi kartı ekleme
export const addCreditCard = async (password) => {
    try {
        const token = getToken();
        const response = await axios.post(`${API_URL}/add`, null, {
            headers: { Authorization: `Bearer ${token}` },
            params: { password },
        });
        return { success: true, data: response.data };
    } catch (error) {
        return handleError(error);
    }
};

// Kredi kartını aktif etme
export const activateCreditCard = async (creditCardId) => {
    try {
        const token = getToken();
        const response = await axios.get(`${API_URL}/doactive`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { creditCardId },
        });
        return { success: true, data: response.data };
    } catch (error) {
        return handleError(error);
    }
};

// Kimlik numarasına göre kredi kartı alma
export const getCreditCardByIdentityNu = async (identityNu) => {
    try {
        const response = await axios.get(`${API_URL}/getIdentityNu`, {
            params: { identityNu },
        });
        return { success: true, data: response.data };
    } catch (error) {
        return handleError(error);
    }
};

// Kredi kartı silme
export const deleteCreditCard = async (creditCardId) => {
    try {
        const token = getToken();
        const response = await axios.delete(`${API_URL}/delete/${creditCardId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return { success: true, data: response.data };
    } catch (error) {
        return handleError(error);
    }
};



// Para çekme
export const withdrawMoney = async (withdrawalMoneyRequest) => {
    try {
        const token = getToken();
        const response = await axios.post(`${API_URL}/withdrawal`, withdrawalMoneyRequest, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return { success: true, data: response.data };
    } catch (error) {
        return handleError(error);
    }
};

// Para yatırma
export const depositMoney = async (depositMoneyRequest) => {
    try {
        const token = getToken();
        const response = await axios.post(`${API_URL}/deposit`, depositMoneyRequest, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return { success: true, data: response.data };
    } catch (error) {
        return handleError(error);
    }
};

// Kredi kartı aktivitelerini alma
export const getAllActivities = async (creditCardId) => {
    try {
        const token = getToken();
        const response = await axios.get(`${API_URL}/getAllActivity`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { creditCardId },
        });
        return { success: true, data: response.data };
    } catch (error) {
        return handleError(error);
    }
};
