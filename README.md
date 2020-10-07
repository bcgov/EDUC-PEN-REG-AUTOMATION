# EDUC-PEN-REG-AUTOMATION
## E2E Tests
The following documentation describes the E2E test folder structure and file purpose.

# Folder Structure

## .github/workflows
This folder contains all the executable workflows, each workflow is designed to execute paricular set of instructions which will execute the testcases in a flow.

## frontend
This folder contains tests/e2e folder, package.json and package-lock.json files

## tests/e2e
In this folder there are 6 sub folders 
### config
This folder consists all the configurations and data sets required to run the tests

### helpers
This folder contains constants where the constant values are stored like urls

### pageObjects
This folder is divided in to sub folders as Admin, Basic, Gmp, Ump which contain page object elements of the web pages

### testCases
This folder is divided in to sub folders  as Admin, Gmp, Ump and previous bugs which contain all the testCases.

### testSuits
This folder is divided in to sub folders as GmpE2E, UmpE2E, GmpWithUmpE2E which contains all the testSuits.

### uploads
This folder contains the files required to upload when required.



### /e2e
Any JavaScript files in the base /e2e folder will be run as TestCafe tests. Therefore any .js or .ts files must have the following code at the top of the file:
``` javascript
import { Selector } from 'testcafe';
```

### /e2e/config
This folder contains any environment variables needed to run the e2e tests (such as usernames or passwords). The config file will automatically pull environment variables set in the default section of the index.js file:
``` javascript
nconf.defaults({
    VARIABLE_KEY: VARIABLE_VALUE
});
```

To run locally, you must download all dependencies from the base project directory and create a local.json file which contains the required environment variables and set the NODE_ENV variable to "local" from the command line.

Download all npm dependencies (make sure you are in the /frontend directory):
``` bash
npm install
npm install testcafe -g
```

Set NODE_ENV in Powershell:
``` powershell
$env:NODE_ENV="local"
```

Set NODE_ENV in CMD:
``` cmd
set NODE_ENV=local
```

Set NODE_ENV in Linux Shells:
``` bash
export NODE_ENV=local
```