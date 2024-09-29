import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { styled } from "@mui/material/styles";
import { Typography, Box, List, ListItem } from "@mui/material";

const StyledPre = styled("pre")(({ theme }) => ({
  fontSize: theme.typography.body2.fontSize,
  width: "100%",
  maxWidth: "500px",
  overflowX: "auto",
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.grey[800]
      : theme.palette.grey[100],
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  marginTop: theme.spacing(1),
}));

const StyledCode = styled("code")(({ theme }) => ({
  fontSize: theme.typography.body2.fontSize,
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.grey[800]
      : theme.palette.grey[100],
  padding: `${theme.spacing(0.25)} ${theme.spacing(0.5)}`,
  borderRadius: theme.shape.borderRadius,
}));

const NonMemoizedMarkdown = ({ children }: { children: string }) => {
  const components = {
    code: ({ node, inline, className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <StyledPre {...props}>
          <code className={match[1]}>{children}</code>
        </StyledPre>
      ) : (
        <StyledCode {...props}>{children}</StyledCode>
      );
    },
    ol: ({ node, children, ...props }: any) => (
      <List component="ol" sx={{ listStyleType: "decimal", pl: 4 }} {...props}>
        {children}
      </List>
    ),
    ul: ({ node, children, ...props }: any) => (
      <List component="ul" sx={{ listStyleType: "disc", pl: 4 }} {...props}>
        {children}
      </List>
    ),
    li: ({ node, children, ...props }: any) => (
      <ListItem sx={{ py: 0.5, display: "list-item" }} {...props}>
        {children}
      </ListItem>
    ),
    strong: ({ node, children, ...props }: any) => (
      <Typography component="span" fontWeight="bold" {...props}>
        {children}
      </Typography>
    ),
  };

  return (
    <Box>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </Box>
  );
};

export const Markdown = React.memo(
  NonMemoizedMarkdown,
  (prevProps, nextProps) => prevProps.children === nextProps.children
);
