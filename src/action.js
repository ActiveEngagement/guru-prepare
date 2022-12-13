import fs from 'fs';
import fileTree from './file_tree.js'
import getBoardsFor from './boards.js';
import buildBoardsYaml from './build_boards_yaml.js';

export default async function (options) {
    const boards = getBoardsFor(await fileTree(options.sourceDir));
    const boardsYaml = buildBoardsYaml(boards);
    await fs.promises.writeFile(options.boardFile, boardsYaml);
}