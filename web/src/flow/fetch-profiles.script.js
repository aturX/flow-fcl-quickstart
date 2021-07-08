import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"

export async function fetchProfiles(addresses) {
  if (addresses == null) return null

  return fcl
    .send([
      fcl.script`
        import Profile from 0xProfile

        pub fun main(addresses: [Address]): {Address: Profile.ReadOnly} {
          return Profile.readMultiple(addresses)
        }
      `,
      fcl.args([fcl.arg(addresses, t.Array(t.Address))]),
    ])
    .then(fcl.decode)
}