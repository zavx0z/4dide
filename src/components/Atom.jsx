import React, {useRef} from "react"
import {observer} from "mobx-react"
import {useFrame} from "@react-three/fiber"
import {useNavigate} from "react-router-dom"
import {move} from "../actions/atomActions"
import {Circle, Line, Plane, Text} from "@react-three/drei"
import {DoubleSide, MathUtils} from "three"

const Node = ({width, position, height, name, item}) => {
    return <group position={[0, 0, 0.01]}>
        <Plane
            args={[width - 0.04, height - 0.04]}
            position={position}
        >
            <Text
                position={[0, 0, 0.01]}
                color={"#100101"}
                scale={[width, width, width]}
            >
                {name}
            </Text>
        </Plane>
    </group>
}

const AtomMesh = ({world}) => {
    // const {animated, getVisibleWidth, computeDepth} = getRoot(world).supervisor
    const nav = useNavigate()
    const atom = useRef()
    useFrame(() => move(atom.current, world.position))
    const handleClick = (e) => {
        e.stopPropagation()
        world.active && world.level > 1 ? nav(-1) : nav(world.path)
    }
    return <>
        <mesh
            ref={atom}
            receiveShadow={true}
            castShadow={true}
            onPointerOver={(e) => world.setHover(e, true)}
            onPointerOut={(e) => world.setHover(e, false)}
            onClick={handleClick}

        >
            <boxBufferGeometry args={world.sizeGeometry}/>
            <meshStandardMaterial
                color={world.color}
                opacity={world.hover ? 0.4 : 0.98}
                transparent={true}
            />
            {world.aether.map((item, key) => <Node
                key={key}
                item={item}
                name={item.name}
                width={item.width}
                height={item.height}
                position={item.position}/>
            )}
            {world.titleVisible &&
            <Text
                color={"#16a316"}
                anchorY={"bottom"}
                position={[0, world.size / 2, world.size / 2]}
                scale={[world.size * 2, world.size * 2, world.size * 2]}
            >
                {world.name}
            </Text>}
        </mesh>
        {typeof atom.current !== "undefined" && world.level > 1 && world.aether.map((item, idx) => {
            let position = [0, 0, 0]
            const x = world.position.x > 0 ?
                item.position[0] + world.position.x - world.size / 2 :
                item.position[0] + world.position.x + world.size / 2

            position = [x, item.position[1] + world.position.y, 0]

            const parentX = world.position.x > 0 ? item.parentSocketPosition[0] + item.width :
                item.parentSocketPosition[0] - item.width
            const parentPosition = [parentX, item.parentSocketPosition[1], 0]
            return <React.Fragment key={idx}>
                <Circle
                    rotation={[0, MathUtils.degToRad(world.position.x > 0 ? -90 : 90), 0]}
                    position={position}
                    args={[0.04, 22]}
                >
                    <meshStandardMaterial
                        side={DoubleSide}
                        color={item.color}
                        opacity={1}
                        transparent={true}
                    />
                </Circle>
                <Line
                    key={idx}
                    segments={14}
                    points={[position, parentPosition]}
                    color={item.color}
                    lineWidth={2}
                    dashed={false}
                    rotation={[0, 0, 0]}
                    vertexColors={[[1, 1, 1], [0, 0, 0]]} // Optional array of RGB values for each point
                />
            </React.Fragment>
        })}
    </>
}
export const Atom = observer(AtomMesh)
