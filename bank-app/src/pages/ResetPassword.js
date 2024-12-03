import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { AiOutlineLock } from "react-icons/ai";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import MessageAlert from "../components/MessageAlert"; // Import the MessageAlert component
import axios from 'axios';
import { useNavigate } from "react-router-dom"; // For navigation

const MotionBox = motion(Box);

const ResetPasswordPage = () => {
  const bgColor = useColorModeValue("gray.100", "gray.900");
  const boxBgColor = useColorModeValue("white", "gray.800");
  const iconColor = useColorModeValue("gray.500", "gray.200");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState(null); // Alert state
  const [alertType, setAlertType] = useState("success"); // Alert type (success or error)
  const [alertMessage, setAlertMessage] = useState(""); // Message content
  const [isTokenValid, setIsTokenValid] = useState(true); // Token validity check

  const API_URL = 'http://localhost:8080/bank';
  const navigate = useNavigate(); // Use navigate for redirection

  // Token doğrulama ve geçersiz kılma fonksiyonu
  const verifyAndInvalidateToken = async (token) => {
    try {
      // Backend'e istek gönder ve yanıtı işle
      const response = await axios.get(`${API_URL}/authentication/reset-password?token=${token}`);

      if (response.data.success) {
        setAlertMessage(response.data.message);
        setAlertType("success");
        setIsTokenValid(true); // Token geçerli
      } else {
        setAlertMessage(response.data.message);
        setAlertType("error");
        setIsTokenValid(false); // Token geçersiz
        navigate("/");
      }
    } catch (error) {
      setIsTokenValid(false); // Token geçersiz veya hata
      setAlertMessage("Token geçerli değil veya kullanım süresi dolmuş.");
      setAlertType("error");
      setAlert(true);
      setTimeout(() => {
        navigate("/"); // Hatalı durumda yönlendirme
      }, 2000);
    }
  };

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('token'); // URL'den token al
    if (token) {
      verifyAndInvalidateToken(token); // Token doğrulama ve geçersiz kılma isteği
    } else {
      setIsTokenValid(false); // Token yoksa hata ver
      setAlertMessage("Geçersiz veya süresi dolmuş token.");
      setAlertType("error");
      setAlert(true);
      navigate("/");
    }
  }, []);

  const handleResetPassword = async () => {
    const token = new URLSearchParams(window.location.search).get("token");
    if (!password || !confirmPassword) {
      setAlertMessage("Lütfen tüm alanları doldurun.");
      setAlertType("error");
      setAlert(true);
    } else if (password !== confirmPassword) {
      setAlertMessage("Şifreler uyuşmuyor! Lütfen şifrelerinizi kontrol edin.");
      setAlertType("error");
      setAlert(true);
    } else if (!isTokenValid) {
      setAlertMessage("Geçersiz veya süresi dolmuş token! Lütfen tekrar giriş yapın.");
      setAlertType("error");
      setAlert(true);
      navigate("/");
    } else {
      try {
        const resetPasswordRequest = {
          token, // Backend'e gönderilen token
          newPassword: password, // Backend'e gönderilen yeni şifre
        };

        const response = await axios.put(`${API_URL}/authentication/reset-password`, resetPasswordRequest);

        if (response.data.success) {
          setAlertMessage("Şifreniz başarıyla sıfırlandı.");
          setAlertType("success");
          setAlert(true);
          navigate("/");

        } else {
          setAlertMessage(response.data.message);
          setAlertType("error");
          setAlert(true);
        }
      } catch (error) {
        setAlertMessage("Şifre sıfırlama sırasında bir hata oluştu.");
        setAlertType("error");
        setAlert(true);
      }
    }
  };

  return (
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
          <Text fontSize="2xl" fontWeight="bold" textAlign="center" color="blue.500">
            Şifrenizi Sıfırlayın
          </Text>
       

          {/* Yeni Şifre Alanı */}
          <FormControl id="password" isRequired>
            <FormLabel color="blue.400">Yeni Şifre</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <AiOutlineLock color={iconColor} />
              </InputLeftElement>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Yeni Şifre"
                value={password}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value) && value.length <= 6) {
                    setPassword(value); // Yalnızca rakamlar ve 6 karakter kontrolü
                  }
                }}
                focusBorderColor="blue.400"
              />
              <InputRightElement>
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  bg="transparent"
                  _hover={{ bg: "transparent" }}
                >
                  {showPassword ? (
                    <ViewOffIcon color={iconColor} boxSize={5} />
                  ) : (
                    <ViewIcon color={iconColor} boxSize={5} />
                  )}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          {/* Şifreyi Onayla Alanı */}
          <FormControl id="confirm-password" isRequired>
            <FormLabel color="blue.400">Yeni Şifreyi Onayla</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <AiOutlineLock color={iconColor} />
              </InputLeftElement>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Şifreyi Onayla"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                focusBorderColor="blue.400"
              />
            </InputGroup>
          </FormControl>

          {/* Reset Password Button */}
          <Button
            colorScheme="blue"
            onClick={handleResetPassword}
            _hover={{ transform: "scale(1.05)" }}
            w="full"
            size="lg"
            as={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Şifreyi Sıfırla
          </Button>

          {/* Alert Component */}
          {alert && (
            <MessageAlert
              isSuccess={alertType === "success"}
              message={alertMessage}
              onClose={() => setAlert(false)} // Close the alert
            />
          )}
        </Stack>
      </Box>
    </MotionBox>
  );
};

export default ResetPasswordPage;
