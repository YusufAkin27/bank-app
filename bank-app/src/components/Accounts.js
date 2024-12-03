import React, { useState } from "react";
import {
    Box,
    Text,
    Heading,
    VStack,
    HStack,
    Tooltip,
    Divider,
    Badge,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

const AccountDetail = ({ account }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [copySuccess, setCopySuccess] = useState("");

    const formatAmount = (amount) =>
        amount !== null && amount !== undefined ? amount.toFixed(2) : "0.00";

    const availableBalance = account.balance - account.lockedBalance;

    const handleCopy = () => {
        navigator.clipboard.writeText(account.ibanNo).then(() => {
            setCopySuccess("IBAN başarıyla kopyalandı!");
            setTimeout(() => setCopySuccess(""), 2000);
        });
    };

    return (
        <Box
            p={6}
            bg="white"
            borderRadius="lg"
            boxShadow="xl"
            borderWidth="1px"
            maxW="700px"
            w="100%"
            m="auto"
            position="relative"
        >
            {/* Başlık ve IBAN */}
            <HStack justify="space-between" alignItems="flex-start" mb={4}>
                <VStack align="flex-start" spacing={1}>
                    <Heading as="h3" size="lg" fontWeight="bold">
                        {account.ownerName}
                    </Heading>
                    <Text fontSize="md" color="gray.500" fontWeight="medium">
                        {account.branchName}
                    </Text>
                </VStack>
                <Tooltip label="IBAN'ı Kopyala" placement="top">
                    <Text
                        fontSize="md"
                        color="blue.600"
                        fontWeight="semibold"
                        cursor="pointer"
                        isTruncated
                        onClick={handleCopy}
                    >
                        {account.ibanNo}
                    </Text>
                </Tooltip>
            </HStack>

            {copySuccess && (
                <Text color="green.500" fontSize="sm" mb={4} fontWeight="medium">
                    {copySuccess}
                </Text>
            )}

            <Divider my={4} />

            {/* Hesap Bakiyeleri */}
            <VStack spacing={4} align="stretch">
                <HStack justify="space-between">
                    <Text fontSize="md" fontWeight="bold" color="gray.700">
                        Toplam Hesap Bakiyesi:
                    </Text>
                    <Text fontSize="md" fontWeight="bold" color="blue.600">
                        {`${formatAmount(account.balance)} TRY`}
                    </Text>
                </HStack>
                <HStack justify="space-between">
                    <Text fontSize="md" fontWeight="bold" color="gray.700">
                        Kullanılabilir Bakiye:
                    </Text>
                    <Text fontSize="md" fontWeight="bold" color="green.600">
                        {`${formatAmount(availableBalance)} TRY`}
                    </Text>
                </HStack>
            </VStack>

            <Divider my={4} />

            {/* Hesap Türü ve İşlem Geçmişi */}
            <HStack justify="space-between" mt={6}>
                <Badge colorScheme="blue" px={4} py={1} borderRadius="full" fontSize="md">
                    {account.accountType}
                </Badge>
                <Button
                    size="sm"
                    colorScheme="teal"
                    fontWeight="semibold"
                    onClick={onOpen}
                >
                    Hesap Aktiviteleri
                </Button>
            </HStack>

            {/* Hesap Aktiviteleri Modal */}
            <Modal isOpen={isOpen} onClose={onClose} size="lg">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Hesap Aktiviteleri</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack align="stretch" spacing={4}>
                            {account.accountActivities.length > 0 ? (
                                account.accountActivities.map((activity, index) => {
                                    // Null olmayan alanları filtrele
                                    const displayFields = {
                                        İşlemTarihi: activity.processDate
                                            ? new Date(activity.processDate).toLocaleString("tr-TR")
                                            : null,
                                        Tutar: activity.amount ? `${activity.amount} TRY` : null,
                                        Açıklama: activity.description || null,
                                        KarşıHesap: activity.crossAccount || null,
                                    };

                                    return (
                                        <Box
                                            key={index}
                                            p={5}
                                            borderWidth="1px"
                                            borderRadius="lg"
                                            bg="gray.50"
                                            _hover={{ bg: "gray.100" }}
                                            boxShadow="md"
                                        >
                                            <VStack align="stretch" spacing={2}>
                                                {Object.entries(displayFields).map(
                                                    ([field, value]) =>
                                                        value && ( // Null olmayan alanları göster
                                                            <HStack
                                                                key={field}
                                                                justify="space-between"
                                                                bg="white"
                                                                p={3}
                                                                borderRadius="md"
                                                                borderWidth="1px"
                                                            >
                                                                <Text fontWeight="bold" color="gray.700">
                                                                    {field}:
                                                                </Text>
                                                                <Text color="blue.600" fontWeight="medium">
                                                                    {value}
                                                                </Text>
                                                            </HStack>
                                                        )
                                                )}
                                            </VStack>
                                        </Box>
                                    );
                                })
                            ) : (
                                <Text>Hesap aktivitesi bulunmamaktadır.</Text>
                            )}
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <HStack justify="space-between" w="100%">
                            <Button
                                colorScheme="teal"
                                onClick={() => console.log("E-postaya gönder işlemi burada yapılacak!")}
                            >
                                Hesap Aktivitelerini E-postama Gönder
                            </Button>
                            <Button onClick={onClose} colorScheme="blue">
                                Kapat
                            </Button>
                        </HStack>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Alt Kırmızı Şerit */}
            <Box
                position="absolute"
                bottom="0"
                left="0"
                width="100%"
                height="4px"
                bg="red.500"
            />
        </Box>
    );
};

AccountDetail.propTypes = {
    account: PropTypes.shape({
        ownerName: PropTypes.string.isRequired,
        branchName: PropTypes.string.isRequired,
        ibanNo: PropTypes.string.isRequired,
        balance: PropTypes.number.isRequired,
        lockedBalance: PropTypes.number.isRequired,
        accountType: PropTypes.string.isRequired,
        accountActivities: PropTypes.arrayOf(
            PropTypes.shape({
                processDate: PropTypes.string,
                amount: PropTypes.number,
                description: PropTypes.string,
                crossAccount: PropTypes.string,
            })
        ).isRequired,
    }).isRequired,
};

export default AccountDetail;
