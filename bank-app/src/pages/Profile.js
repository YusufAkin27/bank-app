import React from "react";
import { Box, Flex, Text, Button, Menu, MenuButton, MenuList, MenuItem, Avatar, useBreakpointValue, Spacer } from "@chakra-ui/react";
import { AiOutlineIdcard, AiOutlineHome, AiOutlinePhone, AiOutlineMail, AiOutlineLogout, AiOutlineDollar, AiOutlineRead, AiOutlineFundProjectionScreen, AiOutlineTool } from "react-icons/ai";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Profile = ({ name, surname, income, education, jobType, profession, addressList, phoneNumbers, emails }) => {
  const navigate = useNavigate();

  // Navbar ayarları
  const navbarBg = "#E53E3E"; // Navbar arka plan rengi
  const iconColor = "#ee3124"; // İkon renkleri
  const buttonBorderColor = "#ee3124"; // Butonların kenar rengi
  const buttonTextColor = "#ee3124"; // Buton metin rengi
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Profil için baş harfler
  const getInitials = (firstName, lastName) => {
    const first = firstName || "A"; 
    const last = lastName || "A"; 
    
    const initials = first.charAt(0).toUpperCase() + last.charAt(0).toUpperCase();
    return initials;
  };
  
  const initials = getInitials(name, surname);

  // Sayfa navigasyonu
  const handleLogoClick = () => {
    navigate("/home");
  };

  const handleProfileManagement = () => {
    navigate("/profile-edit");
  };

  const handleAddressManagement = () => {
    navigate("/address-management");
  };

  const handlePhoneManagement = () => {
    navigate("/phone-management");
  };

  const handleEmailManagement = () => {
    navigate("/email-management");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box bg={navbarBg} boxShadow="md" w="100%" p={4} position="sticky" top={0} zIndex="100">
        <Flex align="center" justify="space-between" maxW="container.xl" mx="auto">
          {/* Banka ismi */}
          {!isMobile && (
            <Flex align="center" ml={4}>
              <Box onClick={handleLogoClick} cursor="pointer">
                <Text
                  fontSize="3xl"
                  fontWeight="extrabold"
                  color="white"
                  fontFamily="'Poppins', sans-serif"
                  letterSpacing="0.1em"
                  textTransform="uppercase"
                  lineHeight="1.1"
                >
                  Aureus Bank
                </Text>
              </Box>
            </Flex>
          )}
          <Spacer />
          <Flex align="center">
            <Menu>
              <MenuButton
                as={Avatar}
                size="md"
                name={`${name} ${surname}`}
                src=""
                colorScheme="teal"
                backgroundColor="teal.500"
                _hover={{
                  cursor: "pointer",
                  transform: "scale(1.1)",
                  transition: "transform 0.3s ease",
                }}
              >
                {initials}
              </MenuButton>
              <MenuList
                bg="white"
                boxShadow="lg"
                borderRadius="md"
                width="280px"
                minWidth="280px"
                border="1px solid #ddd"
                py={3}
              >
                <MenuItem icon={<AiOutlineIdcard size="22px" color={iconColor} />}>Profilim</MenuItem>
                <MenuItem icon={<AiOutlineLogout size="22px" color={iconColor} />}>Çıkış Yap</MenuItem>
              </MenuList>
            </Menu>
            {!isMobile && (
              <Text ml={2} fontSize="sm" color="white" fontWeight="bold">
                {`${name} ${surname}`}
              </Text>
            )}
          </Flex>
        </Flex>
      </Box>

      {/* Kişisel Bilgiler */}
      <Box p={6} maxW="container.xl" mx="auto">
        <Text fontSize="3xl" fontWeight="bold" mb={6}>
          Kişisel Bilgilerim
        </Text>

        <Box mb={4}>
          <Text fontSize="lg" fontWeight="semibold" display="inline-block" mr={2}>
            Aylık Gelir:
          </Text>
          <Text fontSize="lg" display="inline-block">{income}</Text>
        </Box>
        <Box mb={4}>
          <Text fontSize="lg" fontWeight="semibold" display="inline-block" mr={2}>
            Eğitim Durumu:
          </Text>
          <Text fontSize="lg" display="inline-block">{education}</Text>
        </Box>
        <Box mb={4}>
          <Text fontSize="lg" fontWeight="semibold" display="inline-block" mr={2}>
            İş Türü:
          </Text>
          <Text fontSize="lg" display="inline-block">{jobType}</Text>
        </Box>
        <Box mb={4}>
          <Text fontSize="lg" fontWeight="semibold" display="inline-block" mr={2}>
            Meslek:
          </Text>
          <Text fontSize="lg" display="inline-block">{profession}</Text>
        </Box>
        
        <Button
          onClick={handleProfileManagement}
          colorScheme="white"
          border={`2px solid ${buttonBorderColor}`}
          color={buttonTextColor}
          size="md"
          mt={4}
          _hover={{
            backgroundColor: buttonBorderColor,
            color: "white",
          }}
        >
          Kişisel Bilgilerimi Yönet
        </Button>
      </Box>

      {/* Adreslerim */}
      <Box p={6} maxW="container.xl" mx="auto" borderTop="1px solid #ddd">
        <Text fontSize="3xl" fontWeight="bold" mb={6}>
          Adreslerim
        </Text>

        {addressList && addressList.length > 0 ? (
          <Box mb={4}>
            {addressList.map((address, index) => (
              <Box key={index} mb={2}>
                <Flex align="center">
                  <AiOutlineHome size="22px" color={iconColor} />
                  <Text ml={2}>{address}</Text>
                </Flex>
              </Box>
            ))}
          </Box>
        ) : (
          <Text>Henüz adresiniz yok.</Text>
        )}

        <Button
          onClick={handleAddressManagement}
          colorScheme="white"
          border={`2px solid ${buttonBorderColor}`}
          color={buttonTextColor}
          size="md"
          mt={4}
          _hover={{
            backgroundColor: buttonBorderColor,
            color: "white",
          }}
        >
          Adreslerimi Yönet
        </Button>
      </Box>

      {/* Telefon Numaram */}
      <Box p={6} maxW="container.xl" mx="auto" borderTop="1px solid #ddd">
        <Text fontSize="3xl" fontWeight="bold" mb={6}>
          Telefon Numaram
        </Text>

        {phoneNumbers && phoneNumbers.length > 0 ? (
          <Box mb={4}>
            {phoneNumbers.map((phone, index) => (
              <Box key={index} mb={2}>
                <Flex align="center">
                  <AiOutlinePhone size="22px" color={iconColor} />
                  <Text ml={2}>{phone}</Text>
                </Flex>
              </Box>
            ))}
          </Box>
        ) : (
          <Text>Henüz telefon numaranız yok.</Text>
        )}

        <Button
          onClick={handlePhoneManagement}
          colorScheme="white"
          border={`2px solid ${buttonBorderColor}`}
          color={buttonTextColor}
          size="md"
          mt={4}
          _hover={{
            backgroundColor: buttonBorderColor,
            color: "white",
          }}
        >
          Telefon Numaramı Yönet
        </Button>
      </Box>

      {/* E-posta */}
      <Box p={6} maxW="container.xl" mx="auto" borderTop="1px solid #ddd">
        <Text fontSize="3xl" fontWeight="bold" mb={6}>
          E-posta
        </Text>

        {emails && emails.length > 0 ? (
          <Box mb={4}>
            {emails.map((email, index) => (
              <Box key={index} mb={2}>
                <Flex align="center">
                  <AiOutlineMail size="22px" color={iconColor} />
                  <Text ml={2}>{email}</Text>
                </Flex>
              </Box>
            ))}
          </Box>
        ) : (
          <Text>Henüz e-posta adresiniz yok.</Text>
        )}

        <Button
          onClick={handleEmailManagement}
          colorScheme="white"
          border={`2px solid ${buttonBorderColor}`}
          color={buttonTextColor}
          size="md"
          mt={4}
          _hover={{
            backgroundColor: buttonBorderColor,
            color: "white",
          }}
        >
          E-posta Adresimi Yönet
        </Button>
      </Box>
    </motion.div>
  );
};

export default Profile;
