import * as fcl from "@onflow/fcl"
// import * as t from "@onflow/types"

export async function initProfile(address) {
  console.log(address)
  const txId = await fcl
    .send([
      fcl.proposer(fcl.authz), // current user acting as the nonce
      fcl.authorizations([fcl.authz]), // current user will be first AuthAccount
      fcl.payer(fcl.authz), // current user is responsible for paying for the transaction
      fcl.limit(135), // set the compute limit
      fcl.transaction`
      import Profile from 0xProfile

      transaction {
          // We want the account's address for later so we can verify if the account was initialized properly
          let address: Address
      
      prepare(currentUser: AuthAccount) {
          // save the address for the post check
          self.address = currentUser.address
      
          // Only initialize the account if it hasn't already been initialized
          if !Profile.check(self.address) {
              // This creates and stores the profile in the user's account
              currentUser.save(<- Profile.new(), to: Profile.privatePath)
      
              // This creates the public capability that lets applications read the profile's info
              currentUser.link<&Profile.Base{Profile.Public}>(Profile.publicPath, target: Profile.privatePath)
          }
          }
          
          // verify that the account has been initialized
          post {
          Profile.check(self.address): "Account was not initialized"
          }
      }
      `
    ])
    .then(fcl.decode)

  return fcl.tx(txId).onceSealed()
}