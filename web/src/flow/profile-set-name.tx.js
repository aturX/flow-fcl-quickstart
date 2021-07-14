import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"

export async function setName(name) {
  const txId = await fcl
    .send([
      fcl.proposer(fcl.authz),
      fcl.payer(fcl.authz),
      fcl.authorizations([fcl.authz]),
      fcl.limit(135),
      fcl.args([fcl.arg(name, t.String)]),
      fcl.transaction`
        import Profile1 from 0xProfile

        transaction(name: String) {
            prepare(currentUser: AuthAccount) {
            currentUser
                .borrow<&{Profile1.Owner}>(from: Profile1.privatePath)!
                .setName(name)
            }
        }
      `,
    ])
    .then(fcl.decode)

  return fcl.tx(txId).onceSealed()
}