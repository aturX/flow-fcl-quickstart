import React from "react"
import {useCurrentUser} from "./hooks/current-user"

function WithAuth() {
  const cu = useCurrentUser()

  return !cu.loggedIn ? null : (
    <div>
      <span>{cu.addr ?? "No Address"}</span>
      <button onClick={cu.logOut}>注 销</button>
    </div>
  )
}

function SansAuth() {
  const cu = useCurrentUser()

  return cu.loggedIn ? null : (
    <div>
      <button onClick={cu.logIn}>登 录</button>
      <button onClick={cu.signUp}>注 册</button>
    </div>
  )
}
 
export function AuthCluster() {

    return(
      <div style={{margin:'0 auto',   width: '50px', height: '50px', marginTop: '200px' }}>
        <WithAuth />
        <SansAuth />
      </div>
    )
}