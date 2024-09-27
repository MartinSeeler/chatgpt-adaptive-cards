import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const examplePrompts = [
  "Explain quantum computing in simple terms",
  "Got any creative ideas for a 10 year old's birthday?",
  "How do I make an HTTP request in Javascript?",
  "Can you tell me a joke?",
];

export default function Home() {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Box
        component="nav"
        className="sidebar"
        sx={{
          width: 260,
          flexShrink: 0,
          p: 2,
          overflowY: "auto",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, color: "inherit" }}>
          Example prompts
        </Typography>
        <List>
          {examplePrompts.map((prompt, index) => (
            <ListItem key={index} disablePadding sx={{ mb: 1 }}>
              <ListItemText primary={prompt} sx={{ color: "inherit" }} />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, display: "flex", flexDirection: "column" }}
      >
        <Container maxWidth="md" sx={{ flexGrow: 1, mb: 2 }}>
          {/* Chat messages would go here */}
        </Container>

        {/* Input area */}
        <Paper
          component="form"
          className="chat-input"
          sx={{
            p: "8px 16px",
            display: "flex",
            alignItems: "center",
            maxWidth: 800,
            margin: "0 auto",
            width: "100%",
            boxShadow: "0 0 15px rgba(0,0,0,0.1)",
          }}
        >
          <TextField
            fullWidth
            placeholder="Send a message..."
            variant="standard"
            InputProps={{ disableUnderline: true }}
            sx={{ flex: 1 }}
          />
          <Button type="submit" sx={{ minWidth: "auto", p: "10px" }}>
            <SendIcon />
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}
