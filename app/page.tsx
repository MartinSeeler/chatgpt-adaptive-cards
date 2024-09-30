"use client";

import React, { ChangeEvent, FormEvent } from "react";
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  styled,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useChat } from "ai/react";
import { Message } from "@/components/Message";
import { useScrollToBottom } from "@/components/use-scroll-to-bottom";
import EmptyScreen from "@/components/EmptyScreen";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  display: "flex",
  alignItems: "center",
  maxWidth: "600px",
  margin: "0 auto",
  width: "100%",
  boxShadow: "0 0 15px rgba(0,0,0,0.1)",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  flex: 1,
  "& .MuiInputBase-root": {
    padding: theme.spacing(1, 0),
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  minWidth: "auto",
  padding: theme.spacing(1),
}));

type ChatInputProps = {
  input: string;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

const ChatInput: React.FC<ChatInputProps> = ({
  input,
  handleInputChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <StyledPaper>
        <StyledTextField
          fullWidth
          placeholder="Send a message..."
          value={input}
          variant="standard"
          onChange={handleInputChange}
        />
        <StyledButton type="submit">
          <SendIcon />
        </StyledButton>
      </StyledPaper>
    </form>
  );
};

const MainContent = styled(Box)(({}) => ({
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
}));

const MessageContainer = styled(Container)(({ theme }) => ({
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  padding: theme.spacing(0),
  overflow: "auto",
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

      <Box sx={{ height: "auto" }}>
        <ChatInput
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      </Box>
    </Box>
  );
}
