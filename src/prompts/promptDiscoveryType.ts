import prompts from 'prompts';

export enum DiscoveryType {
	MDNS = 'mdns',
	DHT = 'dht',
	BOOTSTRAP = 'bootstrap',
	DHT_BOOTSTRAP = 'dht-bootstrap',
}

export const promptDiscoveryType = async (): Promise<DiscoveryType[]> => {
	const res = await prompts(
		{
			type: 'multiselect',
			name: 'discoveryType',
			message: 'how would you go about discovering peers?',
			hint: '- Space to select. Return to submit',
			min: 1,
			choices: [
				{ title: 'On my local network', value: DiscoveryType.MDNS },
				{ title: 'Using the global p2p network', value: DiscoveryType.DHT },
				{ title: 'Using a set of nodes to bootstrap', value: DiscoveryType.BOOTSTRAP },
				{ title: 'Using the global network + a set of nodes to bootstrap', value: DiscoveryType.DHT_BOOTSTRAP },
			],
		},
		{ onCancel: () => process.exit(0) }
	);

	return res.discoveryType;
};
