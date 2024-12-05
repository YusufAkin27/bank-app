import React from "react";
import { FormControl, FormLabel, Select } from "@chakra-ui/react";

const BranchSelector = ({ branchName, onChange }) => {
  // Enum'daki BranchName değerlerinin listesi
  const branches = [
    { name: "Adana", value: "ADANA" },
    { name: "Adıyaman", value: "ADIYAMAN" },
    { name: "Afyonkarahisar", value: "AFYONKARAHİSAR" },
    { name: "Ağrı", value: "AĞRI" },
    { name: "Aksaray", value: "AKSARAY" },
    { name: "Amasya", value: "AMASYA" },
    { name: "Ankara", value: "ANKARA" },
    { name: "Antalya", value: "ANTALYA" },
    { name: "Ardahan", value: "ARDAHAN" },
    { name: "Artvin", value: "ARTVİN" },
    { name: "Aydın", value: "AYDIN" },
    { name: "Balıkesir", value: "BALIKESİR" },
    { name: "Bartın", value: "BARTIN" },
    { name: "Batman", value: "BATMAN" },
    { name: "Bayburt", value: "BAYBURT" },
    { name: "Bilecik", value: "BİLECİK" },
    { name: "Bingöl", value: "BİNGÖL" },
    { name: "Bitlis", value: "BİTLİS" },
    { name: "Bolu", value: "BOLU" },
    { name: "Burdur", value: "BURDUR" },
    { name: "Bursa", value: "BURSA" },
    { name: "Çanakkale", value: "ÇANAKKALE" },
    { name: "Çorum", value: "ÇORUM" },
    { name: "Denizli", value: "DENİZLİ" },
    { name: "Diyarbakır", value: "DİYARBAKIR" },
    { name: "Edirne", value: "EDİRNE" },
    { name: "Elazığ", value: "ELAZIĞ" },
    { name: "Erzincan", value: "ERZİNCAN" },
    { name: "Erzurum", value: "ERZURUM" },
    { name: "Eskişehir", value: "ESKİŞEHİR" },
    { name: "Gaziantep", value: "GAZİANTEP" },
    { name: "Giresun", value: "GİRESUN" },
    { name: "Gümüşhane", value: "GÜMÜŞHANE" },
    { name: "Hakkari", value: "HAKKARİ" },
    { name: "Hatay", value: "HATAY" },
    { name: "Iğdır", value: "IĞDIR" },
    { name: "Isparta", value: "ISPARTA" },
    { name: "İstanbul", value: "İSTANBUL" },
    { name: "İzmir", value: "İZMİR" },
    { name: "Kahramanmaraş", value: "KAHRAMANMARAŞ" },
    { name: "Kastamonu", value: "KASTAMONU" },
    { name: "Kayseri", value: "KAYSERİ" },
    { name: "Kırıkkale", value: "KIRIKKALE" },
    { name: "Kırklareli", value: "KIRKLARELİ" },
    { name: "Kırşehir", value: "KIRŞEHIR" },
    { name: "Kocaeli", value: "KOCAELİ" },
    { name: "Konya", value: "KONYA" },
    { name: "Kütahya", value: "KÜTAHYA" },
    { name: "Malatya", value: "MALATYA" },
    { name: "Manisa", value: "MANİSA" },
    { name: "Mardin", value: "MARDİN" },
    { name: "Mersin", value: "MERSİN" },
    { name: "Muğla", value: "MUĞLA" },
    { name: "Muş", value: "MUŞ" },
    { name: "Nevşehir", value: "NEVŞEHİR" },
    { name: "Niğde", value: "NİĞDE" },
    { name: "Ordu", value: "ORDU" },
    { name: "Osmaniye", value: "OSMANİYE" },
    { name: "Rize", value: "RİZE" },
    { name: "Sakarya", value: "SAKARYA" },
    { name: "Siirt", value: "SİİRT" },
    { name: "Sinop", value: "SİNOP" },
    { name: "Sivas", value: "SİVAS" },
    { name: "Şanlıurfa", value: "ŞANLIURFA" },
    { name: "Şırnak", value: "ŞIRNAK" },
    { name: "Tekirdağ", value: "TEKİRDAĞ" },
    { name: "Tokat", value: "TOKAT" },
    { name: "Trabzon", value: "TRABZON" },
    { name: "Tunceli", value: "TUNCELİ" },
    { name: "Uşak", value: "UŞAK" },
    { name: "Van", value: "VAN" },
    { name: "Yalova", value: "YALOVA" },
    { name: "Yozgat", value: "YOZGAT" },
    { name: "Zonguldak", value: "ZONGULDAK" },
  ];

  return (
    <FormControl mb={4}>
      <FormLabel fontSize="sm" color="gray.700">
        Şube
      </FormLabel>
      <Select
        value={branchName}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Şube Seçin"
        focusBorderColor="#ee3124"
      >
        {branches.map((branch) => (
          <option key={branch.value} value={branch.value}>
            {branch.name}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};

export default BranchSelector;
