import React, { useState } from "react"
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
    VStack,
} from "@chakra-ui/react"

const BotnetOrders = () => {
    //states- one for each backend method
    const [orderData, setOrderData] = useState({})
    const [orderID, setOrderID] = useState(``)
    const [renderData, setRenderData] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [updatedOrderData, setUpdatedOrderData] = useState({})

        //handleChange and handleClick- for the post method
    const handleChange = (e) => {
        setOrderID(prev => ({...prev, [e.target.name]: e.target.value})) //set the state to the value of the input
    }

    const getOrderInfo = async () => {
        try{
            const res = await axios.get(`http://localhost:40000/api/botnet-orders/${orderID.order_number}`) // this is the backend endpoint
                setOrderData(res.data) // set the state to the data returned from the backend
            const {
                price,
                number_of_bots,
                order_id,
                user_id,
                time_of_use,
                time_stamp,
                approved,
            } = res.data
            setOrderData({price, number_of_bots, order_id, user_id, time_of_use, time_stamp, approved})
            handleRenderData()
        }
        catch(err){
            console.error(err.message) // console log the error
        }
    }

    const handleDelete = async () => {
        try{
            const res = await axios.delete(`http://localhost:40000/api/botnet-orders/${orderID.order_number}`) // this is the backend endpoint
        }
        catch(err){
            console.error(err.message) // console log the error
        }
    }

    const handleChangeOrderInfo = async () => {
        try{
            if (updatedOrderData !== {}){
                const res = await axios.put(`http://localhost:40000/api/botnet-orders/${orderID.order_number}`, updatedOrderData) // this is the backend endpoint
            }
            else {
                alert(`Please enter a value to update or cancel the update`)
            }
        }
        catch(err){
            console.error(err.message) // console log the error
        }
    }

    const handleClickBack = () => {
        window.location.reload(false)
    }

    const handleRenderData = () => {
        setRenderData(!renderData)
    }

    const handleIsUpdate = () => {
        if (isUpdate === false)
            setUpdatedOrderData(orderData)
        setIsUpdate(!isUpdate)
    }
    const handleChangeUpdateInput = (e) => {
        setUpdatedOrderData(prev => ({...prev, [e.target.name]: Number(e.target.value)})) //set the state to the value of the input
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
                    </Flex>
                </Box>
            }
            {renderData === true &&
                <Box bg="blackAlpha.900" h="100%" minH="100vh" pb={5}>
                    <Navbar />
                        <Heading color='white'>Order</Heading>
                    <Flex direction="column" align="center">
                        { isUpdate === false ?
                            Object.entries(orderData).map((item, i) => {
                                return <ListItem key={i} name={item[0]} value={item[1]} isUpdate={isUpdate} />
                            })
                            :

                            <>
                                {
                                    Object.entries(orderData).map((item, i) => {
                                        return (
                                            <FormControl key={i}>
                                                <FormLabel color='white'>{item[0]}</FormLabel>
                                                <ListItem name={item[0]} value={item[1]} isUpdate={isUpdate} handleChangeUpdateInput={handleChangeUpdateInput} />
                                            </FormControl>
                                        )
                                    })
                                }
                                <Button
                                onClick={handleChangeOrderInfo}
                                bg='green.400'
                                color='white'
                                _hover={{bg: 'green.600'}}
                                >
                                    Submit
                                </Button>
                            </>

                        }
                    </Flex>
                    <VStack spacing={4} align='full'>
                        <Button onClick={handleClickBack} bg={'gray.600'} color={'white'} _hover={{bg: 'gray.700'}}>
                            Back
                        </Button>
                        <Button
                        onClick={() => {
                            handleDelete()
                            handleClickBack()
                            }
                        }
                        bg={'red.500'} color={'white'} _hover={{bg: 'red.700'}}>
                            Delete
                        </Button>
                        {isUpdate ?
                            <Button onClick={handleIsUpdate} bg={'white'} color={'black'} _hover={{bg: 'white.300'}}>
                                Cancel
                            </Button>
                            :
                            <Button onClick={handleIsUpdate} bg={'yellow.400'} color={'white'} _hover={{bg: 'yellow.500'}}>
                                Update
                            </Button>
                        }

                    </VStack>
                </Box>
            }
        </>
    )
}

export default BotnetOrders
