import prompts from 'prompts';

export const promptEnvironmentType = async () => {
	const res = await prompts(
		{
			type: 'multiselect',
			name: 'environmentType',
			message: 'how would you describe the environment of your project?',
			initial: 'node to browser',
			choices: [
				{ title: 'Node to Browser', value: 'node-to-browser' },
				{ title: 'Node to Node', value: 'node-to-node' },
				{ title: 'Browser to Browser', value: 'browser-to-browser' },
			],
		},
		{ onCancel: () => process.exit(0) }
	);

	return res.environmentType as string;
};
