import fs from 'fs';
import path from 'path';
import { DEFAULT_FILES_PATH, GIT_FILES, GIT_FOLDERS } from '../utils/helper';

const reinitializeText = 'Reinitialized existing Git repository in ';
const initializeText = 'Initialized empty repository in ';

const DEFAULT_CONFIG = fs.readFileSync(
    path.join(__dirname, DEFAULT_FILES_PATH.CONFIG)
)
const DEFAULT_DESCRIPTION = fs.readFileSync(
    path.join(__dirname, DEFAULT_FILES_PATH.DESCRIPTION)
)
const DEFAULT_HEAD = fs.readFileSync(
    path.join(__dirname, DEFAULT_FILES_PATH.HEAD)
)
const DEFAULT_EXCLUDE = fs.readFileSync(
    path.join(__dirname, DEFAULT_FILES_PATH.EXCLUDE)
)

/**
 * Performs the initialization of git repository
 * @param {?string} [directory] Path where the git repository should be initialized
 * @returns {string}
 */
function init(directory?: string): string {
    let gitDirectory = path.join(process.cwd(), '.git');

    if (directory) {
        if (path.isAbsolute(directory)) {
            gitDirectory = path.join(directory, '.git');
        }
        else {
            gitDirectory = path.join(process.cwd(), directory, '.git');
        }
    }

    if (fs.existsSync(gitDirectory)) return reinitializeText + gitDirectory;

    fs.mkdirSync(gitDirectory, { recursive: true });

    fs.writeFileSync(path.join(gitDirectory, GIT_FILES.HEAD), DEFAULT_HEAD);
    fs.writeFileSync(path.join(gitDirectory, GIT_FILES.CONFIG), DEFAULT_CONFIG);
    fs.writeFileSync(path.join(gitDirectory, GIT_FILES.DESCRIPTION), DEFAULT_DESCRIPTION);

    fs.mkdirSync(path.join(gitDirectory, GIT_FOLDERS.HOOKS));
    fs.mkdirSync(path.join(gitDirectory, GIT_FOLDERS.INFO));

    fs.writeFileSync(path.join(gitDirectory, GIT_FOLDERS.INFO, GIT_FILES.EXCLUDE), DEFAULT_EXCLUDE)
    fs.mkdirSync(path.join(gitDirectory, GIT_FOLDERS.OBJECTS));
    fs.mkdirSync(path.join(gitDirectory, GIT_FOLDERS.OBJECTS, GIT_FOLDERS.INFO));
    fs.mkdirSync(path.join(gitDirectory, GIT_FOLDERS.OBJECTS, GIT_FOLDERS.PACK));
    fs.mkdirSync(path.join(gitDirectory, GIT_FOLDERS.REFS));

    return initializeText + gitDirectory;
}

export default init;