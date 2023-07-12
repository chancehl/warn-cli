import { Command } from 'commander'
import dayjs from 'dayjs'

import { run } from './crawler'

const program = new Command()

program
    .version('0.0.1')
    .description('A simple CLI for crawling the WA WARN website for Amazon layoff postings')
    .option('-o, --once', 'This will only run the scraping process once')
    .option('-i, --interval <value>', 'The interval to run the program in milliseconds')
    .parse(process.argv)

const options = program.opts()

async function registerInterval(interval: number) {
    // execute every 30 minutes after or however often the user tells us to run
    setInterval(() => {
        const next = dayjs(new Date()).add(interval, 'milliseconds').toISOString()

        run(next)
    }, interval)
}

if (options.once) {
    ;(async function () {
        await run()
    })()
} else {
    // capture interval
    const interval = options.interval ?? 1000 * 60 * 10

    // calculate next run
    const next = dayjs(new Date()).add(interval, 'milliseconds').toISOString()

    // register callback
    registerInterval(interval)

    // execute immediately
    run(next)
}
