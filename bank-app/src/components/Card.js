import React, { useState } from "react";
import { Box, Text, Flex, IconButton, Grid, Tooltip } from "@chakra-ui/react";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineCreditCard } from "react-icons/ai";

const Card = ({ cardNumber, cardName, cvv, expiryDate, balance }) => {
  const [showDetails, setShowDetails] = useState(false);

  const maskedCardNumber = showDetails
    ? cardNumber.match(/.{1,4}/g).join(" ")
    : `**** **** **** ${cardNumber.slice(-4)}`;
  const maskedCvv = showDetails ? cvv : "***";

  const toggleDetails = () => setShowDetails((prev) => !prev);

  return (
    <Box
      w="420px"
      h="280px"
      borderRadius="15px"
      bg="#fff8d3" // Faded yellow color from your palette
      boxShadow="lg"
      p={5}
      color="#333" // Dark text color for good contrast
      position="relative"
      overflow="hidden"
      transition="transform 0.3s ease, box-shadow 0.3s ease"
      _hover={{
        transform: "translateY(-10px)",
        boxShadow: "2xl",
      }}
    >
      {/* Icon and Name */}
      <Flex justify="space-between" align="center" mb={4}>
        <Flex align="center" gap={2}>
          <AiOutlineCreditCard size={32} color="#e0e8d0" /> {/* Light greenish */}
          <Text fontSize="lg" fontWeight="bold" color="#719fc6"> {/* Soft blue */}
            {cardName}
          </Text>
        </Flex>
        <Tooltip
          label={showDetails ? "Hide Details" : "Show Details"}
          placement="top"
          hasArrow
        >
          <IconButton
            aria-label="Show details"
            icon={showDetails ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            size="sm"
            variant="outline"
            color="#e0e8d0" // Light greenish color
            borderColor="#e0e8d0"
            _hover={{ bg: "#feb28c" }} // Faded orange color on hover
            onClick={toggleDetails}
          />
        </Tooltip>
      </Flex>

      {/* Card Number */}
      <Text
        fontSize="2xl"
        fontWeight="bold"
        letterSpacing="3px"
        textAlign="center"
        mb={3}
        color="#333" // Dark text for better contrast
      >
        {maskedCardNumber}
      </Text>

      {/* Details */}
      <Grid
        templateColumns="repeat(2, 1fr)"
        fontSize="sm"
        textTransform="uppercase"
        mb={4}
        gap={3}
      >
        <Text fontWeight="bold" color="#a2f3ed"> {/* Light cyan */}
          Expiry Date
        </Text>
        <Text textAlign="right" color="#333">
          {expiryDate}
        </Text>
        <Text fontWeight="bold" color="#a2f3ed">
          CVV
        </Text>
        <Text textAlign="right" color="#333">
          {maskedCvv}
        </Text>
      </Grid>

      {/* Balance */}
      <Box
        bg="#ee3124" // Red from your palette
        py={3}
        borderRadius="10px"
        textAlign="center"
        color="white"
        fontSize="lg"
        fontWeight="bold"
        mb={4}
        boxShadow="md"
      >
        Balance: ${balance.toFixed(2)}
      </Box>

      {/* Decorative Elements */}
      <Box
        position="absolute"
        bottom="-50px"
        right="-50px"
        w="150px"
        h="150px"
        bg="#feb28c" // Soft orange
        borderRadius="full"
        opacity="0.6"
      />
      <Box
        position="absolute"
        top="-40px"
        left="-40px"
        w="100px"
        h="100px"
        bg="#feeab8" // Light yellow
        borderRadius="full"
        opacity="0.4"
      />
    </Box>
  );
};

export default Card;
