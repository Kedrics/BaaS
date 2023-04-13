import './App.css'
import Login from './pages/Login'
import User from './pages/User'
import Bots from './pages/Bots'
import Register from './pages/Register'
import BotnetOrders from './pages/BotnetOrders'
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom" //import the router to navigate pages
import { ChakraProvider } from "@chakra-ui/react" //import the Chakra UI library

function App() {
  return (

    // wrap the whole app in ChakraProvider
    //use the Route tag to route to your different pages

    <ChakraProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />}/>
            <Route path="/login" element={<Login/>} />
            <Route path="/bots" element={<Bots/>} />
            <Route path="/botnet_orders" element={<BotnetOrders />}/>
            <Route path="/user/:id" element={<User/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ChakraProvider>
  )
}

export default App
