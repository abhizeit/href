import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Text,
  IconButton,
  useToast,
  position,
  Box,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { MouseEvent } from "react";
import { BiCopy } from "react-icons/bi";

import { Quicksand } from "@next/font/google";
const fnt = Quicksand({
  weight: "400",
  subsets: ["latin"],
});

interface IModal {
  link: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const CopyCode = (props: IModal) => {
  const { isOpen, onClose, onOpen, link } = props;
  const toast = useToast();

  const handleCopy = (e: MouseEvent<HTMLButtonElement>) => {
    navigator.clipboard
      .writeText(link)
      .then(() =>
        toast({
          position: "top-right",
          render: () => (
            <Box
              className={fnt.className}
              p={3}
              bg="#FCA311"
              fontWeight="600"
              borderRadius="10px"
              zIndex="2"
              color="black"
            >
              Url Copied
            </Box>
          ),
        })
      )
      .catch((e) => console.log(e));
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          backdropFilter="auto"
          backdropBlur="3px"
          bg="blackAlpha.200"
        />
        <ModalContent
          mx="10px"
          bg="black"
          className={fnt.className}
          color="#E5E5E5"
          fontSize="20px"
        >
          <ModalBody>
            <Flex>
              <Text>{link}</Text>
              <Spacer />
              <Button
                leftIcon={<BiCopy />}
                color="#FCA311"
                variant="unstyled"
                onClick={handleCopy}
              >
                {" "}
                Copy Url
              </Button>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} variant="unstyled" color="#FCA311">
              close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CopyCode;
