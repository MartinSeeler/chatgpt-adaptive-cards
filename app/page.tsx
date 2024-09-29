"use client";

import React, { ChangeEvent, FormEvent } from "react";
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  styled,
  Grid2 as Grid,
  Card,
  CardContent,
  Link,
  Typography,
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
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
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

  const options = [
    {
      title: "Menu",
      description: "Show the menu of the restaurant and help me choose a dish.",
    },
    {
      title: "Markdown",
      description: "Show me an extended demo of the Markdown feature.",
    },
  ];

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <MainContent>
        <MessageContainer maxWidth="sm">
          {messages.length === 0 && (
            <>
              <Box textAlign="center" mb={4}>
                <Typography variant="h4" gutterBottom>
                  Welcome to the ChatGPT Demo!
                </Typography>
                <Typography variant="body1">
                  This is an advanced ChatGPT-like interface built with{" "}
                  <Link
                    href="https://nextjs.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Next.js
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="https://mui.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Material-UI
                  </Link>
                  . It leverages the power of the{" "}
                  <Link
                    href="https://vercel.com/ai"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Vercel AI SDK
                  </Link>{" "}
                  to interact with AI models and{" "}
                  <Link
                    href="https://adaptivecards.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Adaptive Cards
                  </Link>{" "}
                  to render dynamic and interactive responses.
                </Typography>
              </Box>
              <Grid container spacing={3} justifyContent="center">
                {options.map((option, index) => (
                  <Grid size={6} key={index}>
                    <Card
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        append({
                          role: "user",
                          content: option.description,
                        })
                      }
                    >
                      <CardContent style={{ textAlign: "center" }}>
                        <Typography variant="h6" gutterBottom>
                          {option.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {option.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </>
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
