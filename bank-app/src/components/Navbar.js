import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Avatar,
  useBreakpointValue,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  AiOutlineIdcard,
  AiOutlineBell,
  AiOutlineMessage,
  AiOutlineLogout,
  AiOutlineTool,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../services/CustomerService";

const Navbar = () => {
  // State declarations
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const navigate = useNavigate(); // Navigate hook
  const profilePicUrl = ""; // Profile picture URL (if needed)

  // Fetch profile data when the component is loaded
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const result = await getProfile();

        // Check if profile data is available and valid
        if (!result.data.name || !result.data.surname) { // Eğer name veya surname boşsa
          console.error(result.message || "Incomplete profile data.");
          navigate("/"); // Giriş sayfasına yönlendirme
          return;
        }

        // Eğer name ve surname varsa state'i güncelle
        setName(result.data.name);
        setSurname(result.data.surname);
      } catch (error) {
        console.error("An error occurred while fetching the profile:", error);
        navigate("/"); // Hata durumunda yönlendirme
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleSettingClick = () => navigate("/setting");

  // Function to calculate initials
  const getInitials = (firstName, lastName) => {
    if (!firstName || !lastName) {
      navigate("/"); // If first or last name is missing, redirect to login page
      return "";
    }

    return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
  };

  // Get initials if name and surname are available
  const initials = name && surname ? getInitials(name, surname) : "";


  // Responsive için ayar
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Yönlendirme işlemleri
  const handleLogoClick = () => navigate("/home");
  const handleProfileClick = () => navigate("/profile");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        bg="#E53E3E"
        boxShadow="md"
        w="100%"
        p={4}
        position="sticky"
        top={0}
        zIndex="100"
      >
        <Flex align="center" justify="space-between" maxW="container.xl" mx="auto">
          {/* Banka adı */}
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
          {/* Profil bölümü */}
          <Flex align="center">
            <Menu>
              <MenuButton
                as={Avatar}
                size="md"
                name={`${name} ${surname}`}
                src={profilePicUrl}
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
                minWidth="280px"
                border="1px solid #ddd"
                py={3}
              >
                <MenuItem
                  icon={<AiOutlineIdcard size="22px" />}
                  onClick={handleProfileClick}
                  _hover={{
                    bg: "gray.100",
                    color: "#E53E3E",
                    transform: "scale(1.05)",
                    transition: "all 0.3s ease",
                  }}
                >
                  Profilim
                </MenuItem>
                <MenuItem
                  icon={<AiOutlineBell size="22px" />}
                  _hover={{
                    bg: "gray.100",
                    color: "#E53E3E",
                    transform: "scale(1.05)",
                    transition: "all 0.3s ease",
                  }}
                >
                  Bildirimler
                </MenuItem>
                <MenuItem
                  icon={<AiOutlineMessage size="22px" />}
                  _hover={{
                    bg: "gray.100",
                    color: "#E53E3E",
                    transform: "scale(1.05)",
                    transition: "all 0.3s ease",
                  }}
                >
                  Mesajlar
                </MenuItem>
                <MenuItem
                  onClick={handleSettingClick}

                  icon={<AiOutlineTool size="22px" />}
                  _hover={{
                    bg: "gray.100",
                    color: "#E53E3E",
                    transform: "scale(1.05)",
                    transition: "all 0.3s ease",
                  }}
                >
                  Ayarlar
                </MenuItem>
                <MenuItem
                  icon={<AiOutlineLogout size="22px" />}
                  _hover={{
                    bg: "gray.100",
                    color: "#E53E3E",
                    transform: "scale(1.05)",
                    transition: "all 0.3s ease",
                  }}
                >
                  Çıkış Yap
                </MenuItem>
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
    </motion.div>
  );
};

export default Navbar;