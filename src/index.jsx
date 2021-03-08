import React from 'react'
import ReactDOM from 'react-dom'
import './theme/index.css'
import App from './App'
import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles'
import theme from "./theme/theme"
import {SnackbarProvider} from "notistack"
import {SnackbarUtilsConfigurator} from "./utils/SnackbarUtils"
import {Canva} from "./layout/Canva"
import {BrowserRouter as Router} from "react-router-dom"
import {Provider} from "mobx-react"
import userStore from "./features/secure/stores/userStore"
import rootStore from "./stores/rootStore"

ReactDOM.render(
    <>
        <MuiThemeProvider theme={theme}>
            <SnackbarProvider anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
                <SnackbarUtilsConfigurator/>
                <Canva>
                    <Router>
                        <Provider user={userStore} root={rootStore}>
                            <App/>
                        </Provider>
                    </Router>
                </Canva>
            </SnackbarProvider>
        </MuiThemeProvider>
    </>,
    document.getElementById('root')
)
