import prompts from 'prompts';

export const promptPubSubType = async (): Promise<prompts.Answers<"pubsubType">> => {
	const res = await prompts(
		{
			type: 'select',
			name: 'pubsubType',
			message: 'How do you intend to send messages between peers?',
			initial: 1,
			choices: [
				{ title: 'On a one to one basis', value: 'direct' },
				{ title: 'To anyone on the network', value: 'floodsub' },
				{ title: 'To anyone on the network who matches a criteria', value: 'gossipsub' },

			],
		},
		{ onCancel: () => process.exit(0) }
	);

	return res.pubsubType;
};
