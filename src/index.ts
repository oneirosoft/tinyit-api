import { Elysia, t } from 'elysia'
import E from './endpoints'
import { corsOptions } from './cors';
import { isNullOrEmpty } from './utils';
import { getMetadata } from './apis/linkPreview';

const createResponse = {
  body: t.Object({
    url: t.String(),
  }),
}

const getInput = {
  params: t.Object({
    id: t.String(),
  }),
}

const previewInput = {
  query: t.Object({
    url: t.String(),
  }),
}

const app = new Elysia()
  .use(corsOptions)
  .group('/api', a =>
    a.get("/", E.getTinyUrl)
      .get('/:id', async ({ params, set, redirect }) => {
        const result = await E.getTinyUrl(params.id)

        if (!result) {
          set.status = 404
          return { id: params.id, error: 'Not found' }
        }

        set.status = 200
        return { url: result.url.href }
      }, getInput)
      .get('/metadata', async ({ query, set }) => {
        if (isNullOrEmpty(query.url)) {
          set.status = 400
          return { error: 'URL is required' }
        }
        const result = await getMetadata(query.url)
        if (!result) {
          set.status = 404
          return { error: 'Not found' }
        }
        set.status = 200
        return result

      }, previewInput)
      .put(
        '/shorten',
        async ({ body, set }) => {
          if (isNullOrEmpty(body.url)) {
            set.status = 400
            return { error: 'URL is required' }
          }

          set.status = 201
          const result = await E.createTinyUrl(new URL(body.url))

          set.headers ??= {}
          set.headers['Location'] = `/${result.id}`
          
          return result
        }, createResponse
      )
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
console.log(`🚀 Started as ${process.env.NODE_ENV}`)