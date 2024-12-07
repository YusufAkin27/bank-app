import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Avatar,
  Grid,
  Stack,
  Icon,
  useBreakpointValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  AiOutlineHome,
  AiOutlinePhone,
  AiOutlineMail,
  AiOutlineDollarCircle,
  AiOutlineBook,
  AiOutlineTool,
  AiOutlineUser,
} from "react-icons/ai";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { sendUserInfo ,getProfile} from "../services/CustomerService";

const Profile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    name: "",
    surname: "",
    income: 0,
    education: "",
    jobType: "",
    profession: "",
    addressList: [],
    phoneNumbers: "",
    emails: "",
  });

  const getInitials = (firstName, lastName) => {
    return `${(firstName || "A")[0].toUpperCase()}${(lastName || "A")[0].toUpperCase()}`;
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        if (response.success) {
          setProfileData({
            name: response.data.name,
            surname: response.data.surname,
            income: response.data.income,
            education: response.data.educationLevel,
            jobType: response.data.jobType,
            profession: response.data.profession,
            addressList: response.data.addressDTO || [],
            phoneNumbers: response.data.telephone || "",
            emails: response.data.email || "",
          });
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleNavigation = (path) => navigate(path);
  const handleSendInformation = async () => {
    try {
      const response = await sendUserInfo(profileData);
      if (response.success) {
        alert("Veriler başarıyla gönderildi.");
      } else {
        alert("Veri gönderimi sırasında bir hata oluştu.");
      }
    } catch (error) {
      console.error("Error sending information:", error);
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      <Navbar />

      <Box as="section" p={8} maxW="container.lg" mx="auto">
        {/* Profil Header */}
        <Box bg="white" boxShadow="2xl" borderRadius="2xl" p={8} mb={10}>
          <Flex align="center" direction="column">
            <Avatar
              name={getInitials(profileData.name, profileData.surname)}
              size="2xl"
              bg="red.500"
              color="white"
              mb={4}
            />
            <Text fontSize="4xl" fontWeight="bold" color="gray.800" mb={2}>
              {profileData.name} {profileData.surname}
            </Text>
            <Text fontSize="lg" fontWeight="semibold" color="gray.500" mb={6}>
              {profileData.profession || "Henüz bir meslek belirtilmedi"}
            </Text>
            <Button
              onClick={() => handleNavigation("/profile-edit")}
              colorScheme="red"
              size="lg"
              fontWeight="bold"
            >
              Profili Düzenle
            </Button>
          </Flex>
        </Box>

        {/* Kullanıcı Bilgileri */}
        <Box bg="white" boxShadow="lg" borderRadius="2xl" p={8} mb={10}>
          <Text fontSize="2xl" fontWeight="bold" color="gray.800" mb={6}>
            <Icon as={AiOutlineUser} boxSize={6} color="red.500" mr={3} />
            Kullanıcı Bilgileri
          </Text>
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
            {[
              { label: "Aylık Gelir", value: `${profileData.income} ₺`, icon: AiOutlineDollarCircle },
              { label: "Eğitim Durumu", value: profileData.education, icon: AiOutlineBook },
              { label: "İş Türü", value: profileData.jobType, icon: AiOutlineTool },
              { label: "Meslek", value: profileData.profession, icon: AiOutlineUser },
            ].map((item, index) => (
              <Flex
                key={index}
                p={6}
                bg="gray.50"
                borderRadius="xl"
                align="center"
                boxShadow="md"
                _hover={{ boxShadow: "lg" }}
              >
                <Icon as={item.icon} boxSize={8} color="red.500" mr={4} />
                <Box>
                  <Text fontSize="sm" color="gray.500" mb={1}>
                    {item.label}
                  </Text>
                  <Text fontSize="lg" fontWeight="bold" color="gray.800">
                    {item.value || "Bilgi bulunmuyor"}
                  </Text>
                </Box>
              </Flex>
            ))}
          </Grid>
        </Box>

        {/* Adreslerim */}
        <Box bg="white" boxShadow="lg" borderRadius="2xl" p={8} mb={10}>
          <Text fontSize="2xl" fontWeight="bold" color="gray.800" mb={6}>
            <Icon as={AiOutlineHome} boxSize={6} color="red.500" mr={3} />
            Adreslerim
          </Text>
          {profileData.addressList.length > 0 ? (
            <Stack spacing={6}>
              {profileData.addressList.map((address, index) => (
                <Flex
                  key={index}
                  p={6}
                  bg="gray.50"
                  borderRadius="xl"
                  align="center"
                  boxShadow="md"
                  _hover={{ boxShadow: "lg" }}
                >
                  <Icon as={AiOutlineHome} boxSize={6} color="red.500" mr={4} />
                  <Text color="gray.700" fontSize="md">
                    {`${address.streetNumber}, ${address.addressTitle}, ${address.city}, ${address.country}`}
                  </Text>
                </Flex>
              ))}
            </Stack>
          ) : (
            <Text color="gray.500">Henüz adresiniz yok.</Text>
          )}
          <Button
            onClick={() => handleNavigation("/address-management")}
            colorScheme="red"
            mt={6}
          >
            Adreslerimi Yönet
          </Button>
        </Box>

        {/* İletişim Bilgileri */}
        <Box bg="white" boxShadow="lg" borderRadius="2xl" p={8}>
          <Text fontSize="2xl" fontWeight="bold" color="gray.800" mb={6}>
            <Icon as={AiOutlineMail} boxSize={6} color="red.500" mr={3} />
            İletişim Bilgilerim
          </Text>
          <Stack spacing={6}>
            <Flex align="center" p={6} bg="gray.50" borderRadius="xl" boxShadow="md">
              <Icon as={AiOutlinePhone} boxSize={6} color="red.500" mr={4} />
              <Text fontSize="md" color="gray.700">
                {profileData.phoneNumbers || "Henüz telefon numaranız yok."}
              </Text>
            </Flex>
            <Flex align="center" p={6} bg="gray.50" borderRadius="xl" boxShadow="md">
              <Icon as={AiOutlineMail} boxSize={6} color="red.500" mr={4} />
              <Text fontSize="md" color="gray.700">
                {profileData.emails || "Henüz e-posta adresiniz yok."}
              </Text>
            </Flex>
          </Stack>
          <Button
            onClick={() => handleNavigation("/contact-management")}
            colorScheme="red"
            mt={6}
          >
            İletişim Bilgilerimi Yönet
          </Button>

          <Button
            onClick={handleSendInformation}
            colorScheme="green"
            size="lg"
            borderRadius="full"
            px={12}
            boxShadow="lg"
          >
            Verilerimi Gönder
          </Button>
        </Box>
      </Box>
    </motion.div>
  );
};

export default Profile;
