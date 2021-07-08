import Profile from 0x6a456b9adb68d928

transaction(info: String) {
    prepare(currentUser: AuthAccount) {
    currentUser
        .borrow<&{Profile.Owner}>(from: Profile.privatePath)!
        .setInfo(info)
    }
}