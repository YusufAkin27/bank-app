import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Heading,
  Alert,
  AlertIcon,
  Text,
  IconButton,
} from '@chakra-ui/react';
import { EmailIcon, PhoneIcon, EditIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { updateContact, getProfile } from "../services/CustomerService";
import Navbar from '../components/Navbar';

const ContactManagement = () => {
  const [contactInfo, setContactInfo] = useState({ email: '', phone: '' });
  const [updatedInfo, setUpdatedInfo] = useState(contactInfo);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState(null);

  // Backend'den iletişim bilgilerini al
  useEffect(() => {
    const fetchProfile = async () => {
      const response = await getProfile();
      if (response.success) {
        setContactInfo({
          email: response.data.email || '',
          phone: response.data.telephone || '',
        });
        setUpdatedInfo({
          email: response.data.email || '',
          phone: response.data.telephone || '',
        });
      } else {
        setMessage({ type: 'error', text: response.message || 'Bilgiler alınamadı.' });
      }
    };
    fetchProfile();
  }, []);

  // Form değişikliklerini takip et
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Güncelleme talebini gönder
  const handleSubmit = async () => {
    setMessage(null);
    const response = await updateContact(updatedInfo);

    if (response.success) {
      setMessage({ type: 'success', text: 'İletişim bilgileri başarıyla güncellendi.' });
      setContactInfo(updatedInfo);
      setIsEditing(false); // Düzenleme modundan çık
    } else {
      setMessage({ type: 'error', text: response.message || 'Güncelleme sırasında bir hata oluştu.' });
    }
  };

  return (
    <>
      <Navbar />

      <Box
        maxW="600px"
        mx="auto"
        mt="10"
        p="6"
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="xl"
        bg="white"
      >
        <Heading as="h2" size="lg" textAlign="center" mb="6" color="teal.500">
          İletişim Bilgileri
        </Heading>

        {message && (
          <Alert status={message.type} mb="4" borderRadius="md">
            <AlertIcon />
            {message.text}
          </Alert>
        )}

        {/* E-posta Alanı */}
        <FormControl mb="4">
          <FormLabel fontWeight="semibold" color="teal.500">
            E-mail
          </FormLabel>
          {!isEditing ? (
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Text>{contactInfo.email}</Text>
              <IconButton
                icon={<EditIcon />}
                size="sm"
                onClick={() => setIsEditing(true)}
                aria-label="Edit Email"
                colorScheme="teal"
              />
            </Box>
          ) : (
            <Box display="flex" alignItems="center">
              <EmailIcon color="gray.500" mr="2" />
              <Input
                type="email"
                name="email"
                value={updatedInfo.email}
                onChange={handleInputChange}
                focusBorderColor="teal.500"
                borderRadius="md"
                size="md"
              />
            </Box>
          )}
        </FormControl>

        {/* Telefon Numarası Alanı */}
        <FormControl mb="4">
          <FormLabel fontWeight="semibold" color="teal.500">
            Telefon Numarası
          </FormLabel>
          {!isEditing ? (
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Text>{contactInfo.phone}</Text>
              <IconButton
                icon={<EditIcon />}
                size="sm"
                onClick={() => setIsEditing(true)}
                aria-label="Edit Phone"
                colorScheme="teal"
              />
            </Box>
          ) : (
            <Box display="flex" alignItems="center">
              <PhoneIcon color="gray.500" mr="2" />
              <Input
                type="text"
                name="phone"
                value={updatedInfo.phone}
                onChange={handleInputChange}
                focusBorderColor="teal.500"
                borderRadius="md"
                size="md"
              />
            </Box>
          )}
        </FormControl>

        {/* Güncelle ve İptal Butonları */}
        {isEditing && (
          <Box display="flex" justifyContent="space-between" mt="4">
            <Button
              leftIcon={<CheckIcon />}
              colorScheme="teal"
              onClick={handleSubmit}
              isFullWidth
              borderRadius="md"
            >
              Güncelle
            </Button>
            <Button
              leftIcon={<CloseIcon />}
              colorScheme="red"
              onClick={() => {
                setUpdatedInfo(contactInfo);
                setIsEditing(false);
              }}
              ml="4"
              isFullWidth
              borderRadius="md"
            >
              İptal
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
};

export default ContactManagement;
