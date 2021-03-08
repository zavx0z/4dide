import React from 'react'
import Button from "@material-ui/core/Button"
import {useNavigate} from "react-router"
import {useSnackbar} from "notistack"
import IconButton from "@material-ui/core/IconButton"
import {Close} from "@material-ui/icons"
import routes from "../features/secure/routes"
import Grid from "@material-ui/core/Grid"

export default () => {
    const navigate = useNavigate()
    const {closeSnackbar, enqueueSnackbar} = useSnackbar()
    const handleAuth = (key) => {
        navigate(routes.login)
        closeSnackbar(key)
    }
    const handleJoin = (key) => {
        navigate(routes.join)
        closeSnackbar(key)
    }
    const action = key => (
        <Grid container spacing={2} alignItems={"center"} alignContent={"center"}>
            <Grid item>
                <Button
                    variant={"contained"}
                    color={"secondary"}
                    onClick={() => handleAuth(key)}>
                    Авторизоваться
                </Button>
            </Grid>
            <Grid item>
                <Button
                    variant={"contained"}
                    color={"secondary"}
                    onClick={() => handleJoin(key)}>
                    зарегистрироваться
                </Button>
            </Grid>
            <Grid item>
                <IconButton onClick={() => closeSnackbar(key)}>
                    <Close color={"secondary"}/>
                </IconButton>
            </Grid>
        </Grid>
    )
    return (message) => enqueueSnackbar(message, {
        // variant: 'error',
        persist: true,
        action,
    })
}

