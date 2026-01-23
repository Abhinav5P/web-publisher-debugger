import { createAnthropic } from '@ai-sdk/anthropic'

export function createAnthropicProvider(apiKey: string) {
  return createAnthropic({
    apiKey,
    // Required for browser-side API calls
    headers: {
      'anthropic-dangerous-direct-browser-access': 'true',
    },
  })
}
