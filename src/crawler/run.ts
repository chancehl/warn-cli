import { table } from 'table'
import chalk from 'chalk'
import dayjs from 'dayjs'

import { scrapeDataFromWARNWebsite } from './scrape'

export async function run(next?: string) {
    const results = await scrapeDataFromWARNWebsite()

    const headers = ['Location', 'Layoff start date', 'No. of employees', 'Notice received on']

    const renderableResults = [headers, ...results.map((result) => Object.values(result))]

    const coloredResults = renderableResults.map((row, index) => {
        let isPastRow = false

        // skip header row
        for (let i = 1; i < row.length; i++) {
            const cell = row[i]

            if (cell.match(/^\d+\/\d+\/\d+$/)) {
                const date = dayjs(cell)

                if (date.isBefore(new Date())) {
                    isPastRow = true
                } else if (date.isAfter(new Date())) {
                    isPastRow = false
                }
            }
        }

        return row.map((data) => {
            if (index !== 0) {
                return isPastRow ? chalk.grey(data) : chalk.red(data)
            } else {
                return data
            }
        })
    })

    console.clear()
    console.log(table(coloredResults))

    if (next) {
        console.log(`Next run at ${chalk.green(next)}`)
    }
}
