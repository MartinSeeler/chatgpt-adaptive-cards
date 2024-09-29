import React from "react";
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { styled } from "@mui/material/styles";
import { Typography, Box, List, ListItem } from "@mui/material";

const StyledPre = styled("pre")(({ theme }) => ({
  fontSize: theme.typography.body2.fontSize,
  width: "100%",
  maxWidth: "100%",
  overflowX: "auto",
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.grey[800]
      : theme.palette.grey[100],
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  marginTop: theme.spacing(0),
  marginBottom: theme.spacing(0),
}));

const StyledCode = styled("code")(({ theme }) => ({
  fontSize: theme.typography.body2.fontSize,
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.grey[800]
      : theme.palette.grey[100],
  padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
  borderRadius: theme.shape.borderRadius,
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(0.5, 0),
  display: "list-item",
}));

export const NonMemoizedMarkdown = ({ children }: { children: string }) => {
  const components = {
    code: ({
      inline,
      className,
      children,
      ...props
    }: {
      inline?: boolean;
      className?: string;
      children: React.ReactNode;
    }) => {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <StyledPre {...props}>
          <code className={match[1]}>{children}</code>
        </StyledPre>
      ) : (
        <StyledCode {...props}>{children}</StyledCode>
      );
    },
    ol: ({ children, ...props }: { children: React.ReactNode }) => (
      <List
        component="ol"
        sx={{ listStyleType: "decimal", pl: 4, my: 1 }}
        {...props}
      >
        {children}
      </List>
    ),
    ul: ({ children, ...props }: { children: React.ReactNode }) => (
      <List
        component="ul"
        sx={{ listStyleType: "disc", pl: 4, my: 1 }}
        {...props}
      >
        {children}
      </List>
    ),
    li: ({ children, ...props }: { children: React.ReactNode }) => (
      <StyledListItem {...props}>{children}</StyledListItem>
    ),
    strong: ({ children, ...props }: { children: React.ReactNode }) => (
      <Typography component="span" fontWeight="bold" {...props}>
        {children}
      </Typography>
    ),
    p: ({ children, ...props }: { children: React.ReactNode }) => (
      <Typography component="p" variant="body1" {...props}>
        {children}
      </Typography>
    ),
    h1: ({ children, ...props }: { children: React.ReactNode }) => (
      <Typography component="h1" variant="h4" sx={{ mt: 4, mb: 2 }} {...props}>
        {children}
      </Typography>
    ),
    h2: ({ children, ...props }: { children: React.ReactNode }) => (
      <Typography component="h2" variant="h5" sx={{ mt: 3, mb: 2 }} {...props}>
        {children}
      </Typography>
    ),
    h3: ({ children, ...props }: { children: React.ReactNode }) => (
      <Typography component="h3" variant="h6" sx={{ mt: 2, mb: 1 }} {...props}>
        {children}
      </Typography>
    ),
  };

  return (
    <Box sx={{ width: "100%" }}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={components as Partial<Components>}
      >
        {children}
      </ReactMarkdown>
    </Box>
  );
};

export const Markdown = React.memo(
  NonMemoizedMarkdown,
  (prevProps, nextProps) => prevProps.children === nextProps.children
);
