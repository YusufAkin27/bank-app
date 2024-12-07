import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar"; // Navbar bileşeni
import { editProfile, getProfile } from "../services/CustomerService"; // Servis çağrıları
import { useNavigate } from "react-router-dom";

const ProfileEdit = () => {
  const [profileData, setProfileData] = useState({
    income: "",
    educationLevel: "",
    jobType: "",
    profession: "",
  });

  const toast = useToast();
  const navigate = useNavigate();

  // Profil verilerini alma
  useEffect(() => {
    const fetchProfile = async () => {
      const response = await getProfile();
      if (response.success) {
        setProfileData({
          income: response.data.income || "",
          educationLevel: response.data.educationLevel || "",
          jobType: response.data.jobType || "",
          profession: response.data.profession || "",
        });
      } else {
        toast({
          title: "Profil Bilgileri Alınamadı",
          description: response.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchProfile();
  }, [toast]);

  // Form gönderme işlemi
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await editProfile(profileData);
    if (response.success) {
      toast({
        title: "Profil Güncellendi",
        description: "Profil bilgileri başarıyla güncellendi.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/profile"); // Başarıyla güncellendiğinde profile sayfasına yönlendirme
    } else {
      toast({
        title: "Güncelleme Başarısız",
        description: response.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Form değişikliklerini izleme
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

    // Navbar ayarları
    const navbarBg = "#E53E3E"; // Navbar arka plan rengi
    const iconColor = "#ee3124"; // İkon renkleri

    // Eğitim Durumu Seçenekleri
    // Eğitim Durumu Seçenekleri (Büyük Harflerle)
    const educationOptions = [
        "EĞİTİMSİZ", "İLKOKUL", "ORTAOKUL", "LİSE", "YÜKSEKOKUL", "ÜNİVERSİTE", "LİSANSÜSTÜ", "DOKTORA"
    ];

    // İş Türü Seçenekleri (Büyük Harflerle)
    const jobTypeOptions = [
        "ÖĞRENCİ", "ÜCRETİ (ÖZEL)", "ÜCRETİ (KAMU)", "SERBEST MESLEK", "ÇALIŞAN EMEKLİ (ÜCRETİ)",
        "ÇALIŞAN EMEKLİ (SERBEST MESLEK)", "ÇALIŞMIYOR", "YURTDIŞINDA ÇALIŞAN", "SİVİL TOPLUM KURULUŞLARINDA ÇALIŞAN", "ÜCRETİ (ÖZERK)"
    ];

    // Meslek Seçenekleri (Büyük Harflerle ve Daha Fazla Meslek Eklenmiş)
    const professionOptions = [
        "DOKTOR", "MÜHENDİS", "ÖĞRETMEN", "AVUKAT", "İÇ MİMAR", "YAZILIMCI", "PAZARLAMACI", "TASARIMCI",
        "FİNANSAL ANALİST", "İŞLETMECİ", "EKONOMİST", "İNŞAAT MÜHENDİSİ", "MİMAR", "HEMŞİRE", "PSİKOLOG",
        "BAKIM PERSONELİ", "SAĞLIK MEMURU", "EĞİTİMCİ", "YÖNETİCİ", "SATIŞ TEMSİLCİSİ", "İHRACATÇI", "GRAFİK TASARIMCI",
        "WEB GELİŞTİRİCİ", "YAZILIM MÜHENDİSİ", "BİLGİ TEKNOLOJİLERİ UZMANI", "VERİ ANALİSTİ", "SİSTEM YÖNETİCİSİ",
        "LİDER", "BAŞKAN", "MÜŞTERİ HİZMETLERİ", "HALKA İLİŞKİLER UZMANI", "İÇ DENETÇİ", "KAMU İHALE UZMANI", "AVUKAT",
        "İŞ GÜVENLİĞİ UZMANI", "AR-GE UZMANI", "LİDER PROJE YÖNETİCİSİ", "DİJİTAL PAZARLAMA UZMANI", "İÇ MÜHENDİS", "YATIRIMCI"
    ];


    return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Navbar /> {/* Navbar'ı dahil ettik */}
          <Box
            as="form"
            onSubmit={handleSubmit}
            p={6}
            maxW="600px"
            mx="auto"
            bg="white"
            boxShadow="lg"
            borderRadius="md"
          >
            <Text fontSize="2xl" fontWeight="bold" mb={6} textAlign="center">
              Kişisel Bilgiler
            </Text>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Aylık Gelir</FormLabel>
                <Input
                  type="number"
                  name="income"
                  value={profileData.income}
                  onChange={handleChange}
                  placeholder="Aylık gelir bilgisi"
                />
              </FormControl>
    
              <FormControl>
                <FormLabel>Eğitim Durumu</FormLabel>
                <Select
                  name="educationLevel"
                  value={profileData.educationLevel}
                  onChange={handleChange}
                >
                  <option value="">{profileData.educationLevel}</option>
                  {educationOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </FormControl>
    
              <FormControl>
                <FormLabel>İş Türü</FormLabel>
                <Select
                  name="jobType"
                  value={profileData.jobType}
                  onChange={handleChange}
                >
                  <option value="">{profileData.jobType}</option>
                  {jobTypeOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </FormControl>
    
              <FormControl>
                <FormLabel>Meslek</FormLabel>
                <Select
                  name="profession"
                  value={profileData.profession}
                  onChange={handleChange}
                >
                  <option value="">{profileData.profession}</option>
                  {professionOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </FormControl>
    
              <Button
                type="submit"
                colorScheme="red"
                size="lg"
                width="100%"
                mt={6}
                _hover={{ backgroundColor: "#ee3124", color: "white" }}
              >
                Kaydet
              </Button>
            </Stack>
          </Box>
        </motion.div>
      );
    };
    
    export default ProfileEdit;