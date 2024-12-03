import React, { useState } from "react";
import { Box, Button, useColorModeValue, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import StepOne from "./registerPageSteps/StepOne";
import StepTwo from "./registerPageSteps/StepTwo";
import StepThree from "./registerPageSteps/StepThree";
import StepFour from "./registerPageSteps/StepFour";
import MessageAlert from "../components/MessageAlert";
import { register } from "../services/AuthService";

const RegisterPage = () => {
  const bgColor = useColorModeValue("gray.100", "gray.900");
  const boxBgColor = useColorModeValue("white", "gray.800");

  const [step, setStep] = useState(1); // Current step to manage the navigation
  const [alertMessage, setAlertMessage] = useState("");
  const [alertStatus, setAlertStatus] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state

  const navigate = useNavigate();

  // Form data state to store data across steps
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    identityNumber: "",
    email: "",
    password: "",
    income: "",
    birthDay: null,
    telephone: "",
    educationLevel: "",
    jobType: "",
    profession: "",
  });

  // Move to the next step
  const handleNextStep = () => {
    if (step < 4) {
      setStep((prev) => prev + 1);
    }
  };

  // Go back to the previous step
  const handlePreviousStep = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  // Handle the registration process
  const handleRegister = async () => {
    const cleanPhoneNumber = (number) => {
      return `+90${number.replace(/\D/g, "")}`;
    };

    setLoading(true); // Set loading state to true before making the request
    try {
      const response = await register({
        ...formData,
        telephone: cleanPhoneNumber(formData.telephone),
      });

      if (response.data.success) {
        // Use the success message from the backend
        setAlertMessage(response.data.message || "Kayıt başarılı!"); // If the backend doesn't provide a message, use a default one
        setAlertStatus("success");

        navigate("/verifyCode");
      } else {
        // Use the error message from the backend
        setAlertMessage(response.data.message || "Bir hata oluştu.");
        setAlertStatus("error");
      }
    } catch (error) {
      // If an error occurs, use the error message from the backend response if available
      setAlertMessage(error.response?.data?.message || "Hata oluştu. Lütfen tekrar deneyin.");
      setAlertStatus("error");
    } finally {
      setLoading(false); // Reset loading state once the request is completed
    }
  };


  // Render the component based on the current step
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <StepOne
            formData={formData}
            setFormData={setFormData}
            handleNextStep={handleNextStep}
          />
        );
      case 2:
        return (
          <StepTwo
            formData={formData}
            setFormData={setFormData}
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
          />
        );
      case 3:
        return (
          <StepThree
            formData={formData}
            setFormData={setFormData}
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
          />
        );
      case 4:
        return (
          <StepFour
            formData={formData}
            setFormData={setFormData}
            handleRegister={handleRegister}
            handlePreviousStep={handlePreviousStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box bg={bgColor} minH="100vh" py={10}>
      <Box bg={boxBgColor} p={6} mx="auto" maxW="md" rounded="lg" shadow="lg">
        <Stack spacing={4}>
          {renderStep()}
        </Stack>
      </Box>

      {alertStatus && (
        <MessageAlert
          isSuccess={alertStatus === "success"}
          message={alertMessage}
          onClose={() => setAlertStatus(null)}
        />
      )}
    </Box>
  );
};

export default RegisterPage;
