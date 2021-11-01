import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import Redis from "ioredis"

interface InterfaceGetInput{
  id: string
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

async function getFromRedis (id: string) {
  const redis = new Redis({
    host: "redis"
  });
  const result:InterfaceInsertTableData  = await redis.hgetall(id) as any

  const res:InterfaceTableData = {
    id: result.id,
    title: result.title,
    abstract: result.abstract,
    tableHeader: String(result.tableHeader).split(","),
    tableData: JSON.parse(result.tableData as any)
  }
  
  redis.disconnect()
  return res
}


/* GET users listing. */
export const index = (req: Request, res: Response) => {
  (async () => {
    const id: any = req.query.id
    const result: InterfaceTableData = await getFromRedis(id)
  
    res.send(result);
  })().catch((err) => {
    console.log(err)
  });
};