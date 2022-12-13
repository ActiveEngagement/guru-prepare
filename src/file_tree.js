import path from 'path';
import fs from 'fs';

async function nodesFor(dir, parent) {
    const nodes = [];
    const files = await fs.promises.readdir(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = await fs.promises.stat(filePath);

        if (stat.isFile()) {
            nodes.push({
                type: 'file',
                name: path.basename(filePath),
                path: filePath,
                parent
            });
        } else if (stat.isDirectory()) {
            const node = {
                type: 'dir',
                name: path.basename(filePath),
                path: filePath,
                parent
            };
            node.children = await nodesFor(filePath, node);
            nodes.push(node);
        }
    }

    return nodes;
}

export default async function fileTree(dir) {
    const tree = {
        type: 'root'
    };
    tree.children = await nodesFor(dir, tree);
    return tree;
}
