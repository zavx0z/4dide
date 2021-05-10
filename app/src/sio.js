import io from "socket.io-client"

const ip = typeof window._env_=== 'undefined' ? process.env.REACT_APP_SRV_IP : window._env_.SRV_IP
const port = typeof window._env_ === "undefined" ? process.env.REACT_APP_CP_PORT : window._env_.CP_PORT

const sio = io(`ws://${ip}:${port}`, {
    transports: ['websocket'],
    upgrade: false
})
export default sio