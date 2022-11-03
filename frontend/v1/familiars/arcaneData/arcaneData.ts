import { Handler } from '@netlify/functions'

export const handler: Handler = async (event, context) => {
  const name  = event.queryStringParameters;

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello, ${name}!`,
    }),
  }
}
