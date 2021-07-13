import * as fcl from "@onflow/fcl"

export async function allUsers() {
  
  return fcl
    .send([
      fcl.script`
        import Profile from 0xProfile

        pub fun main(): [Address]? {
            return Profile.allUsers()
        }
      `,
    ])
    .then(fcl.decode)
}