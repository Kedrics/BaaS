import React, { useEffect, useState, Fragment } from "react"
import { useLocation } from 'react-router-dom'
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

const Bots = () => {
    console.log(`sagdg`)
    //states- one for each backend method
    const [userBotData, setUserBotData] = useState({})
    const [orderID, setOrderID] = useState(``)
    const [renderData, setRenderData] = useState(false)

    const location = useLocation()
    const PathUID = location.pathname.split(`/`)
    const UID = PathUID[1]

        //handleChange and handleClick- for the post method
    const handleChange = (e) => {
        setOrderID(prev => ({...prev, [e.target.name]: e.target.value})) //set the state to the value of the input
    }

    const getBotInfo = async () => {
        try{
                const res = await axios.get(`http://api.app.com:40000/api/users/${UID}/bots`) // this is the backend endpoint
                const {
                    bot_id,
                    os,
                    ip_address,
                    user_id
                } = res.data
                console.log(`pop`, res.data)
                setUserBotData({bot_id, os, ip_address, user_id})
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
                <Box bg="blackAlpha.900" h="100%" minH="100vh" pb={5}>
                    <Navbar />
                        <Heading color='white'>Order</Heading>
                    <Flex direction="column" align="center">
                        {
                            Object.entries(userBotData).map((item, i) => {
                                return <ListItem key={i} name={item[0]} value={item[1]} />
                            })
                        }
                    </Flex>
                    <Button onClick={handleClickBack} bg={'gray.600'} color={'white'} _hover={{bg: 'gray.700'}}>
                        Back
                    </Button>
                </Box>
        </>
    )
}

export default Bots
