import React, { useEffect, useState, Fragment } from "react"
import axios from 'axios'
import { useLocation } from "react-router-dom"
import Navbar from '../components/Navbar'
import ListItem from '../components/ListItem'
import {
    Box,
    Flex,
    Heading,
    Divider,
} from "@chakra-ui/react"

const User = () => {
    //states- one for each backend method
    const [userData, setUserData] = useState({})

    const location = useLocation()

    const PathUID = location.pathname.slice(location.pathname.lastIndexOf('/'))
    const UID = PathUID.slice(1)

    const getUserInfo = async () => {
        try{
            const res = await axios.get(`http://api.app.com:40000/api/users/${UID}`) // this is the backend endpoint
            const {
                email,
                username,
                bitcoin_wallet,
                blocked
            } = res.data
            setUserData({email, username, bitcoin_wallet, blocked})
        }
        catch(err){
            console.error(err.message) // console log the error
        }
    }

    //useEffect- for the get method
    useEffect(() => {

        getUserInfo() //call the function
    }, [])

    return (
        <Box bg="blackAlpha.900" h="100%" minH="100vh" pb={5}>
            <Navbar />
                <Heading color='white'>HELLOE THIS I TEH USER PAGE</Heading>
            <Flex direction="column" align="center">
                {
                    Object.entries(userData).map((item, i) => {
                        return <ListItem key={i} name={item[0]} value={item[1]} />
                    })
                }
            </Flex>
        </Box>
    )
}

export default User
