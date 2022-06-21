import React from "react";
import { useEffect, useState } from 'react';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardContent, Container, CssBaseline, Grid, Modal, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WarningIcon from '@mui/icons-material/Warning';
import Moment from "react-moment";
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import YouTubeIcon from '@mui/icons-material/YouTube';

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
  const [githubData, setGithubData] = useState(null);
  const [githubUser] = useState("EngineerMark");

  async function fetchData() {
    await fetch(`https://api.github.com/users/${githubUser}/repos`)
      .then((response) => response.json())
      .then(async (data) => {
        data.sort((a, b) => {
          return ((a.pushed_at < a.updated_at) ?
            (a.pushed_at === b.pushed_at) ? 0 : ((a.pushed_at > b.pushed_at ? -1 : 1)) :
            (a.updated_at === b.updated_at) ? 0 : ((a.updated_at > b.updated_at ? -1 : 1)));
        });

        data = data.slice(0, 5);

        for (const repo of data) {
          await fetch(repo.events_url).then((_response) => _response.json()).then((_data) => {
            repo.events = _data.slice(0, 5);
          });
        }
        setGithubData(data);
      }
      );
  }

  const socials = {
    twitter: "https://twitter.com/id2amayakase",
    github: "https://github.com/" + githubUser,
    youtube: "https://www.youtube.com/c/Amayakase",
  };

  const systems = [
    {
      id: 0,
      name: "Personal / Development",
      os: "Windows 11 Pro",
      cpu: "AMD Ryzen 5 2600",
      ram: "16GB DDR4",
      gpu: "NVIDIA GTX 1050 Ti 8GB",
      disks: [
        {
          name: "KINGSTON SNVS1000GB",
          capacity: 1024,
          type: "NVME SSD"
        },
        {
          name: "Samsung SSD 860 QVO",
          capacity: 1024,
          type: "SSD"
        },
        {
          name: "Seagate Barracuda Compute",
          capacity: 4096,
          type: "HDD"
        },
        {
          name: "Toshiba DT01ACA100",
          capacity: 1024,
          type: "HDD"
        },
      ]
    },
    {
      id: 1,
      name: "Server",
      os: "Ubuntu 22.04 LTS",
      cpu: "AMD Ryzen 5 3500",
      ram: "8GB DDR4",
      gpu: "NVIDIA GTX 1650 4GB",
      disks: [
        {
          name: "SK Hynix",
          capacity: 256,
          type: "NVME SSD"
        },
        {
          name: "(RAID0) 3x WD Red Plus 4TB",
          capacity: 12288,
          type: "HDD"
        },
      ],
      description: "Runs the following things: Websites, local NAS, Plex and seedbox."
    },
    {
      id: 2,
      name: "Laptop",
      os: "Ubuntu 21.10",
      cpu: "Intel Core i7-7700HQ",
      ram: "8GB DDR4",
      gpu: "NVIDIA GTX 1050 4GB",
      disks: [
        {
          name: "Samsung PM961",
          capacity: 256,
          type: "NVME SSD"
        },
        {
          name: "HGST HTS721010A9E630",
          capacity: 1024,
          type: "HDD"
        },
      ]
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

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
            <div>
              <h3>Socials</h3>
              <Box>
                <Button href={socials.twitter} target="_blank">
                  <TwitterIcon />
                </Button>
                <Button href={socials.github} target="_blank">
                  <GitHubIcon />
                </Button>
                <Button href={socials.youtube} target="_blank">
                  <YouTubeIcon />
                </Button>
              </Box>
            </div>
            <div>
              <h3>Systems</h3>
              {systems.map(system => (
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography>{system.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Paper>
                      <TableContainer component={Paper}>
                        <Table size="small" sx={{ width: 1 }}>
                          <TableBody>
                            <TableRow>
                              <TableCell>OS</TableCell>
                              <TableCell>{system.os}</TableCell>
                              <TableCell></TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>CPU</TableCell>
                              <TableCell>{system.cpu}</TableCell>
                              <TableCell></TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>GPU</TableCell>
                              <TableCell>{system.gpu}</TableCell>
                              <TableCell></TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>RAM</TableCell>
                              <TableCell>{system.ram}</TableCell>
                              <TableCell></TableCell>
                            </TableRow>
                            {system.disks.map((disk, i) => (
                              <TableRow>
                                <TableCell>Drive {i + 1}</TableCell>
                                <TableCell>{disk.name}</TableCell>
                                <TableCell>{niceBytes(disk.capacity, Math.pow(1024, 3))}</TableCell>
                              </TableRow>
                            ))}
                            <TableRow>
                              <TableCell>Capacity</TableCell>
                              <TableCell>{niceBytes(system.disks.reduce((acc, val) => {
                                return acc + val.capacity;
                              }, 0), Math.pow(1024, 3))}</TableCell>
                              <TableCell></TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <p>{system.description}</p>
                    </Paper>
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
            {githubData ? <>
              <div>
                <h3>Activity</h3>
                {
                  githubData.map(repo => (
                    repo.events && repo.events.length > 0 ?
                    <Card>
                      <CardContent>
                        <Typography variant="h6" component="div">
                          <Button variant="contained">{repo.full_name}</Button>
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                          {
                            (
                              () => {
                                switch (repo.events[0].type) {
                                  case "CreateEvent":
                                    return (<p>Created repository</p>);
                                  case "ForkedEvent":
                                    return (<p>Forked repository</p>);
                                  case "PushEvent":
                                    return <GithubPushEvent event={repo.events[0]} />
                                  case "IssuesEvent":
                                    return <GithubIssuesEvent event={repo.events[0]} />;
                                  case "PublicEvent":
                                    return <GithubPublicEvent event={repo.events[0]} />
                                  default:
                                    return (<p>Updated repository</p>);
                                }
                              }
                            )()
                          }
                        </Typography>
                        <Typography>
                          <p><Moment fromNow>{repo.events[0].created_at}</Moment></p>
                        </Typography>
                      </CardContent>
                    </Card>:<></>
                  ))
                }
              </div>
            </> : <></>}
          </Grid>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;

function GithubPublicEvent(props) {
  return (
    <p>Made repository public</p>
  )
}

function GithubPushEvent(props) {
  return (
    <>
      <p>Pushed <Button variant="outlined" href={"https://github.com/" + props.event.repo.name + "/commit/" + props.event.payload.commits[0].sha} target="_blank" rel="noreferrer">{props.event.payload.commits[0].sha.slice(0, 7)}</Button> on branch <i>{props.event.payload.ref}</i></p>
      <p class="text-xs">Description: {props.event.payload.commits[0].message}</p>
    </>
  )
}

function GithubIssuesEvent(props) {
  return (
    <>dw34esr5cx
      {props.event.payload.action.charAt(0).toUpperCase() + props.event.payload.action.slice(1)} issue <Button variant="outlined" href={props.event.payload.issue.html_url} target="_blank" rel="noreferrer">{props.event.payload.issue.title}</Button>
    </>
  )
}

function niceBytes(x, mul = 1) {
  x = x * mul;
  const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let l = 0, n = parseInt(x, 10) || 0;
  while (n >= 1024 && ++l) {
    n = n / 1024;
  }
  return (n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
}