import { randomBase62 } from "./base62"
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export type TinyUrl = {
    id: string
    url: URL,
    expireAt: Date
}

export const create = (url: URL, n: number = 7): TinyUrl => {
    const id = randomBase62(n)
    const expireAt =
        process.env.NODE_ENV === 'development'
            ? dayjs()
                .add(5, 'minutes')
                .toDate()
            : dayjs()
                .utc()
                .add(30, 'days')
                .toDate()
    return { id, url, expireAt }
}