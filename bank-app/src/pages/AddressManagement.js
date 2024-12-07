import React, { useState, useEffect } from "react";
import {
    Box,
    Heading,
    Button,
    IconButton,
    Input,
    Text,
    FormControl,
    FormLabel,
    Textarea,
    useToast,
    Stack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Alert,
    AlertIcon,
} from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { updateAddress, createAddress, getAddresses, deleteAddress } from "../services/AddressService"; // Correct import for AddressService

const AddressManagement = () => {
    const [addresses, setAddresses] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentAddress, setCurrentAddress] = useState(null);
    const [form, setForm] = useState({
        addressTitle: "",
        country: "",
        city: "",
        district: "",
        streetNumber: "",
        description: "",
    });
    const [isEditing, setIsEditing] = useState(false);
    const toast = useToast();

    // Fetch addresses when the component mounts
    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const response = await getAddresses(); // Use the imported getAddresses function
                console.log(response);
                if (response) {
                    setAddresses(response); // Set addresses if the response data is valid
                } else {
                    setAddresses([]); // Ensure it's an empty array if no data is returned
                }
            } catch (error) {
                toast({
                    title: "Error fetching addresses.",
                    description: "Could not load your addresses. Please try again.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
        };

        fetchAddresses();
    }, []);

    // Handle form input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    // Open modal to add/edit address
    const openModal = (address = null) => {
        setIsModalOpen(true);
        setIsEditing(!!address);
        setCurrentAddress(address);
        if (address) {
            setForm({
                addressTitle: address.addressTitle,
                country: address.country,
                city: address.city,
                district: address.district,
                streetNumber: address.streetNumber,
                description: address.description || "",
            });
        } else {
            setForm({
                addressTitle: "",
                country: "",
                city: "",
                district: "",
                streetNumber: "",
                description: "",
            });
        }
    };

    // Handle form submission
    const handleSubmit = async () => {
        try {
            if (isEditing) {
                // Update address
                const updatedAddress = await updateAddress(currentAddress.id, form); // Use the imported updateAddress function
                setAddresses((prev) =>
                    prev.map((addr) => (addr.id === currentAddress.id ? updatedAddress.data : addr))
                );
                toast({
                    title: "Address updated!",
                    description: "Your address has been updated successfully.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                window.location.reload();
            } else {
                // Add new address
                const newAddress = await createAddress(form); // Use the imported createAddress function
                setAddresses((prev) => [...prev, newAddress.data]);
                toast({
                    title: "Address added!",
                    description: "Your new address has been added successfully.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                window.location.reload();
            }

            setIsModalOpen(false);
            setForm({
                addressTitle: "",
                country: "",
                city: "",
                district: "",
                streetNumber: "",
                description: "",
            }); // Clear the form after submitting
        } catch (error) {
            toast({
                title: "Error saving address.",
                description: "Could not save the address. Please try again.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    // Handle delete address
    const handleDelete = async (id) => {
        try {
            await deleteAddress(id); // Use the imported deleteAddress function
            setAddresses((prev) => prev.filter((addr) => addr.id !== id));
            toast({
                title: "Address deleted!",
                description: "The address has been removed.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Error deleting address.",
                description: "Could not delete the address. Please try again.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Box p={4}>
            <Heading mb={4}>Manage Addresses</Heading>

            <Button colorScheme="teal" mb={4} onClick={() => openModal()}>
                Add New Address
            </Button>

            <Stack spacing={4}>
                {addresses.length > 0 ? (
                    addresses.map((address) => {
                        if (!address) return null;  // Ensure the address is not undefined or null
                        return (
                            <Box
                                key={address.id}
                                p={4}
                                border="1px solid"
                                borderColor="gray.200"
                                borderRadius="md"
                            >
                                <Text fontWeight="bold">{address.addressTitle}</Text>
                                <Text>
                                    {address.streetNumber}, {address.district}, {address.city},{" "}
                                    {address.country}
                                </Text>
                                {address.description && <Text>{address.description}</Text>}
                                <Stack direction="row" spacing={2} mt={2}>
                                    <IconButton
                                        aria-label="Edit address"
                                        icon={<FaEdit />}
                                        onClick={() => openModal(address)}
                                    />
                                    <IconButton
                                        aria-label="Delete address"
                                        icon={<FaTrash />}
                                        colorScheme="red"
                                        onClick={() => handleDelete(address.id)}
                                    />
                                </Stack>
                            </Box>
                        );
                    })
                ) : (
                    <Alert status="info">
                        <AlertIcon />
                        No addresses found. Add a new address to get started.
                    </Alert>
                )}

            </Stack>

            {/* Modal for Add/Edit Address */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{isEditing ? "Edit Address" : "Add New Address"}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl mb={4} isRequired>
                            <FormLabel>Address Title</FormLabel>
                            <Input
                                name="addressTitle"
                                value={form.addressTitle}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <FormControl mb={4} isRequired>
                            <FormLabel>Country</FormLabel>
                            <Input
                                name="country"
                                value={form.country}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <FormControl mb={4} isRequired>
                            <FormLabel>City</FormLabel>
                            <Input
                                name="city"
                                value={form.city}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <FormControl mb={4} isRequired>
                            <FormLabel>District</FormLabel>
                            <Input
                                name="district"
                                value={form.district}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <FormControl mb={4} isRequired>
                            <FormLabel>Street Number</FormLabel>
                            <Input
                                name="streetNumber"
                                value={form.streetNumber}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Description</FormLabel>
                            <Textarea
                                name="description"
                                value={form.description}
                                onChange={handleInputChange}
                                maxLength={200}
                            />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            colorScheme="teal"
                            mr={3}
                            onClick={handleSubmit}
                            isDisabled={!form.addressTitle || !form.country || !form.city || !form.district || !form.streetNumber}
                        >
                            Save
                        </Button>
                        <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default AddressManagement;
