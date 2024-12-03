import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:8080/bank';

const create = async (addressData) => {
    try {
        // Token'ı çerezden al
        const token = Cookies.get('authToken');
        
        if (!token) {
            throw new Error("Token bulunamadı. Lütfen giriş yapın.");
        }

        // Adres ekleme isteği gönder
        const response = await axios.post(
            `${API_URL}/address/add`,
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

export { create };
