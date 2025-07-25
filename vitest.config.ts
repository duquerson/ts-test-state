/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    environment: 'jsdom',
	setupFiles: ['./setup.ts']
    // Vitest configuration options
  },
});