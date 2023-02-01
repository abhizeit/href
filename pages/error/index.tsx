import { Center, Text } from "@chakra-ui/react";
import { Quicksand } from "@next/font/google";
const fnt = Quicksand({
  weight: "400",
  subsets: ["latin"],
});

export default function ErrorPage() {
  return (
    <Center h="100vh" bg="#14213D">
      <Text color="#FCA311" className={fnt.className} fontSize="30px">
        Something went wrong!
      </Text>
    </Center>
  );
}
