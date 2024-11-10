import { defineConfig } from 'tsup'
import fs from 'fs-extra'
import path from 'path'

export default defineConfig({
	entry: [
		'src/*.ts',
		'src/**/*.ts',
		'!src/template/**',
		'!src/template/**/*'
	],
	format: ['esm', 'cjs'],
	dts: false,
	clean: true,
	outDir: 'dist',
	platform: 'node',
	async onSuccess() {
		await fs.copy(
			path.join(__dirname, 'src/template'),
			path.join(__dirname, 'dist', 'template')
		)
	},
})
