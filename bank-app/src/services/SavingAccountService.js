import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:8080/bank/accounts/savingAccounts';

// Add a new saving account
const addSavingAccount = async (data) => {
    try {
        const token = Cookies.get('authToken');
        if (!token) throw new Error("Token bulunamadı. Lütfen giriş yapın.");

        const response = await axios.post(
            `${API_URL}/add`,
            data,
            { headers: { Authorization: `Bearer ${token}` } }
        );

        return response.data;
    } catch (error) {
        return { success: false, message: error.response?.data?.message || error.message || 'Hesap eklenirken bir sorun oluştu' };
    }
};

// Delete a saving account
const deleteSavingAccount = async (savingAccountId) => {
    try {
        const token = Cookies.get('authToken');
        if (!token) throw new Error("Token bulunamadı. Lütfen giriş yapın.");

        const response = await axios.delete(
            `${API_URL}/delete`,
            {
                params: { savingAccountId },
                headers: { Authorization: `Bearer ${token}` }
            }
        );

        return response.data;
    } catch (error) {
        return { success: false, message: error.response?.data?.message || error.message || 'Hesap silinirken bir sorun oluştu' };
    }
};

// Get activities for a specific saving account
const getSavingAccountActivities = async (savingAccountId) => {
    try {
        const token = Cookies.get('authToken');
        if (!token) throw new Error("Token bulunamadı. Lütfen giriş yapın.");

        const response = await axios.get(
            `${API_URL}/getActivities`,
            {
                params: { savingAccountId },
                headers: { Authorization: `Bearer ${token}` }
            }
        );

        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, message: error.response?.data?.message || error.message || 'Aktiviteler alınırken bir sorun oluştu' };
    }
};

// Get all saving accounts
const getAllSavingAccounts = async () => {
    try {
        const token = Cookies.get('authToken');
        if (!token) throw new Error("Token bulunamadı. Lütfen giriş yapın.");

        const response = await axios.get(
            `${API_URL}/getall`,
            { headers: { Authorization: `Bearer ${token}` } }
        );

        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, message: error.response?.data?.message || error.message || 'Hesaplar alınırken bir sorun oluştu' };
    }
};

// Add money to a saving account
const addMoneyToSavingAccount = async (data) => {
    try {
        const token = Cookies.get('authToken');
        if (!token) throw new Error("Token bulunamadı. Lütfen giriş yapın.");

        const response = await axios.post(
            `${API_URL}/addmoney`,
            data,
            { headers: { Authorization: `Bearer ${token}` } }
        );

        return response.data;
    } catch (error) {
        return { success: false, message: error.response?.data?.message || error.message || 'Hesaba para eklenirken bir sorun oluştu' };
    }
};

// Activate a saving account
const activateSavingAccount = async (savingAccountId) => {
    try {
        const token = Cookies.get('authToken');
        if (!token) throw new Error("Token bulunamadı. Lütfen giriş yapın.");

        const response = await axios.get(
            `${API_URL}/doactive`,
            {
                params: { savingAccountId },
                headers: { Authorization: `Bearer ${token}` }
            }
        );

        return response.data;
    } catch (error) {
        return { success: false, message: error.response?.data?.message || error.message || 'Hesap aktif hale getirilirken bir sorun oluştu' };
    }
};

export {
    addSavingAccount,
    deleteSavingAccount,
    getSavingAccountActivities,
    getAllSavingAccounts,
    addMoneyToSavingAccount,
    activateSavingAccount
};
