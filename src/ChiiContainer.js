import { Link, Paper, Typography } from "@mui/material";
import { Component } from "react";
const borderSize = '5px';

export class ChiiContainer extends Component {
    render() {
        return (
            <>
                <Paper sx={{
                    m: 2,
                    p: 0.5,
                    borderRadius: borderSize,
                    backgroundImage: 'linear-gradient(to bottom, hsla(328, 100%, 50%, 0.7), rgba(0,0,0,0.7))'
                }}>
                    {this.props.children}
                </Paper>
            </>
        )
    }
}