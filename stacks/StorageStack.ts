import { Bucket, StackContext, Table } from "sst/constructs";

export function StorageStack({ stack, app }: StackContext) {
    // Create the DynamoDB table
    const table = new Table(stack, "Users", {
        fields: {
            userId: "string",
        },
        primaryIndex: { partitionKey: "userId"},
    });

    const bucket = new Bucket(stack, "Uploads", {
        cors: [
            {
              maxAge: "1 day",
              allowedOrigins: ["*"],
              allowedHeaders: ["*"],
              allowedMethods: ["GET", "PUT", "POST", "DELETE", "HEAD"],
            },
          ],
    });


    return {
        table,
        bucket
    };
}