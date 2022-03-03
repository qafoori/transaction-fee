This is a very simple example of online payment services. It calculates the fee of commissions for users per week

# Content
- Get Strted
	1. Clone the repo
	2. Install dependencies
	3. Setting up environment variables (*Very Important*)
	4. Starting scripts
	5. Running tests scripts
	6. Data manipulation scripts
	7. Contributing scripts
- Imortant Things
	1. Running test notes
	2. Unix users
	3. Windows users

# Get Started
To run this repo on your local environments, follow these steps:

### 1. Clone the repo
```bash
git clone https://github.com/qafoori/transaction-fee.git
cd transaction-fee
```

### 2. Install dependencies
```bash
# yarn users (recommended)
yarn
# npm users
npm i
```

### 3. Setting up environment variables (*Very Important*)
```bash
cp .env.example .env
```

### 4. Starting scripts
```bash
## will start the project and log the results of commission fees
yarn start #or npm start

## will start the project using `nodemon` with watch mode
yarn dev #or npm run dev
```

### 5. Running tests scripts
```bash
## will start the tests once
yarn test:run #or npm run test:run

## will start the tests with watch mode
yarn test:watch #or npm run test:watch
```

### 6. Data manipulation scripts
```bash
## will print ($ cat) example data which is used by default in the repo
yarn data:check #or npm run data:check

## will open up vim to edit the example data (requires password)
yarn data:edit #or npm run data:edit

## will change the default data path in `package.json` to refer to the use of another path
yarn data:change-path <PATH-TO-JSON-FILE> #or npm run data:change-path <PATH-TO-JSON-FILE>
```

### 7. Contributing scripts
```bash
## will install husky to run pre-commit commands
yarn prepare #or npm run prepare
```


# Imortant Things
### 1. Running test notes
According to the test report file in the latest state ([junit.xml](https://github.com/qafoori/transaction-fee/blob/develop/junit.xml)), all tests are passed successfully.
So if you run into problems with the tests and some of them did not pass (only the tests related to fetching the data from the APIs), the only reason is the problem of the Internet and with one or two retry attempts you will see all the tests pass.

### 2. Unix users
All scripts are executable for Unix users (those using Linux or Mac).
> Note that the "cat" and "vim" accessories must be installed on your bash

### 3. Windows users
Users using cmd or powershell in Windows can not run the following scripts:
```shell
yarn data:check
yarn data:edit
yarn data:change-path
```

Use these commands instead:
```shell
yarn data:check:win
yarn data:edit:win
yarn data:change-path:win <PATH-TO-JSON-FILE>
```
