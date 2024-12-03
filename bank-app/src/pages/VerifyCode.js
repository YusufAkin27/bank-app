import React, { useState, useEffect } from "react";
import { Box, Button, Input, HStack, Text, Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { activateAccount } from "../services/AuthService";

const ActivatePage = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [focusedIndex, setFocusedIndex] = useState(0);

  const navigate = useNavigate();

  const handleCodeChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, "");
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
        newCode[index] = "";
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
    const smsCode = code.join("");

    activateAccount(smsCode)
      .then((response) => {
        const { success, message } = response;

        if (success) {
          setMessage(message);
          setError("");

          setTimeout(() => {
            navigate("/createAddress");
          }, 2000);
        } else {
          setMessage("");
          setError(message);
        }
      })
      .catch((errorMessage) => {
        setMessage("");
        setError(errorMessage);
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
      bg="white"
    >
      {loading ? (
        <Spinner size="xl" color="#ee3124" />
      ) : (
        <Box textAlign="center" w="full" maxW="400px">
          <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" mb={4} color="gray.700">
            Telefon Numarası Doğrulama
          </Text>

          {message && <Text color="#ee3124" fontWeight="bold" mb={4}>{message}</Text>}
          {error && <Text color="#ee3124" fontWeight="bold" mb={4}>{error}</Text>}

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
                _hover={{ borderColor: "#ee3124", bg: "#ffecec" }}
              />
            ))}
          </HStack>

          <Button
            bg="#ee3124"
            color="white"
            onClick={handleSubmit}
            size="lg"
            w="full"
            mt={4}
            _hover={{ bg: "#cc2a1f" }}
            _active={{ bg: "#b1221b" }}
          >
            Doğrula
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ActivatePage;
  