import { Box, Container, Flex, Heading, SimpleGrid, Skeleton, Stack, Text } from "@chakra-ui/react";
import { ConnectWallet, MediaRenderer, Web3Button, useAddress, useContract, useContractRead, useMetadata } from "@thirdweb-dev/react";
import type { NextPage } from "next";
//import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const address = useAddress();
  const contractAddress = "0x8a65173c47E33A1cF606BB82Bae2AC81476618B5";

  const {contract} = useContract(contractAddress);
  const { data: metadata, isLoading: isloadingMetadata } = useMetadata(contract);

  const {data: totalMinted, isLoading: isloadingTotalMinted} = useContractRead(contract,"totalMinted");
  
  return (
    <Container maxW={"1200px"}>
      <Flex p={"20px"} justifyContent={"space-between"}>
        <Box></Box>
        <ConnectWallet />
      </Flex>
      <Flex h={"90vh"} alignItems={"center"} justifyContent={"center"}>
       <SimpleGrid columns={2} spacing={10} justifyItems={"center"}>
        <Box>
          <Skeleton isLoaded={!isloadingMetadata}>
            <MediaRenderer
             src={(metadata as {image: string})?.image}
            />
          </Skeleton>
        </Box>
        <Flex direction={"column"} justifyContent={"center"}>
          <Stack direction={"column"} spacing={10}>
          <Skeleton isLoaded={!isloadingMetadata}>
            <Heading>{(metadata as {name: string})?.name}</Heading>
          </Skeleton>
          <Skeleton isLoaded={!isloadingMetadata}>
            <Text>{(metadata as { description?: string})?.description}</Text>
          </Skeleton>
          <Skeleton isLoaded={!isloadingTotalMinted}>
          <p>Total Minted:{totalMinted?.toNumber()}/96</p>
          </Skeleton>
          {address ? (
            <Web3Button
              contractAddress={contractAddress}
              action={(contract) => contract.erc721.claim(1)}
            >Clame</Web3Button>
          ) : (
            <Text>Please Connect</Text>
          )}
          </Stack>
        </Flex>
       </SimpleGrid>
      </Flex>
    </Container>
  );
};

export default Home;
