import * as debug from "./debug";

export default function handler(lambda: Function) {
  return async function (event: any, context:any) {
    let body, statusCode;

    debug.init(event);

    try {
      body = await lambda(event, context);
      statusCode = 200;
    } catch (error: any) {
      debug.flush(error);
      body = { error: error.message };
      statusCode = 500;
    }

    return {
      statusCode,
      body: JSON.stringify(body),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    };
  };
}