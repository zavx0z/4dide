import {useState} from 'react'

export default () => {
    const [ios] = useState(process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent))
    return ios
}