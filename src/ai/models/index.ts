import * as process from 'node:process'

import type { GenerationModel } from '../../types.js'

import { AnthropicConfig } from './anthropic/index.js'
import { GeminiConfig } from './gemini/index.js'
import { OpenAIConfig } from './openai/index.js'


export const GenerationModels: GenerationModel[] = [
  ...(process.env.OPENAI_API_KEY ? OpenAIConfig.models : []),
  ...(process.env.ANTHROPIC_API_KEY ? AnthropicConfig.models : []),
  ...(process.env.GEMINI_API_KEY ? GeminiConfig.models : []),
]
