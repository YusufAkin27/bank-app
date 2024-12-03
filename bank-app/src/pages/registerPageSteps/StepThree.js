import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  InputLeftAddon,
  Input,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { AiOutlineIdcard, AiOutlineLock, AiOutlinePhone } from "react-icons/ai";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const StepThree = ({
  formData,
  setFormData,
  handleNextStep,
  handlePreviousStep,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // Kimlik numarasındaki değişiklikleri formData'ya ekler
  const handleIdentityNumberChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 11) {
      setFormData({ ...formData, identityNumber: value });
    }
  };

  // Şifre değişikliklerini formData'ya ekler
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    // Şifre 6 haneli ve sadece rakam olmalı
    if (/^\d*$/.test(value) && value.length <= 6) {
      setFormData({ ...formData, password: value });
    }
  };

  // Telefon numarasındaki değişiklikleri formData'ya ekler
  const handleTelephoneChange = (e) => {
    let value = e.target.value;

    // Boşlukları ve özel karakterleri kaldır
    value = value.replace(/\D/g, "");

    // Format: (xxx) xxx xx xx
    if (value.length <= 3) {
        value = `(${value}`;
    } else if (value.length <= 6) {
        value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
    } else if (value.length <= 8) {
        value = `(${value.slice(0, 3)}) ${value.slice(3, 6)} ${value.slice(6)}`;
    } else if (value.length <= 10) {
        value = `(${value.slice(0, 3)}) ${value.slice(3, 6)} ${value.slice(6, 8)} ${value.slice(8, 10)}`;
    }

    // Eğer numara 10 karakteri geçmemişse ve son karakter parantezse, onu sil
    // Bu kontrol, kullanıcı numara silerken sonunda ( veya boşluk kalmaması için yapılır
    if (value.length === 15 && value.endsWith("(")) {
        value = value.slice(0, -1); // Son parantezi sil
    }

    setFormData({ ...formData, telephone: value });
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Devam Et butonunun aktifliğini kontrol et
  useEffect(() => {
    const isValid =
      formData.identityNumber.length === 11 &&
      formData.telephone.replace(/\D/g, "").length === 10 &&
      formData.password.length === 6; // Şifre 6 karakter uzunluğunda olmalı
    setIsFormValid(isValid);
  }, [formData.identityNumber, formData.telephone, formData.password]);

  // Telefon numarasını temizle (boşlukları, parantezleri vs. kaldır)
  const cleanPhoneNumber = (number) => {
    return `+90${number.replace(/\D/g, "")}`;
  };

  const handleNextButtonClick = () => {
    const cleanPhone = cleanPhoneNumber(formData.telephone);
    console.log("Cleaned Phone Number: ", cleanPhone);
    handleNextStep(); // Devam et butonuna tıklanınca işlem yapılacak
  };

  return (
    <>
      <FormControl id="identityNumber" isRequired mb="4">
        <FormLabel fontWeight="semibold" color="#ee3124">
          T.C Kimlik Numarası
        </FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <AiOutlineIdcard color="#ee3124" />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Kimlik Numarası"
            value={formData.identityNumber}
            onChange={handleIdentityNumberChange}
            focusBorderColor="#ee3124"
            maxLength={11}
          />
        </InputGroup>
      </FormControl>

      <FormControl id="password" isRequired mb="4">
        <FormLabel fontWeight="semibold" color="#ee3124">
          Şifre
        </FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <AiOutlineLock color="#ee3124" />
          </InputLeftElement>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Şifre"
            value={formData.password}
            onChange={handlePasswordChange}
            focusBorderColor="#ee3124"
          />
          <InputRightElement>
            <Button
              h="1.75rem"
              size="sm"
              onClick={togglePasswordVisibility}
              bg="transparent"
              _hover={{ bg: "transparent" }}
            >
              {showPassword ? (
                <ViewOffIcon color="#ee3124" boxSize={5} />
              ) : (
                <ViewIcon color="#ee3124" boxSize={5} />
              )}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="telephone" isRequired>
        <FormLabel fontWeight="semibold" color="#ee3124">
          Telefon
        </FormLabel>
        <InputGroup>
          <InputLeftAddon children="+90" pl={8} pr={2} />
          <Input
            type="tel"
            placeholder="Telefon Numarası"
            value={formData.telephone}
            onChange={handleTelephoneChange}
            maxLength={15}
            focusBorderColor="blue.400"
          />
          <InputLeftElement pointerEvents="none" children={<AiOutlinePhone />} color="#ee3124" />
        </InputGroup>
      </FormControl>

      <Button
        onClick={handleNextButtonClick} // Button click triggers validation and then proceeds
        w="full"
        bg="#ee3124"
        color="white"
        _hover={{ bg: "#d72a1d" }}
        isDisabled={!isFormValid} // Disable button if form is not valid
      >
        Devam Et
      </Button>

      <Button
        onClick={handlePreviousStep}
        w="full"
        mt="4"
        variant="outline"
        color="#ee3124"
        borderColor="#ee3124"
        _hover={{ bg: "rgba(238, 49, 36, 0.1)" }}
      >
        Geri Dön
      </Button>
    </>
  );
};

export default StepThree;
