import React from "react";
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, Button, ButtonGroup, Container, CssBaseline, Grid, Link, Paper, SpeedDial, Stack, Typography } from '@mui/material';
import Theme from './Theme';
import Info from "./Info";
import { ChiiButton } from "./ChiiButton";

const siteTheme = createTheme(Theme);
const borderSize = '5px';

function App() {
  return (
    <ThemeProvider theme={siteTheme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Grid>
          <Paper sx={{
            m: 2,
            p: 0.5,
            borderRadius: borderSize,
            backgroundImage: 'linear-gradient(to bottom, hsla(328, 100%, 50%, 0.7), rgba(0,0,0,0.7))'
          }}>
            <Box sx={{ m: 0, p: 0, width: '100%', borderRadius: borderSize }} component="img" src="Headers/Nekopara3.png" />
            <Grid sx={{ p: 1, borderRadius: borderSize, backgroundColor: '#1b283877' }}>
              <Grid container>
                <Grid item xs={8}>
                  <Typography variant='h5'>About me</Typography>
                  {
                    Info.personal.map((item, index) => {
                      return (
                        <Typography key={index} variant='subtitle1'>{item.name}: {item.value}</Typography>
                      )
                    })
                  }
                </Grid>
                <Grid item xs={4}>
                  <Typography variant='h5'>Socials</Typography>
                  <Stack direction='column' spacing={0.3}>
                    {
                      Info.links.map((item, index) => {
                        return (
                          <ChiiButton key={index} name={item.name} href={item.url} color={item.color} />
                        )
                      })
                    }
                  </Stack>
                </Grid>
              </Grid>
              <Typography variant='h5'>Some of my projects</Typography>
              <Grid container spacing={1}>
                {
                  Info.projects.map((item, index) => {
                    return (
                      <Grid key={index} item xs={6}>
                        <ChiiButton name={item.name} href={item.url} color={item.color} />
                      </Grid>
                    )
                  })
                }
              </Grid>
            </Grid>
            <Grid sx={{ mt: 1, p: 1, borderRadius: borderSize, backgroundColor: '#1b283877' }}>
              <Typography variant='subtitle1'>&copy; 2022 - darkchii.nl - <Link href='https://github.com/EngineerMark/personal-web' target='_blank'>source code</Link></Typography>
            </Grid>
          </Paper>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
