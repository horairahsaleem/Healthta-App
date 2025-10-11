import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  VStack,
  Box,
  Button,
  Image,
  HStack,
} from "@chakra-ui/react";
import { FaFacebook, FaGoogle } from "react-icons/fa";

const ContinueWithFacebook = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="scale">
      <ModalOverlay bg="rgba(0, 0, 0, 0.6)" />
      <ModalContent
        borderRadius="2xl"
        p={6}
        boxShadow="2xl"
        bg="white"
        maxW="md"
        textAlign="center"
      >
        <ModalCloseButton color="gray.600" />

        <VStack spacing={4}>
          <Box
            bgGradient="linear(to-r, #1877F2, #4267B2)"
            borderRadius="full"
            w="70px"
            h="70px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="lg"
          >
            <FaFacebook color="white" size="34px" />
          </Box>

          <ModalHeader
            fontWeight="800"
            fontSize="xl"
            color="#1877F2"
            lineHeight="shorter"
          >
            Facebook Login Temporarily Unavailable
          </ModalHeader>

          <ModalBody p={0}>
            <VStack spacing={4}>
              <Text fontSize="md" color="gray.700" px={4}>
                Due to Meta’s latest security policy review, the Facebook login
                feature is currently under maintenance.
              </Text>

              <Text fontSize="md" fontWeight="500" color="gray.800">
                Please continue using{" "}
                <Text as="span" color="#DB4437" fontWeight="700">
                  Google Login
                </Text>{" "}
                to sign in for now.
              </Text>

              <Box
                bg="#F8F9FA"
                border="1px solid #E0E0E0"
                borderRadius="lg"
                p={3}
                maxW="85%"
              >
                <Text fontSize="sm" color="gray.600">
                  We’re working with Meta to re-enable this soon. Thank you for
                  your patience 💙
                </Text>
              </Box>

              <Button
                leftIcon={<FaGoogle />}
                colorScheme="blue"
                variant="outline"
                borderColor="#DB4437"
                color="#DB4437"
                _hover={{ bg: "#DB4437", color: "white" }}
                onClick={onClose}
              >
                Continue with Google
              </Button>
            </VStack>
          </ModalBody>
        </VStack>
      </ModalContent>
    </Modal>
  );
};

export default ContinueWithFacebook;
