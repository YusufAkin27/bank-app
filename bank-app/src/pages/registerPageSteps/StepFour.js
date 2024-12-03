import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Select,
  Button,
  Text,
} from "@chakra-ui/react";
import { AiOutlineDollarCircle, AiOutlineRise } from "react-icons/ai";
import MessageAlert from "../../components/MessageAlert"; // Hata mesajı için bileşen

const StepFour = ({
  formData,
  setFormData,
  handleRegister, // Üst bileşene verileri gönderecek fonksiyon
  handlePreviousStep,
}) => {
  const [errorMessage, setErrorMessage] = useState(""); // Hata mesajı
  const [isSubmitting, setIsSubmitting] = useState(false); // İstek sırasında butonun durumunu kontrol et

  // Form doğrulama fonksiyonu
  const validateForm = () => {
    const { income, educationLevel, jobType, profession } = formData;

    if (!income || !educationLevel || !jobType || !profession) {
      setErrorMessage("Lütfen tüm alanları doldurun.");
      return false;
    }
    if (isNaN(Number(income)) || Number(income) <= 0) {
      setErrorMessage("Lütfen geçerli bir gelir değeri girin.");
      return false;
    }
    setErrorMessage(""); // Önceki hataları temizle
    return true;
  };

  // Kayıt butonuna tıklandığında çalışacak fonksiyon
  const handleRegisterClick = async () => {
    if (validateForm()) {
      setIsSubmitting(true); // Butonu devre dışı bırak
      await handleRegister(formData); // API isteğini gönder
      setIsSubmitting(false); // İşlem tamamlandıktan sonra butonu tekrar aktif et
    }
  };
  // Gelir değiştiğinde formData'yı güncelle
  const handleIncomeChange = (e) => {
    setFormData({ ...formData, income: e.target.value });
  };

  // Eğitim seviyesi değiştiğinde formData'yı güncelle
  const handleEducationLevelChange = (e) => {
    setFormData({ ...formData, educationLevel: e.target.value });
  };

  // İş türü değiştiğinde formData'yı güncelle
  const handleJobTypeChange = (e) => {
    setFormData({ ...formData, jobType: e.target.value });
  };

  // Meslek değiştiğinde formData'yı güncelle
  const handleProfessionChange = (e) => {
    setFormData({ ...formData, profession: e.target.value });
  };

  return (
    <>
      <Text fontSize="2xl" fontWeight="bold" textAlign="center" color="#ee3124">
        Son Adım
      </Text>

      {/* Hata mesajını göster */}
      {errorMessage && (
        <MessageAlert
          isSuccess={false}
          message={errorMessage}
          onClose={() => setErrorMessage("")}
          duration={3000}
        />
      )}

      {/* Gelir */}
      <FormControl id="income" isRequired mb="4">
        <FormLabel fontWeight="semibold" color="#ee3124">
          Gelir
        </FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <AiOutlineDollarCircle color="#555" />
          </InputLeftElement>
          <Input
            type="number"
            placeholder="Gelir"
            value={formData.income || ""}
            onChange={handleIncomeChange}
            focusBorderColor="#ee3124"
            bg="white"
            color="gray.800"
            borderColor="gray.300"
          />
          <InputRightElement>
            <AiOutlineRise color="#555" />
          </InputRightElement>
        </InputGroup>
      </FormControl>

      {/* Eğitim Seviyesi */}
      <FormControl id="educationLevel" isRequired mb="4">
        <FormLabel fontWeight="semibold" color="#ee3124">
          Eğitim Seviyesi
        </FormLabel>
        <Select
          placeholder="Eğitim Seviyesi Seçin"
          value={formData.educationLevel || ""}
          onChange={handleEducationLevelChange}
          focusBorderColor="#ee3124"
        >
          <option value="EGITIMSIZ">Eğitimsiz</option>
          <option value="ILKOKUL">İlkokul</option>
          <option value="ORTAOKUL">Ortaokul</option>
          <option value="LISE">Lise</option>
          <option value="YUKSEKOKUL">Yüksekokul</option>
          <option value="UNIVERSITE">Üniversite</option>
          <option value="LISANSUSTU">Lisansüstü</option>
          <option value="DOKTORA">Doktora</option>
        </Select>
      </FormControl>

      {/* İş Türü */}
      <FormControl id="jobType" isRequired mb="4">
        <FormLabel fontWeight="semibold" color="#ee3124">
          İş Türü
        </FormLabel>
        <Select
          placeholder="İş Türü Seçin"
          value={formData.jobType || ""}
          onChange={handleJobTypeChange}
          focusBorderColor="#ee3124"
        >
          <option value="OGRENCI">Öğrenci</option>
          <option value="UCRETI_OZEL">Ücretli (Özel)</option>
          <option value="UCRETI_KAMU">Ücretli (Kamu)</option>
          <option value="SERBEST_MESLEK">Serbest Meslek</option>
          <option value="CALISAN_EMEKLI_UCRETI">Çalışan Emekli Ücreti</option>
          <option value="CALISAN_EMEKLI_SERBEST_MESLEK">
            Çalışan Emekli Serbest Meslek
          </option>
          <option value="CALISMIYOR">Çalışmıyor</option>
          <option value="YURTDISINDA_CALISAN">Yurtdışında Çalışan</option>
          <option value="SIVIL_TOPLUM_KURULUSLARINDA_CALISAN">
            Sivil Toplum Kuruluşlarında Çalışan
          </option>
          <option value="UCRETI_OZERK">Ücretli (Özerk)</option>
        </Select>
      </FormControl>

      {/* Meslek */}
      <FormControl id="profession" isRequired mb="4">
        <FormLabel fontWeight="semibold" color="#ee3124">
          Meslek
        </FormLabel>
        <Select
          placeholder="Meslek Seçin"
          value={formData.profession || ""}
          onChange={handleProfessionChange}
          focusBorderColor="#ee3124"
        >
         <option value="DOKTOR">Doktor</option>
          <option value="MUHENDIS">Mühendis</option>
          <option value="OGRETMEN">Öğretmen</option>
          <option value="AVUKAT">Avukat</option>
          <option value="IC_MIMAR">İç Mimar</option>
          <option value="YAZILIMCI">Yazılımcı</option>
          <option value="PAZARLAMACI">Pazarlamacı</option>
          <option value="TASARIMCI">Tasarımcı</option>
          <option value="FINANSAL_ANALIST">Finansal Analist</option>
          <option value="ISLETMECI">İşletmeci</option>
          <option value="EKONOMIST">Ekonomist</option>
          <option value="INSAAT_MUHENDISI">İnşaat Mühendisi</option>
          <option value="MIMAR">Mimar</option>
          <option value="HEMSIRE">Hemşire</option>
          <option value="PSIKOLOG">Psikolog</option>
          <option value="BAKIM_PERSONELI">Bakım Personeli</option>
          <option value="SAGLIK_MEMURU">Sağlık Memuru</option>
          <option value="EGITIMCI">Eğitimci</option>
          <option value="YONETICI">Yönetici</option>
          <option value="SATIS_TEMSILCISI">Satış Temsilcisi</option>
          <option value="IHRACATCI">İhracatçı</option>
          <option value="GRAFIK_TASARIMCI">Grafik Tasarımcı</option>
          <option value="WEB_GELISTIRICI">Web Geliştirici</option>
          <option value="YAZILIM_MUHENDISI">Yazılım Mühendisi</option>
          <option value="BILGI_TEKNOLOJILERI_UZMANI">
            Bilgi Teknolojileri Uzmanı
          </option>
          <option value="VERI_ANALISTI">Veri Analisti</option>
          <option value="SISTEM_YONETICISI">Sistem Yöneticisi</option>
          <option value="LIDER">Lider</option>
          <option value="BASKAN">Başkan</option>
          <option value="MUSTERI_HIZMETLERI">Müşteri Hizmetleri</option>
          <option value="HALKA_ILISKILER_UZMANI">
            Halkla İlişkiler Uzmanı
          </option>
          <option value="IC_DENETCI">İç Denetçi</option>
          <option value="KAMU_IHALE_UZMANI">Kamu İhale Uzmanı</option>
          <option value="IS_GUVENLIGI_UZMANI">İş Güvenliği Uzmanı</option>
          <option value="AR_GE_UZMANI">Ar-Ge Uzmanı</option>
          <option value="LIDER_PROJE_YONETICI">Lider Proje Yöneticisi</option>
          <option value="DIJITAL_PAZARLAMA_UZMANI">
            Dijital Pazarlama Uzmanı
          </option>
          <option value="IC_MUHENDIS">İç Mühendis</option>
          <option value="YATIRIMCI">Yatırımcı</option>
        </Select>
      </FormControl>

      {/* Kayıt Ol butonu */}
      <Button
        onClick={handleRegisterClick}
        w="full"
        bg="#ee3124"
        color="white"
        _hover={{ bg: "#d51f1f" }}
        mt="4"
        isDisabled={isSubmitting} // Buton devre dışı
        isLoading={isSubmitting} // Yüklenme durumu
      >
        Kayıt Ol
      </Button>

      {/* Önceki Adıma Git butonu */}
      <Button
        onClick={handlePreviousStep}
        w="full"
        variant="outline"
        color="#ee3124"
        mt="2"
      >
        Önceki Adım
      </Button>
    </>
  );
};

export default StepFour;
