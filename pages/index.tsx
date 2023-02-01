import { GetServerSideProps } from "next";
import Link from "next/link";
import {
  AbsoluteCenter,
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Show,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Quicksand } from "@next/font/google";
import axios from "axios";
import CopyCode from "@/components/CopyCode";
import { BiCopy } from "react-icons/bi";
import { set } from "mongoose";
const fnt = Quicksand({
  weight: "400",
  subsets: ["latin"],
});

interface Idata {
  _id?: string;
  mainUrl: string;
  clickCount: number;
  shortUrl: string;
}

interface propsData {
  res: Idata[];
}

const Home = (props: propsData) => {
  const { res } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [text, setText] = useState<string>("");
  const [sUrl, setSUrl] = useState<string>("");
  const [links, setLinks] = useState<Idata[]>(res);
  const toast = useToast();
  const [bool, setBool] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setBool(true);
      const { data } = await axios.post(`api/`, { mainUrl: text });
      setLinks([...links, data]);
      setSUrl(`https://h-ref.vercel.app/${data.shortUrl}`);
      setBool(false);
      onOpen();
      setText("");
    } catch (e: any) {
      setBool(false);
      console.log(e.message);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleCopy = (uri: string): void => {
    navigator.clipboard
      .writeText(`https://h-ref.vercel.app/${uri}`)
      .then(() =>
        toast({
          position: "top-right",
          duration: 2000,
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
    <Box bg="#14213d" className={fnt.className} minH="100vh">
      <Box w={["90%", "80%", "70%", "60%"]} m="auto">
        <Text
          fontSize="8rem"
          textAlign="center"
          color="#E5E5E5"
          fontWeight="600"
        >
          href
        </Text>
        <Text fontSize="2rem" textAlign="center" color="#E5E5E5">
          Shorten Url in a Snap
        </Text>
        <Flex justify="center" mb="2rem">
          <Image h="300px" w="300px" src="./banner.png" alt="banner-image" />
        </Flex>
        <form onSubmit={handleSubmit}>
          <InputGroup size="md">
            <Input
              isRequired
              value={text}
              color="#E5E5E5"
              pr="4.5rem"
              type="url"
              placeholder="Enter Your Url"
              onChange={handleChange}
              _focus={{ outlineColor: "#FCA311" }}
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                type="submit"
                color="#FCA311"
                variant="unstyled"
                isDisabled={!text.length}
                isLoading={bool}
              >
                shorten
              </Button>
            </InputRightElement>
          </InputGroup>
        </form>
        <CopyCode
          link={sUrl}
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
        />
        <Box w="100%" overflowX="auto">
          <Table color="#E5E5E5" size={["xs", "sm", "md", "lg"]} my="2rem">
            <Thead>
              <Tr>
                <Th>Long Url</Th>
                <Th>Short Url</Th>
                <Th>Click Count</Th>
                <Th>Copy</Th>
              </Tr>
            </Thead>
            <Tbody>
              {links &&
                links.map((el) => (
                  <Tr key={el._id}>
                    <Td>
                      {el.mainUrl.length > 40
                        ? el.mainUrl.substring(0, 36) + "..."
                        : el.mainUrl}
                    </Td>
                    <Td color="#FCA311">
                      {" "}
                      <Link href={`/${el.shortUrl}`}>{el.shortUrl}</Link>
                    </Td>
                    <Td>{el.clickCount}</Td>
                    <Td>
                      <IconButton
                        fontSize="2rem"
                        fontWeight="hairline"
                        aria-label="copy link"
                        variant="unstyled"
                        icon={<BiCopy color="#FCA311" />}
                        onClick={() => handleCopy(el.shortUrl)}
                      />
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data } = await axios.get("https://href-abhizeit.vercel.app/api");
  return {
    props: {
      res: data.data,
    },
  };
};
