import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  VStack,
  HStack,
  Select,
  Image,
  Divider,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { MdSupport } from "react-icons/md";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    // Page container (allows growing and single-page scroll)
    <Flex
      direction={{ base: "column", md: "row" }}
      minH="100vh"
      w="100vw"
      overflowX="hidden"
      overflowY="auto"
      align="stretch"
    >
      {/* LEFT SIDE */}
      <Flex
        direction="column"
        bg="white"
        flex="0 0 50%"
        boxSizing="border-box"
        /* reduced top padding to bring logo closer to top */
        p={{ base: 3, md: "8px 32px 24px 32px" }}
        align="stretch"
      >
        {/* Logo — smaller top gap now */}
        <Box mb={{ base: 0, md: 2}}>
          <Image
            src="/images/3d35bcfb42e3d67dbf5977e13542b0601e0d275c.png"
            alt="Logo"
            w={{ base: "140px", md: "242px" }}
            h="100px"
            objectFit="cover"
          />
        </Box>

        {/* Heading — tightened gap under logo */}
        <Heading
          fontSize={{ base: "32px", md: "48px" }}
          fontWeight="700"
          mb={{ base: 1, md: 3 }}
          color="black"
        >
          Sign Up
        </Heading>

        {/* small gap between heading and subtext */}
        <Text fontSize="14px" color="gray.600" mb={{ base: 2, md: 6 }}>
          Already have an account?{" "}
          <Text as="span" color="#8DC645" fontWeight="600" cursor="pointer">
            Login
          </Text>
        </Text>

        {/* FORM */}
        <VStack align="flex-start" spacing={5} w="100%" maxW="640px">
          <HStack spacing={4} w="100%" flexWrap="wrap">
            <Box flex="1" minW="0">
              <Text fontSize="14px" fontWeight="500">First Name</Text>
              <Input w="100%" h="60px" borderRadius="8px" placeholder="Enter first name" />
            </Box>
            <Box flex="1" minW="0">
              <Text fontSize="14px" fontWeight="500">Last Name</Text>
              <Input w="100%" h="60px" borderRadius="8px" placeholder="Enter last name" />
            </Box>
          </HStack>

          <HStack spacing={4} w="100%" flexWrap="wrap">
            <Box flex="1" minW="0">
              <Text fontSize="14px" fontWeight="500">City</Text>
              <Input w="100%" h="60px" borderRadius="8px" placeholder="Enter city" />
            </Box>
            <Box flex="1" minW="0">
              <Text fontSize="14px" fontWeight="500">E-mail</Text>
              <Input type="email" w="100%" h="60px" borderRadius="8px" placeholder="Enter email" />
            </Box>
          </HStack>

          <HStack spacing={4} w="100%" flexWrap="wrap">
            <Box flex="1" minW="0">
              <Text fontSize="14px" fontWeight="500">Phone</Text>
              <Input w="100%" h="60px" borderRadius="8px" placeholder="Enter phone number" />
            </Box>
            <Box flex="1" minW="0">
              <Text fontSize="14px" fontWeight="500">Sex</Text>
              <Select w="100%" h="60px" borderRadius="8px" placeholder="Select sex">
                <option>Male</option>
                <option>Female</option>
              </Select>
            </Box>
          </HStack>

          <Box w="100%">
            <Text fontSize="14px" fontWeight="500">Language</Text>
            <Select w="100%" h="60px" borderRadius="12px" borderColor="gray.300" placeholder="Select language">
              <option>English</option>
              <option>Urdu</option>
              <option>Arabic</option>
            </Select>
          </Box>

          <Box w="100%">
            <Text fontSize="14px" fontWeight="500">Password</Text>
            <InputGroup w="100%" h="60px">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                h="60px"
                borderRadius="8px"
              />
              <InputRightElement>
                <Button size="sm" variant="ghost" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </Box>

          <Button
            w="100%"
            maxW="528px"
            h="60px"
            borderRadius="10px"
            bg="#2CA8E0"
            color="white"
            fontSize="18px"
            fontWeight="600"
            _hover={{ bg: "#2CA8E0" }}
          >
            Sign Up
          </Button>

          <HStack w="100%" maxW="528px" my={5} spacing={4} align="center">
            <Divider borderColor="gray.300" />
            <Text fontSize="14px" color="gray.500" fontWeight="500">OR</Text>
            <Divider borderColor="gray.300" />
          </HStack>

          <VStack spacing={4} w="100%" maxW="528px">
            <Button w="100%" h="60px" border="1px solid" borderColor="gray.300" borderRadius="27px" justifyContent="flex-start" pl="24px" gap="12px" bg="white">
              <Image src="/images/googleicon.png" alt="Google" w="26px" h="25px" mr="8px" />
              <Text fontSize="16px" fontWeight="500" color="gray.700">Continue with Google</Text>
            </Button>

            <Button w="100%" h="60px" border="1px solid" borderColor="gray.300" borderRadius="27px" justifyContent="flex-start" pl="24px" gap="12px" bg="white">
              <Image src="/images/fbicon.png" alt="Facebook" w="26px" h="25px" mr="8px" />
              <Text fontSize="16px" fontWeight="500" color="gray.700">Continue with Facebook</Text>
            </Button>
          </VStack>
        </VStack>
      </Flex>

      {/* RIGHT SIDE */}
      <Flex
        direction="column"
        bg="#001439"
        flex="0 0 50%"
        boxSizing="border-box"
        p={{ base: 3, md: "8px 32px 24px 32px" }}
        align="stretch"
        justify="flex-start"
      >
        <Flex direction="column" height="100%" align="center" justify="flex-start" position="relative">
          {/* Support button pinned exactly at top center */}
          <Button
            position="absolute"
            top={{ base: "4px", md: "6px" }}   /* very close to top line */
            left="50%"
            transform="translateX(-50%)"
            zIndex={3}
            variant="ghost"
            leftIcon={<MdSupport color="white" />}
            size="sm"
            color="white"
            _hover={{ bg: "transparent" }}
            px={3}
          >
            <Text fontSize={{ base: "13px", md: "15px" }} fontWeight="600" color="white">Support</Text>
          </Button>

          {/* small top gap so image card sits right below support */}
          <Box mt={{ base: "36px", md: "56px" }} />

          <Box
            w={{ base: "80%", md: "380px" }}
            h={{ base: "240px", md: "570px" }}
            borderRadius="20px"
            overflow="hidden"
            boxShadow="lg"
            bg="#001439"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexShrink={0}
          >
            <Image
              src="/images/Group 1000008133.png"
              alt="Right panel visual"
              maxW="100%"
              maxH="100%"
              objectFit="contain"
            />
          </Box>

          <Box mt={{ base: 6, md: 12 }} w="100%" px={{ base: 4, md: 0 }} textAlign="center" mb={8}>
            <Box w={{ base: "90%", md: "502px" }} mx="auto">
              <Heading fontFamily={`"Akkurat", Inter, sans-serif`} fontWeight="700" fontSize={{ base: "28px", md: "40px" }} lineHeight={{ base: "36px", md: "50px" }} color="white" mb={4}>
                Everything You Need in One Platform
              </Heading>
              <Text fontFamily={`Inter, sans-serif`} fontWeight="400" fontSize={{ base: "16px", md: "20px" }} lineHeight={{ base: "24px", md: "30px" }} color="gray.300" maxW="498px" mx="auto">
                Unlock the full potential of Healentra with complete access to advanced medical services, personalized health tools, secure patient records, smart scheduling, and seamless online consultations—all in one place.
              </Text>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SignUp;
