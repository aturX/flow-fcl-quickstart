import React from "react"
import {AuthCluster} from "./auth-cluster"
import {InitCluster} from "./init-cluster"
import {useCurrentUser} from "./hooks/current-user"
import {ProfileCluster} from "./profile-cluster"


export default function App() {
  const cu = useCurrentUser()

  return (
    <div style={{margin:'0 auto', border: '1px solid #000', width: '1000px', height: '900px' }}>
      <AuthCluster />
      <InitCluster address={cu.addr} />
      <hr></hr>
      <ProfileCluster address="0xba1132bc08f82fe2" />
      <hr></hr>
      <ProfileCluster address="0xf117a8efa34ffd58" />
    </div>
  )
}