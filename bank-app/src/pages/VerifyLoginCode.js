import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Input, HStack, Text, Spinner, VStack, Link } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { verifyLoginCode } from "../services/AuthService";

const VerifyLoginCode = () => {
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertStatus, setAlertStatus] = useState(null); // null, "success", or "error"
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleCodeChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, ""); // Sadece rakamları kabul et
    if (!value) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Bir sonraki kutuya geçiş yap
    if (index < code.length - 1 && value) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newCode = [...code];
      if (code[index]) {
        newCode[index] = "";
        setCode(newCode);
      } else if (index > 0) {
        newCode[index - 1] = "";
        setCode(newCode);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    const smsCode = code.join(""); // SMS kodunu birleştiriyoruz

    verifyLoginCode(smsCode)
      .then((response) => {
        if (response.success) {
          setAlertMessage(response.message || "Doğrulama başarılı. Hesabınız aktif edildi.");
          setAlertStatus("success");
          setTimeout(() => navigate("/home"), 2000);
        } else {
          // Backend'den gelen hata mesajını kullanıyoruz
          setAlertMessage(response.message || "Doğrulama başarısız.");
          setAlertStatus("error");
        }
      })
      .catch((error) => {
        // Backend'den gelen hata mesajını alıyoruz
        const errorMessage = error.response?.data?.message || "Giriş sırasında bir hata oluştu.";
        setAlertMessage(errorMessage);
        setAlertStatus("error");
      })
      .finally(() => {
        setLoading(false);
      });
};


  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgGradient="linear(to-br, #f7f8fc, #ebeff5)"
      px={4}
    >
      <Box
        maxW="lg"
        w="full"
        p={8}
        bg="white"
        boxShadow="xl"
        borderRadius="xl"
        textAlign="center"
      >
        {loading ? (
          <Spinner size="xl" color="#ee3124" />
        ) : (
          <>
            <Text fontSize="3xl" fontWeight="bold" mb={6} color="gray.800">
              Telefon Numarası Doğrulama
            </Text>

            {alertMessage && (
              <Text
                color={alertStatus === "success" ? "green.600" : "red.600"}
                fontWeight="semibold"
                mb={4}
              >
                {alertMessage}
              </Text>
            )}

            <HStack justify="center" spacing={4} mb={6}>
              {code.map((digit, index) => (
                <Input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleCodeChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  textAlign="center"
                  fontSize="2xl"
                  size="lg"
                  width="60px"
                  height="60px"
                  borderColor="gray.300"
                  focusBorderColor="#ee3124"
                  bg="white"
                  color="gray.800"
                  _hover={{ borderColor: "#ee3124", bg: "#ffecec" }}
                  _focus={{
                    borderColor: "#ee3124",
                    boxShadow: "0 0 0 2px rgba(238, 49, 36, 0.4)",
                  }}
                />
              ))}
            </HStack>

            <VStack spacing={4}>
              <Button
                bg="#ee3124"
                color="white"
                onClick={handleSubmit}
                size="lg"
                w="full"
                _hover={{ bg: "#cc2a1f" }}
                _active={{ bg: "#b1221b" }}
              >
                Doğrula
              </Button>

              <Text fontSize="sm" color="gray.600">
                Kodunuzu almadınız mı?{" "}
                <Link
                  color="#ee3124"
                  fontWeight="semibold"
                  cursor="pointer"
                  _hover={{ textDecoration: "underline" }}
                >
                  Tekrar Gönder
                </Link>
              </Text>
            </VStack>
          </>
        )}
      </Box>
    </Box>
  );
};

export default VerifyLoginCode;
