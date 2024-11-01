import prompts from 'prompts';

export const promptTransportType = async () => {
	const res = await prompts(
		{
			type: 'multiselect',
			name: 'transportType',
			message: 'Will you need a connection a private peer or only public peers?',
			initial: 'public',
			choices: [
				{ title: 'Private connection', value: 'private' },
				{ title: 'Public connection', value: 'public' },

			],
		},
		{ onCancel: () => process.exit(0) }
	);

	return res.transportType as string;
};
