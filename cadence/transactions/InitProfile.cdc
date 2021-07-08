import Profile from 0x6a456b9adb68d928

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