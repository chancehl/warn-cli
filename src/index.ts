import { Command } from 'commander'

import { run } from './crawler'

const program = new Command()

program
    .version('0.0.1')
    .option('-o, --once', 'This will only run the scraping process once')
    .option('-i, --interval <value>', 'The interval to run the program')
    .parse(process.argv)

const options = program.opts()

if (options.once) {
    ;(async function () {
        await run()
    })()
} else {
    // execute immediately
    run()

    // execute every 10 seconds after
    setInterval(run, options.interval ?? 3000)
}
