import { APIInteraction, APIInteractionResponse, ApplicationCommandType, InteractionResponseType, MessageFlags } from "discord-api-types/v10";

export default {
    command: {
        type: ApplicationCommandType.ChatInput,
        name: "ping",
        description: "Ping",
        default_member_permissions: "0",
        default_permission: false,
    },

    handler: async (request: APIInteraction): Promise<APIInteractionResponse> => {
        console.log(request)
        return {
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: `Hello, World at ${new Date().toString()}!`,
                flags: MessageFlags.Ephemeral
            }
        };
    }
}