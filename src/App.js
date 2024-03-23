import React from "react";
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, Button, ButtonGroup, Container, CssBaseline, Divider, Grid, Link, Paper, SpeedDial, Stack, Typography } from '@mui/material';
import Theme from './Theme';
import Info from "./Info";
import { ChiiButton } from "./ChiiButton";
import { ChiiContainer } from "./ChiiContainer";

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
            <Box sx={{ m: 0, p: 0, width: '100%', borderRadius: borderSize }} component="img" src="Headers/Header.png" />
            <Grid sx={{ p: 1, borderRadius: borderSize, backgroundColor: '#1b283877' }}>
              <Typography variant='h5'>Systems</Typography>
              <Grid container spacing={1}>
                {
                  Info.systems.map((item, index) => {
                    return (
                      <Grid key={index} item xs={6}>
                        <ChiiContainer>
                          <Typography variant='body1'>{item.name}</Typography>
                          <Typography variant='subtitle2'>CPU: {item.cpu}</Typography>
                          <Typography variant='subtitle2'>GPU: {item.gpu}</Typography>
                          <Typography variant='subtitle2'>RAM: {item.ram}</Typography>
                          <Typography variant='subtitle2'>Storage:</Typography>
                          <ul>
                            {
                              item.storage.map((storage, index) => {
                                return (
                                  <li key={index}>
                                    <Typography variant='subtitle2'>{storage.type}: {storage.size}</Typography>
                                  </li>
                                )
                              })
                            }
                          </ul>
                        </ChiiContainer>
                      </Grid>
                    )
                  })
                }
              </Grid>
              <Divider sx={{ mt: 1 }} />
              <Typography variant='h5'>Projects</Typography>
              <Grid container spacing={1}>
                {
                  Info.projects.map((item, index) => {
                    return (
                      <Grid key={index} item xs={6}>
                        <ChiiButton name={item.name} href={item.url} color={item.color} icon={null} />
                      </Grid>
                    )
                  })
                }
              </Grid>
              <Divider sx={{ mt: 1 }} />
              <Typography variant='h5'>Socials</Typography>
              <Grid container spacing={1}>
                {
                  Info.links.map((item, index) => {
                    return (
                      <Grid key={index} item xs={6}>
                        <ChiiButton key={index} name={item.name} href={item.url} color={item.color} />
                      </Grid>
                    )
                  })
                }
              </Grid>
              <Divider sx={{ mt: 1 }} />
              <Typography variant='h5'>Peak Music</Typography>
              {
                Info.music.map((item, index) => {
                  return (
                    <><iframe width="100%" height="315" src={`https://www.youtube.com/embed/${item}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></>
                  )
                })
              }
            </Grid>
            <Grid sx={{ mt: 1, p: 1, borderRadius: borderSize, backgroundColor: '#1b283877' }}>
              <Typography variant='subtitle1'>&copy; 2022-{(new Date().getFullYear())} - kirino.sh</Typography>
            </Grid>
          </Paper>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
