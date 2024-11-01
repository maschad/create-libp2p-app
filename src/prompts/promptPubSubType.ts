import prompts from 'prompts';

export const promptPubSubType = async () => {
	const res = await prompts(
		{
			type: 'multiselect',
			name: 'pubsubType',
			message: 'How do you intend to send messages between peers?',
			initial: 'direct',
			choices: [
				{ title: 'On a one to one basis', value: 'direct' },
				{ title: 'To anyone on the network', value: 'floodsub' },
				{ title: 'To anyone on the network who matches a criteria', value: 'gossipsub' },

			],
		},
		{ onCancel: () => process.exit(0) }
	);

	return res.pubsubType as string;
};
