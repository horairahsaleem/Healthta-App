import { Box, Input, FormLabel, VStack, HStack, IconButton, Text } from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import React from "react";

const Step3 = ({ formData, setFormData, handleFileChange, handleRemoveFile, fileMeta = [] }) => {
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      experience: { ...prev.experience, [field]: value },
    }));
  };

  return (
    <VStack spacing={4} align="stretch">
      <Box>
        <FormLabel>Institute</FormLabel>
        <Input value={formData.experience.institute || ""} onChange={(e) => handleChange("institute", e.target.value)} />
      </Box>

      <HStack spacing={4}>
        <Box flex="1">
          <FormLabel>From</FormLabel>
          <Input type="date" value={formData.experience.from || ""} onChange={(e) => handleChange("from", e.target.value)} />
        </Box>
        <Box flex="1">
          <FormLabel>To</FormLabel>
          <Input type="date" value={formData.experience.to || ""} onChange={(e) => handleChange("to", e.target.value)} />
        </Box>
      </HStack>

      <Box>
        <FormLabel>Attach Files (multiple)</FormLabel>
        <Input
          type="file"
          multiple
          onChange={(e) => {
            const files = e.target.files ? Array.from(e.target.files) : [];
            if (files.length) handleFileChange("experience", files);
            // clear input to allow re-adding same file later if needed
            e.target.value = "";
          }}
        />
      </Box>

      {/* show files that are currently in-memory (session) */}
      {(formData.experience.files || []).length > 0 && (
        <Box>
          <Text fontSize="sm" mb={2}>Attached (current session):</Text>
          <VStack align="start" spacing={2}>
            {formData.experience.files.map((f, i) => (
              <HStack key={i} spacing={3}>
                <Text fontSize="sm">{f.name}</Text>
                <IconButton size="xs" icon={<SmallCloseIcon />} aria-label="remove" onClick={() => handleRemoveFile("experience", i)} />
              </HStack>
            ))}
          </VStack>
        </Box>
      )}

      {/* show meta from localStorage (if any) */}
      {(fileMeta || []).length > 0 && (formData.experience.files || []).length === 0 && (
        <Box>
          <Text fontSize="sm" color="gray.600">Previously attached (saved metadata):</Text>
          <VStack align="start" spacing={2}>
            {fileMeta.map((m, i) => (
              <Text key={i} fontSize="sm">{m.name} {m.size ? `(${Math.round(m.size / 1024)} KB)` : ""}</Text>
            ))}
          </VStack>
          <Text fontSize="xs" color="gray.500">Note: Reopen the file picker to reattach actual files after a refresh.</Text>
        </Box>
      )}
    </VStack>
  );
};

export default Step3;
