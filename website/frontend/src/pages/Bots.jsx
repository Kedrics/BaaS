import Navbar from '../components/Navbar'
import {
    Box,
    Flex,
    Heading,
} from "@chakra-ui/react"

const Bots = () => {
    return (
        <Box bg="blackAlpha.900" h="100%" minH="100vh" pb={5}>
            <Navbar />
                <Heading color='white'>Your Bots</Heading>
            <Flex direction="column" align="center">
            </Flex>
        </Box>
    )
}

export default Bots
