import React, { useEffect } from "react";
import { Box, useDisclosure } from "@chakra-ui/react";
import OnboardingModal from "./onBoradingModel";

const OnboardingPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    onOpen(); // auto open when redirected
  }, [onOpen]);

  return (
    <Box bg="gray.50" h="100vh" display="flex" alignItems="center" justifyContent="center">
      <OnboardingModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default OnboardingPage;
