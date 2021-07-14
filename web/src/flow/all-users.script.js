import * as fcl from "@onflow/fcl"

export async function allUsers() {
  
  return fcl
    .send([
      fcl.script`
        import Profile1 from 0xProfile

        pub fun main(): [Address]? {
            return Profile1.allUsers()
        }
      `,
    ])
    .then(fcl.decode)
}