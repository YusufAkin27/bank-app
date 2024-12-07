import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormLabel,
    Input,
    Select,
    Text,
    VStack,
    HStack,
    useToast,
    Divider,
} from "@chakra-ui/react";
import CurrencySelector from "../components/CurrencySelector";
import BranchSelector from "../components/BranchSelector";
import { createCheckingAccount } from "../services/CheckingAccountService";

const TermsPage = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [branchName, setBranchName] = useState("");
    const [currency, setCurrency] = useState("");
    const navigate = useNavigate();
    const toast = useToast();

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleBranchChange = (value) => {
        setBranchName(value); // branchName state'ini güncelle
    };


    const handleNextStep = async () => {
        if (!isChecked) {
            toast({
                title: "Şartları kabul etmediniz",
                description: "Lütfen şartları kabul ettiğinizi onaylayın.",
                status: "error",
                duration: 4000,
                isClosable: true,
            });
            return;
        }

        if (!branchName || !currency) {
            toast({
                title: "Eksik Bilgiler",
                description: "Şube adı ve para birimi seçmeniz gerekmektedir.",
                status: "error",
                duration: 4000,
                isClosable: true,
            });
            return;
        }

        setIsLoading(true);

        try {
            // create fonksiyonuna branchName ve currency parametrelerini gönder
            const response = await createCheckingAccount(branchName, currency);

            if (response.success) {
                toast({
                    title: "Başarı",
                    description: response.message || "Hesabınız başarıyla oluşturuldu!",
                    status: "success",
                    duration: 4000,
                    isClosable: true,
                });
                navigate("/createDebitCard");  // Başarıyla yönlendirme yap
            } else {
                toast({
                    title: "Hata",
                    description: response.message || "Bir hata oluştu.",
                    status: "error",
                    duration: 4000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error("Hesap oluşturulamadı:", error.message);
            toast({
                title: "Hata",
                description: error.message || "Bir hata oluştu. Lütfen tekrar deneyin.",
                status: "error",
                duration: 4000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <Box
            bgGradient="linear(to-br, gray.50, gray.200)"
            minHeight="100vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
            p={4}
        >
            <Box
                bg="white"
                p={8}
                borderRadius="md"
                boxShadow="xl"
                maxW="lg"
                w="100%"
            >
                <Text
                    fontSize="3xl"
                    fontWeight="bold"
                    color="gray.700"
                    mb={6}
                    textAlign="center"
                >
                    Hesap Oluşturma Şartları
                </Text>
                <Divider mb={6} />
                <VStack align="start" spacing={4} mb={8}>
                    <Text fontSize="sm" color="gray.600" lineHeight="1.6">
                        1. Hesabınız yalnızca bireysel kullanım içindir. <br />
                        2. Hesap bilgilerinizin güvenliği sizin sorumluluğunuzdadır. <br />
                        3. Banka gerekli durumlarda ek bilgi talep edebilir. <br />
                        4. Hesap sadece belirli limitlerde işlem yapabilir. <br />
                        5. Banka, hesabın kullanım koşullarında değişiklik yapma hakkına
                        sahiptir. <br />
                        6. Şartları kabul ederek, tüm yasal ve etik sorumlulukları üstlenmiş
                        olursunuz. <br />
                    </Text>
                    <Checkbox
                        isChecked={isChecked}
                        onChange={handleCheckboxChange}
                        size="lg"
                        colorScheme="red"
                    >
                        Okudum ve kabul ediyorum.
                    </Checkbox>
                </VStack>
                <BranchSelector branchName={branchName} onChange={handleBranchChange} />

                <CurrencySelector value={currency} onChange={(val) => setCurrency(val)} />

                <Button
                    onClick={handleNextStep}
                    isLoading={isLoading}
                    loadingText="Hesap Oluşturuluyor..."
                    bg="#ee3124"
                    colorScheme="teal"
                    size="lg"
                    w="100%"
                    isDisabled={!isChecked}
                >
                    Sonraki Adım
                </Button>
            </Box>
        </Box>
    );
};

export default TermsPage;
