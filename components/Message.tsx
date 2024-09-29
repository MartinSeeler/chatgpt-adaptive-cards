"use client";

import { motion } from "framer-motion";
import { BotIcon } from "./icons";
import { ReactNode } from "react";
import { StreamableValue, useStreamableValue } from "ai/rsc";
import { ToolInvocation } from "ai";
import AdaptiveCard from "./AdaptiveCard";
import { orderFoodCard } from "@/samples";

export const TextStreamMessage = ({
  content,
}: {
  content: StreamableValue;
}) => {
  const [text] = useStreamableValue(content);

  return (
    <motion.div
      className={`flex flex-row gap-4 px-4 w-full md:w-[500px] md:px-0 first-of-type:pt-20`}
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className="size-[24px] flex flex-col justify-center items-center flex-shrink-0 text-zinc-400">
        <BotIcon />
      </div>

      <div className="flex flex-col gap-1 w-full">
        <div className="text-zinc-800 dark:text-zinc-300 flex flex-col gap-4">
          {text}
        </div>
      </div>
    </motion.div>
  );
};

export const Message = ({
  content,
  toolInvocations,
  onToolResult,
}: {
  role: string;
  content: string | ReactNode;
  toolInvocations: Array<ToolInvocation> | undefined;
  onToolResult: (toolCallId: string, result: string) => void;
}) => {
  return (
    <motion.div
      className={`flex flex-row gap-4 px-4 w-full md:w-[500px] md:px-0 first-of-type:pt-20`}
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      {/* <div className="size-[24px] flex flex-col justify-center items-center flex-shrink-0 text-zinc-400">
        {role === "assistant" ? <BotIcon /> : <UserIcon />}
      </div> */}

      <div className="flex flex-col gap-6 w-full">
        {content && (
          <div className="text-zinc-800 dark:text-zinc-300 flex flex-col gap-4">
            {content as string}
          </div>
        )}

        {toolInvocations && (
          <div className="flex flex-col gap-4">
            {toolInvocations.map((toolInvocation) => {
              const { toolName, toolCallId, state } = toolInvocation;

              if (state === "result") {
                const { result } = toolInvocation;

                return (
                  <div key={toolCallId}>
                    {toolName === "showOrderDetails" ? (
                      <div>
                        <h1>Show Order Conf</h1>
                        {JSON.stringify(result, null, 2)}
                      </div>
                    ) : null}
                    {toolName === "createOrder"
                      ? !result && (
                          <AdaptiveCard
                            card={orderFoodCard}
                            onAction={(actionType, data) => {
                              onToolResult(
                                toolCallId,
                                "The user has ordered the following menu: " +
                                  JSON.stringify(data)
                              );
                              console.log("Card action", toolCallId, data);
                            }}
                          />
                        )
                      : null}
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
};
