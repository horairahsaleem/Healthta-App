import { Box, Input, FormLabel, VStack, Button, HStack, Text, IconButton } from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import React from "react";

const Step4 = ({ formData, setFormData, handleFileChange, handleRemoveFile, fileMeta = [], onSubmit }) => {
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      documents: { ...prev.documents, [field]: value },
    }));
  };

  return (
    <VStack spacing={4} align="stretch">
      <Box>
        <FormLabel>Country</FormLabel>
        <Input value={formData.documents.country || ""} onChange={(e) => handleChange("country", e.target.value)} />
      </Box>

      <Box>
        <FormLabel>State</FormLabel>
        <Input value={formData.documents.state || ""} onChange={(e) => handleChange("state", e.target.value)} />
      </Box>

      <Box>
        <FormLabel>Attach Documents (multiple)</FormLabel>
        <Input
          type="file"
          multiple
          onChange={(e) => {
            const files = e.target.files ? Array.from(e.target.files) : [];
            if (files.length) handleFileChange("documents", files);
            e.target.value = "";
          }}
        />
      </Box>

      {/* in-memory files */}
      {(formData.documents.files || []).length > 0 && (
        <Box>
          <Text fontSize="sm" mb={2}>Attached (current session):</Text>
          <VStack align="start" spacing={2}>
            {formData.documents.files.map((f, i) => (
              <HStack key={i} spacing={3}>
                <Text fontSize="sm">{f.name}</Text>
                <IconButton size="xs" icon={<SmallCloseIcon />} aria-label="remove" onClick={() => handleRemoveFile("documents", i)} />
              </HStack>
            ))}
          </VStack>
        </Box>
      )}

      {/* metadata from previous session */}
      {(fileMeta || []).length > 0 && (formData.documents.files || []).length === 0 && (
        <Box>
          <Text fontSize="sm" color="gray.600">Previously attached (saved metadata):</Text>
          <VStack align="start" spacing={2}>
            {fileMeta.map((m, i) => (
              <Text key={i} fontSize="sm">{m.name} {m.size ? `(${Math.round(m.size / 1024)} KB)` : ""}</Text>
            ))}
          </VStack>
          <Text fontSize="xs" color="gray.500">Note: Reattach files after a refresh to actually submit them.</Text>
        </Box>
      )}

      {/* Submit button is also handled in parent, but keep an optional submit here */}
      {/* <Box display="flex" justifyContent="flex-end" mt={4}>
        <Button colorScheme="green" onClick={onSubmit}>Submit</Button>
      </Box> */}
    </VStack>
  );
};

export default Step4;
