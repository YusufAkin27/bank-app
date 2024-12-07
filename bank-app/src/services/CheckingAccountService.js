import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:8080/bank/accounts/checkingAccounts';

// Ortak hata mesajı işleme fonksiyonu
const handleError = (error) => {
    return {
        success: false,
        message: error.response?.data?.message || error.message || 'Bir sorun oluştu.',
    };
};

// Token kontrolü ve yönlendirme
const getTokenOrRedirect = (navigate) => {
    const token = Cookies.get('authToken');
    if (!token) {
        navigate('/'); // Token yoksa ana sayfaya yönlendir
        throw new Error("Token bulunamadı. Lütfen giriş yapın.");
    }
    return token;
};

// API işlevleri
export const createCheckingAccount = async (branchName, currency, navigate) => {
    try {
        const token = getTokenOrRedirect(navigate);
        console.log("token :" +token);
        const response = await axios.post(
            `${API_URL}/add`,
            { branchName, currency },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return { success: true, data: response.data };
    } catch (error) {
        return handleError(error);
    }
};

export const deleteCheckingAccount = async (checkingAccountId, navigate) => {
    try {
        const token = getTokenOrRedirect(navigate);

        const response = await axios.delete(`${API_URL}/delete/${checkingAccountId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return { success: true, data: response.data };
    } catch (error) {
        return handleError(error);
    }
};

export const getAllCheckingAccounts = async (navigate) => {
    try {
        const response = await axios.get(`${API_URL}/getAll`);
        return { success: true, data: response.data };
    } catch (error) {
        return handleError(error);
    }
};

export const getUserAccounts = async (navigate) => {
    try {
        const token = getTokenOrRedirect(navigate);

        const response = await axios.get(`${API_URL}/getAccounts`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return { success: true, data: response.data };
    } catch (error) {
        return handleError(error);
    }
};

export const activateCheckingAccount = async (checkingAccountId, navigate) => {
    try {
        const token = getTokenOrRedirect(navigate);

        const response = await axios.get(`${API_URL}/activate`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: { checkingAccountId },
        });

        return { success: true, data: response.data };
    } catch (error) {
        return handleError(error);
    }
};

export const convertMoney = async (amount, fromCurrency, toCurrency, navigate) => {
    try {
        const token = getTokenOrRedirect(navigate);

        const response = await axios.post(
            `${API_URL}/convertMoney`,
            { amount, fromCurrency, toCurrency },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return { success: true, data: response.data };
    } catch (error) {
        return handleError(error);
    }
};

export const sendMailActivities = async (email, startDate, endDate, navigate) => {
    try {
        const token = getTokenOrRedirect(navigate);

        const response = await axios.post(
            `${API_URL}/getActivities`,
            { email, startDate, endDate },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return { success: true, data: response.data };
    } catch (error) {
        return handleError(error);
    }
};


