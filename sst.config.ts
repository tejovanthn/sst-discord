import { SSTConfig } from "sst";
import { StorageStack } from "./stacks/StorageStack";
import { AuthStack } from "./stacks/AuthStack";
import { DiscordStack } from "./stacks/DiscordStack";

export default {
  config(_input) {
    return {
      name: "gaminggeeks",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app
    .stack(StorageStack)
    .stack(DiscordStack)
    .stack(AuthStack)
  }
} satisfies SSTConfig;
