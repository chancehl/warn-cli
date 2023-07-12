# warn-cli

```
Usage: index [options]

A simple CLI for crawling the WA WARN website for Amazon layoff postings

Options:
  -V, --version           output the version number
  -o, --once              This will only run the scraping process once
  -i, --interval <value>  The interval to run the program in milliseconds
  -h, --help              display help for command
```

## Example output

```
╔═══════════════════╤═══════════════════╤══════════════════╤════════════════════╗
║ Location          │ Layoff start date │ No. of employees │ Notice received on ║
╟───────────────────┼───────────────────┼──────────────────┼────────────────────╢
║ Seattle, Bellevue │ 3/19/2023         │ 2320             │ 1/18/2023          ║
╟───────────────────┼───────────────────┼──────────────────┼────────────────────╢
║ Seattle           │ 12/1/2022         │ 159              │ 9/7/2022           ║
╚═══════════════════╧═══════════════════╧══════════════════╧════════════════════╝
```

## Getting started

Note: anything in the past will be in grey and anything in the future will be in red

```
# clone this repo
git clone https://github.com/chancehl/warn-cli.git

# change directories
cd ./warn-cli

# install dependencies
npm install

# build the cli
npm run build

# start the cli (if you want to only execute the code once you can pass the --once flag to the program)
npm run start
```
