import { anthropic } from '@ai-sdk/anthropic'
import { google } from '@ai-sdk/google';
import { openai } from '@ai-sdk/openai'
import { generateText } from 'ai'

import { 
  PLUGIN_DEFAULT_ANTHROPIC_MODEL,
  PLUGIN_DEFAULT_GEMINI_MODEL,  // This should come before OPENAI (alphabetical order)
  PLUGIN_DEFAULT_OPENAI_MODEL
} from '../../defaults.js'

export const systemGenerate = async (data: { prompt: string; system: string }) => {
  const { prompt, system } = data
  let model = null

  if (process.env.OPENAI_API_KEY) {
    model = openai(PLUGIN_DEFAULT_OPENAI_MODEL)
  } else if (process.env.ANTHROPIC_API_KEY) {
    model = anthropic(PLUGIN_DEFAULT_ANTHROPIC_MODEL)
  } else if (process.env.GEMINI_API_KEY) {
    model = google(PLUGIN_DEFAULT_GEMINI_MODEL)
  } else {
    throw new Error('- AI Plugin: Please check your environment variables!')
  }

  const { text } = await generateText({
    model,
    prompt,
    system,
  })

  return text
}
