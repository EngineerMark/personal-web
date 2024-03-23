const Theme = {
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                html: {
                    height: '100%',
                },
                body: {
                    backgroundImage: 'linear-gradient(#ffc4fb 60%, #ab50a5)',
                    backgroundAttachment: 'fixed',
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