import dayjs from "dayjs"
import { TinyUrl } from "../utils/tinyUrl"
import { TableClient } from "@azure/data-tables"

const PARTITION_KEY = process.env.AZURE_PARTITION_KEY

const createTable = (() => {
    let tableExists = false
    
    return async (client: TableClient) => {
        if (tableExists) return
        try {
            await client.createTable()
            tableExists = true
        }
        catch (error) {
            console.error(error)
        }
    }
})()

export const azure = async (connectionString: string, tableName: string) => {
    const client = TableClient.fromConnectionString(connectionString, tableName, {
        allowInsecureConnection: process.env.NODE_ENV === 'development',
    })
    await createTable(client)
    
    const instance = {
        get: async (id: string) => {
            try {
                const result = await client.getEntity<{ id: String, url: string, expireAt: Date }>(PARTITION_KEY, id)
                if (!result) return null
                return {
                    id,
                    url: new URL(result.url),
                    expireAt: dayjs(result.expireAt).toDate()
                }
            } catch (error) { 
                console.error(`🔥`, error)
                return null
            }
        },
        insert: async (data: TinyUrl) => {
            const result = await instance.get(data.id)
            if (result) return false;

            console.info(`🔍 inserting tiny url`, {
                partitionKey: PARTITION_KEY,
                rowKey: data.id,
                id: data.id,
                url: data.url.href,
                expireAt: data.expireAt
            })

            const expireAt = (data.expireAt 
                ? dayjs(data.expireAt)
                : dayjs()).toISOString()
            try {
                await client.createEntity({
                    partitionKey: PARTITION_KEY,
                    rowKey: data.id,
                    url: data.url.href,
                    expireAt
                })
            } catch (error) {
                console.error(`🔥`, error)
                return false
            }
            return true
        }
    }

    return instance
}
