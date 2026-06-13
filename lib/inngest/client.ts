import { Inngest } from 'inngest'

export const inngest = new Inngest ({
  id: 'signalist',
  api: {
    gemini: {apikey: process.env.GEMINI_API_KEY!}
  }
})