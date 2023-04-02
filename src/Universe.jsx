import React from 'react'
import {inject, observer} from "mobx-react"
import {Atom} from "./components/Atom"
import {Routes} from "react-router-dom"

const Group = ({universe, children}) => {
    process.env.REACT_APP_LOGGING && console.log('[UNIVERSE]: ATOMS generate')
    return <>
        <group name={'universe'}>
            <Routes>
            </Routes>
                {universe.atoms.map(atom => <Atom key={atom} world={universe.extract(atom)}/>)}
        </group>
        {children}
    </>
}
export const Universe = inject('universe')(observer(Group))