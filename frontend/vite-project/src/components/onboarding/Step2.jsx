import { Box, Input, FormLabel, VStack } from "@chakra-ui/react";

const Step2 = ({ formData, setFormData }) => {
  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      education: { ...prev.education, [field]: value },
    }));
  };

  return (
    <VStack spacing={4} align="stretch">
      <Box>
        <FormLabel>Degree</FormLabel>
        <Input
          value={formData.education.degree}
          onChange={(e) => handleChange("degree", e.target.value)}
          placeholder="e.g. MBBS, MD, etc."
        />
      </Box>

      <Box>
        <FormLabel>Institute</FormLabel>
        <Input
          value={formData.education.institute}
          onChange={(e) => handleChange("institute", e.target.value)}
          placeholder="e.g. Aga Khan University"
        />
      </Box>

      <Box>
        <FormLabel>Year of Completion</FormLabel>
        <Input
          type="number"
          value={formData.education.year}
          onChange={(e) => handleChange("year", e.target.value)}
          placeholder="e.g. 2021"
        />
      </Box>
    </VStack>
  );
};

export default Step2;
