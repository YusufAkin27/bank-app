import React, { useState } from "react";
import { Box, Flex, Text, Button, Input, Select, useBreakpointValue, Spacer } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AiOutlineHome, AiOutlineLogout } from "react-icons/ai";
import { Menu, MenuButton, MenuList, MenuItem, Avatar } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

const ProfileEdit = () => {
    const [income, setIncome] = useState("");
    const [education, setEducation] = useState("");
    const [jobType, setJobType] = useState("");
    const [profession, setProfession] = useState("");

    const navigate = useNavigate();
    const isMobile = useBreakpointValue({ base: true, md: false });

    const handleSave = () => {
        // Profil bilgilerini kaydetme işlemi yapılacak
        console.log("Profil bilgileri kaydedildi:", { income, education, jobType, profession });
        // Kaydetme işleminden sonra ana sayfaya yönlendirme
        navigate("/profile");
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
                    <Navbar></Navbar>
            
           

            {/* Profil Düzenleme Formu */}
            <Box p={6} maxW="600px" mx="auto" bg="white" boxShadow="lg" borderRadius="md">
                <Text fontSize="3xl" fontWeight="bold" mb={6} textAlign="center">
                    Kişisel Bilgiler
                </Text>

                <Box mb={4}>
                    <Text fontSize="lg" fontWeight="semibold" mb={2}>
                        Aylık Gelir:
                    </Text>
                    <Input
                        value={income}
                        onChange={(e) => setIncome(e.target.value)}
                        placeholder="Aylık gelir bilgisi"
                        size="md"
                        mb={4}
                        width="100%"
                        maxWidth="500px"
                    />
                </Box>

                <Box mb={4}>
                    <Text fontSize="lg" fontWeight="semibold" mb={2}>
                        Eğitim Durumu:
                    </Text>
                    <Select
                        value={education}
                        onChange={(e) => setEducation(e.target.value)}
                        placeholder="Eğitim durumunu seçin"
                        size="md"
                        mb={4}
                        width="100%"
                        maxWidth="500px"
                    >
                        {educationOptions.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </Select>
                </Box>

                <Box mb={4}>
                    <Text fontSize="lg" fontWeight="semibold" mb={2}>
                        İş Türü:
                    </Text>
                    <Select
                        value={jobType}
                        onChange={(e) => setJobType(e.target.value)}
                        placeholder="İş türünü seçin"
                        size="md"
                        mb={4}
                        width="100%"
                        maxWidth="500px"
                    >
                        {jobTypeOptions.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </Select>
                </Box>
                <Box mb={4}>
                    <Text fontSize="lg" fontWeight="semibold" mb={2}>
                        Meslek:
                    </Text>
                    <Select
                        value={profession}
                        onChange={(e) => setProfession(e.target.value)}
                        placeholder="Meslek bilgisini seçin"
                        size="md"
                        mb={4}
                        width="100%"
                        maxWidth="500px"
                        minWidth="300px"
                        _menu={{
                            maxHeight: '300px',  // Menü boyutunu sınırlıyoruz
                            overflowY: 'auto',   // Taşma durumunda kaydırma ekliyoruz
                        }}
                    >
                        {professionOptions.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </Select>
                </Box>



                <Button
                    onClick={handleSave}
                    colorScheme="white"
                    border={`2px solid #ee3124`}
                    color="#ee3124"
                    size="md"
                    width="100%"
                    maxWidth="500px"
                    mt={6}
                    _hover={{
                        backgroundColor: "#ee3124",
                        color: "white",
                    }}
                >
                    Kaydet
                </Button>
            </Box>
        </motion.div>
    );
};

export default ProfileEdit;
