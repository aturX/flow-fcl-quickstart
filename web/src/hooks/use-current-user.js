import {useEffect, useState} from "react"
import * as fcl from "@onflow/fcl"
import {fetchProfiles} from "../flow/fetch-profiles.script" 

export function useCurrentUser() {
    const [user, setUser] = useState({loggedIn: null})
    useEffect(() => fcl.currentUser().subscribe(setUser), [])
    return user 
}


const addresses = ["0x8f8f12c1c5ba67e9", "0x43c16a2556e95fcc"]
export function useAllUser() {
    const [users, setUsers] = useState([])
    
    useEffect(() => fetchProfiles(addresses).then((profiles)=>{
        console.log("profiles", profiles)
        setUsers(profiles)
      }), [])
    return {
        addresses,
        users
    } 
}