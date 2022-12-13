import yaml from 'js-yaml';

export default function (cards) {
    const dto = {};

    for (const card of cards) {
        dto[card.path] = {
            Title: card.title,
        };
    }

    return yaml.dump(dto);
}