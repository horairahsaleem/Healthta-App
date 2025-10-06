import React, { useState, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/actions/userActions.js";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { socialLogin } from "../../redux/actions/userActions.js";
import axios from "axios"; // only for fallback if access_token present


const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    city: "",
    email: "",
    phone: "",
    sex: "",
    language: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();


// inside component
// CHANGED / REPLACE your existing googleLogin definition with this
const googleLogin = useGoogleLogin({
  onSuccess: async (tokenResponse) => {
    try {
      // tokenResponse may contain `credential` (id_token JWT) OR `access_token`
      // Log the full response while debugging:
      // console.log("Google tokenResponse:", tokenResponse);

      const idToken = tokenResponse?.credential || null;       // id_token (JWT) if present
      const accessToken = tokenResponse?.access_token || null; // access_token if present

      let socialId = "";
      let email = "";
      let firstName = "";
      let lastName = "";

      if (idToken) {
        // dynamic import works reliably with Vite/Esm
        const { default: jwtDecode } = await import("jwt-decode");
        const decoded = jwtDecode(idToken);
        socialId = decoded.sub;
        email = decoded.email;
        firstName = decoded.given_name || "";
        lastName = decoded.family_name || "";
      } else if (accessToken) {
        // fallback: call Google userinfo endpoint using access token
        const { data: profile } = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        socialId = profile.sub || profile.id || "";
        email = profile.email || "";
        firstName = profile.given_name || (profile.name ? profile.name.split(" ")[0] : "");
        lastName = profile.family_name || (profile.name ? profile.name.split(" ").slice(1).join(" ") : "");
      } else {
        throw new Error("No token returned from Google");
      }

      // required by your backend: provider, socialId, email
      await dispatch(
        socialLogin("google", idToken || accessToken || "", {
          socialId,
          email,
          firstName,
          lastName,
        })
      );

      // socialLogin action calls loadUser(); navigate after that
      navigate("/dashboard");
    } catch (err) {
      // helpful debug logs
      console.error("Google social login failed:", err?.response?.data || err.message || err);
      // the reducer/app toasts will show user-friendly messages if action failed
    }
  },
  onError: () => console.error("Google login error"),
  scope: "openid profile email",
});


  const { loading, success } = useSelector((state) => state.user);

  // Redirect after successful signup
  useEffect(() => {
    if (success) {
      navigate("/login"); // go to login after signup
    }
  }, [success, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
  };

  return (
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
        as="form"
        onSubmit={handleSubmit}
        direction="column"
        bg="white"
        flex="0 0 50%"
        p={{ base: 3, md: "8px 32px 24px 32px" }}
        align="stretch"
      >
        <Box mb={{ base: 0, md: 2 }}>
          <Image
            src="/images/3d35bcfb42e3d67dbf5977e13542b0601e0d275c.png"
            alt="Logo"
            w={{ base: "140px", md: "242px" }}
            h="100px"
            objectFit="cover"
          />
        </Box>

        <Heading fontSize={{ base: "32px", md: "48px" }} fontWeight="700" mb={{ base: 1, md: 3 }} color="black">
          Sign Up
        </Heading>

        <Text fontSize="14px" color="gray.600" mb={{ base: 2, md: 6 }}>
          Already have an account?{" "}
          <Text as="span" color="#8DC645" fontWeight="600" cursor="pointer" onClick={() => navigate("/login")}>
            Login
          </Text>
        </Text>

        <VStack align="flex-start" spacing={5} w="100%" maxW="640px">
          <HStack spacing={4} w="100%" flexWrap="wrap">
            <Box flex="1" minW="0">
              <Text fontSize="14px" fontWeight="500">First Name</Text>
              <Input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Enter first name" h="60px" />
            </Box>
            <Box flex="1" minW="0">
              <Text fontSize="14px" fontWeight="500">Last Name</Text>
              <Input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Enter last name" h="60px" />
            </Box>
          </HStack>

          <HStack spacing={4} w="100%" flexWrap="wrap">
            <Box flex="1" minW="0">
              <Text fontSize="14px" fontWeight="500">City</Text>
              <Input name="city" value={formData.city} onChange={handleChange} placeholder="Enter city" h="60px" />
            </Box>
            <Box flex="1" minW="0">
              <Text fontSize="14px" fontWeight="500">E-mail</Text>
              <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email" h="60px" />
            </Box>
          </HStack>

          <HStack spacing={4} w="100%" flexWrap="wrap">
            <Box flex="1" minW="0">
              <Text fontSize="14px" fontWeight="500">Phone</Text>
              <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter phone number" h="60px" />
            </Box>
            <Box flex="1" minW="0">
              <Text fontSize="14px" fontWeight="500">Sex</Text>
              <Select name="sex" value={formData.sex} onChange={handleChange} placeholder="Select sex" h="60px">
                <option>Male</option>
                <option>Female</option>
              </Select>
            </Box>
          </HStack>

          <Box w="100%">
            <Text fontSize="14px" fontWeight="500">Language</Text>
            <Select name="language" value={formData.language} onChange={handleChange} placeholder="Select language" h="60px">
              <option>English</option>
              <option>Urdu</option>
              <option>Arabic</option>
            </Select>
          </Box>

          <Box w="100%">
            <Text fontSize="14px" fontWeight="500">Password</Text>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                h="60px"
              />
              <InputRightElement>
                <Button size="sm" variant="ghost" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </Box>

          <Button
            type="submit"
            w="100%"
            maxW="528px"
            h="60px"
            borderRadius="10px"
            bg="#2CA8E0"
            color="white"
            fontSize="18px"
            fontWeight="600"
            isLoading={loading}
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
            <Button   onClick={googleLogin}  w="100%" h="60px" border="1px solid" borderColor="gray.300" borderRadius="27px" justifyContent="flex-start" pl="24px" gap="12px" bg="white">
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
      <Flex direction="column" bg="#001439" flex="0 0 50%" p={{ base: 3, md: "8px 32px 24px 32px" }} align="stretch" justify="flex-start">
        <Flex direction="column" height="100%" align="center" justify="flex-start" position="relative">
          <Button position="absolute" top={{ base: "4px", md: "6px" }} left="50%" transform="translateX(-50%)" zIndex={3} variant="ghost" leftIcon={<MdSupport color="white" />} size="sm" color="white" _hover={{ bg: "transparent" }}>
            <Text fontSize={{ base: "13px", md: "15px" }} fontWeight="600" color="white">Support</Text>
          </Button>

          <Box mt={{ base: "36px", md: "56px" }} />
          <Box w={{ base: "80%", md: "380px" }} h={{ base: "240px", md: "570px" }} borderRadius="20px" overflow="hidden" bg="#001439" display="flex" alignItems="center" justifyContent="center" flexShrink={0}>
            <Image src="/images/Group 1000008133.png" alt="Right panel visual" maxW="100%" maxH="100%" objectFit="contain" />
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
