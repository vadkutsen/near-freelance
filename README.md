# NEAR Freelance
The project is a blockchain platform where users can post paid tasks and get paid by executing tasks they applied to.
This is a training project for Dacade NEAR blockchain course.
The contract is written in AssemblyScript and deployed to the testnet. The frontend is written on React.

## Demo

You can find the working demo here:
[https://vadkutsen.github.io/near-freelance](https://vadkutsen.github.io/near-freelance)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Contract

The contract contains of the next functions:

### setProject
accepts a project object as a parameter and saves the project on blockchain.

### getProject
accepts a project id as a parameter and returns the project object or null if the project is not found.
### getProjects
returns a list of existing projects.
### applyForProject
accepts a project id as a parameter and sets the sender id as the project assignee.
### completeProject
accepts a project id and a result string as a parameters and sets the project's completed field to true and saves the result.
### payForProject
accepts a project id and as a parameter and sets the project's paid field to true and transfers the price amount to assignee.

