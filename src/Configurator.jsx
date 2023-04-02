import {useControls} from "leva"
import {inject, observer} from "mobx-react"
import {useMemo} from "react"
import {updatePositionsAction} from "./actions/universeActions"

const CONSTRAINTS = 4

const Configurator = ({universe}) => {
    const positionX = useMemo(() => universe.supervisor.position.x, [universe.supervisor.position.x])
    const positionY = useMemo(() => universe.supervisor.position.y, [universe.supervisor.position.y])
    const positionZ = useMemo(() => universe.supervisor.position.z, [universe.supervisor.position.z])
    // const [api, set] =
    useControls(() => ({
        worldSpace: {
            // label: 'расстояние между мирами',
            value: universe.worldSpace,
            min: 0,
            max: .4,
            step: .001,
            onChange: (value) => {
                universe.setWorldSpace(value)
                console.log(value, universe.worldSpace)
                // console.log(updatePositionsAction)
                updatePositionsAction(universe.worlds, universe.worldSpace)
            }
        },
        worldSize: {
            value: universe.worldSize,
            min: 0,
            max: CONSTRAINTS,
            step: .1,
            onChange: (value) => {
                universe.setWorldSize(value)
            }
        },
        positionX: {
            value: positionX,
            min: -20,
            max: 20,
            step: .01,
            onChange: (value) => {
                universe.supervisor.position.startX(value)
            },
            transient: false,
        },
        positionY: {
            value: positionY,
            min: -10,
            max: 10,
            step: .1,
            onChange: (value) => {
                universe.supervisor.position.startY(value)
            },
            transient: false
        },
        positionZ: {
            value: positionZ,
            min: CONSTRAINTS,
            max: 444,
            step: 1,
            // inverse: true,
            onChange: (value) => {
                universe.supervisor.position.startZ(value)
                updatePositionsAction(universe.worlds, universe.worldSpace)
            },
            transient: false
        },
        backgroundColor: {
            value: universe.backgroundColor,
            onChange: (v) => {
                universe.setBackgroundColor(v)
            },
            transient: false
        },
        fov: {
            value: universe.supervisor.fov,
            onChange: (v) => {
                universe.supervisor.setFov(v)
            },
            min: 0,
            max: 4,
            step: .01,
            transient: false
        }
    }))
}
export default inject('universe')((observer(Configurator)))