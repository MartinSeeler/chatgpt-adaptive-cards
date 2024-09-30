"use client";

import { Message as AIMessage } from "ai";
import {
  confirmOrderCardTemplate,
  orderFoodCard,
  personalInfoCard,
} from "@/cards";
import AdaptiveCard from "@/components/cards/AdaptiveCard";
import { Markdown } from "@/components/Markdown";
import { Fade, Typography, Box, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

const MessageContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  marginBottom: theme.spacing(2),
  "&:first-of-type": {
    marginTop: theme.spacing(2),
  },
}));

const MessagePaper = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "role",
})<{ role: string }>(({ theme, role }) => ({
  maxWidth: "80%",
  paddingRight: theme.spacing(2),
  paddingLeft: theme.spacing(2),
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  backgroundColor:
    role === "assistant"
      ? theme.palette.grey[100]
      : theme.palette.primary.light,
  color:
    role === "assistant"
      ? theme.palette.text.primary
      : theme.palette.primary.contrastText,
  borderRadius:
    role === "assistant" ? "20px 20px 20px 5px" : "20px 20px 5px 20px",
}));

const ContentBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: 2,
});

type MessageProps = Pick<AIMessage, "role" | "content" | "toolInvocations"> & {
  onToolResult: (toolCallId: string, result: string) => void;
};

export const Message: React.FC<MessageProps> = ({
  role,
  content,
  toolInvocations,
  onToolResult,
}) => {
  return (
    <Fade in={true} style={{ transitionDelay: "100ms" }}>
      <MessageContainer
        sx={{
          alignItems: role === "assistant" ? "start" : "end",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {content && (
          <MessagePaper elevation={2} role={role}>
            <ContentBox>
              <Markdown>{content as string}</Markdown>
            </ContentBox>
          </MessagePaper>
        )}
        {toolInvocations?.map((toolInvocation) => {
          const { toolName, toolCallId, state } = toolInvocation;

          if (state !== "result") return null;

          const { result } = toolInvocation;

          return toolName === "showOrderDetails" &&
            result?.hasOwnProperty("order") ? (
            <AdaptiveCard
              key={toolCallId}
              card={confirmOrderCardTemplate(result)}
              onAction={(actionType, data) => {
                onToolResult(
                  toolCallId,
                  "The user has selected the option: " + data
                );
                console.log("Card action", toolCallId, data);
              }}
            />
          ) : toolName === "createOrder" && !result ? (
            <AdaptiveCard
              key={toolCallId}
              card={orderFoodCard}
              onAction={(actionType, data) => {
                onToolResult(
                  toolCallId,
                  "User has ordered the meal:" + JSON.stringify(data, null, 2)
                );
                console.log("Card action", toolCallId, data);
              }}
            />
          ) : toolName === "askPersonalInfos" && !result ? (
            <AdaptiveCard
              key={toolCallId}
              card={personalInfoCard}
              onAction={(actionType, data) => {
                onToolResult(
                  toolCallId,
                  "The user has entered the following data: " +
                    JSON.stringify(data, null, 2)
                );
              }}
            />
          ) : result ? (
            <Typography
              key={toolCallId}
              variant="subtitle2"
              color="textSecondary"
              textAlign="left"
            >
              LLM tool <b>{toolName}</b> returned: {result}
            </Typography>
          ) : null;
        })}
      </MessageContainer>
    </Fade>
  );
};
