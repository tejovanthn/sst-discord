import util from "util";
import AWS from "aws-sdk";

const logs: any[] = [];

// Log AWS SDK calls
AWS.config.logger = { log: debug };

export default function debug(...args: any[]) {
  logs.push({
    date: new Date(),
    string: util.format.apply(null, args),
  });
}

export function init(event: any) {
  debug("API event", {
    body: event.body,
    pathParameters: event.pathParameters,
    queryStringParameters: event.queryStringParameters,
  });
}

export function flush(error: any) {
  logs.forEach(({ date, string }) => console.debug(date, string));
  console.error(error);
}