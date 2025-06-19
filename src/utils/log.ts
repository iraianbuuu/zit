import chalk from "chalk";

const log = console.log;

const info = (message : string) => log(chalk.blue(message));

const success = (message : string) => log(chalk.green(message));

const fail = (message: string) => log(chalk.red(message));

const warn = (message : string) => log(chalk.yellow(message));

export { info, success, fail, warn };