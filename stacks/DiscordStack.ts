import { Api, Script, StackContext } from "sst/constructs";
import { config } from "./config";


export function DiscordStack({ stack, app }: StackContext) {

    const update = new Script(stack, "script", {
        onCreate: "apps/discord/src/index.deploy",
        onUpdate: "apps/discord/src/index.deploy"
    });

    const api = new Api(stack, "Api", {
        customDomain: app.stage === "prod" ? {
            domainName: `discord.${config.baseUrl}`,
            hostedZone: config.baseUrl,
        } : undefined,
        defaults: {
            // authorizer: "iam",
            function: {
                // bind: [table],
                environment: {
                    DISCORD_TOKEN: process.env.DISCORD_TOKEN || "",
                    DISCORD_PUBLIC_KEY: process.env.DISCORD_PUBLIC_KEY || "",
                },
            }
        },
        cors: true,
        routes: {
            "$default": "apps/discord/src/index.handler",
        }
    })
    stack.addOutputs({
        Updated: update.id,
        DiscordEndpoint: api.url,
    })
    return {
        api
    }
}