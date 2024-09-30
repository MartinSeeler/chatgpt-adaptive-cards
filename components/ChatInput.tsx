"use client";

import React, { ChangeEvent, FormEvent } from "react";
import { Paper, TextField, Button, Typography, styled } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Link from "next/link";

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

const FooterTypography = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  marginTop: theme.spacing(1),
  fontSize: "0.8rem",
  color: theme.palette.text.secondary,
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
    <>
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
      <FooterTypography>
        Built with love by{" "}
        <Link href="https://martinseeler.com">Martin Seeler</Link>
      </FooterTypography>
    </>
  );
};

export default ChatInput;
