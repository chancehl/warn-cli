import { chromium } from 'playwright'

const LOCATION_INDEX = 1
const DATE_INDEX = 2
const COUNT_INDEX = 3
const RECEIVED_DATE_INDEX = 6
const USER_AGENT = 'Chance Linz <clinz.dev@gmail.com> (https://github.com/chancehl/warn-cli)'

export async function scrapeDataFromWARNWebsite() {
    let results = []

    // Setup
    const browser = await chromium.launch({ headless: true })
    const context = await browser.newContext({ userAgent: USER_AGENT })
    const page = await context.newPage()

    await page.goto('https://fortress.wa.gov/esd/file/WARN/Public/SearchWARN.aspx')

    const searchInput = page.locator('input[name="ucPSW$txtSearch"]')
    const searchButton = page.locator('input[name="ucPSW$btnSearchCompany"]')

    await searchInput.fill('Amazon')
    await searchButton.click()

    await page.waitForLoadState('load')

    const table = page.locator('table')
    const rows = table.locator('tr')

    // iterate over rows to generate data, start at 1 since 0 is the header row
    for (let i = 1; i < (await rows.count()); i++) {
        const td = rows.nth(i).locator('td')

        const data = {
            location: await td.nth(LOCATION_INDEX).locator('font').innerHTML(),
            date: await td.nth(DATE_INDEX).locator('font').innerHTML(),
            count: await td.nth(COUNT_INDEX).locator('font').innerHTML(),
            received: await td.nth(RECEIVED_DATE_INDEX).locator('font').innerHTML(),
        }

        results.push(data)
    }

    // Teardown
    await context.close()
    await browser.close()

    return results
}
