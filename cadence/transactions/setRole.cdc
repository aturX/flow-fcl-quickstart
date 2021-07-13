import Profile from 0x8f8f12c1c5ba67e9

transaction(role: String) {
    prepare(currentUser: AuthAccount) {
    currentUser
        .borrow<&{Profile.Owner}>(from: Profile.privatePath)!
        .setRole(role)
    }
}