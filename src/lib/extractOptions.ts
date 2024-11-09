import { EnvironmentType, promptPubSubType, PubSubType, DiscoveryType } from "../prompts"
import { promptTransportType } from "../prompts"
import { promptEnvironmentType } from "../prompts"
import { promptDiscoveryType } from "../prompts"


export async function extractOptions() {
	const options: any = {
		addresses: {
			listen: []
		},
		transports: [],
		peerDiscovery: [],
		pubsub: undefined,
		services: ['identify'],
		connectionEncrypters: ['noise'],
		streamMuxers: ['yamux']
	}

	const transportType = await promptTransportType();
	const environmentType = await promptEnvironmentType();
	const discoveryType = await promptDiscoveryType();
	const pubsubType = await promptPubSubType();

	if (transportType === 'private') {
		switch (environmentType) {
			case EnvironmentType.BROWSER_TO_OTHER:
				options.transports = ['webSockets', 'webRTC', 'circuitRelayTransport']
				break;

			case EnvironmentType.NODE_TO_OTHER:
				options.transports = ['tcp', 'circuitRelayTransport']
				options.services.push('dcutr')
				break;

			case EnvironmentType.NODE_TO_NODE:
				options.transports = ['tcp', 'circuitRelayTransport']
				options.services.push('dcutr')
				break;

			case EnvironmentType.BROWSER_TO_BROWSER:
				options.transports = ['webSockets', 'webRTC', 'circuitRelayTransport']
				options.services.push('circuitRelayServer')
				break;
		}
	} else {
		switch (environmentType) {
			case 'browser-to-other':
				options.transports = ['webtransport', 'webSockets']
				break;

			case 'node-to-other':
				options.transports = ['tcp']
				break;

			case 'node-to-node':
				options.transports = ['tcp']
				break;

			case EnvironmentType.BROWSER_TO_BROWSER:
				options.transports = ['webSockets', 'webRTC', 'circuitRelayTransport', 'webtransport']
				break;
		}
	}

	switch (pubsubType) {
		case PubSubType.DIRECT:
			break;

		case PubSubType.FLOODSUB:
			options.pubsub = 'floodsub'
			break;

		case PubSubType.GOSSIPSUB:
			options.pubsub = 'gossipsub'
			break;
	}

	if (discoveryType.includes(DiscoveryType.MDNS)) {
		options.peerDiscovery.push('mdns')
	}

	if (discoveryType.includes(DiscoveryType.DHT)) {
		options.peerDiscovery.push('dht')
	}

	if (discoveryType.includes(DiscoveryType.BOOTSTRAP)) {
		options.peerDiscovery.push('bootstrap')
	}

	if (discoveryType.includes(DiscoveryType.DHT_BOOTSTRAP)) {
		options.peerDiscovery.push('dht')
		options.services.push('bootstrap')
	}

	// Helper to transform array items to function calls
	const transformToFunctionCalls = (arr: string[]): string[] => arr.map(item => `${item}()`);

	// Transform arrays to function calls
	['transports', 'peerDiscovery', 'services', 'connectionEncrypters', 'streamMuxers', 'pubsub'].forEach(key => {
		if (options[key]) {
			options[key] = transformToFunctionCalls(options[key]);
		}
	});




	return options
}
