"use client";

import { Message as AIMessage } from "ai";
import { orderFoodCard } from "@/samples";
import AdaptiveCard from "@/components/AdaptiveCard";
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
          justifyContent: role === "assistant" ? "flex-start" : "flex-end",
        }}
      >
        <MessagePaper elevation={2} role={role}>
          <ContentBox>
            {content && (
              <Box>
                <Markdown>{content as string}</Markdown>
              </Box>
            )}

            {toolInvocations?.map((toolInvocation) => {
              const { toolName, toolCallId, state } = toolInvocation;

              if (state !== "result") return null;

              const { result } = toolInvocation;

              return (
                <Box key={toolCallId}>
                  {toolName === "showOrderDetails" && (
                    <Box>
                      <Typography variant="h6">Show Order Conf</Typography>
                      <Typography variant="body1">
                        {JSON.stringify(result, null, 2)}
                      </Typography>
                    </Box>
                  )}
                  {toolName === "createOrder" && !result && (
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
                  )}
                </Box>
              );
            })}
          </ContentBox>
        </MessagePaper>
      </MessageContainer>
    </Fade>
  );
};
