import path from 'path';

function fileConstitutesCard(node) {
    const filePath = node.path;

    if (!filePath.endsWith('.md')) {
        return false;
    }

    const extensionlessName = path.parse(node.name).name;
    const allowedDataFileNames = [extensionlessName + '.yaml', extensionlessName + '.yml'];
    return node.parent.children.some(n => allowedDataFileNames.includes(n.name));
}

function itemsInNodes(nodes, currentPath) {
    const items = [];

    for (const node of nodes) {
        if (node.type === 'file' && fileConstitutesCard(node)) {
            items.push(path.join(currentPath, node.name));
        }
    }

    return items;
}

export default function getBoardsFor(tree) {
    const boards = [];

    for (const node of tree.children) {
        if (node.type === 'dir') {
            const items = itemsInNodes(node.children, node.name);
            boards.push({
                title: node.name,
                items
            });
        }
    }

    return boards;
}