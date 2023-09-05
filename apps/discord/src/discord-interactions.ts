import { APIInteraction, APIInteractionResponse, InteractionResponseType, MessageFlags } from "discord-api-types/v10"

export const discordInteraction = async (request: APIInteraction): Promise<APIInteractionResponse> => {
    console.log(request)
    return {
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
            content: "Hello, World!",
            flags: MessageFlags.Ephemeral
        }
    };
}