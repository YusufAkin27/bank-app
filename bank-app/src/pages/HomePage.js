import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { VStack , Flex, Text } from "@chakra-ui/react";
import Navbar from "../components/Navbar"; // Navbar bileşeni
import Account from "../components/Accounts";
import { getAllAccounts } from "../services/CheckingAccountService"; // API servisi

const HomePage = () => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]); // Kullanıcı hesapları için state

  useEffect(() => {
    const token = Cookies.get("authToken");
    const userRole = Cookies.get("userRole");

    // Kullanıcı token veya rol geçersizse girişe yönlendir
    if (!token || (userRole !== "ROLE_ADMIN" && userRole !== "ROLE_USER")) {
      navigate("/");
      return;
    }

    // Kullanıcı hesaplarını getir
    fetchAccounts();
  }, [navigate]);

  const fetchAccounts = async () => {
    try {
      const response = await getAllAccounts();
      if (response.success) {
        setAccounts(response.data); // Hesapları state'e ekle
      } else {
        console.error("Hesaplar alınamadı:", response.message);
      }
    } catch (error) {
      console.error("Hesaplar getirilirken bir sorun oluştu:", error);
    }
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Kullanıcı Hesapları */}
      <VStack spacing={6} padding="20px" align="stretch">
        {accounts.length > 0 ? (
          accounts.map((account) => (
            <Flex
              key={account.id}
              direction="column"
              alignItems="center"
              justifyContent="center"
              bg="white"
              borderRadius="lg"
              p={5}
              boxShadow="md"
              w="full" // Kartlar tam genişlikte olacak
            >
              <Account account={account} /> {/* Account bileşeniyle hesap bilgilerini görüntüle */}
            </Flex>
          ))
        ) : (
          <Flex justifyContent="center" alignItems="center" h="200px">
            <Text fontSize="lg" color="gray.500">
              Henüz hesap bulunamadı.
            </Text>
          </Flex>
        )}
      </VStack>
    </div>
  );
};

export default HomePage;
