import React, { useState } from "react";
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
  useColorModeValue,
} from "@chakra-ui/react";
import { AiOutlineIdcard } from "react-icons/ai";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // For navigation
import MessageAlert from "../components/MessageAlert";
import axios from "axios"; // For making API requests

const MotionBox = motion(Box);

const ForgotPassword = () => {
  const bgColor = useColorModeValue("gray.100", "gray.900");
  const boxBgColor = useColorModeValue("white", "gray.800");
  const iconColor = useColorModeValue("gray.500", "gray.200");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertStatus, setAlertStatus] = useState(null); // null, "success", or "error"
  const [identityNumber, setIdentityNumber] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    if (!identityNumber) {
      setAlertMessage("Lütfen Kimlik Numaranızı Giriniz.");
      setAlertStatus("error");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/bank/authentication/reset-password", // Backend URL
        { identity: identityNumber.trim() } // Kullanıcıdan alınan kimlik numarasını gönderiyoruz
      );

      // Backend'den gelen cevaba göre işlem yapıyoruz
      if (response.data.success) {
        setAlertMessage(
          "E-posta adresinize şifre sıfırlama bağlantısı gönderildi."
        );
        setAlertStatus("success");
      } else {
        setAlertMessage(response.data.message || "Bir hata oluştu.");
        setAlertStatus("error");
      }
    } catch (error) {
      console.error("Error while sending identity number:", error);
      setAlertMessage(
        "Kimlik numarası gönderilirken bir hata oluştu. Lütfen tekrar deneyin."
      );
      setAlertStatus("error");
    }
  };

  // Go back to login page
  const handleGoBack = () => {
    navigate("/"); // Redirect to login page
  };

  return (
    <>
      {/* Show success or error alert */}
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
          borderColor={useColorModeValue("gray.200", "gray.700")}
        >
          <Stack spacing={6}>
            <Text fontSize="3xl" fontWeight="bold" textAlign="center">
              Şifremi Unuttum
            </Text>

            <FormControl id="identityNumber" isRequired>
              <FormLabel>Kimlik Numarası</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <AiOutlineIdcard color={iconColor} />
                </InputLeftElement>
                <Input
                  type="text"
                  placeholder="Kimlik Numarası"
                  value={identityNumber}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value) && value.length <= 11) {
                      setIdentityNumber(value); // Yalnızca rakamlar ve 11 karakter kontrolü
                    }
                  }}
                  focusBorderColor="#ee3124"
                />
              </InputGroup>
            </FormControl>

            <Button
              bg="#ee3124"
              color="white"
              _hover={{ bg: "#c82a1e", transform: "scale(1.05)" }}
              onClick={handleForgotPassword}
              w="full"
              size="lg"
              as={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Doğrulama Kodu Gönder
            </Button>

            <Text fontSize="sm" color="gray.500" textAlign="center">
              Kimlik numaranızı girerek hesabınızı doğrulamak için gerekli
              adımları alabilirsiniz.
            </Text>

            {/* Go Back Button */}
            <Button
              variant="link"
              color="#ee3124"
              onClick={handleGoBack}
              w="full"
              mt={4}
              _hover={{ textDecoration: "underline" }}
            >
              Geri Dön
            </Button>
          </Stack>
        </Box>
      </MotionBox>
    </>
  );
};

export default ForgotPassword;
