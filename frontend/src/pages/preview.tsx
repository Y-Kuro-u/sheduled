import React, {useState, useEffect} from 'react';
import axios from "axios"
import Particles from 'react-particles-js';
import particlesConfig from '../assets/particlesjs-config.json';
import { IOptions, RecursivePartial } from 'tsparticles';
import {Box, VStack, HStack, Button, Input} from "@chakra-ui/react"
import { IconButton, Spinner } from "@chakra-ui/react"
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td
  } from "@chakra-ui/react"
import { BsXLg, BsTriangleFill, BsCircleFill} from 'react-icons/bs';
import { useLocation } from 'react-router-dom';

const inputData = {
  "title": "サンプル日程",
  "abstract": "サンプルの日程です",
  "tableHeader": [
      "日程",
      "○",
      "×",
      "△",
      "田中",
      "山田"
  ],
  "tableData":[
    ["10/30","1","2","0","○","×"],
    ["11/01","1","2","0","○","×"],
    ["11/02","1","2","0","○","×"],
    ["11/02 11:00 ~ ","1","2","0","○","×"]

  ]
}

function App() {
  const [flag,setFlag] = useState(false)

  const [datas, setDatas]: any = useState(null) 
  const [matrix, setMatrix]: any = useState(null)

  const [name, setName]: any = useState("")

  const search = useLocation().search;
  const query = new URLSearchParams(search);

  const insertData = (name: string, schedule: Array<string | number>) => {
    const mappedSchedules = schedule.map((data) => {
      if (data === 0){
         return "○"
      } else if (data === 1){
        return "△"
      } else {
        return "×"
      }
    })
    axios.post("/insert", {
      id: query.get("id"),
      name: name,
      schedule: mappedSchedules
    }).then((res) => {
      console.log("complete")
      setDatas(res.data)
      setFlag(false)
    })
  }

  useEffect(() => {
    let unmounted = false;

    (async() => {
      const res = await axios.get("/get", {
        params: {
          id: query.get("id")
        }
      })
      setDatas(res.data)
      setMatrix(Array.from(res.data.tableData.length))

      console.log("datas: ",datas)
    })();

    return () => { unmounted = true };
  },[])
  
  const setSchedule = (index: number, schedule: number) => {
    console.log(index, schedule)
    let changedMatrix = [...matrix]
    changedMatrix[index] = schedule
    setMatrix(changedMatrix)
    console.log(matrix)
  }
  console.log("datas: ", datas, "matrix: ", matrix)

  return (
    <Box
      backgroundColor="#87AAAA"
      position="absolute"
      width="100vw"
      minHeight="100vh"
    >
      <Box
        width="100%"
        minHeight="100vh"
        position="absolute"
      >
        <Particles width="100%" min-height="100%" params={particlesConfig as RecursivePartial<IOptions>} />
      </Box>
      {
        (datas === null || matrix === null) ?
          <Box
            width="100%"
            height="100%"
            margin="auto"
          >
            <Spinner />
          </Box>
        :
        <VStack
          width="100%"
          height="100%  "
        > 
          <Box
            height="10%"
            width="80%"
            margin="auto"
          >
            <VStack>
              <Box>
                {datas.title}
              </Box>
              <Box>
                {datas.abstract}
              </Box>
            </VStack>
          </Box>
          <Box
            width="80%"
            height="90%"
            margin="auto"
            backgroundColor="white"
            opacity="90%"
          >
            <Table>
              <Thead>
                <Tr>
                  {
                    datas.tableHeader.map((header: any) => {
                      return <Th>{header}</Th>
                    })
                  }
                </Tr>
              </Thead>
                <Tbody>
                  {
                    datas.tableData.map((Col: any) => {
                      return (
                        <Tr>
                          {Col.map((Row: any) => {
                            {console.log(Row)}
                            return (
                              <Td>
                                {Row}
                              </Td>
                            )
                          })}
                        </Tr>
                      )
                    })
                  }
                </Tbody>
              </Table>
          </Box>
            {
              flag ?
                <VStack
                  width="80%"
                  margin="auto"
                >
                  <HStack
                    width="100%"
                    justifyContent="center"
                  >
                    <Box
                      width="100px"
                    >
                      名前：
                    </Box>
                    <Input
                      width="30%"
                      backgroundColor="white"
                      opacity="80%"
                      onChange={(e) => {setName(e.target.value)}}
                    />
                  </HStack>

                    {
                      datas.tableData.map((data: Array<String>, index: number) => {
                        console.log("matrix: ",matrix)
                        return (
                          <HStack>
                            <Box
                              width="200px"
                            >
                              {data[0]}
                            </Box>
                            <IconButton 
                              aria-label="Call Sage"
                              fontSize="md"
                              backgroundColor="gray"
                              onClick = {() => setSchedule(index, 0)}
                              isActive = {(matrix[index] === 0) ? true : false}
                              icon={<BsCircleFill />}
                            />
                            <IconButton 
                              aria-label="Call Sage"
                              fontSize="md"
                              backgroundColor="gray"
                              onClick = {() => setSchedule(index, 1)}
                              isActive = {(matrix[index] === 1) ? true : false}
                              icon={<BsTriangleFill />}
                            />
                            <IconButton 
                              aria-label="Call Sage"
                              fontSize="md"
                              backgroundColor="gray"
                              onClick = {() => setSchedule(index, 2)}
                              isActive = {(matrix[index] === 2) ? true : false}
                              icon={<BsXLg />}
                            />
                        </HStack>
                        )
                      })
                    }

                  <Button
                    margin="auto"
                    onClick={() => {insertData(name, matrix)}}
                  >
                    共有する
                  </Button>
                </VStack>
              :
                <Box
                >
                  <Button
                    margin="auto"
                    onClick={() => {setFlag(true)}}
                  >
                    日程の調整をする
                  </Button>
                </Box>
            }
        </VStack>
    }
    </Box>
  );
}

export default App;
