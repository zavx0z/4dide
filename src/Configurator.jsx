import {useFrame} from "@react-three/fiber"
import {useControls} from "leva"
import {inject, observer} from "mobx-react"

const Configurator = ({universe: {supervisor, action}}) => {
    useFrame(() => {
        set({position: {...supervisor.position}})
    })

    const [data, set] = useControls(() => ({
        position: {
            value: {
                x: supervisor.position.x,
                y: supervisor.position.y,
                z: supervisor.position.z
            },
            x: {
                min: -10,
                max: 10,
                step: .1,
            },
            y: {
                min: -2,
                max: 2,
                step: .1,
            },
            z: {
                min: 0,
                max: 100,
                step: 1,
            },
            onChange: (vector) => {
                supervisor.setPosition(vector.x, vector.y, vector.z)
            },
            transient: false
        },
        fov: {
            value: 11.5,
            onChange: (v) => {
                action.expandAll()
            },
            transient: false
        },
        space: {
            value: action.space,
            onChange: (v) => {
                action.setSpace(v)
                action.expandAll()
            },
            transient: false,
            min: 0,
            max: .5,
            step: .001
        },
    }))

    return
}
export default inject('universe')((observer(Configurator)))