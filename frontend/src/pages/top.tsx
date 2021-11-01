import React from 'react';
import Particles from 'react-particles-js';
import particlesConfig from '../assets/particlesjs-config.json';
import { IOptions, RecursivePartial } from 'tsparticles';
import {Box, Button, Image, VStack} from "@chakra-ui/react"
import { Link, RouteComponentProps } from 'react-router-dom';
import logo from "../assets/logo_.png"

function App({match, history, location}: RouteComponentProps) {
  return (
    <Box
      backgroundColor="#87AAAA"
      position="absolute"
      minWidth="100vw"
      minHeight="100vh"
    >
      <Box
        width="100%"
        height="100%"
        position="absolute"
      >
        <Particles height="100vh" width="100vw" params={particlesConfig as RecursivePartial<IOptions>} />
      </Box>

      <VStack
        width="100vw"
        height="100vh"
      > 

        <Image 
          src={logo}
          marginTop="50px"
          backgroundColor="white" 
          opacity="50%" 
          rounded="lg" 
          justifyContent="center"
          alignContent="center"
        />
      <Box
        display="flex"
        flexFlow="column"
        width="100%"
        height="50%"
      >
        <Button
          backgroundColor="white"
          height="10%"
          width="50%"
          borderRadius="10px"
          opacity="80%"
          marginLeft="auto"
          marginRight="auto"
          marginTop="auto"
          marginBottom="10px"
          fontSize="2xl"
          border="none  "
        >
          調整に参加
        </Button>
          <Button
            backgroundColor="white"
            height="10%"
            width="50%"
            borderRadius="10px"
            opacity="80%"
            marginLeft="auto"
            marginRight="auto"
            marginBottom="auto"
            marginTop="10px"
            fontSize="2xl"
            border="none"
            onClick={() => {history.push("/create")}}
          >
            新規作成
          </Button>
        </Box>
      </VStack>
    </Box>
  );
}

export default App;
