// frontend/src/components/common/SupportModal.jsx
import React, { useState } from "react";
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody,
  ModalFooter, ModalCloseButton, Button, Input, Textarea, VStack, useToast
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { contact } from "../../redux/actions/otherActions.js";

const SupportModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const { loading, error, message } = useSelector((state) => state.other);

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(contact(formData.name, formData.email, formData.message));
  };

  useEffect(() => {
    if (error) {
      toast({
        title: error,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
        variant: "left-accent",
      });
      dispatch({ type: "clearError" });
    }

    if (message) {
      toast({
        title: message,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
        variant: "left-accent",
      });
      dispatch({ type: "clearMessage" });
      onClose(); // ✅ Close modal after success
    }
  }, [error, message, dispatch, toast, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
      <ModalOverlay />
      <ModalContent borderRadius="2xl" p={4}>
        <ModalHeader fontWeight="bold" fontSize="2xl">Contact Support</ModalHeader>
        <ModalCloseButton />

        <form onSubmit={handleSubmit}>
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Input
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                h="50px"
              />
              <Input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                h="50px"
              />
              <Textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              type="submit"
              colorScheme="blue"
              w="full"
              h="50px"
              borderRadius="xl"
              isLoading={loading}
            >
              Send Message
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default SupportModal;
