import { google } from '@ai-sdk/google';
import { streamText } from 'ai'

import type { GenerationConfig } from '../../../types.js'

import { defaultSystemPrompt } from '../../prompts.js'

const MODEL_KEY = 'Gemini'

export const GeminiConfig: GenerationConfig = {
  models: [
    {
      id: `${MODEL_KEY}-text`,
      name: 'Gemini Text',
      fields: ['text', 'textarea'],
      handler: async (
        prompt: string,
        options: { locale: string; model: string; system: string },
      ) => {
        const streamTextResult = await streamText({
          model: google(options.model),
          prompt,
          system: options.system || defaultSystemPrompt,
        })

        return streamTextResult.toDataStreamResponse()
      },
      output: 'text',
      settings: {
        name: `${MODEL_KEY}-text-settings`,
        type: 'group',
        admin: {
          condition(data) {
            return data['model-id'] === `${MODEL_KEY}-text`
          },
        },
        fields: [
          {
            name: 'model',
            type: 'select',
            defaultValue: 'gemini-2.0-flash',
            label: 'Model',
            options: ['gemini-2.0-flash', 'Gemini 1.5 Pro'],
          },
        ],
        label: 'Gemini Settings',
      },
    },
  ],
  provider: 'Gemini',
}