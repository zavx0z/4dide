import React, {useEffect, useState} from 'react'
import {Modal, useTheme} from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import {Close} from "@material-ui/icons"
import {useParams, useLocation, useNavigate} from "react-router-dom"
import routes from "../../../../routes/routes"
import Tab from "@material-ui/core/Tab"
import Tabs from "@material-ui/core/Tabs"
import FormLogin from "../../containers/FormLogin"
import TabPanel from "../components/TabPanel"
import FormJoin from "../../containers/FormJoin"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import makeStyles from "@material-ui/core/styles/makeStyles"

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    fullHeight: {
        height: "100%"
    },
}))
// todo remove routes.statistic
export default ({redirect}) => {
    const classes = useStyles()
    const navigate = useNavigate()
    const {pathname} = useLocation()
    const {authPath} = useParams()
    const [open, setOpen] = useState(`/${pathname.split('/')[1]}` === routes.auth)
    const handleClose = () => {
        setOpen(false)
        navigate(routes.home)
    }
    const [value, setValue] = useState(0)
    useEffect(() => {
        switch (authPath) {
            case 'login':
                setValue(0)
                break
            case "join":
                setValue(1)
                break
            default:
                setValue(0)
                break
        }
    }, [authPath])
    const handleChange = (event, newValue) => {
        switch (newValue) {
            case 0:
                setValue(newValue)
                navigate(routes.login)
                break
            case 1:
                setValue(newValue)
                navigate(routes.join)
                break
            default:
                setValue(newValue)
                break
        }
    }
    const theme = useTheme()
    return <>
        <Modal open={open} onClose={handleClose}
               BackdropProps={{style: {backgroundColor: theme.palette.background.default}}}
               className={classes.fullHeight}
        >
            <Grid container direction={"column"} className={classes.fullHeight}>
                <Grid item>
                    <AppBar>
                        <Toolbar>
                            <Tabs
                                className={classes.root}
                                value={value}
                                onChange={handleChange}
                                indicatorColor="secondary"
                                variant={"fullWidth"}
                                centered
                            >
                                <Tab label="Вход"/>
                                <Tab label="Регистрация"/>
                            </Tabs>
                            <IconButton onClick={handleClose}>
                                <Close/>
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                </Grid>
                <Grid item container direction={"column"} className={classes.root} justify={"center"}>
                    <Grid item>
                        <TabPanel value={value} index={0}>
                            <FormLogin buttonColor={"secondary"} redirect={redirect}/>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <FormJoin buttonColor={"secondary"} redirect={redirect}/>
                        </TabPanel>
                    </Grid>
                </Grid>
            </Grid>
        </Modal>
    </>
}
