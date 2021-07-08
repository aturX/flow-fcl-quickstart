import Profile from 0x6a456b9adb68d928

pub fun main(addresses: [Address]): {Address: Profile.ReadOnly} {
    return Profile.readMultiple(addresses)
}