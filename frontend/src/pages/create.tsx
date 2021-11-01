import React, {useState} from 'react';
import axios from "axios"
import Particles from 'react-particles-js';
import particlesConfig from '../assets/particlesjs-config.json';
import { IOptions, RecursivePartial } from 'tsparticles';
import {Box, VStack, HStack, Input, Textarea, Button} from "@chakra-ui/react"
import "react-datepicker/dist/react-datepicker.css"
import { RouteComponentProps } from 'react-router-dom';

function App({match, history, location}: RouteComponentProps) {
  const [title, setTitle] = useState("")
  const [abstract, setAbstract] = useState("")
  const [schedule, setSchedule] = useState("")

  const submitFunction = (history: any) => {
    const postData = {
      "title": title,
      "abstract": abstract,
      "schedule": schedule
    }
    console.log(postData)

    axios.post("/create",postData).then((res) => {
      console.log(res)
      console.log("complete")
      history.push({
        pathname: '/preview',
        search: `?id=${res.data.id}`,
      })
    })
  }

  return (
    <Box
      backgroundColor="#87AAAA"
      position="absolute"
      width="100vw"
      height="100vh"
    >
      <Box
        width="100%"
        height="100%"
        position="absolute"
      >
        <Particles height="100vh" width="100vw" params={particlesConfig as RecursivePartial<IOptions>} />
      </Box>

      <Box
        display="flex"
        flexFlow="column"
        width="100vw"
        height="100vh"
      > 
        <Box
            width="100%"
            height="15%"
            opacity="80%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >
          <Box
            fontSize="4xl"
            color="black"
          >
            新規作成
          </Box>
        </Box>
        <Box
            width="100%"
            height="85%"
            opacity="80%"
        >
          <Box
            width="80%"
            height="100%"
            margin="auto"
          >
            <VStack
              margin="auto"
            >
              <HStack
                width="100%"
              >
                <Box
                  width="100px"
                >
                  タイトル
                </Box>
                <Input 
                    size="md"
                    backgroundColor="white"
                    opacity="80%"
                    onChange={e => setTitle(e.target.value)}
                  />
                </HStack>

                <HStack
                width="100%"
              >
                <Box
                  width="100px"
                >
                  メモ(任意)
                </Box>
                <Textarea 
                    size="md"
                    backgroundColor="white"
                    opacity="80%"
                    onChange={e=>setAbstract(e.target.value)}
                  />
                </HStack>

                <HStack
                  width="100%"
                  height="300px"
                >
                  <Box
                    width="100px"
                  >
                    候補日
                  </Box>

                  <Textarea
                    height="280px"
                    width="100%"
                    backgroundColor="white"
                    opacity="80%"
                    placeholder="候補日は改行により区別されます"
                    onChange={e=>setSchedule(e.target.value)}
                  />
                </HStack>
                <HStack
                  width="100%"
                  justifyContent="center"
                >
                  <Button
                    width="200px"
                    onClick={()=>{submitFunction(history)}}
                  >
                    新規作成
                  </Button>
                </HStack>
            </VStack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
