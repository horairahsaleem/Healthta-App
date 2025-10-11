// import React, { useState } from "react";
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalCloseButton,
//   Box,
//   Heading,
//   Text,
//   Button,
//   Flex,
//   useToast,
// } from "@chakra-ui/react";
// import axios from "axios";

// import Step1 from "./Step1";
// import Step2 from "./Step2";
// import Step3 from "./Step3";
// import Step4 from "./Step4";
// import Step5 from "./Step5"; // renamed for clarity

// const steps = [
//   { id: 1, label: "Specialties" },
//   { id: 2, label: "Education" },
//   { id: 3, label: "Experience" },
//   { id: 4, label: "Documents" },
//   { id: 5, label: "Review" },
// ];

// const OnboardingModal = ({ isOpen, onClose }) => {
//   const [step, setStep] = useState(1);
//   const toast = useToast();

//   const [formData, setFormData] = useState({
//     specialization: "",
//     subSpecialization: "",
//     education: { degree: "", institute: "", year: "" },
//     experience: { institute: "", from: "", to: "", file: null },
//     documents: { country: "", state: "", file: null },
//   });

//   const nextStep = () => setStep((prev) => Math.min(prev + 1, 5));
//   const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

//   // --- handleSubmit API call ---
//   const handleSubmit = async () => {
//     try {
//       const form = new FormData();
//       form.append("specialization", formData.specialization);
//       form.append("subSpecialization", formData.subSpecialization);
//       form.append("degree", formData.education.degree);
//       form.append("institute", formData.education.institute);
//       form.append("year", formData.education.year);
//       form.append("expInstitute", formData.experience.institute);
//       form.append("expFrom", formData.experience.from);
//       form.append("expTo", formData.experience.to);
//       if (formData.experience.file)
//         form.append("expFile", formData.experience.file);
//       form.append("country", formData.documents.country);
//       form.append("state", formData.documents.state);
//       if (formData.documents.file)
//         form.append("docFile", formData.documents.file);

//       // ---- API call ----
//       const { data } = await axios.post(
//         "http://localhost:4000/api/v1/onboarding",
//         form,
//         {
//           withCredentials: true,
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );

//       if (data.success) {
//         toast({
//           title: "Profile submitted!",
//           description: "Your onboarding details were successfully submitted.",
//           status: "success",
//           position: "top-right",
//         });
//         setStep(5); // show "Under Review" modal
//       } else {
//         throw new Error(data.message || "Submission failed");
//       }
//     } catch (error) {
//       toast({
//         title: "Error submitting profile",
//         description: error.response?.data?.message || error.message,
//         status: "error",
//         position: "top-right",
//       });
//     }
//   };

//   // --- Render step content ---
//   const renderStep = () => {
//     switch (step) {
//       case 1:
//         return <Step1 formData={formData} setFormData={setFormData} />;
//       case 2:
//         return <Step2 formData={formData} setFormData={setFormData} />;
//       case 3:
//         return <Step3 formData={formData} setFormData={setFormData} />;
//       case 4:
//         return (
//           <Step4
//             formData={formData}
//             setFormData={setFormData}
//             onSubmit={handleSubmit}
//           />
//         );
//       case 5:
//         return <Step5 />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <Modal isOpen={isOpen} size="xl" isCentered>
//       <ModalOverlay />
//       <ModalContent p={8} borderRadius="2xl">
//         <ModalCloseButton onClick={onClose} />
//         <Heading size="lg" mb={1}>
//           {step === 5 ? "Profile Under Review" : "Complete your onboarding"}
//         </Heading>
//         {step !== 5 && (
//           <Text color="gray.500" mb={6}>
//             Provide your complete details to proceed.
//           </Text>
//         )}

//         {/* Progress Bar */}
//         {step !== 5 && (
//           <Flex justify="space-between" align="center" mb={8}>
//             {steps.map((s) => (
//               <Flex key={s.id} direction="column" align="center" flex="1">
//                 <Box
//                   w="32px"
//                   h="32px"
//                   borderRadius="full"
//                   bg={
//                     s.id < step
//                       ? "green.400"
//                       : s.id === step
//                       ? "blue.400"
//                       : "gray.300"
//                   }
//                   color="white"
//                   display="flex"
//                   alignItems="center"
//                   justifyContent="center"
//                   fontWeight="bold"
//                 >
//                   {s.id < step ? "✓" : s.id}
//                 </Box>
//                 <Text
//                   fontSize="sm"
//                   mt={2}
//                   color={s.id <= step ? "black" : "gray.400"}
//                 >
//                   {s.label}
//                 </Text>
//               </Flex>
//             ))}
//           </Flex>
//         )}

