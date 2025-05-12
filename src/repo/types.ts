import { TinyUrl } from "../utils/tinyUrl"

export interface Repository {
    insert: (data: TinyUrl) => Promise<boolean>
    get: (id: string) => Promise<TinyUrl | null>
}