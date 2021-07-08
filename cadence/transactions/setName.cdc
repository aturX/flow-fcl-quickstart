import Profile from 0x6a456b9adb68d928

transaction(name: String) {
    prepare(currentUser: AuthAccount) {
    currentUser
        .borrow<&{Profile.Owner}>(from: Profile.privatePath)!
        .setName(name)
    }
}