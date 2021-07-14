import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"

export async function setInfo(info) {
  const txId = await fcl
    .send([
      fcl.proposer(fcl.authz),
      fcl.payer(fcl.authz),
      fcl.authorizations([fcl.authz]),
      fcl.limit(335),
      fcl.args([fcl.arg(info, t.String)]),
      fcl.transaction`
        import Profile1 from 0xProfile

        transaction(info: String) {
            prepare(currentUser: AuthAccount) {
            currentUser
                .borrow<&{Profile1.Owner}>(from: Profile1.privatePath)!
                .setInfo(info)
            }
        }
      `,
    ])
    .then(fcl.decode)

  return fcl.tx(txId).onceSealed()
}