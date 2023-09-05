import { APIApplicationCommand, ApplicationCommandType } from "discord-api-types/v10";



export const PingCommand: Partial<APIApplicationCommand> = {
    type: ApplicationCommandType.ChatInput,
    name: "ping",
    description: "Ping",
    default_member_permissions: "0",
    default_permission: false,
};

export default [PingCommand];