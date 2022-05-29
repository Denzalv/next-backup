import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const Header = ({ OpenModal }) => {
  return (
    <>
      <Grid item xs="auto">
        <Button color="primary" variant="contained" onClick={OpenModal}>
          Sign in
        </Button>
      </Grid>
    </>
  );
};

export default Header;
