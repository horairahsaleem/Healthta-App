import { Box, Heading, Text, VStack } from "@chakra-ui/react";

const Step5 = () => (
  <VStack spacing={5} align="center" textAlign="center">
    <Heading size="md">Your Profile is Under Review</Heading>
    <Text color="gray.600">
      Our team is reviewing your submitted details. You’ll be notified once
      verification is complete.
    </Text>
  </VStack>
);

export default Step5;
