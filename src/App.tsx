import { Flex, useColorModeValue } from "@chakra-ui/react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from "./components/Navbar"
import Home from './components/Home'
import Footer from './components/Footer'
import PNF from './components/PNF'
import About from './components/About'
import Gallery from './components/Gallery'
import Connect from './components/Connect'
import { UserContext } from './context/UserContext'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import EditCard from './components/EditCard'
import MyCards from './components/MyCards'
import LovedCards from "./components/LovedCards"


export const App = () => {

  const [userData, setUserData] = useState({ id: -1, username: '', })

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <Router>
        <ToastContainer />
        <Flex flexDir='column' minH='100vh'>
          <Navbar />
          <Flex
            flexDir='column'
            h='100%'
            flex='1'
            bgGradient={useColorModeValue('linear(to-b, gray.100, pink.50)', 'linear(to-b, gray.900, pink.900)')}
          >
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='about' element={<About />} />
              <Route path='gallery' element={<Gallery />} />
              <Route path='connect' element={<Connect />}></Route>
              <Route path='new-card' element={<EditCard />}></Route>
              <Route path='edit-card/:cardId' element={<EditCard />}></Route>
              <Route path='my-cards' element={<MyCards />}></Route>
              <Route path='loved-cards' element={<LovedCards />}></Route>
              <Route path='*' element={<PNF />}></Route>
            </Routes>
          </Flex>
          <Footer />
        </Flex>
      </Router>
    </UserContext.Provider>
  )
}

