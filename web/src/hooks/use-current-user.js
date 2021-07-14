import {useEffect, useState} from "react"
import * as fcl from "@onflow/fcl"
import {fetchProfiles} from "../flow/fetch-profiles.script" 
import {allUsers} from "../flow/all-users.script"


export function useCurrentUser() {
    const [user, setUser] = useState({loggedIn: null})
    useEffect(() => fcl.currentUser().subscribe(setUser), [])
    return user 
}
 
// get  all  users 
export function useAllUser() {
    const [users, setUsers] = useState([])
    const [addresses, setAddresses] = useState([])
    
    useEffect(() => allUsers().then((usersAddress)=>{
        console.log("usersAddress", usersAddress)
        setAddresses(usersAddress)
    }), [])

    useEffect(() => fetchProfiles(addresses).then((profiles)=>{
        setUsers(profiles)
      }), [addresses])
    return {
        addresses,
        users
    } 
}