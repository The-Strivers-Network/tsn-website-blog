import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['tests/int/**/*.int.spec.ts'],
    environment: 'node',
  },
})
