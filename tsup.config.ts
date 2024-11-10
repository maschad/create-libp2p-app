import { defineConfig } from 'tsup'

export default defineConfig({
	entry: ['src/*.ts', 'src/**/*.ts'],
	format: ['esm', 'cjs'],
	dts: true,
	clean: true,
	outDir: 'dist',
	platform: 'node',
})