import { APIInteraction, APIInteractionResponse, InteractionResponseType } from "discord-api-types/v10"

export const discordInteraction = async (request: APIInteraction): Promise<APIInteractionResponse> => {
    console.log(request)
    return {
        type: InteractionResponseType.Pong
    }
}