import {useState, useEffect} from "react"
import {isInitialized} from "../flow/is-initialized.script"
import {initProfile} from "../flow/init-profile.tx"
import {fetchProfile} from "../flow/fetch-profile.script" 


export function useInit(address) {
  const [profile, setProfile] = useState(null)
  const [isCreated, setIsCreated] = useState(null)

  useEffect(() =>  check())
  useEffect(() =>  getProfile(address), [address])
  // check if the supplied address is initialized
  function check() {
    if (address != null) isInitialized(address).then((created)=>{
        setIsCreated(created)
        console.log("created", created)
    })
  }

  // init account profile
  function createProfile(address) {
    if (address != null) initProfile(address).then((txResult) => {
      setIsCreated(true)
      console.log("txResult", txResult)
    })
  }

  // fetch profile
  function getProfile(address) {
    if(address != null) fetchProfile(address).then((profile)=>{

      setProfile(profile)
      console.log("profile", profile)
    })
 
  }
  
  async function exec() {
    if(!isCreated){
      await createProfile(address)
    }else{
      await getProfile(address)
      console.log(address," had Profile!")
    }
  }

  return {
    profile,
    isCreated,
    check,
    exec,
  }
}