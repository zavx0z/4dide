import React, {useState} from "react"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField/TextField"
import Button from "@material-ui/core/Button"
import {useNavigate} from "react-router-dom"
import {useSnackbar} from "notistack"
import {inject, observer} from "mobx-react"
import CircularProgress from "@material-ui/core/CircularProgress"
import InputPhone from "../components/InputPhone"

const FormJoin = ({redirect, buttonColor, user}) => {
    const navigate = useNavigate()
    const {enqueueSnackbar} = useSnackbar()
    const [phone, setPhoneForm] = useState('')
    const [password, setPasswordForm] = useState('')

    const {join, loading} = user
    const handleSubmit = () => {
        phone && password &&
        join(`+${phone}`, password)
            .then(() => enqueueSnackbar('Успешно зарегистрирован', {variant: "success"}))
            .then(() => navigate(redirect, {replace: true}))
            .catch(e => enqueueSnackbar(e, {variant: "error"}))
    }
    const handleKeyPress = (e) => e.key === "Enter" && handleSubmit()
    return <>
        <Grid item>
            <InputPhone
                autoFocus
                label="номер телефона"
                value={phone}
                fullWidth
                onChange={(e) => setPhoneForm(e.target.value)}
                variant="outlined"
                margin={"dense"}
            />
            <TextField
                fullWidth
                type={"password"}
                value={password}
                label="пароль"
                onChange={(e) => setPasswordForm(e.target.value)}
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
                {loading ? <CircularProgress color={"secondary"} size={24}/> : "регистрация"}
            </Button>
        </Grid>
    </>
}
export default inject('user')(observer(FormJoin))