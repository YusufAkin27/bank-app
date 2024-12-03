import React from "react";
import {
  FormControl,
  FormLabel,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  HStack,
  Text,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

const CurrencySelector = ({ value, onChange }) => {
  // Sadece bu para birimleri
  const currencies = [
    { value: "TRY", label: "Türk Lirası" },
    { value: "USD", label: "Amerikan Doları" },
    { value: "EUR", label: "Euro" },
    { value: "GBP", label: "İngiliz Sterlini" },
    { value: "JPY", label: "Japon Yeni" },
  ];

  const selectedCurrency = currencies.find((currency) => currency.value === value);

  return (
    <FormControl mb={6}>
      <FormLabel fontSize="sm" color="gray.700">
        Para Birimi
      </FormLabel>
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          w="100%"
          bg="white"
          border="1px solid #ccc"
          _hover={{ borderColor: "#ee3124" }}
        >
          <HStack justify="space-between">
            {selectedCurrency ? (
              <Text>
                {selectedCurrency.label} ({selectedCurrency.value})
              </Text>
            ) : (
              <Text>Para birimini seçin</Text>
            )}
          </HStack>
        </MenuButton>
        <MenuList>
          {/* Para birimleri listesi */}
          {currencies.map((currency) => (
            <MenuItem
              key={currency.value}
              onClick={() => onChange(currency.value)}
            >
              {currency.label} ({currency.value})
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </FormControl>
  );
};

export default CurrencySelector;
