declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: 'development' | 'production',
        AZURE_CONN_STRING: string,
        AZURE_TABLE_NAME: string,
        AZURE_PARTITION_KEY: string,
        ORIGIN: string,
        API_PREVIEW_URL: string
    }
}