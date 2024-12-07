import React, { useState } from "react";
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Input,
  FormControl,
  FormLabel,
  Button,
  Switch,
  Select,
  Textarea,
  useToast,
} from "@chakra-ui/react";

const SettingsPage = () => {
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    phone: "",
  });

  const [notifications, setNotifications] = useState({
    accountActivity: "instant",
    transfers: "daily",
    securityAlerts: "instant",
    promotions: "weekly",
  });

  const toast = useToast();

  const handlePersonalInfoUpdate = () => {
    toast({
      title: "Personal information updated.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box p={6}>
      <Tabs variant="soft-rounded" colorScheme="teal">
        <TabList>
          <Tab>Personal Info</Tab>
          <Tab>Change Password</Tab>
          <Tab>Security</Tab>
          <Tab>Notifications</Tab>
          <Tab>Language & Currency</Tab>
          <Tab>Help & Support</Tab>
        </TabList>

        <TabPanels>
          {/* Personal Information */}
          <TabPanel>
            <FormControl mb={4}>
              <FormLabel>First Name</FormLabel>
              <Input
                value={personalInfo.firstName}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, firstName: e.target.value })
                }
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Last Name</FormLabel>
              <Input
                value={personalInfo.lastName}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, lastName: e.target.value })
                }
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Date of Birth</FormLabel>
              <Input
                type="date"
                value={personalInfo.dateOfBirth}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, dateOfBirth: e.target.value })
                }
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Email Address</FormLabel>
              <Input
                type="email"
                value={personalInfo.email}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, email: e.target.value })
                }
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Phone Number</FormLabel>
              <Input
                type="tel"
                value={personalInfo.phone}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, phone: e.target.value })
                }
              />
            </FormControl>
            <Button colorScheme="teal" onClick={handlePersonalInfoUpdate}>
              Update Info
            </Button>
          </TabPanel>

          {/* Add other panels similarly */}
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default SettingsPage;
