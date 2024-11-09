import fs from 'fs/promises'
import path from 'path'

export async function writeConfigToFile(config: any, outputPath: string) {
	// Create the import statements dynamically based on config
	const importMap = {
		'webSockets()': "@libp2p/websockets",
		'webRTC()': "@libp2p/webrtc",
		'noise()': "@chainsafe/libp2p-noise",
		'yamux()': "@chainsafe/libp2p-yamux",
		'identify()': "@libp2p/identify",
		'circuitRelayTransport()': "@libp2p/circuit-relay-v2",
		'floodsub()': "@libp2p/floodsub",
		'gossipsub()': "@libp2p/gossipsub",
		'mdns()': "@libp2p/mdns",
		'kadDHT()': "@libp2p/kad-dht",
		'bootstrap()': "@libp2p/bootstrap"
	}

	const neededImports = new Set<string>()

	// Iterate through all values in config to find needed imports
	Object.values(config).forEach(value => {
		if (Array.isArray(value)) {
			value.forEach(item => {
				if (importMap[item as keyof typeof importMap]) {
					neededImports.add(`import { ${item.replace('()', '')} } from '${importMap[item as keyof typeof importMap]}'`)
				}
			})
		} else if (typeof value === 'string' && importMap[value as keyof typeof importMap]) {
			neededImports.add(`import { ${value.replace('()', '')} } from '${importMap[value as keyof typeof importMap]}'`)
		}
	})



	const imports = Array.from(neededImports).join('\n')

	// Convert the config object to a string with proper formatting
	const configString = JSON.stringify(config, null, 2)
		// Replace double quotes with single quotes
		.replace(/"([^"]+)":/g, '$1:')
		// Remove quotes around function calls
		.replace(/"(\w+)\(\)"/g, '$1()')
		// Add proper indentation for arrays
		.replace(/\[\n\s+/g, '[\n    ')
		// Clean up array closing brackets
		.replace(/\n\s+\]/g, '\n  ]')

	// Create the full module content
	const moduleContent = `${imports}

export const libp2pConfig = ${configString}

export default libp2pConfig
`

	// Ensure the directory exists
	await fs.mkdir(path.dirname(outputPath), { recursive: true })

	// Write the file
	await fs.writeFile(outputPath, moduleContent, 'utf-8')
}