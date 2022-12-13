import inputs from './inputs.js'
import action from './action.js'

async function main() {
    await action(inputs());
}

main();