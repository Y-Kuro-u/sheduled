import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import Redis from "ioredis"

interface InterfaceCreateInput{
  id: string,
  name: string,
  schedule: string[]
}

interface InterfaceTableData{
  id: string,
  title: string,
  abstract: string,
  tableHeader: Array<string>,
  tableData: Array<Array<string>>
}

interface InterfaceInsertTableData{
  id: string,
  title: string,
  abstract: string,
  tableHeader: Array<string>,
  tableData: String
}

async function insertToRedis (insertData: InterfaceCreateInput) {
  const redis = new Redis({
    host: "redis"
  });

  const result:InterfaceInsertTableData  = await redis.hgetall(insertData.id) as any

  const res:InterfaceTableData = {
    id: result.id,
    title: result.title,
    abstract: result.abstract,
    tableHeader: String(result.tableHeader).split(","),
    tableData: JSON.parse(result.tableData as any)
  }
  res.tableHeader.push(insertData.name)
  res.tableData.forEach((data, index) => {
    data.push(String(insertData.schedule[index]))
  })

  let insertRedisData: InterfaceInsertTableData = {
    id: res.id,
    title: res.title,
    abstract: res.abstract,
    tableHeader: res.tableHeader,
    tableData: JSON.stringify(res.tableData)
  }

  redis.hmset(insertRedisData.id, insertRedisData as any)
  console.log(res)
  let response = await redis.hgetall(insertRedisData.id) as any
  redis.disconnect()

  response.tableHeader = response.tableHeader.split(",")
  response.tableData = JSON.parse(response.tableData)

  return response
}


/* GET users listing. */
export const index = (req: Request, res: Response) => {
  (async () => {
    const body: InterfaceCreateInput = req.body as InterfaceCreateInput
    const response = await insertToRedis(body)
    res.send(response);
  })().catch((err) => {
    console.log(err)
  });
};