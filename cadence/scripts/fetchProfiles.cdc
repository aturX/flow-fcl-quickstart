import Profile from 0x8f8f12c1c5ba67e9

pub fun main(addresses: [Address]): {Address: Profile.ReadOnly} {
    return Profile.readMultiple(addresses)
}