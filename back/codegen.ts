import { CodegenConfig } from "@graphql-codegen/cli";

export default {
  schema: "./schema.ts",
  generates: {
    "./generated/graphql.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        useIndexSignature: true,
        contextType: "../context#Context",
        mappers: {},
        scalars: {
          DateTime: "Date",
        },
      },
    },
  },
} satisfies CodegenConfig;

