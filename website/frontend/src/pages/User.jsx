import React, { useEffect } from "react";
import { useState } from "react";
import axios from 'axios';
import { useLocation } from "react-router-dom";
import Navbar from '../components/Navbar';
import ListItem from '../components/ListItem';
import { 
    Box, 
    Input, 
    Flex,
    Heading
} from "@chakra-ui/react";

const User = () => {
    //states- one for each backend method
    const [todos, setTodos] = React.useState([]) //For the get method

    const location = useLocation()

    const PathUID = location.pathname.slice(location.pathname.lastIndexOf('/'))
    const UID = PathUID.slice(1)
    

    //useEffect- for the get method
    useEffect(() => {
        const getTodos = async () => {
            try{
                const res =await axios.get(`http://localhost:8000/api/users/${UID}`) //this is the backend endpoint
                    setTodos(res.data); //set the state to the data returned from the backend
            }
            catch(err){
                console.error(err.message); //console log the error
            }
        }
        getTodos(); //call the function
    }, []);


    //handleChange and handleClick- for the post method
    // const handleChange = (e) => {
    //     setTodos(prev => ({...prev, [e.target.name]: e.target.value})); //set the state to the value of the input
    // }

    return (
        <Box bg="blackAlpha.900" h="100%" minH="100vh" pb={5}>
            <Navbar />
                <Heading>HELLOE THIS I TEH USER PAGE</Heading>
            <Flex direction="column" align="center">
                {todos.map((todo) => (
                    <ListItem todo={todo} />
                ))}
            </Flex>
        </Box>
    );
}

export default User;
