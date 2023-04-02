import React from "react"
import {BufferGeometry, Float32BufferAttribute} from "three"

export default function PointsComponent() {
    const positions = [
        0, 0, 0,
        0, 1, 0,
        0, 2, 0,
        0, 3, 0,
        0, 4, 0,
        0, 5, 0,


        1, 0, 0,
        2, 0, 0,
        3, 0, 0,
        4, 0, 0,
        5, 0, 0,
    ]

    const geometry = new BufferGeometry()
    geometry.setAttribute("position", new Float32BufferAttribute(positions, 3))

    return (
        <points geometry={geometry}>
            <pointsMaterial color={"#98de20"} size={10}/>
        </points>
    )
}