import React from "react";
import { Accordion, AccordionDetails, AccordionSummary, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function SectionSystems() {
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

    return (
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
    )
}

export default SectionSystems;


function niceBytes(x, mul = 1) {
    x = x * mul;
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let l = 0, n = parseInt(x, 10) || 0;
    while (n >= 1024 && ++l) {
        n = n / 1024;
    }
    return (n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
}