//         {/* Step Content */}
//         {renderStep()}

//         {/* Navigation Buttons */}
//         {step < 4 && (
//           <Flex justify="space-between" mt={10}>
//             <Button
//               variant="link"
//               colorScheme="green"
//               onClick={prevStep}
//               isDisabled={step === 1}
//             >
//               Back
//             </Button>
//             <Button colorScheme="blue" onClick={nextStep}>
//               Next
//             </Button>
//           </Flex>
//         )}

//         {/* Step 4 Submit Button */}
//         {step === 4 && (
//           <Flex justify="space-between" mt={10}>
//             <Button
//               variant="link"
//               colorScheme="green"
//               onClick={prevStep}
//               isDisabled={step === 1}
//             >
//               Back
//             </Button>
//             <Button colorScheme="green" onClick={handleSubmit}>
//               Submit
//             </Button>
//           </Flex>
//         )}
//       </ModalContent>
//     </Modal>
//   );
// };

// export default OnboardingModal;








import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Box,
  Heading,
  Text,
  Button,
  Flex,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";

const steps = [
  { id: 1, label: "Specialties" },
  { id: 2, label: "Education" },
  { id: 3, label: "Experience" },
  { id: 4, label: "Documents" },
  { id: 5, label: "Review" },
];

const initialForm = {
  specialization: "",
  subSpecialization: "",
  education: { degree: "", institute: "", year: "" },
  experience: { institute: "", from: "", to: "", files: [] }, // files: File[]
  documents: { country: "", state: "", files: [] }, // files: File[]
};

const STORAGE_KEY = "onboardingForm_v1";

const OnboardingModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const toast = useToast();

  // actual state that holds File objects in memory
  const [formDataState, setFormDataState] = useState(initialForm);

  // metadata for files stored in localStorage (names, sizes) so UI shows them across refresh
  const [fileMeta, setFileMeta] = useState({ experience: [], documents: [] });

  // wrapper setter that also saves serializable metadata to localStorage
  const setFormData = (updater) => {
    setFormDataState((prev) => {
      const next = typeof updater === "function" ? updater(prev) : { ...prev, ...updater };
      // create serializable copy (files -> metadata)
      try {
        const serializable = {
          ...next,
          experience: {
            ...next.experience,
            files: (next.experience.files || []).map((f) => ({
              name: f.name,
              size: f.size,
              type: f.type,
            })),
          },
          documents: {
            ...next.documents,
            files: (next.documents.files || []).map((f) => ({
              name: f.name,
              size: f.size,
              type: f.type,
            })),
          },
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(serializable));
        // update fileMeta too
        setFileMeta({
          experience: serializable.experience.files || [],
          documents: serializable.documents.files || [],
        });
      } catch (err) {
        // ignore
      }
      return next;
    });
  };

  // on mount, hydrate text fields and file metadata (not actual File objects)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setFormDataState((prev) => ({
          ...prev,
          specialization: parsed.specialization || prev.specialization,
          subSpecialization: parsed.subSpecialization || prev.subSpecialization,
          education: parsed.education || prev.education,
          // keep files empty (actual File objects cannot be restored)
          experience: { ...prev.experience, institute: parsed.experience?.institute || prev.experience.institute, from: parsed.experience?.from || prev.experience.from, to: parsed.experience?.to || prev.experience.to, files: [] },
          documents: { ...prev.documents, country: parsed.documents?.country || prev.documents.country, state: parsed.documents?.state || prev.documents.state, files: [] },
        }));
        setFileMeta({
          experience: parsed.experience?.files || [],
          documents: parsed.documents?.files || [],
        });
      }
    } catch (e) {
      // ignore
    }
  }, []);

  // navigation helpers
  const nextStep = () => setStep((p) => Math.min(p + 1, 5));
  const prevStep = () => setStep((p) => Math.max(p - 1, 1));

  // Called by Step3 & Step4 to add files (multiple)
  const handleFileChange = (section, newFilesArray) => {
    // newFilesArray is an Array of File objects
    setFormData((prev) => {
      const combined = [...prev[section].files, ...newFilesArray];
      return {
        ...prev,
        [section]: {
          ...prev[section],
          files: combined,
        },
      };
    });
  };

  // remove file at index from a section's files array
  const handleRemoveFile = (section, index) => {
    setFormData((prev) => {
      const newFiles = (prev[section].files || []).filter((_, i) => i !== index);
      return {
        ...prev,
        [section]: {
          ...prev[section],
          files: newFiles,
        },
      };
    });
    // update metadata in localStorage as well
    setFileMeta((prevMeta) => {
      const arr = (prevMeta[section] || []).filter((_, i) => i !== index);
      const next = { ...prevMeta, [section]: arr };
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          parsed[section] = parsed[section] || {};
          parsed[section].files = arr;
          localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
        }
      } catch (e) {}
      return next;
    });
  };

  // submit
  const handleSubmit = async () => {
    try {
      const form = new FormData();
      form.append("specialization", formDataState.specialization);
      form.append("subSpecialization", formDataState.subSpecialization);
      form.append("degree", formDataState.education.degree);
      form.append("institute", formDataState.education.institute);
      form.append("year", formDataState.education.year);
      form.append("expInstitute", formDataState.experience.institute);
      form.append("expFrom", formDataState.experience.from);
      form.append("expTo", formDataState.experience.to);

      // append experience files (expFiles[])
      (formDataState.experience.files || []).forEach((file) => form.append("expFiles[]", file));

      form.append("country", formDataState.documents.country);
      form.append("state", formDataState.documents.state);

      // append doc files (docFiles[])
      (formDataState.documents.files || []).forEach((file) => form.append("docFiles[]", file));

      // dummy endpoint — replace when backend ready
      const { data } = await axios.post("https://dummyapi.com/onboard", form, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      // simulate success if dummy doesn't return .success
      if (data?.success === false) throw new Error(data.message || "Submission failed");
      // treat any response as success for dummy
      toast({
        title: "Profile submitted!",
        description: "Your onboarding details were successfully submitted.",
        status: "success",
        position: "top-right",
      });
      setStep(5);
    } catch (error) {
      toast({
        title: "Error submitting profile",
        description: error.response?.data?.message || error.message || "Something went wrong",
        status: "error",
        position: "top-right",
      });
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 formData={formDataState} setFormData={setFormData} />;
      case 2:
        return <Step2 formData={formDataState} setFormData={setFormData} />;
      case 3:
        return (
          <Step3
            formData={formDataState}
            setFormData={setFormData}
            handleFileChange={handleFileChange}
            handleRemoveFile={handleRemoveFile}
            fileMeta={fileMeta.experience}
          />
        );
      case 4:
        return (
          <Step4
            formData={formDataState}
            setFormData={setFormData}
            handleFileChange={handleFileChange}
            handleRemoveFile={handleRemoveFile}
            fileMeta={fileMeta.documents}
            onSubmit={handleSubmit}
          />
        );
      case 5:
        return <Step5 />;
      default:
        return null;
    }
  };

  return (
    <Modal isOpen={isOpen} size="xl" isCentered>
      <ModalOverlay />
      <ModalContent p={8} borderRadius="2xl">
        <ModalCloseButton onClick={onClose} />
        <Heading size="lg" mb={1}>
          {step === 5 ? "Profile Under Review" : "Complete your onboarding"}
        </Heading>
        {step !== 5 && <Text color="gray.500" mb={6}>Provide your complete details to proceed.</Text>}

        {/* Progress */}
        {step !== 5 && (
          <Flex justify="space-between" align="center" mb={8}>
            {steps.map((s) => (
              <Flex key={s.id} direction="column" align="center" flex="1">
                <Box
                  w="32px" h="32px" borderRadius="full"
                  bg={s.id < step ? "green.400" : s.id === step ? "blue.400" : "gray.300"}
                  color="white" display="flex" alignItems="center" justifyContent="center"
                  fontWeight="bold"
                >
                  {s.id < step ? "✓" : s.id}
                </Box>
                <Text fontSize="sm" mt={2} color={s.id <= step ? "black" : "gray.400"}>
                  {s.label}
                </Text>
              </Flex>
            ))}
          </Flex>
        )}

        {renderStep()}

        {/* Navigation */}
        {step < 4 && (
          <Flex justify="space-between" mt={10}>
            <Button variant="link" colorScheme="green" onClick={prevStep} isDisabled={step === 1}>
              Back
            </Button>
            <Button colorScheme="blue" onClick={nextStep}>Next</Button>
          </Flex>
        )}

        {step === 4 && (
          <Flex justify="space-between" mt={10}>
            <Button variant="link" colorScheme="green" onClick={prevStep}>Back</Button>
            <Button colorScheme="green" onClick={handleSubmit}>Submit</Button>
          </Flex>
        )}
      </ModalContent>
    </Modal>
  );
};

export default OnboardingModal;
