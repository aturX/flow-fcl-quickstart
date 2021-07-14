import * as fcl from "@onflow/fcl"

export async function initProfile(address) {
  console.log(address)
  const txId = await fcl
    .send([
      fcl.proposer(fcl.authz), // current user acting as the nonce
      fcl.authorizations([fcl.authz]), // current user will be first AuthAccount
      fcl.payer(fcl.authz), // current user is responsible for paying for the transaction
      fcl.limit(135), // set the compute limit
      fcl.transaction`
      import Profile1 from 0xProfile

      transaction {
          // We want the account's address for later so we can verify if the account was initialized properly
          let address: Address

      prepare(currentUser: AuthAccount) {
          // save the address for the post check
          self.address = currentUser.address

          // Only initialize the account if it hasn't already been initialized
          if !Profile1.check(self.address) {
              // This creates and stores the profile1 in the user's account
              currentUser.save(<- Profile1.new(self.address), to: Profile1.privatePath)

              // This creates the public capability that lets applications read the profile1's info
              currentUser.link<&Profile1.Base{Profile1.Public}>(Profile1.publicPath, target: Profile1.privatePath)
          }
          }
          
          // verify that the account has been initialized
          post {
          Profile1.check(self.address): "Account was not initialized"
          }
      }
      `
    ])
    .then(fcl.decode)

  return fcl.tx(txId).onceSealed()
}