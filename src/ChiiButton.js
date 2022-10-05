import { Link, Typography } from "@mui/material";
import { Component } from "react";
const borderSize = '5px';

export class ChiiButton extends Component {
    render() {
        return (
            <>
                <Link target='_blank' href={this.props.href} sx={{
                    alignItems: 'center',
                    backgroundColor: '#1b2838bb',
                    borderRadius: borderSize,
                    display: 'flex',
                    p: 1,
                    color: 'white',
                    textDecoration: 'none',
                    userSelect: 'none',
                    transition: '0.1s ease-in-out',
                    borderLeftColor: `${this.props.color}55`,
                    borderLeftStyle: 'solid',
                    '&:hover': {
                        backgroundColor: '#1b283855',
                        borderLeftColor: `${this.props.color}99`,
                        borderLeftWidth: '15px',
                        borderLeftStyle: 'solid',
                    }
                }}>
                    <Typography variant='subtitle2'>{this.props.name}</Typography>
                </Link>
            </>
        )
    }
}