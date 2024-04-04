# Quick Start Blueprint MVP Client

This project is for quickly building production-ready application using React.js and Typescript.

### Requirements

Node and npm are required for this repo.

### Installation

Install the dependencies:

```bash
npm install
```

Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

### ENV

REACT_APP_NAME

### Commands

Run the code in dev mode

```bash
yarn start or npm start
```

Running tests

```bash
npm run test
```

Linting

```bash
# run ESLint
yarn lint or npm run lint

# fix ESLint errors
yarn lint:fix or npm run lint:fix

# run prettier
yarn prettier or npm run prettier
To modify the ESLint configuration, update the `.eslintrc.json` file. To modify the Prettier configuration, update the `.prettierrc` file.
```

## Run dockerized version of the app

Clone api along with client
Both client and api will get started with below command

```
docker-compose up
```

Client is at [port 3000](http://localhost:3000) and server at [port 4000](http://localhost:4000)

## Run Checkmarx & BlackDuck Scan

Branch starting with the name /scan, /sast and /oss will perform Checkmarx & BlackDuck Scan. To perform the scans changes need to be made in .circleci/config.yml.


* Start the branch name with 'sast' to initiate Checkmarx Scan.
```
- /sast\/.*/          # eg: sast/1, sast/prod 
```
* Start the branch name with 'oss' to initiate BlackDuck Scan.
```
- /oss\/.*/           # eg: oss/1, oss/prod 
```
* Start the branch name with 'scan' to initiate both Checkmarx & BlackDuck Scan.
```
- /scan\/.*/          # eg: scan/1, scan/prod  
```
