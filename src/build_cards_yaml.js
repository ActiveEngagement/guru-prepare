import path from 'path';
import yaml from 'js-yaml';

export default function (cards) {
    const dto = {};

    for (const card of cards) {
        dto[card.path] = {
            Title: card.title,
            ExternalId: card.path.replace(/\.md$/gi,'').replace(/[^a-zA-Z0-9]/gi, '_')
        };
    }

    return yaml.dump(dto);
}