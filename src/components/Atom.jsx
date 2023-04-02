import React from "react"
// import ItemName from "./Name"
import {observer} from "mobx-react"
import {useNavigate} from "react-router-dom"
import {getRoot} from "mobx-state-tree"
import PSMController from "../features/@react-three-mst/PSMController"
import {Html, meshBounds} from "@react-three/drei"
import {Avatar} from "@mui/material"

const AtomMesh = ({world}) => {
    const {animated, getVisibleWidth, computeDepth} = getRoot(world)['supervisor']
    const nav = useNavigate()
    const handleClick = (e) => {
        e.stopPropagation()
        process.env.REACT_APP_LOG_WORLD && console.log(`click: ${world.parentActive}`)
        if (world.parentActive) {
            nav(world.path)
        } else if (world.active) {
            nav(-1)
        }
    }
    return <>
        <PSMController
            raast={meshBounds}
            model={world}
            onClick={handleClick}
            styles={{cursor: "pointer"}}
        >
            <icosahedronGeometry args={[world.size / 2, 4]}/>
            {world.titleVisible &&
                // <ItemName
                //     world={world}
                //     hover={world.hovered}
                //     scale={world.titleScale}
                //     position={world.titlePosition}
                //     title={world.title}
                //     readyTransform={!animated}
                //     getVisibleWidth={getVisibleWidth}
                //     computeDepth={computeDepth}
                // />
                <Html
                    center={true}
                    style={{
                        minWidth: window.innerWidth,
                        display: 'flex',
                        alignItems: "center",
                        justifyContent: 'center',
                    }}
                    className={'unselectable'}
                >
                    {/*<Card sx={{*/}
                    {/*    height: 150,*/}
                    {/*    width: 200,*/}
                    {/*}}>*/}
                    {/*<Avatar*/}
                    {/**/}
                    {/*    onClick={handleClick}*/}
                    {/*>*/}
                    {/*    {world.title[0]}*/}
                    {/*</Avatar>*/}
                    {/*<Typography*/}
                    {/*    className={'unselectable'}*/}
                    {/*    onClick={handleClick}*/}
                    {/*    align={"center"}*/}
                    {/*    style={{lineHeight: 1}}*/}
                    {/*    // noWrap={true}*/}
                    {/*    color={"primary.dark"}*/}
                    {/*    variant={"h6"}*/}
                    {/*>*/}
                    {/*    {world.name}*/}
                    {/*</Typography>*/}
                    {/*</Card>*/}
                </Html>
            }
        </PSMController>
    </>
}
export const Atom = observer(AtomMesh)