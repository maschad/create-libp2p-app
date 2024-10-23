import prompts from 'prompts';

export const promptForProjectName = async () => {
	const res = await prompts(
		{
			type: 'text',
			name: 'projectName',
			message: 'What is the name of your project?',
			initial: 'my-libp2p-project',
		},
		{ onCancel: () => process.exit(0) }
	);

	return res.projectName as string;
};