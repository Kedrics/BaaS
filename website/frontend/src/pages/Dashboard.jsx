import Navbar from '../components/Navbar'
import {
    Box,
    Heading,
} from "@chakra-ui/react"

const Dashboard = () => {
    return (
        <Box bg="blackAlpha.900" h="100%" minH="100vh" pb={5}>
            <Navbar />
            <Heading color='white'>DASHBOARD</Heading>
        </Box>
    )
}

export default Dashboard
