import core from '@actions/core';

function getInput(name) {
    return core.getInput(name);
}

function isInputMissing(input) {
    return input === '' || input === null || input === undefined;
}

function getRequiredInput(name) {
    const input = getInput(name);

    if(isInputMissing(input)) throw `"${name}" is a required input!`;

    return input;
}

export default function() {
    return {
        sourcePath: getRequiredInput('source_path'),
        boardFile: getRequiredInput('board_file')
    };
}