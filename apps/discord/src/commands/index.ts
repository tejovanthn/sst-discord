import { APIInteraction, APIInteractionResponse, ApplicationCommandType } from "discord-api-types/v10";
import Ping from "./ping";

export type HandlerFunction = (request: APIInteraction) => Promise<APIInteractionResponse>

export const commands = [
    Ping.command
]

export const handlers: {[key: string]: HandlerFunction} = {
    "ping": Ping.handler
}

const unknownCommand = {
    type: 4,
    data: {
        content: "Unknown Command"
    }
}

export const handle: HandlerFunction = async (request)  => {
    if(!request.data) {
        return unknownCommand
    }
    const name = request.data.name || request.data.custom_id;
    const handler = handlers[name];
    if (handler) {
        return await handler(request);
    }
    return unknownCommand
}