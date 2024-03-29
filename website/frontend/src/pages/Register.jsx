import React, { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'
import {
    Box,
    Input,
    Flex,
    Stack,
    FormControl,
    FormLabel,
    Heading,
    Text,
    Link,
    Button,
    useColorModeValue,
} from "@chakra-ui/react"



const Login = () => {
  const navigate = useNavigate()
const routeChange = (path) => {
    navigate(path)
}
    //states- one for each backend method
    const [credentials, setNewCreds] = useState({ //For the post method
        email: "", // corresponds to the name of the field in the json body
        username: "",
        bitcoin_wallet: "",
        password: "",
    })


    //handleChange and handleClick- for the post method
    const handleChange = (e) => {
        setNewCreds(prev => ({...prev, [e.target.name]: e.target.value})) //set the state to the value of the input
    }

    const handleClick = async (e) => {
        try {
            const res = await axios.post("http://localhost:40000/api/register", credentials)
            setNewCreds({
              username: "",
              password: ""
            }) // reset the form
          if (res.status === 200)
            routeChange(`/user/${res.data[`user_id`]}`)
        } catch(err) {
            alert(`Something went wrong with the login!`)
            console.log(err)
        }
    }

    return (
        <Box bg="blackAlpha.900" h="100%" minH="100vh" pb={5}>
            <Navbar />
          <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>

            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
              <Stack align={'center'}>
                <Heading fontSize={'4xl'}>Regsiter your account</Heading>
                <Text fontSize={'lg'} color={'gray.600'}>
                  to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
                </Text>
              </Stack>
              <Box
                rounded={'lg'}
                bg={useColorModeValue('white', 'gray.700')}
                boxShadow={'lg'}
                p={8}>
                <Stack spacing={4}>
                  <FormControl id="email">
                    <FormLabel>Email</FormLabel>
                    <Input name="email" type="text" onChange={handleChange}/>
                  </FormControl>
                  <FormControl id="username">
                    <FormLabel>Username</FormLabel>
                    <Input name="username" type="text" onChange={handleChange}/>
                  </FormControl>
                  <FormControl id="bitcoin_wallet">
                    <FormLabel>Bitcoin Wallet</FormLabel>
                    <Input name="bitcoin_wallet" type="text" onChange={handleChange}/>
                  </FormControl>
                  <FormControl id="password">
                    <FormLabel>Password</FormLabel>
                    <Input name="password" type="password" onChange={handleChange} />
                  </FormControl>
                  <Stack spacing={10}>
                    <Button
                    onClick={handleClick}
                      bg={'blue.400'}
                      color={'white'}
                      _hover={{
                        bg: 'blue.500',
                      }}>
                      Register
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </Flex>
          </Box>
        )
      }

export default Login
