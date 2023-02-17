import path from 'path';
import yaml from 'js-yaml';

export default function (cards) {
    const dto = {};

    for (const card of cards) {
        dto[card.path] = {
            Title: card.title,
            ExternalId: path.parse(path.basename(card.path)).name
        };
    }

    return yaml.dump(dto);
}