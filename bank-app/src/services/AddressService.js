import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:8080/bank/address';

const createAddress = async (addressData) => {
    try {
        // Token'ı çerezden al
        const token = Cookies.get('authToken');
        
        if (!token) {
            throw new Error("Token bulunamadı. Lütfen giriş yapın.");
        }

        // Adres ekleme isteği gönder
        const response = await axios.post(
            `${API_URL}/add`,
            addressData,
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Token'ı başlık olarak gönder
                },
            }
        );

        return response.data; // Yanıtı döndür
    } catch (error) {
        // Hata mesajını döndür
        return { success: false, message: error.message || 'Adres eklenirken bir hata oluştu.' };
    }
};
const updateAddress = async (addressId, addressData) => {
    try {
        const token = Cookies.get('authToken');

        if (!token) {
            throw new Error('Token bulunamadı. Lütfen giriş yapın.');
        }

        const response = await axios.put(
            `${API_URL}/update`,
            { ...addressData, id: addressId },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        return { success: false, message: error.message || 'Adres güncellenirken bir hata oluştu.' };
    }
};

// Function to delete an address
const deleteAddress = async (addressId) => {
    try {
        const token = Cookies.get('authToken');

        if (!token) {
            throw new Error('Token bulunamadı. Lütfen giriş yapın.');
        }

        const response = await axios.delete(
            `${API_URL}/delete`,
            {
                params: { addressId },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        return { success: false, message: error.message || 'Adres silinirken bir hata oluştu.' };
    }
};

// Function to get the list of addresses
const getAddresses = async () => {
    try {
        const token = Cookies.get('authToken');

        if (!token) {
            throw new Error('Token bulunamadı. Lütfen giriş yapın.');
        }

        const response = await axios.get(
            `${API_URL}/get`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        return { success: false, message: error.message || 'Adresler getirilirken bir hata oluştu.' };
    }
};

export { createAddress,getAddresses,updateAddress,deleteAddress };
