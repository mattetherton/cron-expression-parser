# Cron Expression Parser

A command line application which parses a cron string and expands each field to show the times at which it will run.

### Prerequisites 
* node
* nvm (optional) - `nvm use`
Note: see .nvmrc or package.json for node version.

### Running the cron expression parser
1. Install packages: `npm i`
2. Start application: `npm run start "CRON_EXPRESSION_STRING"`

for example:
`npm run start "*/15 0 1,15 * 1-5 /usr/bin/find"`

Would output the following:

```
    minute: 0 15 30 45
    hour: 0
    day of month: 1 15
    month: 1 2 3 4 5 6 7 8 9 10 11 12
    day of week 1 2 3 4 5
    command: /usr/bin/find
```
### Useful commands
* Unit tests: `npm run unit` (coverage is automatically produced and located in `.coverage/lcov-report/index.html`)
* Lint: `npm run lint`
