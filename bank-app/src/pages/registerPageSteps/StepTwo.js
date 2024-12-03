import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Input,
  Box,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";
import { AiOutlineCalendar } from "react-icons/ai";
import DatePicker from "react-datepicker"; // react-datepicker kullanımı
import { format, subYears } from "date-fns"; // Tarih formatlama
import "react-datepicker/dist/react-datepicker.css"; // Datepicker stilini import et

const StepTwo = ({ formData, setFormData, handleNextStep, handlePreviousStep }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);

  // E-posta değişikliğini formData'ya aktaran fonksiyon
  const handleEmailChange = (e) => {
    const email = e.target.value;
    setFormData({ ...formData, email });

    // E-posta doğrulaması
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setIsEmailValid(emailRegex.test(email));
  };

  useEffect(() => {
    // FormData güncellenmeden önce email doğrulama kontrolü
    const email = formData.email;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setIsEmailValid(emailRegex.test(email));
  }, [formData.email]);

  // Doğum tarihi değişikliğini formData'ya aktaran fonksiyon
  const handleBirthDayChange = (date) => {
    setFormData({ ...formData, birthDay: date });
    setShowCalendar(false); // Takvimi kapat
  };

  return (
    <>
      <FormControl id="email" isRequired mb="4" isInvalid={!isEmailValid}>
        <FormLabel fontWeight="semibold" color="#ee3124">
          E-mail
        </FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <AiOutlineCalendar color="#ee3124" />
          </InputLeftElement>
          <Input
            type="email"
            placeholder="E-posta"
            value={formData.email}
            onChange={handleEmailChange}
            focusBorderColor="#ee3124"
          />
        </InputGroup>
      </FormControl>

      <FormControl id="birthDay" isRequired>
        <Box position="relative">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <AiOutlineCalendar color="#ee3124" />
            </InputLeftElement>
            <Input
              type="text"
              value={formData.birthDay ? format(formData.birthDay, "dd/MM/yyyy") : ""}
              placeholder="Doğum Tarihi"
              onClick={() => setShowCalendar((prev) => !prev)} // Toggle calendar visibility
              focusBorderColor="#ee3124"
              readOnly
              cursor="pointer" // Indicate interactivity
            />
          </InputGroup>

          {/* Takvim: Sadece 18 yaşından büyükler için */}
          {showCalendar && (
            <Box
              position="absolute"
              top="50px"
              left="0"
              zIndex="10"
              bg="gray.800"
              borderRadius="md"
              boxShadow="lg"
              overflow="hidden"
            >
              <DatePicker
                selected={formData.birthDay}
                onChange={handleBirthDayChange}
                dateFormat="dd/MM/yyyy"
                maxDate={subYears(new Date(), 18)} // Maksimum seçilebilir tarih bugünden 18 yıl önce
                minDate={new Date(1900, 0, 1)} // İsteğe bağlı olarak en erken tarih
                showYearDropdown
                yearDropdownItemNumber={100}
                scrollableYearDropdown
                inline // Takvimi direkt göster
              />
            </Box>
          )}
        </Box>
      </FormControl>

      <Button
        onClick={handleNextStep}
        w="full"
        bg="#ee3124"
        color="white"
        _hover={{ bg: "#d02b20" }}
        mb="2"
        isDisabled={!isEmailValid || !formData.birthDay} // E-posta geçerli değilse, Devam Et butonunu devre dışı bırak
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

export default StepTwo;
