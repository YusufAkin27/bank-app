import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:8080/bank';

// Debit card creation function
const create = async (data) => {
    try {
        const token = Cookies.get('authToken');
        if (!token) throw new Error("Token bulunamadı. Lütfen giriş yapın.");

        const response = await axios.post(
            `${API_URL}/cards/debitCard/add`,
            data,
            { headers: { Authorization: `Bearer ${token}` } }
        );

        return response.data;
    } catch (error) {
        return { success: false, message: error.message || 'Hesap açılırken bir sorun oldu' };
    }
};

// Get all debit cards function
const getAllDebitCards = async () => {
    try {
        const token = Cookies.get('authToken');
        if (!token) throw new Error("Token bulunamadı. Lütfen giriş yapın.");

        const response = await axios.get(
            `${API_URL}/cards/debitCard/getAll`,
            { headers: { Authorization: `Bearer ${token}` } }
        );

        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, message: error.response?.data?.message || error.message || 'Kartlar alınırken bir sorun oldu' };
    }
};

// Delete debit card function
const deleteDebitCard = async (debitCardId) => {
    try {
        const token = Cookies.get('authToken');
        if (!token) throw new Error("Token bulunamadı. Lütfen giriş yapın.");

        const response = await axios.delete(
            `${API_URL}/cards/debitCard/delete/${debitCardId}`,
            { headers: { Authorization: `Bearer ${token}` } }
        );

        return response.data;
    } catch (error) {
        return { success: false, message: error.response?.data?.message || error.message || 'Kart silinirken bir sorun oldu' };
    }
};

// Get all activities for a specific debit card
const getAllActivities = async (debitCardId) => {
    try {
        const token = Cookies.get('authToken');
        if (!token) throw new Error("Token bulunamadı. Lütfen giriş yapın.");

        const response = await axios.get(
            `${API_URL}/cards/debitCard/getAllActivity`,
            {
                params: { debitCardId },
                headers: { Authorization: `Bearer ${token}` }
            }
        );

        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, message: error.response?.data?.message || error.message || 'Aktiviteler alınırken bir sorun oldu' };
    }
};

export { create, getAllDebitCards, deleteDebitCard, getAllActivities };
