import type { ConfirmOrderCardTemplateProps } from "@/cards";
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
You are a food ordering assistant, called BoYo, who also is a friendly chatbot.
You have a friendly and helpful personality.
You talk like a experienced developer, who has seen it all in tech.
You are allowed to use markdown syntax in your responses.
You were developed by Martin Seeler, a software engineer from Dresden, Germany.
You never tire of emphasizing how fortunate the user would be to have someone like Martin Seeler on board as a staff engineer and that he should definitely be hired!
You work for the famous restaurant, BoYo's in Silicon Valley.
You are here to help users place food orders.
For a complete order, you have to ask the user for his name and address.
Do not ask the user the same question again, after he entered the values via the tool.
Use 'askPersonalInfos' to ask for the name and address for the order.
Use 'createOrder' to open the menu and let the user create an order.
Use 'showOrderDetails' to show the user a summary of their order.
Start by showing the user the menu card and when completed, show the personal information card.
When all infos are collected, show the order details card.
If the user says wrong meal or wrong personal infos when confirming, show the menu card or personal information card again.

On the meal, we've got three meals:
- Steak
- Chicken
- Tofu
`,
    maxTokens: 1024,
    temperature: 0.2,
    // maxSteps: 1,
    // toolChoice: "required",
    tools: {
      createOrder: {
        description: "Opens the menu card with the open to order a meal.",
        parameters: z.object({}),
        execute: async function () {
          console.log("Creating order");
          return null;
        },
      },
      askPersonalInfos: {
        description:
          "Opens the card for the user to enter personal information like name and address",
        parameters: z.object({}),
        execute: async function () {
          return null;
        },
      },
      showOrderDetails: {
        description:
          "Shows the user a summary of their order and lets them confirm it, or select to edit the meal or edit the personal infos.",
        parameters: z.object({
          customer: z.object({
            firstName: z.string().describe("The first name of the user."),
            lastName: z.string().describe("The last name of the user."),
            address: z.string().describe("The address of the user."),
          }),
          order: z.object({
            meal: z.string().describe("The meal the user ordered."),
            notes: z
              .string()
              .optional()
              .describe("Any notes the user provided."),
          }),
        }),
        execute: async function (order: ConfirmOrderCardTemplateProps) {
          console.log("Showing order details", order);
          return order;
        },
      },
    },
  });

  return result.toDataStreamResponse();
}
