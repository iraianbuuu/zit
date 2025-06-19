import init from "./commands/init";
import { program } from "commander";
import figlet from "figlet";
import { info, success, fail, warn } from "./utils/log";

console.log(figlet.textSync('Z i t'));

function wrapper(cb: () => string): void {
    try {
        const result = cb();
        success(result);
        process.exit(0);
    } catch (error) {
        const err = error as Error;
        fail(err.message);
        process.exit(1);
    }
}

program.command('init')
    .argument('[directory]')
    .description('Create an empty Git repository or reinitialize an existing one')
    .action((directory) => {
        wrapper(() => init(directory))
    })

program.parse(process.argv);