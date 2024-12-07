import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { VStack, Flex, Text, Button, Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar"; // Navbar bileşeni
import Account from "../components/Accounts";
import { getAllCheckingAccounts } from "../services/CheckingAccountService"; // API servisi

const HomePage = () => {
    const navigate = useNavigate();
    const [accounts, setAccounts] = useState([]); // Kullanıcı hesapları
    const [currentIndex, setCurrentIndex] = useState(0); // Gösterilen hesap indeksi

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
            const response = await getAllCheckingAccounts();
            if (response.success) {
                setAccounts(response.data); // Hesapları state'e ekle
            } else {
                console.error("Hesaplar alınamadı:", response.message);
            }
        } catch (error) {
            console.error("Hesaplar getirilirken bir sorun oluştu:", error);
        }
    };

    // Hesaplar arasında geçiş yapma işlevleri
    const handlePrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? accounts.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === accounts.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div>
            {/* Navbar */}
            <Navbar />

            {/* Kullanıcı Hesapları */}
            <Flex
                position="relative"
                align="center"
                justify="center"
                height="100vh"
                bg="gray.100"
            >
                {accounts.length > 0 ? (
                    <>
                        {/* Sol Buton */}
                        <Button
                            position="absolute"
                            left="10px"
                            size="lg"
                            bg="blue.500"
                            color="white"
                            _hover={{ bg: "blue.600" }}
                            borderRadius="full"
                            onClick={handlePrevious}
                        >
                            &#8592; {/* Sol ok simgesi */}
                        </Button>

                        {/* Hesap Kartı */}
                        <Flex
                            direction="column"
                            align="center"
                            justify="center"
                            bg="white"
                            borderRadius="lg"
                            p={5}
                            boxShadow="lg"
                            w="90%"
                            maxW="700px"
                        >
                            <Account account={accounts[currentIndex]} />
                        </Flex>

                        {/* Sağ Buton */}
                        <Button
                            position="absolute"
                            right="10px"
                            size="lg"
                            bg="blue.500"
                            color="white"
                            _hover={{ bg: "blue.600" }}
                            borderRadius="full"
                            onClick={handleNext}
                        >
                            &#8594; {/* Sağ ok simgesi */}
                        </Button>
                    </>
                ) : (
                    <Flex justify="center" align="center" h="100%">
                        <Text fontSize="lg" color="gray.500">
                            Henüz hesap bulunamadı.
                        </Text>
                    </Flex>
                )}
            </Flex>
        </div>
    );
};

export default HomePage;
