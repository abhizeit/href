import React from "react";
import { Center, Spinner } from "@chakra-ui/react";

const Loader = () => {
  return (
    <Center h="100vh" bg="#14213D">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="#E5E5E5"
        color="#FCA311"
        size="xl"
      />
    </Center>
  );
};

export default Loader;
