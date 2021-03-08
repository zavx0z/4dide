import React from 'react'
import {observer} from "mobx-react"
import Button from "@material-ui/core/Button"
import sw from "./sw_model"

export default observer(() => {
        const {buttonVisible, install, updateCache} = sw
        console.log("serviceWorker" in navigator && "PushManager" in window)

        async function askUserPermission() {
            return await Notification.requestPermission();
        }
        askUserPermission()
        return <>
            {buttonVisible &&
            <Button fullWidth onClick={install}>
                установить
            </Button>
            }
            <Button fullWidth onClick={updateCache}>
                обновить
            </Button>
        </>
    }
)