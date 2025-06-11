import init from "./commands/init";
import { program } from "commander";
import figlet from "figlet";

console.log(figlet.textSync('Z i t'));

function wrapper(cb: () => string): void {
    try {
        const result = cb();
        console.log(result);
        process.exit(0);
    } catch (error) {
        const err = error as Error;
        console.error(err);
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