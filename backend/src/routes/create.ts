import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import Redis from "ioredis"

interface InterfaceCreateInput{
  title: string,
  abstract: string,
  schedule: string
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

async function insertToRedis (insertData: InterfaceTableData) {
  const redis = new Redis({
    host: "redis"
  });

  const insert: InterfaceInsertTableData = {
    id: insertData.id,
    title: insertData.title,
    abstract: insertData.abstract,
    tableHeader: insertData.tableHeader,
    tableData: JSON.stringify(insertData.tableData)
  }

  await redis.hmset(insert.id, insert as any)
  const result = await redis.hgetall(insertData.id)
  console.log(result)
  redis.disconnect()
}


/* GET users listing. */
export const index = (req: Request, res: Response) => {
  (async () => {
    const createSchedulesData: InterfaceCreateInput = req.body
    const days = createSchedulesData.schedule.split("\n")
  
    let initializeTableData: Array<Array<string>> = []
    
    days.map((data) => {
      if (data === ""){
        return
      }
      initializeTableData.push([data,"0","0","0"])
    })
    
    let tableDatas: InterfaceTableData = {
      id: uuidv4(),
      title: createSchedulesData.title,
      abstract: createSchedulesData.abstract,
      tableHeader: [
        "日程",
        "○",
        "△",
        "×"
      ],
      tableData: initializeTableData
    }
    console.log(tableDatas)
    await insertToRedis(tableDatas)
  
    res.send(tableDatas);
  })().catch((err) => {
    console.log(err)
  });
};