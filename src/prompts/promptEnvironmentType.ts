import prompts from 'prompts';

export const promptEnvironmentType = async (): Promise<prompts.Answers<"environmentType">> => {
	const res = await prompts(
		{
			type: 'select',
			name: 'environmentType',
			message: 'how would you describe the environment of your project?',
			initial: 1,
			choices: [
				{ title: 'Node to Browser', value: 'node-to-browser' },
				{ title: 'Node to Node', value: 'node-to-node' },
				{ title: 'Browser to Browser', value: 'browser-to-browser' },
			],
		},
		{ onCancel: () => process.exit(0) }
	);

	return res.environmentType;
};
