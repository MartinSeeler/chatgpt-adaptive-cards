import { openai } from "@ai-sdk/openai";
import { streamText, convertToCoreMessages } from "ai";
import { z } from "zod";

export const maxDuration = 60;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai("gpt-4o-mini"),
    messages: convertToCoreMessages(messages),
    system: `
You are a food ordering assistant, called BoYo.
You work for the famous restaurant, BoYo's in Silicon Valley.
You are here to help users place food orders.
For a complete order, you have to ask the user for his name and address.
`,
    maxTokens: 1024,
    temperature: 0.2,
    // maxSteps: 1,
    // toolChoice: "required",
    tools: {
      createOrder: {
        description: "Shows the user a dialog to create a food order.",
        parameters: z.object({}),
        execute: async function () {
          console.log("Creating order");
          return null;
        },
      },
      showOrderDetails: {
        description: "Shows the user a summary of their order.",
        parameters: z.object({
          dish: z.string().describe("The dish the user ordered."),
          notes: z.string().optional().describe("Any notes the user provided."),
        }),
        execute: async function ({ dish, notes }) {
          console.log("Showing order details", dish, notes);
          return {
            dish,
            notes,
          };
        },
      },
    },
  });

  return result.toDataStreamResponse();
}
