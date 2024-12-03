import React, { useState, useEffect } from "react";
import { Box, Text, Button, Grid, Flex, Input } from "@chakra-ui/react";
import { AiOutlineIdcard } from "react-icons/ai";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import MessageAlert from "../components/MessageAlert";
import {  create } from "../services/DebitCardService";
import { getAllAccounts } from "../services/CheckingAccountService";
import Account from "../components/Accounts";

const CreateDebitCard = () => {
    const [accounts, setAccounts] = useState([]);
    const [selectedAccountId, setSelectedAccountId] = useState(null);
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await getAllAccounts();
                if (response.success) {
                    setAccounts(response.data);
                } else {
                    showAlert(false, response.message);
                }
            } catch {
                showAlert(false, "Hesaplar alınırken bir sorun oluştu.");
            }
        };

        fetchAccounts();
    }, []);

    const handleAccountSelection = (id) => {
        setSelectedAccountId(id);
        setAlert(null);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedAccountId || password.length !== 4) return;

        setLoading(true);

        try {
            const data = { checkingAccountId: selectedAccountId, password };
            const response = await create(data);
            if (response.success) {
                showAlert(true, "Kart başarıyla oluşturuldu!");
                setTimeout(() => navigate("/home"), 2000);
            } else {
                showAlert(false, response.message);
            }
        } catch {
            showAlert(false, "Kart oluşturulurken bir hata oluştu.");
        } finally {
            setLoading(false);
        }
    };

    const showAlert = (isSuccess, message) => {
        setAlert({ isSuccess, message });
    };

    return (
        <Box p={6} bg="gray.50" minH="100vh">
            <Text fontSize="3xl" fontWeight="bold" color="#ee3124" textAlign="center" mb={4}>
                Debit Kart Oluştur
            </Text>

            {alert && (
                <MessageAlert
                    isSuccess={alert.isSuccess}
                    message={alert.message}
                    onClose={() => setAlert(null)}
                />
            )}

            <Box mb={6}>
                <Text fontSize="lg" textAlign="center" color="gray.700" mb={4}>
                    Lütfen bir hesap seçin:
                </Text>

                <Grid templateColumns="repeat(auto-fit, minmax(280px, 1fr))" gap={6}>
                    {accounts.length > 0 ? (
                        accounts.map((account) => (
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                key={account.id}
                                onClick={() => handleAccountSelection(account.id)}
                            >
                                <Flex
                                    direction="column"
                                    alignItems="center"
                                    justifyContent="center"
                                    bg="white"
                                    border="2px solid"
                                    borderColor={selectedAccountId === account.id ? "#ee3124" : "gray.200"}
                                    borderRadius="lg"
                                    p={5}
                                    boxShadow="md"
                                    cursor="pointer"
                                    transition="all 0.2s ease-in-out"
                                >
                                    <Account account={account} />
                                    <AiOutlineIdcard size="24px" color={selectedAccountId === account.id ? "#ee3124" : "gray.400"} />
                                    <Text
                                        mt={2}
                                        fontSize="sm"
                                        fontWeight="bold"
                                        color={selectedAccountId === account.id ? "#ee3124" : "gray.500"}
                                    >
                                        {selectedAccountId === account.id ? "Seçildi" : "Seçmek için tıklayın"}
                                    </Text>
                                </Flex>
                            </motion.div>
                        ))
                    ) : (
                        <Flex justifyContent="center" alignItems="center" h="200px">
                            <Text fontSize="lg" color="gray.500">
                                Henüz hesap bulunamadı.
                            </Text>
                        </Flex>
                    )}
                </Grid>
            </Box>
            {selectedAccountId && (
                <Box
                    mt={6}
                    p={5}
                    borderRadius="md"
                    bg="white"
                    boxShadow="lg"
                    maxWidth="400px"
                    mx="auto"
                    textAlign="center"
                >
                    <Text fontSize="xl" fontWeight="semibold" color="#333" mb={4}>
                        4 Haneli Şifre Girin
                    </Text>
                    <Input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        maxLength={4}
                        placeholder="****"
                        textAlign="center"
                        size="md"
                        focusBorderColor="#ee3124"
                        borderColor="gray.300"
                        borderWidth="2px"
                        width="100%"
                        mb={4}
                        fontSize="lg"
                        borderRadius="full"
                        p={6}
                    />
                    <Button
                        bg="#ee3124"
                        color="white"
                        isDisabled={password.length !== 4}
                        isLoading={loading}
                        onClick={handleSubmit}
                        size="md"
                        borderRadius="full"
                        _hover={{ bg: "#d82b1e" }}
                        width="100%"
                        py={6}
                        fontSize="md"
                        fontWeight="bold"
                        boxShadow="sm"
                    >
                        Kart Oluştur
                    </Button>
                    <Text mt={3} fontSize="sm" color="gray.500">
                        Şifreniz tam olarak 4 karakter olmalıdır.
                    </Text>
                </Box>
            )}


        </Box>
    );
};

export default CreateDebitCard;
