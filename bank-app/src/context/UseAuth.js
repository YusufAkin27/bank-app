import { useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import Cookies from "js-cookie";

const UseAuth = () => {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  // Kullanıcı giriş işlemi
  const login = async (email, password) => {
    try {
      // Email ve password değerlerini konsola yazdır
      console.log("Email:", email);
      console.log("Password:", password);
  
      // Giriş isteğini gönder
      const response = await axios.post("http://localhost:8080/akinMarket/authentication/login", {
        email,
        password,
      });
  
      // Eğer giriş başarılıysa
      if (response.data.success) {
        const token = response.data.token; // Token döndüyse alınır
        Cookies.set("authToken", token, { expires: 1, secure: true, sameSite: "Strict" }); // Çerezlere kaydedilir
  
        // Token kullanarak rol bilgisini al
        const roleResponse = await axios.get("http://localhost:8080/akinMarket/authentication/getRole", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userRole = roleResponse.data;
  
        // Kullanıcı bilgilerini kaydet
        Cookies.set("userRole", userRole, { expires: 1, secure: true, sameSite: "Strict" });
        setUser({ email, userRole });
  
        // Profil verisini al ve kaydet
        const profileResponse = await axios.get("http://localhost:8080/akinMarket/customers/getProfile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser((prev) => ({ ...prev, profile: profileResponse.data }));
        return { success: true }; // Başarılı giriş yanıtı
      } else {
        // Hata durumunda mesaj döndür
        return { success: false, message: response.data.message || "Giriş başarısız." };
      }
    } catch (error) {
      // Hata ile ilgili detaylı bilgi
      console.error("Login hatası:", error); // Burada tüm hata objesini konsola yazdırıyoruz
      return { success: false, message: error.response?.data?.message || "Giriş sırasında bir hata oluştu." };
    }
  };
  
  // Kullanıcı çıkışı işlemi
  const logout = async () => {
    try {
      const token = Cookies.get("authToken");
      await axios.get("http://localhost:8080/akinMarket/authentication/logout", {
        headers: { Authorization: `Bearer ${token}` },
      });
      Cookies.remove("authToken");
      Cookies.remove("userRole");
      setUser(null);
    } catch (error) {
      console.error("Çıkış hatası:", error);
    }
  };

  // Uygulama yüklendiğinde, çerezlerden mevcut kullanıcıyı kontrol et
  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      // Token varsa, kullanıcıyı doğrulamak için profil verisini al
      axios
        .get("http://localhost:8080/akinMarket/customers/getProfile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch(() => {
          setUser(null);
        });
    }
    setLoading(false);
  }, []);

  return { user, login, logout, loading };
};

export default UseAuth;
