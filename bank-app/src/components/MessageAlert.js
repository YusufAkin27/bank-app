import React, { useEffect } from 'react';
import { Box, Text, Icon, useColorModeValue, SlideFade, CloseButton } from "@chakra-ui/react";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

const MessageAlert = ({ isSuccess, message, onClose, duration = 3000 }) => {
    // Başarı ve hata durumlarına göre renkler
    const bgColor = useColorModeValue(isSuccess ? "green.100" : "red.100", isSuccess ? "green.900" : "red.900");
    const textColor = useColorModeValue(isSuccess ? "green.800" : "red.800", isSuccess ? "green.200" : "red.200");
    const iconColor = useColorModeValue(isSuccess ? "green.500" : "red.500", isSuccess ? "green.300" : "red.300");

    // Belirli bir süre sonra otomatik olarak kapatılması için useEffect kullanımı
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer); // Bileşen kaldırıldığında timer'ı temizle
    }, [onClose, duration]);

    return (
        <SlideFade in={true} offsetY="-10px">
            <Box
                position="fixed"
                top="100px" // Mesajın sayfa üstünden 100px aşağıda konumlandırılması
                right="20px"
                zIndex={1000}
                bg={bgColor}
                color={textColor}
                p={4}
                rounded="lg"
                border="1px solid"
                borderColor={iconColor}
                display="flex"
                alignItems="center"
                shadow="xl"
                transition="transform 0.3s ease, opacity 0.3s ease"
                maxW="sm"
                w="full"
                _hover={{ transform: "scale(1.05)", shadow: "2xl" }}
                opacity="0.9"
            >
                <Icon as={isSuccess ? AiOutlineCheckCircle : AiOutlineCloseCircle} w={6} h={6} color={iconColor} mr={3} />
                <Text fontSize="md" fontWeight="medium" flex="1">{message}</Text>
                <CloseButton color={iconColor} onClick={onClose} />
            </Box>
        </SlideFade>
    );
};

export default MessageAlert;
