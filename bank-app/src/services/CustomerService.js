import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:8080/bank';

// Sign up function
export const signUp = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/customers/sign-up`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response.data;
    } catch (error) {
        return handleError(error, 'Kayıt işlemi sırasında bir sorun oluştu');
    }
};

// Delete customer function
export const deleteCustomer = async () => {
    try {
        const token = getToken();

        const response = await axios.delete(`${API_URL}/customers/delete`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        return handleError(error, 'Hesap silinirken bir sorun oluştu');
    }
};

// Change password function
export const changePassword = async (data) => {
    try {
        const token = getToken();

        const response = await axios.post(`${API_URL}/customers/change-password`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        return response.data;
    } catch (error) {
        return handleError(error, 'Şifre değiştirilirken bir sorun oluştu');
    }
};

// Edit profile function
export const editProfile = async (data) => {
    try {
        const token = getToken();

        const response = await axios.put(`${API_URL}/customers/edit-profile`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        return response.data;
    } catch (error) {
        return handleError(error, 'Profil güncellenirken bir sorun oluştu');
    }
};

// Contact management function
export const updateContact = async (data) => {
    try {
        const token = getToken();

        const response = await axios.put(`${API_URL}/customers/contact-management`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        return response.data;
    } catch (error) {
        return handleError(error, 'İletişim bilgileri güncellenirken bir sorun oluştu');
    }
};

// Get last transactions
export const getLastTransactions = async () => {
    try {
        const token = getToken();

        const response = await axios.get(`${API_URL}/customers/last-transactions`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        return handleError(error, 'Son işlemler alınırken bir sorun oluştu');
    }
};

// Get customer profile
export const getProfile = async () => {
    try {
        const token = getToken();

        const response = await axios.get(`${API_URL}/customers/getProfile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        return handleError(error, 'Profil bilgileri alınırken bir sorun oluştu');
    }
};

// Get spending details
export const getSpending = async () => {
    try {
        const token = getToken();

        const response = await axios.get(`${API_URL}/customers/spending`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        return handleError(error, 'Harcamalar alınırken bir sorun oluştu');
    }
};

// Get income details
export const getIncome = async () => {
    try {
        const token = getToken();

        const response = await axios.get(`${API_URL}/customers/income`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        return handleError(error, 'Gelirler alınırken bir sorun oluştu');
    }
};

// Send receipt
export const sendReceipt = async (activityId) => {
    try {
        const token = getToken();

        const response = await axios.post(`${API_URL}/customers/sendReceipt`, { activityId }, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        return response.data;
    } catch (error) {
        return handleError(error, 'Makbuz gönderilirken bir sorun oluştu');
    }
};

// Send user information
export const sendUserInfo = async () => {
    try {
        const token = getToken();

        const response = await axios.get(`${API_URL}/customers/sendMyInformation`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        return handleError(error, 'Kullanıcı bilgileri gönderilirken bir sorun oluştu');
    }
};

// Utility functions
const getToken = () => {
    const token = Cookies.get('authToken');
    if (!token) throw new Error("Token bulunamadı. Lütfen giriş yapın.");
    return token;
};

const handleError = (error, defaultMessage) => {
    return {
        success: false,
        message: error.response?.data?.message || error.message || defaultMessage,
    };
};
