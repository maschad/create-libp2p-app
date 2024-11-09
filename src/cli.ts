import chalk from 'chalk';
import { execSync } from 'child_process';
import type { Command } from 'commander';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { cp, mkdir, rename } from 'fs/promises';
import ora from 'ora';
import { join } from 'path';

import { error, log } from './utils/logger';
import { promptForProjectName } from './prompts';
import { getPackageVersion } from './lib/getPackageVersion';
import { extractOptions } from './lib/extractOptions';
import { writeConfigToFile } from './utils/configToFile';

export { setupProgram } from './lib/setupProgram';




export const runScaffoldCli = async ({
	program,
	args = process.argv,
}: {
	program: Command;
	args: string[];
}) => {
	program.parse(args);


	let projectPath = program.args[0] ?? (await promptForProjectName());


	while (existsSync(projectPath)) {
		error(`A folder already exists at ${projectPath}. Please choose a different project name.`);

		projectPath = await promptForProjectName();
	}

	while (!projectPath) {
		error('Please specify a project directory.');

		projectPath = await promptForProjectName();
	}
	const fileCopySpinner = ora({
		text: 'Creating template files..',
		color: 'green',
	}).start();

	await mkdir(projectPath);

	const options = await extractOptions();

	const srcDir = join(projectPath, 'src');
	await mkdir(srcDir);

	const optionsFilePath = join(srcDir, 'libp2p.ts');


	await writeConfigToFile(options, optionsFilePath);

	// // Remove typegen files from gitignore
	// const gitignorePath = join(projectPath, '.gitignore');
	// const gitignoreContents = readFileSync(gitignorePath, 'utf-8');
	// const newGitIgnoreContents = gitignoreContents.replace(/^(src\/sway-api\/.+)$/gm, '# $1');
	// writeFileSync(gitignorePath, newGitIgnoreContents);

	fileCopySpinner.succeed('Created template files!');


	log();
	log();
	log(chalk.green(`⚡️ Success! Created a libp2p app at ${projectPath}`));
	log();
	log();
	log('To get started:');
	log();
	log(`- cd into the project directory: cd ${projectPath}`);
	log();
	log('- Run `npm run start` to start the app');
	log();
	log();
	log('-> For more info on getting started: https://github.com/libp2p/js-libp2p/blob/main/doc/GETTING_STARTED.md');
	log('-> For general docs: https://docs.libp2p.io/');
	log();
	log();
};
