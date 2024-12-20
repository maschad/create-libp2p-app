import prompts from 'prompts';

export const promptTransportType = async (): Promise<string> => {
	const res = await prompts(
		{
			type: 'select',
			name: 'transportType',
			message: 'Will you need a connection a private peer or only public peers?',
			initial: 0,
			choices: [
				{ title: 'Private connection', value: 'private' },
				{ title: 'Public connection', value: 'public' },

			],
		},
		{ onCancel: () => process.exit(0) }
	);

	return res.transportType;
};
