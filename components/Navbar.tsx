import { AppBar, Toolbar, Typography } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6" component="div" borderRadius={0}>
          AdaptiveCardsGPT
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
