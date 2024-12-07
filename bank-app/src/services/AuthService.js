import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:8080/bank';

// Kullanıcı kayıt işlemi
const register = async (userData) => {
    return await axios.post(`${API_URL}/customers/sign-up`, userData);
};

const login = async (identity, password) => {
    try {
        // Giriş isteği gönder
        const loginResponse = await axios.post(`${API_URL}/authentication/login`, {
            identity,
            password,
        });

        if (loginResponse.data.success) {
            const token = loginResponse.data.message; // Servisten gelen token

            // Token'ı çerezlere kaydet
            Cookies.set("authToken", token, {
                expires: 1 / 24, // 1 gün
                secure: true, // HTTPS için
                sameSite: "Strict",
            });

            // Rol bilgisini al
            const roleResponse = await axios.get(`${API_URL}/authentication/getRole`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const userRole = roleResponse.data; // Rol bilgisi

            // Rol bilgisini çerezlere kaydet
            Cookies.set("userRole", userRole, {
                expires: 1,
                secure: true,
                sameSite: "Strict",
            });

            // Giriş başarılı
            return { success: true, token };
        } else {
            // Başarısız giriş durumunda mesaj döndür
            return { success: false, message: loginResponse.data.message };
        }
    } catch (error) {
        // Hata durumunda mesaj döndür
        const errorMessage = error.response?.data?.message || "Giriş sırasında bir hata oluştu.";
        return { success: false, message: errorMessage };
    }
};

const activateAccount = async (smsCode) => {
    try {
        // SMS doğrulama kodunu POST isteği ile gönderiyoruz
        const response = await axios.post(`${API_URL}/authentication/activate`, { code: smsCode });

        // Yanıtın başarılı olduğundan emin olun
        if (response.data.success) {
            const token = response.data.message; // Servisten gelen token
            console.log(token);
            // Token'ı çerezlere kaydet
            Cookies.set("authToken", token, {
                expires: 1 / 24, // 1 gün
                secure: true, // HTTPS için
                sameSite: "Strict",
            });

            // Rol bilgisini al
            const roleResponse = await axios.get(`${API_URL}/authentication/getRole`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const userRole = roleResponse.data; // Rol bilgisi

            // Rol bilgisini çerezlere kaydet
            Cookies.set("userRole", userRole, {
                expires: 1,
                secure: true,
                sameSite: "Strict",
            });

            // Başarılı yanıt döndür
            return { success: true, message: "Hesap başarıyla etkinleştirildi!" };
        } else {
            // Yanıt başarısızsa, hata mesajını döndür
            return { success: false, message: response.data.message };
        }
    } catch (error) {
        console.error("Hesap etkinleştirme hatası:", error);
        throw error.response?.data?.message || "Hesap etkinleştirme işlemi sırasında bir hata oluştu.";
    }
};


export const verifyLoginCode = async (smsCode) => {
    try {
        // SMS doğrulama kodunu POST isteği ile gönderiyoruz
        const response = await axios.post(`${API_URL}/authentication/verify`, { code: smsCode });

        if (response.data.success) {
            const token = response.data.message; // Servisten gelen token

            // Token'ı çerezlere kaydet
            Cookies.set("authToken", token, {
                expires: 1 / 24, // 1 gün
                secure: true, // HTTPS için
                sameSite: "Strict",
            });

            // Rol bilgisini al
            const roleResponse = await axios.get(`${API_URL}/authentication/getRole`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const userRole = roleResponse.data; // Rol bilgisi

            // Rol bilgisini çerezlere kaydet
            Cookies.set("userRole", userRole, {
                expires: 1,
                secure: true,
                sameSite: "Strict",
            });

            // Giriş başarılı
            console.log(token);
            return { success: true, token };
        } else {
            // Başarısız giriş durumunda mesaj döndür
            return { success: false, message: response.data.message || "Doğrulama başarısız." };
        }
    } catch (error) {
        // Hata durumunda mesaj döndür
        const errorMessage = error.response?.data?.message || "Giriş sırasında bir hata oluştu.";
        return { success: false, message: errorMessage };
    }
};


    // Çıkış işlemi
    const logout = async () => {
        try {
            const token = Cookies.get('authToken');
            if (!token) {
                console.warn("Çıkış yapacak token bulunamadı.");
                return { success: false, message: "Token bulunamadı." };
            }

            // Backend'e çıkış isteği gönderiyoruz
            const response = await axios.get(`${API_URL}/authentication/logout`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.data.success) {
                // Çerezleri temizle
                Cookies.remove("authToken");
                Cookies.remove("userRole");
                Cookies.remove("userProfile");

                return { success: true, message: "Çıkış işlemi başarılı." };
            } else {
                return { success: false, message: "Çıkış işlemi başarısız." };
            }
        } catch (error) {
            return { success: false, message: error.response?.data?.message || "Çıkış sırasında bir hata oluştu." };
        }
    };

    export { register, login, logout, activateAccount };
