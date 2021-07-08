/** Generic Profile Contract
  
====================
## Table of Contents
====================
                                                               Line
Intro .........................................................   1
Table of Contents .............................................  27
General Profile Contract Info .................................  41
Examples ......................................................  50
  Initializing a Profile Resource .............................  59
  Interacting with Profile Resource (as Owner) ................ 112
  Reading a Profile Given a Flow Address ...................... 160
  Reading a Multiple Profiles Given Multiple Flow Addresses ... 192
  Checking if Flow Account is Initialized ..................... 225


================================
## General Profile Contract Info
================================

Currently a profile consists of a couple main pieces:
  - name – An alias the profile owner would like to be refered as.
  - avatar - An href the profile owner would like applications to use to represent them graphically.
  - role - Users have roles that can be used in different dApps.
  - fns - A Flow what domain name identifier
  - info - A short description about the account.
  - time - create time.  

===========
## Examples
===========

Demonstrate the basic function of the contract through an example

==================================
## Initializing a Profile Resource
==================================

Initializing should be done using the paths that the contract exposes.
This will lead to predictability in how applications can look up the data.

-----------
### Cadence
-----------

    import Profile from 0x01

    transaction {
      let address: Address
      prepare(currentUser: AuthAccount) {
        self.address = currentUser.address
        if !Profile.check(self.address) {
          currentUser.save(<- Profile.new(), to: Profile.privatePath)
          currentUser.link<&Profile.Base{Profile.Public}>(Profile.publicPath, target: Profile.privatePath)
        }
      }
      post {
        Profile.check(self.address): "Account was not initialized"
      }
    }
    
-------
### FCL
-------

import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"

export async function initProfile(address) {
  console.log(address)
  const txId = await fcl
    .send([
      fcl.payer(fcl.authz), // current user is responsible for paying for the transaction
      fcl.proposer(fcl.authz), // current user acting as the nonce
      fcl.authorizations([fcl.authz]), // current user will be first AuthAccount
      fcl.limit(35), // set the compute limit
      fcl.args([fcl.arg(address, t.Address)]),
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

===============================================
## Interacting with Profile Resource (as Owner)
===============================================

As the owner of a resource you can update the following:
  - name using `.setName("Flow User")` (as long as you arent verified)
  - avatar using `.setAvatar("https://gateway.pinata.cloud/ipfs/Qma575jjqegeTQZbE1ArV6Xo43giQwipUz2yz78x3a9ssF")`
  - role using `.setRole("user")`
  - fns  using `.setFns("flowuser.flow")`
  - info using `.setInfo("I like to make things with Flow :wave:")`

-----------
### Cadence
-----------

import Profile from 0x01

transaction(name: String) {
    prepare(currentUser: AuthAccount) {
    currentUser
        .borrow<&{Profile.Owner}>(from: Profile.privatePath)!
        .setName(name)
    }
}
    
-------
### FCL
-------

import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"

export async function setName(name) {
  const txId = await fcl
    .send([
      fcl.proposer(fcl.authz),
      fcl.payer(fcl.authz),
      fcl.authorizations([fcl.authz]),
      fcl.limit(35),
      fcl.args([fcl.arg(name, t.String)]),
      fcl.transaction`
        import Profile from 0xProfile

        transaction(name: String) {
            prepare(currentUser: AuthAccount) {
            currentUser
                .borrow<&{Profile.Owner}>(from: Profile.privatePath)!
                .setName(name)
            }
        }
      `,
    ])
    .then(fcl.decode)

  return fcl.tx(txId).onceSealed()
}

=========================================
## Reading a Profile Given a Flow Address
=========================================

-----------
### Cadence
-----------

import Profile from 0x01

pub fun main(address: Address): Profile.ReadOnly? {
    return Profile.read(address)
}
    
-------
### FCL
-------

import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"

export async function fetchProfile(address) {
  if (address == null) return null

  return fcl
    .send([
      fcl.script`
        import Profile from 0xProfile

        pub fun main(address: Address): Profile.ReadOnly? {
            return Profile.read(address)
        }
      `,
      fcl.args([fcl.arg(address, t.Address)]),
    ])
    .then(fcl.decode)
}

============================================================
## Reading a Multiple Profiles Given Multiple Flow Addresses
============================================================

-----------
### Cadence
-----------

    import Profile from 0xba1132bc08f82fe2

    pub fun main(addresses: [Address]): {Address: Profile.ReadOnly} {
      return Profile.readMultiple(addresses)
    }
    
-------
### FCL
-------

import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"

export async function fetchProfiles(addresses) {
  if (addresses == null) return null

  return fcl
    .send([
      fcl.script`
        import Profile from 0xProfile

        pub fun main(addresses: [Address]): {Address: Profile.ReadOnly} {
          return Profile.readMultiple(addresses)
        }
      `,
      fcl.args([fcl.arg(addresses, t.Array(t.Address))]),
    ])
    .then(fcl.decode)
}

==========================================
## Checking if Flow Account is Initialized
==========================================

-----------
### Cadence
-----------

import Profile from 0x01

pub fun main(address: Address): Bool {
    return Profile.check(address)
}
    
-------
### FCL
-------

import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"

export async function isInitialized(address) {
  if (address == null)
    throw new Error("isInitialized(address) -- address required")

  return fcl
    .send([
      fcl.script`
        import Profile from 0xProfile

        pub fun main(address: Address): Bool {
          return Profile.check(address)
        }
      `,
      fcl.args([fcl.arg(address, t.Address)]),
    ])
    .then(fcl.decode)
}

*/
pub contract Profile {
  pub let publicPath: PublicPath
  pub let privatePath: StoragePath

  pub resource interface Public {
    pub fun getName(): String
    pub fun getAvatar(): String
    pub fun getRole(): String
    pub fun getFns(): String
    pub fun getInfo(): String
    pub fun asReadOnly(): Profile.ReadOnly
  }
  
  pub resource interface Owner {
    pub fun getName(): String
    pub fun getAvatar(): String
    pub fun getRole(): String
    pub fun getFns(): String
    pub fun getInfo(): String
    
    pub fun setName(_ name: String) {
      pre {
        name.length <= 15: "Names must be under 15 characters long."
      }
    }
    pub fun setAvatar(_ src: String)
    pub fun setRole(_ role: String)
    pub fun setFns(_ fns: String) {
      pre {
        fns.length <= 280: "Profile FNS can at max be 280 characters long."
      }
    }

    pub fun setInfo(_ info: String) {
      pre {
        info.length <= 1024: "Profile info can at max be 280 characters long."
      }
    }
  }
  
  pub resource Base: Owner, Public {
    access(self) var name: String
    access(self) var avatar: String
    access(self) var role: String
    access(self) var fns: String
    access(self) var info: String
    
    init() {
      self.name = "Flow User"
      self.avatar = "https://gateway.pinata.cloud/ipfs/Qma575jjqegeTQZbE1ArV6Xo43giQwipUz2yz78x3a9ssF"
      self.role = "user"
      self.fns = ""
      self.info = ""
    }
    
    pub fun getName(): String { return self.name }
    pub fun getAvatar(): String { return self.avatar }
    pub fun getRole(): String {return self.role }
    pub fun getFns(): String { return self.fns }
    pub fun getInfo(): String { return self.info }
    
    pub fun setName(_ name: String) { self.name = name }
    pub fun setAvatar(_ src: String) { self.avatar = src }
    pub fun setRole(_ role: String) { self.role = role }
    pub fun setFns(_ fns: String) { self.fns = fns }
    pub fun setInfo(_ info: String) { self.info = info }
    
    pub fun asReadOnly(): Profile.ReadOnly {
      return Profile.ReadOnly(
        address: self.owner?.address,
        name: self.getName(),
        avatar: self.getAvatar(),
        role: self.getRole(),
        fns: self.getFns(),
        info: self.getInfo()
      )
    }
  }

  pub struct ReadOnly {
    pub let address: Address?
    pub let name: String
    pub let avatar: String
    pub let role: String
    pub let fns: String
    pub let info: String
    
    init(address: Address?, name: String, avatar: String, role: String, fns: String, info: String) {
      self.address = address
      self.name = name
      self.avatar = avatar
      self.role = role
      self.fns = fns 
      self.info = info 
    }
  }
  
  pub fun new(): @Profile.Base {
    return <- create Base()
  }
  
  pub fun check(_ address: Address): Bool {
    return getAccount(address)
      .getCapability<&{Profile.Public}>(Profile.publicPath)
      .check()
  }
  
  pub fun fetch(_ address: Address): &{Profile.Public} {
    return getAccount(address)
      .getCapability<&{Profile.Public}>(Profile.publicPath)
      .borrow()!
  }
  
  pub fun read(_ address: Address): Profile.ReadOnly? {
    if let profile = getAccount(address).getCapability<&{Profile.Public}>(Profile.publicPath).borrow() {
      return profile.asReadOnly()
    } else {
      return nil
    }
  }
  
  pub fun readMultiple(_ addresses: [Address]): {Address: Profile.ReadOnly} {
    let profiles: {Address: Profile.ReadOnly} = {}
    for address in addresses {
      let profile = Profile.read(address)
      if profile != nil {
        profiles[address] = profile!
      }
    }
    return profiles
  }

    
  init() {
    self.publicPath = /public/profile
    self.privatePath = /storage/profile
    
    self.account.save(<- self.new(), to: self.privatePath)
    self.account.link<&Base{Public}>(self.publicPath, target: self.privatePath)
    
    self.account
      .borrow<&Base{Owner}>(from: self.privatePath)!
      .setName("Flow User")
  }
}