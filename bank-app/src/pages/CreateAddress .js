import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    Stack,
    Text,
} from "@chakra-ui/react";
import { AiOutlineHome, AiOutlineFlag, AiOutlineAppstoreAdd } from "react-icons/ai";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { create } from '../services/AddressService';
import MessageAlert from "../components/MessageAlert"; // Hata ve başarı mesajı bileşeni
import Cookies from 'js-cookie';
const MotionBox = motion(Box);

const CreateAddress = () => {
    const bgColor = "#f8f8f8"; // Arka plan rengi
    const boxBgColor = "white"; // Kutunun arka plan rengi
    const primaryColor = "#ee3124"; // Ana renk (düğme ve odak rengi)
    const iconColor = "#a0a0a0"; // İkonların rengi

    const [addressTitle, setAddressTitle] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [district, setDistrict] = useState("");
    const [streetNumber, setStreetNumber] = useState("");
    const [description, setDescription] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [alertStatus, setAlertStatus] = useState(null); // null, "success", veya "error"

    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('authToken');
        if (!token) {
            // Token yoksa /token sayfasına yönlendir
            navigate('/token');
        }
    }, [navigate]);

    const handleAddAddress = async (e) => {
        e.preventDefault();
    
        const addressData = {
            addressTitle,  // Adres başlığı
            country,       // Ülke adı
            city,          // Şehir adı
            district,      // İlçe adı
            streetNumber,  // Sokak ve bina numarası
            description,   // Adres açıklaması (opsiyonel)
        };
    
        try {
            const response = await create(addressData);
    
            if (response.success) {
                setAlertMessage(response.message);
                setAlertStatus('success');
                setTimeout(() => navigate("/termsPage"), 2000); // Başarı durumunda yönlendirme
                // Formu sıfırlama
                setAddressTitle('');
                setCountry('');
                setCity('');
                setDistrict('');
                setStreetNumber('');
                setDescription('');
            } else {
                setAlertMessage(response.message);
                setAlertStatus('error');
            }
        } catch (error) {
            setAlertMessage('Adres eklenirken bir hata oluştu.');
            setAlertStatus('error');
        }
    };

    return (
        <>
            {alertStatus && (
                <MessageAlert
                    isSuccess={alertStatus === "success"}
                    message={alertMessage}
                    onClose={() => setAlertStatus(null)}
                />
            )}

            <MotionBox
                bg={bgColor}
                minH="100vh"
                display="flex"
                alignItems="center"
                justifyContent="center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <Box
                    maxW="lg"
                    w="full"
                    bg={boxBgColor}
                    p={8}
                    boxShadow="lg"
                    borderRadius="md"
                    border="1px"
                    borderColor="#e0e0e0"
                >
                    <Stack spacing={6}>
                        <Text fontSize="2xl" fontWeight="bold" textAlign="center" color="#333">
                            Adres Ekle
                        </Text>

                        <FormControl id="addressTitle" isRequired>
                            <FormLabel color="#555">Adres Başlığı</FormLabel>
                            <InputGroup>
                                <InputLeftElement pointerEvents="none">
                                    <AiOutlineAppstoreAdd color={iconColor} />
                                </InputLeftElement>
                                <Input
                                    type="text"
                                    placeholder="Adres Başlığı"
                                    value={addressTitle}
                                    onChange={(e) => setAddressTitle(e.target.value)}
                                    focusBorderColor={primaryColor}
                                />
                            </InputGroup>
                        </FormControl>

                        <FormControl id="country" isRequired>
                            <FormLabel color="#555">Ülke</FormLabel>
                            <InputGroup>
                                <InputLeftElement pointerEvents="none">
                                    <AiOutlineFlag color={iconColor} />
                                </InputLeftElement>
                                <Input
                                    type="text"
                                    placeholder="Ülke"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    focusBorderColor={primaryColor}
                                />
                            </InputGroup>
                        </FormControl>

                        <FormControl id="city" isRequired>
                            <FormLabel color="#555">Şehir</FormLabel>
                            <InputGroup>
                                <InputLeftElement pointerEvents="none">
                                    <AiOutlineHome color={iconColor} />
                                </InputLeftElement>
                                <Input
                                    type="text"
                                    placeholder="Şehir"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    focusBorderColor={primaryColor}
                                />
                            </InputGroup>
                        </FormControl>

                        <FormControl id="district" isRequired>
                            <FormLabel color="#555">İlçe</FormLabel>
                            <InputGroup>
                                <InputLeftElement pointerEvents="none">
                                    <AiOutlineHome color={iconColor} />
                                </InputLeftElement>
                                <Input
                                    type="text"
                                    placeholder="İlçe"
                                    value={district}
                                    onChange={(e) => setDistrict(e.target.value)}
                                    focusBorderColor={primaryColor}
                                />
                            </InputGroup>
                        </FormControl>

                        <FormControl id="streetNumber" isRequired>
                            <FormLabel color="#555">Sokak ve Bina Numarası</FormLabel>
                            <InputGroup>
                                <InputLeftElement pointerEvents="none">
                                    <AiOutlineHome color={iconColor} />
                                </InputLeftElement>
                                <Input
                                    type="text"
                                    placeholder="Sokak ve Bina Numarası"
                                    value={streetNumber}
                                    onChange={(e) => setStreetNumber(e.target.value)}
                                    focusBorderColor={primaryColor}
                                />
                            </InputGroup>
                        </FormControl>

                        <FormControl id="description">
                            <FormLabel color="#555">Açıklama (Opsiyonel)</FormLabel>
                            <InputGroup>
                                <InputLeftElement pointerEvents="none">
                                    <AiOutlineHome color={iconColor} />
                                </InputLeftElement>
                                <Input
                                    type="text"
                                    placeholder="Açıklama"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    focusBorderColor={primaryColor}
                                />
                            </InputGroup>
                        </FormControl>

                        <Button
                            bg={primaryColor}
                            color="white"
                            size="lg"
                            onClick={handleAddAddress}
                            _hover={{ bg: "#d6291f" }}
                            isFullWidth
                        >
                            Adres Ekle
                        </Button>
                    </Stack>
                </Box>
            </MotionBox>
        </>
    );
};

export default CreateAddress;
