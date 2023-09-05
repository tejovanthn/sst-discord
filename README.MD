# Discord Bot with SST

A large part of this was possible because of wleroux on discord.


## What is this?

This is a Discord bot that uses the [SST Framework](https://sst.dev)

Check `apps/discord` for the code.

## How to use?

Copy `.env-example` to `.env.local`. 
Get your discord bot token, app id, and public key from [here](https://discord.com/developers/applications) and paste it in `.env.local`.
Run `pnpm install` to install dependencies.
Run `pnpm dev` to start the bot. 
You need to copy `${DiscordEndpoint}/interactions` to your discord app's interaction endpoint.

## How to deploy?

Deploy with Seed. Set the env vars accordingly. 
The app registers the commands automatically on startup.

## Adding Commands

Add commands in `apps/discord/src/commands`. `index.ts` in that folder exports all the commands and handlers.