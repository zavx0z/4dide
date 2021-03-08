import React, {useState} from "react"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField/TextField"
import Button from "@material-ui/core/Button"
import {useNavigate} from "react-router-dom"
import {useSnackbar} from "notistack"
import {inject, observer} from "mobx-react"
import CircularProgress from "@material-ui/core/CircularProgress"
import routes from "../routes"
import InputPhone from "../components/InputPhone"

export default inject('user')
(observer(({redirect, buttonColor, user}) => {
        const navigate = useNavigate()
        const {enqueueSnackbar} = useSnackbar()
        const {loading, login} = user
        const [phone, setPhone] = useState('')
        const [password, setPassword] = useState('')

        const handleSubmit = () => {
            phone && password &&
            login(`+${phone}`, password)
                .then(() => enqueueSnackbar(`Добро пожаловать!`, {variant: "success"}))
                .then(() => navigate(redirect, {replace: true}))
                .catch(() => enqueueSnackbar('Не верный логин или пароль', {variant: "error"}))
        }
        const handleKeyPress = (e) => e.key === "Enter" && handleSubmit()
        return <>
            <Grid item>
                <InputPhone
                    autoFocus
                    label="телефон"
                    fullWidth
                    onChange={(e) => setPhone(e.target.value)}
                    variant="outlined"
                    margin={"dense"}
                />
                <TextField
                    fullWidth
                    type={"password"}
                    label="пароль"
                    onChange={(e) => setPassword(e.target.value)}
                    variant="outlined"
                    margin={"dense"}
                    onKeyPress={handleKeyPress}
                />
            </Grid>
            <Grid item>
                <Button
                    fullWidth
                    variant={"contained"}
                    onClick={handleSubmit}
                    color={buttonColor}
                    disabled={loading}
                >
                    {loading ? <CircularProgress color={"secondary"} size={24}/> : "Вход"}
                </Button>
            </Grid>
            <Grid item>
                <Button
                    fullWidth
                    variant={"contained"}
                    onClick={() => navigate(routes.join)}
                    color={buttonColor}
                >
                    Регистрация
                </Button>
            </Grid>
        </>
    }
))