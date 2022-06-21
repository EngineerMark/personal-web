import React from "react";
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, Button, Container, CssBaseline, Grid, Modal, Paper, Stack, Typography } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import SectionGithub from "./PageSections/SectionGithub";
import SectionSystems from "./PageSections/SectionSystems";
import SectionSocials from "./PageSections/SectionSocials";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const modal_style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function App() {
  const [adultDisclaimerVisible, setAdultDisclaimerVisible] = React.useState(true);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Modal
        open={adultDisclaimerVisible}
      // onClose={() => setAdultDisclaimerVisible(false)}
      >
        <Box sx={modal_style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', }}>
              <WarningIcon /> Warning
            </div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Box>
              <p>This website links other sites containing adult-themed material and is Not Safe For Work</p>
              <Stack direction="row" spacing={2}>
                <Button variant="contained" color="success" onClick={() => setAdultDisclaimerVisible(false)}>
                  It's fine
                </Button>
                <Button variant="outlined" color="error" onClick={() => {
                  window.open("about:blank", "_self");
                  window.close();
                }}>
                  Leave
                </Button>
              </Stack>
            </Box>
          </Typography>
        </Box>
      </Modal>
      <Container maxWidth="sm" sx={{ py: 5 }}>
        <Grid display="flex" justifyContent="center" alignItems="center">
          <Box sx={{ borderRadius: "50%" }} maxWidth="300px" component="img" src="chii.png" />
        </Grid>
        <Paper sx={{ py: 1, my: 1, px: 2, mx: 1 }}>
          <Grid>
            <div>
              <Grid display="flex" justifyContent="center" alignItems="center">
                <h1>DarkChii</h1>
              </Grid>
            </div>
            <SectionSocials />
            <SectionSystems />
            <SectionGithub />
          </Grid>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;
