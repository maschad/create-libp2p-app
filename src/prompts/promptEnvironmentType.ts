import prompts from 'prompts';

export enum EnvironmentType {
	BROWSER_TO_OTHER = 'browser-to-other',
	NODE_TO_OTHER = 'node-to-other',
	NODE_TO_NODE = 'node-to-node',
	BROWSER_TO_BROWSER = 'browser-to-browser',
}

export const promptEnvironmentType = async (): Promise<EnvironmentType> => {
	const res = await prompts(
		{
			type: 'select',
			name: 'environmentType',
			message: 'how would you describe the environment of your project?',
			initial: 0,
			choices: [
				{ title: 'Browser to other', value: EnvironmentType.BROWSER_TO_OTHER },
				{ title: 'Node to other', value: EnvironmentType.NODE_TO_OTHER },
				{ title: 'Node to Node', value: EnvironmentType.NODE_TO_NODE },
				{ title: 'Browser to Browser', value: EnvironmentType.BROWSER_TO_BROWSER },
			],
		},
		{ onCancel: () => process.exit(0) }
	);

	return res.environmentType;
};
