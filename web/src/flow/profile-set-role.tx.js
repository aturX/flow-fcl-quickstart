import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"

export async function setRole(role) {
  const txId = await fcl
    .send([
      fcl.proposer(fcl.authz),
      fcl.payer(fcl.authz),
      fcl.authorizations([fcl.authz]),
      fcl.limit(335),
      fcl.args([fcl.arg(role, t.String)]),
      fcl.transaction`
        import Profile1 from 0xProfile
 
        transaction(role: String) {
            prepare(currentUser: AuthAccount) {
            currentUser
                .borrow<&{Profile1.Owner}>(from: Profile1.privatePath)!
                .setRole(role)
            }
        }
      `,
    ])
    .then(fcl.decode)

  return fcl.tx(txId).onceSealed()
}