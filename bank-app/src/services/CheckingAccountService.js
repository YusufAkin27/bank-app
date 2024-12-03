import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:8080/bank';

// Hesap oluşturma fonksiyonu
const create = async (branchName, currency) => {
    try {
        // Token'ı çerezden al
        const token = Cookies.get('authToken');

        if (!token) {
            throw new Error("Token bulunamadı. Lütfen giriş yapın.");
            
        }

        // Hesap oluşturma isteği gönder
        const response = await axios.post(
            `${API_URL}/accounts/checkingAccounts/add`,
            {
                branchName: branchName,  // Şube adı
                currency: currency,      // Para birimi
            }, 
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Token'ı başlık olarak gönder
                },
            }
        );

        return response.data; // Yanıtı döndür
    } catch (error) {
        // Hata mesajını döndür
        return { success: false, message: error.message || 'Hesap açılırken bir sorun oldu' };
    }
};



const getAllAccounts = async () => {
    try {
        // Retrieve the token from cookies
        const token = Cookies.get('authToken');

        if (!token) {
            throw new Error("Token bulunamadı. Lütfen giriş yapın.");
        }

        // Send the request to fetch accounts
        const response = await axios.get(
            `${API_URL}/accounts/checkingAccounts/getAccounts`, // Updated endpoint
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Send the token in headers
                },
            }
        );

        // Return the response data which should be a list of accounts
        if (response.data) {
            return { success: true, data: response.data }; // Return success response with data
        } else {
            throw new Error('Hesaplar alınırken bir sorun oldu');
        }

    } catch (error) {
        // Handle error
        return { success: false, message: error.response?.data?.message || error.message || 'Hesaplar alınırken bir sorun oldu' };
    }
};
export { create ,getAllAccounts};
