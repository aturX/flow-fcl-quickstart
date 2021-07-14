import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"

export async function fetchProfile(address) {
  if (address == null) return null

  return fcl
    .send([
      fcl.script`
        import Profile1 from 0xProfile

        pub fun main(address: Address): Profile1.ReadOnly? {
            return Profile1.read(address)
        }
      `,
      fcl.args([fcl.arg(address, t.Address)]),
    ])
    .then(fcl.decode)
}