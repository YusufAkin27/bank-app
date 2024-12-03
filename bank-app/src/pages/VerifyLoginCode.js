import React, { useState, useEffect } from "react";
import { Box, Button, Input, HStack, Text, useToast, Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { verifyLoginCode } from "../services/AuthService";
import MessageAlert from "../components/MessageAlert";

const VerifyLoginCode = () => {
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertStatus, setAlertStatus] = useState(null); // null, "success", or "error"
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [focusedIndex, setFocusedIndex] = useState(0);

  const navigate = useNavigate();

  const handleCodeChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, ""); // Allow only digits
    if (!value) return;

    const newCode = [...code];
    newCode[index] = value;

    setCode(newCode);
    if (index < 5) {
      setFocusedIndex(index + 1);
      document.getElementById(`code-input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newCode = [...code];
      if (newCode[index]) {
        newCode[index] = ""; // Clear current input
        setCode(newCode);
      } else if (index > 0) {
        document.getElementById(`code-input-${index - 1}`).focus();
        setFocusedIndex(index - 1);
      }
    } else if (e.key === "ArrowRight" && index < 5) {
      document.getElementById(`code-input-${index + 1}`).focus();
      setFocusedIndex(index + 1);
    } else if (e.key === "ArrowLeft" && index > 0) {
      document.getElementById(`code-input-${index - 1}`).focus();
      setFocusedIndex(index - 1);
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
      maxW={{ base: "full", md: "lg" }}
      w="full"
      p={8}
      boxShadow="xl"
      borderRadius="lg"
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bg="gray.50"
    >
      {alertStatus && (
        <MessageAlert
          isSuccess={alertStatus === "success"}
          message={alertMessage}
          onClose={() => setAlertStatus(null)}
        />
      )}

      {loading ? (
        <Spinner size="xl" color="#ee3124" />
      ) : (
        <Box textAlign="center" w="full" maxW="400px">
          <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" mb={4} color="gray.700">
            Telefon Numarası Doğrulama
          </Text>

          <HStack justify="center" spacing={4} mb={6}>
            {code.map((digit, index) => (
              <Input
                key={index}
                id={`code-input-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleCodeChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                textAlign="center"
                fontSize="3xl"
                size="lg"
                width={{ base: "50px", md: "60px" }}
                height="60px"
                borderColor={focusedIndex === index ? "#ee3124" : "gray.300"}
                focusBorderColor="#ee3124"
                bg="white"
                color="gray.800"
                onFocus={() => setFocusedIndex(index)}
                transition="all 0.3s ease"
                _hover={{ borderColor: "#ee3124", bg: "#ffe8e8" }}
              />
            ))}
          </HStack>

          <Button
            bg="#ee3124"
            color="white"
            _hover={{ bg: "#c82a1e" }}
            size="lg"
            w="full"
            mt={4}
            onClick={handleSubmit}
          >
            Doğrula
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default VerifyLoginCode;
