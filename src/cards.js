import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

function getDataForCard(node) {
    const filePath = node.path;

    if (!filePath.endsWith('.md')) {
        return null;
    }

    const extensionlessName = path.parse(node.name).name;
    const allowedDataFileNames = [extensionlessName + '.yaml', extensionlessName + '.yml'];
    return node.parent.children.find(n => allowedDataFileNames.includes(n.name));
}

export default function getCardsFor(node, currentPath = '') {
    const cards = [];

    for (const n of node.children) {
        if (n.type === 'dir') {
            cards.push(...getCardsFor(n, path.join(currentPath, n.name)));
        } else if (n.type === 'file') {
            const dataFile = getDataForCard(n);
            if (dataFile) {
                const data = yaml.load(fs.readFileSync(dataFile.path));
                cards.push({
                    path: n.path,
                    title: data.Title
                });
            }
        }
    }
    
    return cards;
}