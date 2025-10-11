import { Box, Input, FormLabel, VStack } from "@chakra-ui/react";

const Step1 = ({ formData, setFormData }) => {
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <VStack spacing={4} align="stretch">
      <Box>
        <FormLabel>Specialization</FormLabel>
        <Input
          value={formData.specialization}
          onChange={(e) => handleChange("specialization", e.target.value)}
          placeholder="e.g. Cardiology"
        />
      </Box>

      <Box>
        <FormLabel>Sub Specialization</FormLabel>
        <Input
          value={formData.subSpecialization}
          onChange={(e) => handleChange("subSpecialization", e.target.value)}
          placeholder="e.g. Pediatric Cardiology"
        />
      </Box>
    </VStack>
  );
};

export default Step1;
