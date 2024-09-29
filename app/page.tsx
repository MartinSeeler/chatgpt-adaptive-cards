"use client";

import React from "react";
import { Box, Container, Paper, TextField, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useChat } from "ai/react";

import AdaptiveCard from "@/components/AdaptiveCard";
import { Message } from "@/components/Message";
import { orderFoodCard } from "@/samples";

import { ChangeEvent, FormEvent } from "react";

interface ChatInputProps {
  input: string;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  input,
  handleInputChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Paper
        className="chat-input"
        sx={{
          p: "8px 16px",
          display: "flex",
          alignItems: "center",
          maxWidth: "600px",
          margin: "0 auto",
          width: "100%",
          boxShadow: "0 0 15px rgba(0,0,0,0.1)",
        }}
      >
        <TextField
          fullWidth
          placeholder="Send a message..."
          value={input}
          variant="standard"
          sx={{ flex: 1 }}
          onChange={handleInputChange}
        />
        <Button type="submit" sx={{ minWidth: "auto", p: "10px" }}>
          <SendIcon />
        </Button>
      </Paper>
    </form>
  );
};

ChatInput.displayName = "ChatInput";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, addToolResult } =
    useChat();

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}

      {/* Main content */}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, display: "flex", flexDirection: "column" }}
      >
        <Container maxWidth="sm" sx={{ flexGrow: 1, mb: 2 }}>
          <AdaptiveCard
            key={"demo-card"}
            card={orderFoodCard}
            onAction={(data) => {
              console.log("Card action", data);
            }}
          />
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
        </Container>

        {/* Input area */}
        <ChatInput
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      </Box>
    </Box>
  );
}
