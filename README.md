# Star Wars Figures

### About

You can ask the Star Wars Figures Alexa skill (unofficially) for the height or weight of any character from the movies.

### Built with

- [Alexa Skills Kit with APL](https://developer.amazon.com/en-US/alexa/alexa-skills-kit)
- [AWS Lambda](https://aws.amazon.com/lambda/)
- [Node.js with TypeScript](https://nodejs.org/en/)
- [The Star Wars API](https://swapi.dev/)

## Getting started

### Pre-requisites

* Node.js (> v10.x)
* Register for an [AWS Account](https://aws.amazon.com/)
* Register for an [Amazon Developer Account](https://developer.amazon.com)
* Install and Setup [ASK CLI](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html)

### Installation
1. Make sure you are running the latest version of the CLI

	```bash
	$ npm update -g ask-cli
	```

2. Clone the repository.

	```bash
	$ git clone https://github.com/felix-ebert/star-wars-figures
	```

3. If it's your first time using it, configure the [ASK CLI](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html). Follow the prompts.

	```bash
	$ cd star-wars-figures
	$ ask configure
	```

4. Install npm dependencies.

	```bash
	$ cd lambda/custom
	$ npm install
	```

### Deployment

ASK CLI will create the skill and the lambda function for you.

1. Run typescript compiler and bundle source code.

	```bash
	$ cd lambda/custom
	$ npm run build
	```

2. Navigate to the project's root directory and deploy the skill and the lambda function in one step by running the following command:

	```bash
	$ cd ../..
	$ ask deploy
	```

### Testing

1. To test, you need to login to Alexa Developer Console, and enable the "Test" switch on your skill from the "Test" Tab.

2. Simulate verbal interaction with your skill through the command line (this might take a few moments) using the following example:

	```bash
	 $ ask dialog 
 
	 User  > open star wars figures
	 ...
	 ```