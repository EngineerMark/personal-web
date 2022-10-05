const Theme = {
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                html: {
                    height: '100%',
                },
                body: {
                    backgroundImage: 'linear-gradient(#123 60%, #333)',
                }
            }
        }
    },
    palette: {
        mode: 'dark',
        primary: {
            main: '#C8598A',
        },
        background: {
            default: '#212121',
            dark: '#fff',
            paper: '#212121',
        },
    },
    shape: {
        borderRadius: 2
    },
    typography: {
        fontFamily: 'Comfortaa',
        fontWeight: 700,
    },
}

export default Theme;