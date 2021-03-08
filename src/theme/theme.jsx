import {createMuiTheme} from '@material-ui/core/styles';
import {grey} from "@material-ui/core/colors"

export default createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            light: grey[50],
            main: grey[200],
            dark: grey[400],
            contrastText: '#004c3f',
        },
        secondary: {
            light: '#ffa270',
            main: '#ff7043',
            dark: '#c63f17',
            contrastText: '#fafafa',
        },
        text: {
            primary: "#ffffff",
            secondary: "#ffffff"
        }
    },
})
