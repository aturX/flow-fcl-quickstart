import Profile from 0x8f8f12c1c5ba67e9

pub fun main(address: Address): Profile.ReadOnly? {
    return Profile.read(address)
}