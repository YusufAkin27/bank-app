import React, { useState } from "react";
import {
  Text,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
} from "@chakra-ui/react";
import { AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import MessageAlert from "../../components/MessageAlert";

const StepOne = ({ formData, setFormData, handleNextStep }) => {
  const [errorMessage, setErrorMessage] = useState(""); // To hold error messages
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/");
  };

  // Handle changes to name and surname fields
  const handleNameChange = (e) => {
    setFormData({ ...formData, name: e.target.value });
  };

  const handleSurnameChange = (e) => {
    setFormData({ ...formData, surname: e.target.value });
  };

  // Form validation
  const validateForm = () => {
    if (!formData.name || !formData.surname) {
      setErrorMessage("Lütfen tüm alanları doldurun.");
      return false;
    }
    setErrorMessage(""); // Clear any previous error messages
    return true;
  };

  const handleNextButtonClick = () => {
    if (validateForm()) {
      handleNextStep(); // Proceed to next step if validation passes
    }
  };

  return (
    <>
      <Text fontSize="2xl" fontWeight="bold" textAlign="center" color="#ee3124">
        Kayıt Ol
      </Text>

      {/* Display error message if any */}
      {errorMessage && (
        <MessageAlert
          isSuccess={false}
          message={errorMessage}
          onClose={() => setErrorMessage("")}
          duration={3000}
        />
      )}

      <FormControl id="name" isRequired mb="4">
        <FormLabel fontWeight="semibold" color="#ee3124">
          İsim
        </FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <AiOutlineUser color="#ee3124" />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="İsim"
            value={formData.name}
            onChange={handleNameChange}
            focusBorderColor="#ee3124"
          />
        </InputGroup>
      </FormControl>

      <FormControl id="surname" isRequired mb="4">
        <FormLabel fontWeight="semibold" color="#ee3124">
          Soyisim
        </FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <AiOutlineUser color="#ee3124" />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Soyisim"
            value={formData.surname}
            onChange={handleSurnameChange}
            focusBorderColor="#ee3124"
          />
        </InputGroup>
      </FormControl>

      <Button
        onClick={handleNextButtonClick} // Button click triggers validation and then proceeds
        w="full"
        bg="#ee3124"
        color="white"
        _hover={{ bg: "#d02b20" }}
        isDisabled={!formData.name || !formData.surname}
      >
        Devam Et
      </Button>

      <Button
        variant="link"
        color="#ee3124"
        alignSelf="center"
        onClick={handleLoginRedirect}
      >
        Zaten bir hesabınız var mı? Giriş Yap
      </Button>
    </>
  );
};

export default StepOne;
