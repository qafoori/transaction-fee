This is a very simple example of online payment services. It calculates the fee of commissions for users per week

# Content

- [Get Started](https://github.com/qafoori/transaction-fee#get-started)
  1.  [Clone the repo](https://github.com/qafoori/transaction-fee#1-clone-the-repo)
  2.  [Install dependencies](https://github.com/qafoori/transaction-fee#2-install-dependencies)
  3.  [Setting up environment variables (_Very Important_)](https://github.com/qafoori/transaction-fee#3-setting-up-environment-variables-very-important)
  4.  [Starting scripts](https://github.com/qafoori/transaction-fee#4-starting-scripts)
  5.  [Running tests scripts](https://github.com/qafoori/transaction-fee#5-running-tests-scripts)
  6.  [Data manipulation scripts](https://github.com/qafoori/transaction-fee#6-data-manipulation-scripts)
  7.  [Contributing scripts](https://github.com/qafoori/transaction-fee#7-contributing-scripts)
- [Important Things](https://github.com/qafoori/transaction-fee#imortant-things)
  1.  [Running test notes](https://github.com/qafoori/transaction-fee#1-running-test-notes)
  2.  [Unix users](https://github.com/qafoori/transaction-fee#2-unix-users)
  3.  [Windows users](https://github.com/qafoori/transaction-fee#3-windows-users)

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

### 3. Setting up environment variables (_Very Important_)

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

# Important Things

### 1. Running test notes

According to the test report file in the latest state ([junit.xml](https://github.com/qafoori/transaction-fee/blob/develop/junit.xml#L2)), all tests are passed successfully.
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
