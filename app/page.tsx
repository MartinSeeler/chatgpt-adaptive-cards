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

const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
}));

const MessageContainer = styled(Container)(({ theme }) => ({
  flexGrow: 1,
  marginBottom: theme.spacing(2),
}));

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, addToolResult } =
    useChat({
      initialMessages: [
        // {
        //   id: "1",
        //   role: "assistant",
        //   content: "Hello! How can I help you today?",
        // },
        // {
        //   id: "2",
        //   role: "user",
        //   content: "I want to order food.",
        // },
        // {
        //   id: "3",
        //   role: "assistant",
        //   content: "Sure! What would you like to order?",
        //   toolInvocations: [
        //     {
        //       toolName: "createOrder",
        //       toolCallId: "1",
        //       result: null,
        //       state: "result",
        //       args: {},
        //     },
        //   ],
        // },
      ],
    });

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <MainContent>
        <MessageContainer maxWidth="sm">
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
        </MessageContainer>

        <ChatInput
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      </MainContent>
    </Box>
  );
}
