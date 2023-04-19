import Navbar from '../components/Navbar'
import {
    Box,
    Heading,
} from "@chakra-ui/react"

const SupportDashboard = () => {
    return (
        <Box bg="blackAlpha.900" h="100%" minH="100vh" pb={5}>
            <Navbar />
            <Heading color='white'>SUPPORT DASHBOARD</Heading>
        </Box>
    )
}

export default SupportDashboard
