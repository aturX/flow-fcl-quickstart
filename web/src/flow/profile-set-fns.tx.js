import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"

export async function setFns(fns) {
  const txId = await fcl
    .send([
      fcl.proposer(fcl.authz),
      fcl.payer(fcl.authz),
      fcl.authorizations([fcl.authz]),
      fcl.limit(335),
      fcl.args([fcl.arg(fns, t.String)]),
      fcl.transaction`
        import Profile from 0xProfile

        transaction(fns: String) {
            prepare(currentUser: AuthAccount) {
            currentUser
                .borrow<&{Profile.Owner}>(from: Profile.privatePath)!
                .setFns(fns)
            }
        }
      `,
    ])
    .then(fcl.decode)

  return fcl.tx(txId).onceSealed()
}