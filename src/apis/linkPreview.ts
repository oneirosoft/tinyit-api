const apiUrl = process.env.API_PREVIEW_URL

export interface Metadata {
    title: string
    description: string
    image: string
    url: string
}

export const getMetadata = (url: string): Promise<Metadata> => {
    var url = `${apiUrl}/preview?url=${encodeURIComponent(url)}`
    console.log(url)
    return fetch(url).then(resp => resp.json())
}