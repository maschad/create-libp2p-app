import { Command } from 'commander';

import packageJson from '../../package.json';

export type Template = 'webrtc' | 'websocket' | 'tcp' | 'webtransport';

export interface ProgramOptions {
	verbose?: boolean;
	install?: boolean;
	template?: Template;
}


export const setupProgram = () => {
	const program = new Command(packageJson.name)
		.version(packageJson.version)
		.arguments('[projectDirectory]')
		.option('--no-install', 'Do not install dependencies')
		.showHelpAfterError(true);
	return program;
};