import { create } from './utils/tinyUrl'
import { azure } from './repo'

const az = await azure(
    process.env.AZURE_CONN_STRING,
    process.env.AZURE_TABLE_NAME
)

export const getTinyUrl = (id: string) =>
    az.get(id).then(result => {
        if (!result) return null
        console.info(`🔍 retrieved tiny url`, result?.id)
        return {
            id: result.id,
            url: result.url,
        }
    })

export const createTinyUrl = async (url: URL) => {
    const result = create(url)
    az.insert(result)
    const {expireAt, ...rest} = result
    return rest
}

export default {
    getTinyUrl,
    createTinyUrl
}