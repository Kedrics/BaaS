import React, { useEffect, useState, Fragment } from "react"
import axios from 'axios'
import Navbar from '../components/Navbar'
import ListItem from '../components/ListItem'
import {
    Box,
    Stack,
    FormControl,
    FormLabel,
    Input,
    Button,
    Flex,
    Heading,
    Text,
} from "@chakra-ui/react"

const BotnetOrders = () => {
    //states- one for each backend method
    const [orderData, setOrderData] = useState({})
    const [orderID, setOrderID] = useState(``)
    const [renderData, setRenderData] = useState(false)

        //handleChange and handleClick- for the post method
    const handleChange = (e) => {
        setOrderID(prev => ({...prev, [e.target.name]: e.target.value})) //set the state to the value of the input
    }

    const getOrderInfo = async () => {
        try{
            const res = await axios.get(`http://api.app.com:40000/api/botnet-orders/${orderID.order_number}`) // this is the backend endpoint
                setOrderData(res.data) // set the state to the data returned from the backend
                console.log(res.data)
                const priceWithDollar = "$" + res.data.price
            const {
                number_of_bots,
                order_id,
                user_id,
                time_of_use,
                time_stamp,
                approved,
            } = res.data
            setOrderData({priceWithDollar, number_of_bots, order_id, user_id, time_of_use, time_stamp, approved})
            handleRenderData()
        }
        catch(err){
            console.error(err.message) // console log the error
        }
    }

    const handleRenderData = () => {
        setRenderData(!renderData)
    }

    const handleClickBack = () => {
        window.location.reload(false)
    }

    return (
        <>
            {renderData === false &&
                <Box bg="blackAlpha.900" h="100%" minH="100vh" pb={5}>
                <Navbar />
                    <Flex minH={'100vh'} align={'center'} justify={'center'}>
                        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                        <Stack align={'center'}>
                            <Heading fontSize={'4xl'} color='white'>Botnet Orders</Heading>
                            <Text fontSize={'lg'} color={'gray.600'}>
                            </Text>
                        </Stack>
                        <Box rounded={'lg'} boxShadow={'lg'} p={8}>
                            <Stack spacing={4}>
                                <FormControl id="order_number">
                                    <FormLabel color='white'>Order Number</FormLabel>
                                    <Input name="order_number" type="text" color='white' onChange={handleChange}/>
                                </FormControl>
                                <Stack spacing={10}>
                                    <Button onClick={getOrderInfo} bg={'blue.400'} color={'white'} _hover={{bg: 'blue.500'}}>
                                        Lookup
                                    </Button>
                                </Stack>
                            </Stack>
                        </Box>
                        </Stack>
                        {
                            Object.entries(orderData).map((item, i) => {
                                return <ListItem key={i} name={item[0]} value={item[1]} />
                            })
                        }
                    </Flex>
                </Box>
            }
            {renderData === true &&
                <Box bg="blackAlpha.900" h="100%" minH="100vh" pb={5}>
                    <Navbar />
                        <Heading color='white'>Order</Heading>
                    <Flex direction="column" align="center">
                        {
                            Object.entries(orderData).map((item, i) => {
                                return <ListItem key={i} name={item[0]} value={item[1]} />
                            })
                        }
                    </Flex>
                    <Button onClick={handleClickBack} bg={'gray.600'} color={'white'} _hover={{bg: 'gray.700'}}>
                        Back
                    </Button>
                </Box>
            }
        </>
    )
}

export default BotnetOrders
