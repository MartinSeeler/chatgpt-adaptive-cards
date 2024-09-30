"use client";

import React from "react";
import { Box, Container, styled } from "@mui/material";
import { useChat } from "ai/react";
import { Message } from "@/components/Message";
import { useScrollToBottom } from "@/components/use-scroll-to-bottom";
import EmptyScreen from "@/components/EmptyScreen";
import ChatInput from "@/components/ChatInput";

const MainContent = styled(Box)(({}) => ({
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
}));

const MessageContainer = styled(Container)(({ theme }) => ({
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  overflowY: "scroll",
  overflowX: "hidden",
  paddingBottom: theme.spacing(2),
  paddingTop: theme.spacing(2),
}));

export default function Home() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    addToolResult,
    append,
  } = useChat({
    initialMessages: [],
  });

  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();

  return (
    <Box sx={{ display: "flex", height: "100vh", flexDirection: "column" }}>
      <MainContent>
        <MessageContainer maxWidth="sm" ref={messagesContainerRef}>
          {messages.length === 0 && (
            <EmptyScreen
              onSelectQuickOption={(content) => {
                append({ role: "user", content: content });
              }}
            />
          )}
          {messages.map((m) => (
            <Message
              key={m.id}
              role={m.role}
              content={m.content}
              toolInvocations={m.toolInvocations}
              onToolResult={(toolCallId, result) => {
                addToolResult({ toolCallId, result });
              }}
            />
          ))}
          <div ref={messagesEndRef} />
        </MessageContainer>
      </MainContent>

      <ChatInput
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </Box>
  );
}
