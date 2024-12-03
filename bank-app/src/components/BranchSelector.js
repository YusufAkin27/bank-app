import React from "react";
import { FormControl, FormLabel, Select } from "@chakra-ui/react";

const BranchSelector = ({ branchName, onChange }) => {
  // Enum'daki BranchName değerlerinin listesi
  const branches = [
    { name: "Adana", value:"ADANA" },
    { name: "Adıyaman", code: "TR02", id: "002" },
    { name: "Afyonkarahisar", code: "TR03", id: "003" },
    { name: "Ağrı", code: "TR04", id: "004" },
    { name: "Aksaray", code: "TR05", id: "005" },
    { name: "Amasya", code: "TR06", id: "006" },
    { name: "Ankara", code: "TR07", id: "007" },
    { name: "Antalya", code: "TR08", id: "008" },
    { name: "Ardahan", code: "TR09", id: "009" },
    { name: "Artvin", code: "TR10", id: "010" },
    { name: "Aydın", code: "TR11", id: "011" },
    { name: "Balıkesir", code: "TR12", id: "012" },
    { name: "Bartın", code: "TR13", id: "013" },
    { name: "Batman", code: "TR14", id: "014" },
    { name: "Bayburt", code: "TR15", id: "015" },
    { name: "Bilecik", code: "TR16", id: "016" },
    { name: "Bingöl", code: "TR17", id: "017" },
    { name: "Bitlis", code: "TR18", id: "018" },
    { name: "Bolu", code: "TR19", id: "019" },
    { name: "Burdur", code: "TR20", id: "020" },
    { name: "Bursa", code: "TR21", id: "021" },
    { name: "Çanakkale", code: "TR22", id: "022" },
    { name: "Çorum", code: "TR23", id: "023" },
    { name: "Denizli", code: "TR24", id: "024" },
    { name: "Diyarbakır", code: "TR25", id: "025" },
    { name: "Edirne", code: "TR26", id: "026" },
    { name: "Elazığ", code: "TR27", id: "027" },
    { name: "Erzincan", code: "TR28", id: "028" },
    { name: "Erzurum", code: "TR29", id: "029" },
    { name: "Eskişehir", code: "TR30", id: "030" },
    { name: "Gaziantep", code: "TR31", id: "031" },
    { name: "Giresun", code: "TR32", id: "032" },
    { name: "Gümüşhane", code: "TR33", id: "033" },
    { name: "Hakkari", code: "TR34", id: "034" },
    { name: "Hatay", code: "TR35", id: "035" },
    { name: "Iğdır", code: "TR36", id: "036" },
    { name: "Isparta", code: "TR37", id: "037" },
    { name: "İstanbul", code: "TR38", id: "038" },
    { name: "İzmir", code: "TR39", id: "039" },
    { name: "Kahramanmaraş", code: "TR40", id: "040" },
    { name: "Kastamonu", code: "TR41", id: "041" },
    { name: "Kayseri", code: "TR42", id: "042" },
    { name: "Kırıkkale", code: "TR43", id: "043" },
    { name: "Kırklareli", code: "TR44", id: "044" },
    { name: "Kırşehir", code: "TR45", id: "045" },
    { name: "Kocaeli", code: "TR46", id: "046" },
    { name: "Konya", code: "TR47", id: "047" },
    { name: "Kütahya", code: "TR48", id: "048" },
    { name: "Malatya", code: "TR49", id: "049" },
    { name: "Manisa", code: "TR50", id: "050" },
    { name: "Mardin", code: "TR51", id: "051" },
    { name: "Mersin", code: "TR52", id: "052" },
    { name: "Muğla", code: "TR53", id: "053" },
    { name: "Muş", code: "TR54", id: "054" },
    { name: "Nevşehir", code: "TR55", id: "055" },
    { name: "Niğde", code: "TR56", id: "056" },
    { name: "Ordu", code: "TR57", id: "057" },
    { name: "Osmaniye", code: "TR58", id: "058" },
    { name: "Rize", code: "TR59", id: "059" },
    { name: "Sakarya", code: "TR60", id: "060" },
    { name: "Siirt", code: "TR61", id: "061" },
    { name: "Sinop", code: "TR62", id: "062" },
    { name: "Sivas", code: "TR63", id: "063" },
    { name: "Şanlıurfa", code: "TR64", id: "064" },
    { name: "Şırnak", code: "TR65", id: "065" },
    { name: "Tekirdağ", code: "TR66", id: "066" },
    { name: "Tokat", code: "TR67", id: "067" },
    { name: "Trabzon", code: "TR68", id: "068" },
    { name: "Tunceli", code: "TR69", id: "069" },
    { name: "Uşak", code: "TR70", id: "070" },
    { name: "Van", code: "TR71", id: "071" },
    { name: "Yalova", code: "TR72", id: "072" },
    { name: "Yozgat", code: "TR73", id: "073" },
    { name: "Zonguldak", code: "TR74", id: "074" },
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
          <option key={branch.value} value={branch.name}>
            {branch.name}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};

export default BranchSelector;
