import React, { useState } from "react";
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
  Checkbox,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { AiOutlineIdcard, AiOutlineLock } from "react-icons/ai";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import MessageAlert from "../components/MessageAlert"; // Hata ve başarı mesajı bileşeni
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { login } from "../services/AuthService"; // authService import

const MotionBox = motion(Box);

const LoginPage = () => {
  const bgColor = "#f8f8f8"; // Arka plan rengi
  const boxBgColor = "white"; // Kutunun arka plan rengi
  const primaryColor = "#ee3124"; // Ana renk (düğme ve odak rengi)
  const iconColor = "#a0a0a0"; // İkonların rengi

  const [identityNumber, setIdentityNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertStatus, setAlertStatus] = useState(null); // null, "success", veya "error"
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await login(identityNumber, password);

      if (response.success) {
        setAlertMessage("Giriş başarılı.");
        setAlertStatus("success");


        const userRole = Cookies.get("userRole");

        setTimeout(() => {
          if (userRole === "ROLE_ADMIN") {
            navigate("/admin-main");
          } else {
            navigate("/home");
          }
        }, 3000);

      } else if (response.message === "Lütfen giriş işlemi için doğrulama kodunu giriniz.") {
        navigate("/verifyLoginCode");
      }
      else {
        setAlertMessage(response.message || "Giriş sırasında bir hata oluştu.");
        setAlertStatus("error");
      }
    } catch (error) {
      setAlertMessage(error.response?.data?.message || "Giriş sırasında bir hata oluştu.");
      setAlertStatus("error");
    }
  };

  const handleSignUpRedirect = () => navigate("/register");
  const handleForgotPasswordRedirect = () => navigate("/forgot-password");

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
              Giriş Yap
            </Text>

            <FormControl id="identityNumber" isRequired>
              <FormLabel color="#555">Kimlik Numarası</FormLabel>
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
                      setIdentityNumber(value);
                    }
                  }}
                  focusBorderColor={primaryColor}
                />
              </InputGroup>
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel color="#555">Şifre</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <AiOutlineLock color={iconColor} />
                </InputLeftElement>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Şifre"
                  value={password}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value) && value.length <= 6) {
                      setPassword(value);
                    }
                  }}
                  focusBorderColor={primaryColor}
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

            <Stack spacing={5}>
              <Checkbox color="#555">Beni hatırla</Checkbox>

              <Button
                bg={primaryColor}
                color="white"
                size="lg"
                onClick={handleLogin}
                _hover={{ bg: "#d6291f" }}
                isFullWidth
              >
                Giriş Yap
              </Button>

              <Button
                variant="link"
                color={primaryColor}
                size="sm"
                onClick={handleForgotPasswordRedirect}
                isFullWidth
              >
                Şifremi unuttum
              </Button>

              <Button
                variant="link"
                color={primaryColor}
                size="sm"
                onClick={handleSignUpRedirect}
                isFullWidth
              >
                Hesap oluştur
              </Button>
            </Stack>
          </Stack>
        </Box>
      </MotionBox>
    </>
  );
};

export default LoginPage;
