import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Table,
  TableContainer,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import toast from "react-hot-toast"

export default function Buy({ state, account }) {
  const [memos, setMemos] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { contract = {} } = state;

  useEffect(() => {
    const memosMessage = async () => {
      const memos = await contract.getMemos();
      setMemos(memos);
    };
    contract && memosMessage();
  }, [contract]);

  const buyChai = async (e) => {

    e.preventDefault();
    const { contract } = state;
    const name = document.querySelector("#name").value;
    const message = document.querySelector("#message").value;
    // console.log(name, message, contract);
    const value = { value: ethers.utils.parseEther("0.001") };

    const transaction = await contract.buyChai(name, message, value);
    toast.success("Transaction is completed")

    await transaction.wait();
    toast.success("Transaction is completed")
    console.log("Transaction is completed");
    // location.reload();
  };

  return (
    <Box
    height={"100vh"}
    className="buy_chai"
    display={"flex"}
    flexDirection={"column"}
    alignItems={"center"}
    justifyContent={"space-around"}
    bgImage={"https://img.freepik.com/free-vector/abstract-black-texture-background-hexagon_206725-413.jpg?w=826&t=st=1709566416~exp=1709567016~hmac=2d51028858099f6bd07bb5ad4d353523be02194c615346b1536fd1a64fb8c49d"}
    bgSize={"cover"}
  >
    <Box>
      <Heading mt={"10"} textColor={"#F6F1F1"} fontSize="4xl" fontWeight="bold" textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)">Buy Me a Coffee ☕️</Heading>
      <small style={{ color: "lightgray" ,paddingTop:"20px "}}  fontSize="xl">Account: {account}</small>
    </Box>
    <Box textColor={"#F6F1F1"} fontSize="xl">
      <form onSubmit={buyChai}>
        <FormControl my={"1"} width={"80"}>
          <FormLabel fontWeight={"bold"} fontSize="2xl">Name</FormLabel>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name..."
            variant={"flushed"}
            _placeholder={{ opacity: 1, color: "#d3d3d3",padding:"6px" }}
          />
        </FormControl>
        <FormControl my={"1"}>
          <FormLabel fontWeight={"bold"} fontSize="2xl">Message</FormLabel>
          <Input
            type="text"
            name="message"
            id="message"
            placeholder="Enter your message..."
            variant={"flushed"}
            _placeholder={{ opacity: 1, color: "#d3d3d3",padding:"6px" }}
          />
        </FormControl>
        <Box my={"2"}>
          <ButtonGroup display={"flex"} justifyContent={"space-between"}>
            <Button
              onClick={onOpen}
              borderRadius={"full"}
              colorScheme="whatsapp"
              isDisabled={!state.contract}
              _hover={{ bg: "green.500" }}
              fontSize="2xl"
            >
              Transactions
            </Button>
            <Modal
              motionPreset="scale"
              size={"6xl"}
              isOpen={isOpen}
              onClose={onClose}
            >
              <ModalOverlay backdropFilter="blur(10px)" />
              <ModalContent>
                <ModalHeader fontSize="2xl" fontWeight="bold">Transaction History</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <div className="memos">
                    <Box>
                      <TableContainer>
                        <Table variant={"striped"}>
                          <Thead textColor={"red.100"}>
                            <Tr>
                              <Th>Name</Th>
                              <Th>Message</Th>
                              <Th>Timestamp</Th>
                              <Th>From</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {memos.map((memos) => {
                              return (
                                <Tr key={memos.timeStamp}>
                                  <Td>{memos.name}</Td>
                                  <Td>{memos.message}</Td>
                                  <Td>
                                    {new Date(
                                      memos.timeStamp * 1000
                                    ).toLocaleString()}
                                  </Td>
                                  <Td>{memos.from}</Td>
                                </Tr>
                              );
                            })}
                          </Tbody>
                        </Table>
                      </TableContainer>
                    </Box>
                  </div>
                </ModalBody>
  
                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onClose} fontSize="2xl">
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            <Button
              isDisabled={!state.contract}
              width={"24"}
              type="submit"
              borderRadius={"full"}
              colorScheme="twitter"
              _hover={{ bg: "blue.500" }}
              fontSize="2xl"
            >
              Pay
            </Button>
          </ButtonGroup>
        </Box>
      </form>
    </Box>
    <Box></Box>
  </Box>
  

  );
}
