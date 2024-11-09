import prompts from 'prompts';

export enum PubSubType {
	DIRECT = 'direct',
	FLOODSUB = 'floodsub',
	GOSSIPSUB = 'gossipsub',
}

export const promptPubSubType = async (): Promise<PubSubType> => {
	const res = await prompts(
		{
			type: 'select',
			name: 'pubsubType',
			message: 'How do you intend to send messages between peers?',
			initial: 0,
			min: 1,
			choices: [
				{ title: 'On a one to one basis', value: PubSubType.DIRECT },
				{ title: 'To anyone on the network', value: PubSubType.FLOODSUB },
				{ title: 'To anyone on the network who matches a criteria', value: PubSubType.GOSSIPSUB },

			],
		},
		{ onCancel: () => process.exit(0) }
	);

	return res.pubsubType;
};
