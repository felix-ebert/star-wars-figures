import { ErrorHandler, getLocale, getSlotValue, getSupportedInterfaces, HandlerInput, RequestHandler, SkillBuilders, } from 'ask-sdk-core';
import { Response, SessionEndedRequest, } from 'ask-sdk-model';
import { FigureService } from './figure/FigureService';

import launchTemplate from './templates/launchTemplate.json';

const LaunchRequestHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput: HandlerInput): Response {
        const responseBuilder = handlerInput.responseBuilder;
        const speechText = 'Welcome to the Star Wars Figures skill! You can ask me for the height or weight of a Star Wars figure!';

        if (getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            responseBuilder.addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                token: 'helloworldToken',
                document: launchTemplate
            });
        }

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    },
};

const GetHeightIntentHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'GetHeightIntent';
    },
    async handle(handlerInput: HandlerInput): Promise<Response> {
        const figureName = getSlotValue(handlerInput.requestEnvelope, 'figureName');
        const figure = await FigureService.getFigure(figureName);

        const speechText = figureName + ' is ' + figure.height + ' centimeters tall!';

        return handlerInput.responseBuilder
            .speak(speechText)
            .withShouldEndSession(true)
            .getResponse();
    },
}

const GetWeightIntentHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'GetWeightIntent';
    },
    async handle(handlerInput: HandlerInput): Promise<Response> {
        const figureName = getSlotValue(handlerInput.requestEnvelope, 'figureName');
        const figure = await FigureService.getFigure(figureName);

        const speechText = figureName + ' is ' + figure.mass + ' kilograms heavy!';

        return handlerInput.responseBuilder
            .speak(speechText)
            .withShouldEndSession(true)
            .getResponse();
    },
}

const HelpIntentHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput: HandlerInput): Response {
        const speechText = 'You can say hello to me!';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard('Hello World', speechText)
            .getResponse();
    },
};

const CancelAndStopIntentHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput: HandlerInput): Response {
        const speechText = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('Hello World', speechText)
            .withShouldEndSession(true)
            .getResponse();
    },
};

const SessionEndedRequestHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput: HandlerInput): Response {
        console.log(`Session ended with reason: ${(handlerInput.requestEnvelope.request as SessionEndedRequest).reason}`);

        return handlerInput.responseBuilder.getResponse();
    },
};

const ErrorHandler: ErrorHandler = {
    canHandle(handlerInput: HandlerInput, error: Error): boolean {
        console.log('Error occured: %s, %s', handlerInput, error);
        return true;
    },
    handle(handlerInput: HandlerInput, error: Error): Response {
        console.log(`Error handled: ${error.message}`);

        return handlerInput.responseBuilder
            .speak('Sorry, I can\'t understand the command. Please say again.')
            .reprompt('Sorry, I can\'t understand the command. Please say again.')
            .getResponse();
    },
};

export const handler = SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelpIntentHandler,
        GetHeightIntentHandler,
        GetWeightIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
    )
    .addErrorHandlers(ErrorHandler)
    .lambda();