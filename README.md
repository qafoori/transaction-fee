This is a very simple example of online payment services. It calculates the fee of commissions for users per week

## Get Started
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

### 3. Starting scripts
```bash
## will start the project and log the results of commission fees
yarn start #or npm start

## will start the project using `nodemon` with watch mode
yarn dev #or npm run dev
```

### 4. Running tests scripts
```bash
## will start the tests once
yarn test:run #or npm run test:run

## will start the tests with watch mode
yarn test:watch #or npm run test:watch
```

### 5. Data manipulation scripts
```bash
## will print ($ cat) example data which is used by default in the repo
yarn data:check #or npm run data:check

## will open up vim to edit the example data (requires password)
yarn data:edit #or npm run data:edit

## will change the default data path in `package.json` to refer to the use of another path
yarn data:change-path <PATH-TO-JSON-FILE> #or npm run data:change-path <PATH-TO-JSON-FILE>
```

### 6. Contributing scripts
```bash
## will install husky to run pre-commit commands
yarn prepare #or npm run prepare
```
