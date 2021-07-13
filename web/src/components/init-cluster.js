import {useEffect} from "react"
import {useCurrentUser} from "../hooks/current-user"
import {useInit} from "../hooks/init"

const fmtBool = bool => (bool ? "已创建" : "不存在")

export function InitCluster({address}) {
  const cu = useCurrentUser()
  const init = useInit(address)
  useEffect(() => init.check(), [address]) // eslint-disable-line react-hooks/exhaustive-deps

  if (address == null) return null

  return (
    <div>
      <h3>初始化: {address} </h3>
      <ul>
        <li>
          <strong>个人档案:  </strong>
          {init.isIdle && <span> {fmtBool(init.profile)} </span>}
          {!init.profile && cu.addr === address && init.isIdle && (
            <button disabled={init.isProcessing} onClick={init.exec}>
              初始化： 个人信息存储至 Flow 区块链中
            </button>
          )}
          {init.isProcessing && <span>处理中</span>}
        </li>
      </ul>
    </div>
  )
}