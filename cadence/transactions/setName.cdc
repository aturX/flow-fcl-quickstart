import Profile from 0x8f8f12c1c5ba67e9

transaction(name: String) {
    prepare(currentUser: AuthAccount) {
    currentUser
        .borrow<&{Profile.Owner}>(from: Profile.privatePath)!
        .setName(name)
    }
}