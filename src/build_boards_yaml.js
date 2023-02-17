import yaml from 'js-yaml';

export default function (boards) {
    const dto = {};

    for (const board of boards) {
        const name = board.title.replace(/\.md$/gi,'').replace(/[^a-zA-Z0-9]/gi, '_');
        dto[name] = {
            Title: board.title,
            ExternalId: name,
            Items: board.items.map(item => ({
                ID: item.replace(/\.md$/gi,'').replace(/[^a-zA-Z0-9]/gi, '_'),
                Type: 'card'
            }))
        };
    }

    return yaml.dump(dto);
}