import prompts from 'prompts';

export const promptDiscoveryType = async (): Promise<prompts.Answers<"discoveryType">> => {
	const res = await prompts(
		{
			type: 'multiselect',
			name: 'discoveryType',
			message: 'how would you go about discovering peers?',
			hint: '- Space to select. Return to submit',
			min: 1,
			choices: [
				{ title: 'On my local network', value: 'mdns' },
				{ title: 'Using the global p2p network', value: 'dht' },
				{ title: 'Using a set of nodes to bootstrap', value: 'bootstrap' },
				{ title: 'Using the global network + a set of nodes to bootstrap', value: 'dht-bootstrap' },
			],
		},
		{ onCancel: () => process.exit(0) }
	);

	return res.discoveryType;
};
