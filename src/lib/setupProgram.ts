import { Command } from 'commander';

import packageJson from '../../package.json';

export const setupProgram = () => {
	const program = new Command(packageJson.name)
		.version(packageJson.version)
		.arguments('[projectDirectory]')
		.showHelpAfterError(true);
	return program;
};