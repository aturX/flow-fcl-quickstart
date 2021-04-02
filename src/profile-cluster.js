import {useState, useEffect} from "react"
import {useCurrentUser} from "./hooks/current-user"
import {useProfile} from "./hooks/profile"

function ProfileForm() {
  const cu = useCurrentUser()
  const profile = useProfile(cu.addr)
  const [name, setName] = useState("")
  useEffect(() => {
    setName(profile.name)
  }, [profile.name])

  const submit = () => {
    profile.setName(name)
  }

  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} />
      {profile.isIdle && <button onClick={submit}>更新名称</button>}
      {profile.isProcessing && <span>PROCESSING</span>}
    </div>
  )
}

export function ProfileCluster({address}) {
  const profile = useProfile(address)
  useEffect(() => profile.refetch(), [address])  // eslint-disable-line react-hooks/exhaustive-deps
  if (address == null) return null

  return (
    <div>
      <h3>个人信息: {address}</h3>
      {profile.isCurrentUser && <ProfileForm />}
      <ul>
        <li>
          <img
            src={profile.avatar}
            width="50px"
            height="50px"
            alt={profile.name}
          />
        </li>
        <li>
          <strong>名称: </strong>
          <span>{profile.name}</span>
          {profile.isCurrentUser && <span> -You</span>}
          {profile.isProcessing && <span>PROCESSING</span>}
        </li>
        <li>
          <strong>颜色: </strong>
          <span>{profile.color}</span>
        </li>
        <li>
          <strong>信息: </strong>
          <span>{profile.info}</span>
        </li>
      </ul>
    </div>
  )
}