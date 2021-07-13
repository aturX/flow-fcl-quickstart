import {useState, useEffect} from "react"
import {fetchProfile} from "../flow/fetch-profile.script" 
import {setName} from "../flow/profile-set-name.tx"
import {setAvatar} from "../flow/profile-set-avatar.tx"
import {setFns} from "../flow/profile-set-fns.tx"
import {setRole} from "../flow/profile-set-role.tx"
import {setInfo} from "../flow/profile-set-info.tx"


import * as fcl from "@onflow/fcl"

export function useUpdateProfile() {
   
    const [profile, setProfile] = useState(null)
    const address = fcl.currentUser().addr
    
    useEffect(() =>  getProfile())
    // fetch profile
    function getProfile() {
        if(address != null) fetchProfile(address).then((profile)=>{
        setProfile(profile)
        console.log("newProfile", profile)
        })
    }


    function updateName(newName){
        console.log("newNamee", newName)
        if(newName != null) setName(newName).then((txResult)=>{
            console.log("txResult-setName", txResult)
            getProfile()
        })
    }

    function updateAvatar(newAvatarSrc){
        console.log("newAvatar", newAvatarSrc)
        if(newAvatarSrc != null) setAvatar(newAvatarSrc).then((txResult)=>{
            console.log("txResult-newAvatarSrc", txResult)
            getProfile()
        })

    }

    function updateFns(newFns){
        console.log("newFns", newFns)
        if(newFns != null) setFns(newFns).then((txResult)=>{
            console.log("txResult-newFns", txResult)
            getProfile()
        })
    }

    function updateRole(newRole){
        console.log("newRole", newRole)
        if(newRole != null) setRole(newRole).then((txResult)=>{
            console.log("txResult-newRole", txResult)
            getProfile()
        })

    }

    function updateInfo(newInfo){
        console.log("newInfo", newInfo)
        if(newInfo != null) setInfo(newInfo).then((txResult)=>{
            console.log("txResult-newInfo", txResult)
            getProfile()
        })
    }


    return {
        profile,
        updateName,
        updateAvatar,
        updateFns,
        updateRole,
        updateInfo,
    }
}

 