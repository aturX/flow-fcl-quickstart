import {useEffect, useState} from "react"
import * as fcl from "@onflow/fcl"


export function useCurrentUser() {
    const [user, setUser] = useState({loggedIn: null})
    useEffect(() => fcl.currentUser().subscribe(setUser), [])
    return user 
}