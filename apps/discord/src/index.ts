import { verifyKey } from "discord-interactions";
import {commands} from "./commands";
import { handle } from "./commands";
import { APIInteraction, InteractionResponseType, InteractionType, MessageFlags } from "discord-api-types/v10";
import { APIGatewayProxyEventV2, APIGatewayProxyHandlerV2 } from "aws-lambda/trigger/api-gateway-proxy";
import { Handler, useLambdaContext } from "sst/context";
import fetch from "node-fetch";
import debug from "@app/core/debug"

export const interactionsHandler = async (event: APIGatewayProxyEventV2) => {
	// Verify Key
	if (!event.body) {
		return ({ statusCode: 401, body: "Bad request signature" });
	}
	const signature = event.headers['x-signature-ed25519'] || "";
	const timestamp = event.headers['x-signature-timestamp'] || "";
	if (!verifyKey(event.body, signature, timestamp, process.env.DISCORD_PUBLIC_KEY || "")) {
		return ({ statusCode: 401, body: "Bad request signature" });
	}

	// Process Message
	const body = (JSON.parse(event.body.toString()) || {}) as APIInteraction;

	// Respond to Pings
	if (body.type === InteractionType.Ping) {
		return ({
			statusCode: 200,
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ type: InteractionResponseType.Pong })
		});
	}

	return handle(body)
		.then((response) => {
			return ({
				statusCode: 200,
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(response)
			})
		}).catch((error) => {
			debug(error);
			return {
				statusCode: 500,
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					type: InteractionResponseType.ChannelMessageWithSource,
					data: {
						embeds: [{
							title: "Internal Server Error",
							description: "An unexpected error with the bot has occurred and an admin has been notified.",
							footer: {
								text: `Request ID: ${useLambdaContext().awsRequestId}`
							}
						}],
						flags: MessageFlags.Ephemeral
					}
				})
			};
		});
}

export const handler: APIGatewayProxyHandlerV2<void> = Handler("api", async (event) => {
	if (event.requestContext.http.method === "OPTIONS") {
		return {
			statusCode: 200,
			headers: {
				"Access-Control-Allow-Methods": "POST, GET, OPTIONS",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Headers": "Authorization",
				"Access-Control-Max-Age": 86400
			}
		}
	}

	debug(event)

	if (event.rawPath.startsWith("/interactions")) {
		return interactionsHandler(event);
	} else {
		return { statusCode: 404 };
	}
});

export const deploy: APIGatewayProxyHandlerV2 = async (event) => {
	const response = await fetch(`https://discord.com/api/v10/applications/${process.env.DISCORD_APP_ID}/commands`, {
		method: "PUT",
		headers: {
			"Authorization": `Bot ${process.env.DISCORD_TOKEN}`,
			"Content-Type": "application/json"
		},
		body: JSON.stringify(commands)
	});

	if (response.status !== 200) {
		debug(JSON.stringify(await response.json()));
		return ({ statusCode: 500 });
	}

	return ({ statusCode: 200 });
};