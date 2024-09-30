import {
  Box,
  Typography,
  Grid2 as Grid,
  Card,
  CardContent,
} from "@mui/material";
import Link from "next/link";
import { FC } from "react";

const options = [
  {
    title: "Menu",
    description: "Order something to eat",
    action: "Hi, I would like to order!",
  },
  {
    title: "Markdown",
    description: "Show Markdown syntax examples",
    action:
      "Write a creative text using lots of different Markdown syntax elements.",
  },
];

type EmptyScreenProps = {
  onSelectQuickOption: (option: string) => void;
};

const EmptyScreen: FC<EmptyScreenProps> = ({ onSelectQuickOption }) => {
  return (
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
              onClick={() => onSelectQuickOption(option.action)}
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
  );
};
export default EmptyScreen;
