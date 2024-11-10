import chalk from 'chalk';
import { execSync } from 'child_process';
import type { Command } from 'commander';
import { existsSync } from 'fs';
import { cp, mkdir } from 'fs/promises';
import ora from 'ora';
import { join } from 'path';
import { readFile, writeFile } from 'fs/promises';
import { dirname } from 'path';

import { error, log } from './utils/logger';
import { promptForProjectName } from './prompts';
import { extractOptions } from './lib/extractOptions';
import { writeConfigToFile } from './utils/configToFile';
import { fileURLToPath } from 'url';

export { setupProgram } from './lib/setupProgram';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

	await mkdir(projectPath);

	await cp(join(__dirname, 'template'), projectPath, { recursive: true });

	const options = await extractOptions();

	const fileCopySpinner = ora({
		text: 'Creating template files..',
		color: 'green',
	}).start();

	const srcDir = join(projectPath, 'src');

	const optionsFilePath = join(srcDir, 'libp2p.ts');

	const imports = await writeConfigToFile(options, optionsFilePath);

	const packageJsonPath = join(projectPath, 'package.json');
	const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf-8'));

	// Extract package names from imports string
	const dependencies = imports.split('\n')
		.map(line => {
			const match = line.match(/from '([^']+)'/);
			return match ? match[1] : null;
		})
		.filter(Boolean);

	// Add dependencies to package.json
	packageJson.dependencies = {
		...packageJson.dependencies,
		...dependencies.reduce((acc, dep) => ({ ...acc, [dep as string]: "latest" }), {})
	};

	// Update package name in package.json
	packageJson.name = projectPath.split('/').pop();

	await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));

	fileCopySpinner.succeed('Created template files!');

	const installSpinner = ora({
		text: 'Installing dependencies..',
		color: 'green',
	}).start();

	execSync('npm install', { cwd: projectPath });

	installSpinner.succeed('Installed dependencies!');

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
