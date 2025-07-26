/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
	globals: true,
    environment: 'jsdom',
	setupFiles: ['./setup.ts'],
	coverage: {
		reporter: ['text', 'html'], // muestra en terminal y genera HTML
		all: true, // incluir archivos sin test también
		exclude: ['node_modules/', 'dist/', 'tests/', '**/*.test.ts', '**/*.test.tsx',"astro.config.mjs",
        "vitest.config.ts",
        ".astro/**",
        "src/types/**",
        "src/pages/*.astro",
        "src/layouts/*.astro",
		"src/components/Home.astro",
        "src/components/IntroQuiz.tsx"], // opcional
	  },
    // Vitest configuration options
  },
});