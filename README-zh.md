# Flow 快速开始构建 dApp

此项目通过官方[flow-app-quickstart](https://docs.onflow.org/flow-js-sdk/flow-app-quickstart#extra-credit---adding-an-interface-that-uses-our-functions)提供的思路重新构建了最新版本的dApp。

由于版本迭代更新，最新版本通过`Flow CLI`在测试网部署流程变得比较容易简洁，但官方文档部分代码存在过时导致`Cadence`合约无法运行，`Flow FCL` 调用也存在一些差异，另外目前已经可以集成 Alchemy 进行dApp开发了。 所以在这里将整个过程以及遇到的问题一起汇总并更新了这个 `Demo`， 帮助新的Flow开发者能够快速开始。

Demo:  [visit](https://flowfans.on.fleek.co/) 

![image](./demo.jpg)

1. 用户需要创建 Profile Resource 在自己账户中： 点击页面 `INIT`
2. 用户可以分别修改自己的个人信息，并记录到Flow 区块链中
3. 用户可以看到Flow区块链上其他添加信息的用户


# 启动/依赖

- start 

```
cd web 
yarn install 
yarn start
```

- Wallet 

[Blocto](https://blocto.portto.io/)

[Blocto Wallet Doc](https://docs.blocto.app/blocto-sdk/flow)

- UI

[material-ui](https://material-ui.com/)

- API 

[alchemy](https://www.alchemy.com/)

[alchemy doc](https://docs.alchemy.com/flow/guides/getting-started)

- IPFS 

[Pinata](https://pinata.cloud/)




# 一、预备知识

##  Flow 的区块链浏览器 （测试网、主网）


1. 测试网浏览器的使用方式（暂时）：

- 查询账户及合约
```
// testnet
https://flow-view-source.com/testnet/account/0xb8daf9d5dad74056

// mainnet 
https://flow-view-source.com/mainnet/account/0xe041a498afccd00c
```

- 查询交易记录
```
https://flow-view-source.com/testnet/tx/993e8c7a146f9f50183cb27d5030532254facec88d3fa59cc3402258d4103540

https://flow-view-source.com/mainnet/tx/993e8c7a146f9f50183cb27d5030532254facec88d3fa59cc3402258d4103540
```


建议主网信息直接采用以下主网浏览器查看 👇

主网可视化浏览器：
```
https://flowscan.org/
```

2. Flow 节点的选择（推荐Alchemy）

你开发的 `dApp` 需要与智能合约交互并发起交易，这些互动的环节，在传统的开发过程中，你只需要后端程序协助完成就可以了。
但在区块链中，你得需要与网络中的节点交互，而自己搭建节点的成本很高并且不是推荐的选择。所以，我们在`Flow`上开发有如下选择👇：

[Flow 官方网站中提供的节点信息](https://docs.onflow.org/access-api/)：

- Mainnet: https://access.mainnet.nodes.onflow.org:9000
- Testnet: https://access.devnet.nodes.onflow.org:9000

[Alchemy 平台所提供的节点信息](https://docs.alchemy.com/flow/guides/getting-started)：

- Mainnet: https://flow-mainnet.g.alchemy.com
- Testnet: https://flow-testnet.g.alchemy.com

注意： `flow.json`中配置时一般不用添加`https://`

在此实例中，我们推荐部署合约时采用官方节点，dApp交互时推荐采用 [Alchemy](https://www.alchemy.com/) 提供的服务，该平台拥有高效的服务和清晰的面板帮助我们查看`dApp` 的相关信息。




# 二、 账号创建及代币领取

正式开始进行Flow智能合约开发之前，你需要拥有一个主网或测试网站账号。并且，你的测试账号中需要拥有一些 `Flow Token` ，在进行智能合约部署的时候，需要消耗`Flow Token`。

**账号创建并领取代币**的流程是这样的: 你首先需要本地生成一个`密钥对`，它包含`公钥`和`私钥`。而`公钥`提供给 [Flow Testnet Faucet](https://testnet-faucet-v2.onflow.org/), 它帮你创建完成一个`地址`（地址 != 公钥）。 你再把形如`0xabcdef12345689`的地址提供给[Flow Testnet Faucet](https://testnet-faucet-v2.onflow.org/), 领取测试Flow Token。



1. 本地创建密钥对

- 安装 `Flow CLI` 
首先，我们需要通过[官方教程安装 Flow CLI](https://docs.onflow.org/flow-cli/install/)， 它是一个Flow的命令行工具，它可以帮你通过命令行的方式，完成大部分和区块链交互的操作。
执行如下命令创建`密钥对`：

```
flow keys generate
```

获得如下结果：
```
 Store private key safely and don't share with anyone! 
Private Key      a2df7ec91b9b3d65dced51f9d37494397d2233f37fb183303b.....
Public Key       20a3fcf4377a8a4f32a146db3178ae31cd72d50d6fbc0c517d19ab36bc791931dd75e51961a6f63559d09ed29528ac793357e91a7d1fa410ea1b5f1f92c1e7db
```
**注意: 以上为测试地址，任何人可以使用。**☝️


2. 创建测试账号地址

访问 [Testnet Faucet](https://testnet-faucet-v2.onflow.org/)， 填写你的公钥（Public Key  是较长的Key），其他采用默认值，点击创建账号。

等待一段时间后，你就能获得你的测试账号地址如：
```
0x8f8f12c1c5ba67e9
```

使用 `Flow CLI` 查看一下地址信息：
```
flow accounts get 0x8f8f12c1c5ba67e9 --network testnet
```
可以看到，该地址中，已经预存了1000个`Flow Token`, 如果还需要更多 `Flow Token` 进行如下操作。

3. 地址领取测试代币

将你的地址填入第二个输入框中，完成验证码后，点击`Fund Account`即可领取 1000 个测试 `Flow Token`。


小结： 
账号创建与代币领取的部分，我们就告一段落。

我们掌握了：
- 本地创建Flow密钥对
- 通过公钥去创建Flow账号
- 通过账号地址获得测试Flow Token
  

接下来我们来看，如何在线上编写Cadence智能合约，然后在本地进行项目创建及合约部署测试网络的过程。



# 三、Cadence 智能合约

1. Cadence 合约编写
Flow 官方提供一个可在线开发编写的 [Playground](https://play.onflow.org/), 为了快速的验证[Cadence合约](https://docs.onflow.org/cadence/)的可行性，建议通过 `Playground` 直接进行`Cadence` 合约的开发，并且确认完成逻辑并可以成功编译后，进一步使用Flow CLI 本地进行部署。

2. Cadence 项目创建
如果你已经在 `Cadence Playground` 中进行了合约的编写与编译，你已经发现 `Cadence` 包含三个部分： `Contract` 、`Script` 、`Transaction`
`Contract` 是我们实际需要部署的智能合约，`Script` 与 `Transaction` 是我们与智能合约进行交互的方式（函数）。

执行下面命令，将当前目录初始化为 `Cadence`项目: 
```
flow init 
```
然后你会发现，当前目录生成了一个 `flow.json`文件，该文件中会包含一些合约部署时的基础信息:

- emulators
    本地Flow区块链模拟器的配置信息，此处推荐直接使用测试网进行合约部署。

- contracts
    配置Cadence合约的路径和相关信息。Flow 网络中已经部署的 `FungibleToken` 和 `NonFungibleToken` 建议就直接当做默认参数配置即可。

- networks
    配置主要部署的网络和相关信息。部署合约时采用默认生成的地址即可。

- accounts
部署智能合约所采用的账号`地址`及`私钥`，注意`私钥`是不能公开暴露的，需要将其存放至 `.env` 文件中读取。此处只做演示作用，所以直接填写(但这是不安全的写法)。
正确的做法：
```
"testnet-account": {
      "address": "${FLOW_ADDRESS}",
      "keys": "${FLOW_PRIVATE_KEY}"
    }
```

错误的做法：
```
"testnet-account": {
      "address": "8f8f12c1c5ba67e9",
      "keys": "a2df7ec91b9b3d65dced51f9d37494397d2233f37....."
    }
```
**注意： `address` 不用填写 `0x` 前缀。**

- deployments
可以配置多个网络，也可以填写多个合约，而且合约的名字，就采用上面`contracts`部分所配置的名字。


所以,我这里的完整 `flow.json` 配置如下：
```
{
	"emulators": {
		"default": {
			"port": 3569,
			"serviceAccount": "emulator-account"
		}
	},
	"contracts": {
		"HelloWorld": "./cadence/contracts/HelloWorld.cdc",
		"FungibleToken": {
			"source": "./cadence/contracts/FungibleToken.cdc",
			"aliases": {
			  "emulator": "0xee82856bf20e2aa6",
			  "testnet": "0x9a0766d93b6608b7"
			}
		},
		"NonFungibleToken": {
			"source": "./cadence/contracts/NonFungibleToken.cdc",
			"aliases": {
			  "testnet": "0x631e88ae7f1d7c20"
			}
		}
		
	},
	"networks": {
		"emulator": "127.0.0.1:3569",
		"mainnet": "flow-mainnet.g.alchemy.com",
		"testnet": "flow-testnet.g.alchemy.com"
	},
	"accounts": {
		"emulator-account": {
			"address": "f8d6e0586b0a20c7",
			"key": "1d78a879cae624026e38693238c98ed4e110a8a6e5a35f5d0719d0c0758675f3"
		},
		"testnet-account": {
			"address":"8f8f12c1c5ba67e9", 
			"keys": "a2df7ec91b9b3d65dced51f9d37494397d2233....."
		}
		
	},
	"deployments": {
		"testnet": {
			"testnet-account": [
			  "HelloWorld"
			]
		  },
		  "emulator": {
			"emulator-account": [
			]
		  }
	}
}
```

3. 合约部署
首先，先进行一个 `HelloWorld.cdc` 合约的部署，来演示完整的部署流程。


当你完成了你的Cadence合约，将 `flow.json` 配置文件填好后, 执行如下命令进行部署:
```
flow project deploy --network=testnet
```


部署成功后出现类似信息：
```
Deploying 1 contracts for accounts: testnet-account

HelloWorld -> 0x8f8f12c1c5ba67e9 (6b7bc1cac8fe865ec4b23db5d835a99b47cae8fcb9130921065916dfcc7b533f)


All contracts deployed successfully
```
这个时候我们去 测试网区块浏览器或者采用Flow CLI查看，可以看到我们成功部署了合约。
```
https://flow-view-source.com/testnet/account/0x8f8f12c1c5ba67e9

flow accounts get 0x8f8f12c1c5ba67e9 --network testnet
```
**注意： 😵 测试网浏览器`地址`一定要加 `0x`** 


部署 `Profile.cdc` 部分：

1. 在 Playground 中完成了大部分的 Cadence 合约后，将其存放在项目文件夹 Cadence中，按照类型划分。

[Playground 代码参考](https://play.onflow.org/501caf65-3db6-4dc7-a2f6-2e0ae875cec9?type=tx&id=47f4e8e2-632f-4fbd-a53a-6515b9edd208)：
https://play.onflow.org/501caf65-3db6-4dc7-a2f6-2e0ae875cec9?type=tx&id=47f4e8e2-632f-4fbd-a53a-6515b9edd208


```
cadence
    - contracts
    - scripts
    - transactions
```
2. 在 `flow.json` 中配置新的合约 `Profile.cdc`的信息。

执行更新已经部署的合约并部署新的合约：
```
flow project deploy --network=testnet --update
```


如下结果表示部署成功：
```
Deploying 2 contracts for accounts: testnet-account

HelloWorld -> 0x8f8f12c1c5ba67e9 (0e571ad01fb00ea00f90771d124f4b5b11ccf19a8862f1a742084871425cf4ac)

Profile -> 0x8f8f12c1c5ba67e9 (851bd8f3c176ead30b58a63f0cf5f9ae0709cc40d330573e709daf02b553fb9b)


 All contracts deployed successfully
```

这个时候，我们可以将 `scripts` 和 `transactions` 中的 `Profile` 地址都替换为 `0x8f8f12c1c5ba67e9`,因为我们在 `Playground`中进行部署的地址都是类似 `0x01` 和 `0x02`，这些并不是 Flow 测试网中的实际部署地址。


验证一下我们的合约部署情况：
```
https://flow-view-source.com/testnet/account/0x8f8f12c1c5ba67e9

flow accounts get 0x8f8f12c1c5ba67e9 --network testnet
```


小结： 
Cadence 智能合约的部分，我们就告一段落。
我们掌握了：
- 本地Cadence项目创建于目录结构
- flow.json 的详细配置
- playground 的使用与合约编写调试
- 本地 Flow CLI 进行 Cadence合约部署至测试网
- 通过测试浏览器检测合约部署情况


接下来我们来看，如何在一个dApp中进行Cadence合约的调用与前端页面的交互过程。


# 四、FCL 使用与合约交互

1. 创建Web项目，添加必备依赖

```
yarn create react-app my-app
cd my-app
yarn add @onflow/fcl @onflow/types
```
- @onflow/fcl 负责将我们上面创建的 `scripts` 和 `transactions`等 Cadenced代码 转化为 `JavaScript` 可以调用的形式，并包含与区块链交互的能力。
- @onflow/types 负责将我们`JavaScript`中的数据类型，转化为上面创建的 `scripts` 和 `transactions`等 Cadenced中可以识别的类型。

2. 配置文件设置

经过上面的过程， 我们已经有了Flow的账号及私钥、部署完成的合约地址等信息，在dApp中我们需要将它们记录到配置文件`config.js`中，方便 `fcl`在与区块链交互的时候，能够读取到它们。

但是，由于私钥等信息很敏感，不能暴露，我们同样要创建一个 `.env` 文件去保存敏感数据，然后`config.js` 去`.env`中读取，并且`.env`文件我们不会对外公布。如果你的dApp在 [fleek](https://fleek.co/) 上部署，你可以在配置页面添加环境变量。
```
touch .env.local        # Create a .env.local file to store our environment variables
touch ./src/config.js   # Create a ./src/config.js file where we will import our environment variables and configure FCL
```

参考 `Alchemy`的文档，配置你的节点信息: `REACT_APP_ALCHEMY_API_KEY` 需要你在网站上注册并创建。（我提供的key只做演示，随时会失效）

`.env`完整配置:
```
# File: .env.local

# REACT_APP_ACCESS_NODE will be the Alchemy endpoint for our application
# REACT_APP_ALCHEMY_API_KEY is your unique Alchemy API key.
REACT_APP_ACCESS_NODE= https://flow-testnet.g.alchemy.com
REACT_APP_ALCHEMY_API_KEY= "7f1rfypcs16b113s2xc8doxdunmgv5ls"

# WALLET_DISCOVERY will be the endpoint our application
# will use to discover available FCL compatible wallets.
REACT_APP_WALLET_DISCOVERY= https://fcl-discovery.onflow.org/testnet/authn

# CONTRACT_PROFILE will be the address that has the Profile
# smart contract we will be using in this guide.
REACT_APP_CONTRACT_PROFILE= 0x8f8f12c1c5ba67e9

```

接着，去配置 `config.js` 完整配置如下:
```
// File: ./src/config.js
import * as fcl from "@onflow/fcl"

fcl.config()
  .put("grpc.metadata", {"api_key": process.env.REACT_APP_ALCHEMY_API_KEY})
  .put("accessNode.api", process.env.REACT_APP_ACCESS_NODE) // Configure FCL's Alchemy Access Node
  .put("challenge.handshake", process.env.REACT_APP_WALLET_DISCOVERY) // Configure FCL's Wallet Discovery mechanism
  .put("0xProfile", process.env.REACT_APP_CONTRACT_PROFILE) // Will let us use `0xProfile` in our Cadence
```

3. FCL 实现授权与登录

由于 Flow 的账户体系与以太坊的不同，在授权登录时并不是采用 Metamask 等实现。而是推荐采用 [Blocto 钱包进行登录](https://docs.blocto.app/blocto-sdk/flow/login-register)。

在 `auth-cluster.js` 中，我们来完成：

- 登录/注册
`fcl.currentUser().subscribe(setUser)`  订阅用户登录的状态
`fcl.currentUser().unauthenticate()` 判断当前用户是否授权，简写 `fcl.unauthenticate()`
`fcl.logIn()` 和 `fcl.signUp()`分别代表登录和注册函数，但是目前flow的钱包中，两者行为是一样的。等价于`fcl.currentUser().authenticate()`。 

- 注销
注销订阅`fcl.unauthenticate()` 函数来改变用户登录状态。

4. 检查用户是否初始化Flow Profile
  
我们部署的`Profile`合约在这里：https://flow-view-source.com/testnet/account/0x8f8f12c1c5ba67e9/contract/Profile

我们在`Flow FCL`中调用 `Cadence scripts` 的流程是这样的：`fcl.send([]).then(fcl.decode)`.

与区块链交互的过程分为三个： 构造交易、交易签名、广播交易

`fcl.send([])`中的数组部分中，我们构建自己的交易信息，并且读取配置文件中的信息进行签名。
`fcl.decode`将从我们的脚本中解析出返回值并将其转换为 JavaScript 值。

- 监测账户是否初始化的实现: `is-initialized.script.js`
```
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
```

如果用户Profile已经存在了，那么可以继续采用读取信息的方法查询信息。

- 查询Profile信息完整的实现: `fetch-profile.script.js`
```
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
```

由于 Profile 合约部署的地址，我们在配置文件`config.js`中已经进行了记录 ，所以这里只需要使用 `0xProfile` 替代 `0x8f8f12c1c5ba67e9`

由于初次使用dApp的话，用户信息是尚未初始化的，所以需要初始化用户Profile信息。
初始化Profile信息，需要我们发起 `transactions` 交易，这与上面的两个 `scripts` 交易是不同的。它需要用户的签名授权，所需要的参数也有所不同。

- 初始化账号完整的实现: `init-profile.tx.js`
```
import * as fcl from "@onflow/fcl"
// import * as t from "@onflow/types"

export async function initProfile(address) {
  console.log(address)
  console.log(fcl.currentUser().authorization)
  const txId = await fcl
    .send([
      fcl.proposer(fcl.currentUser().authorization), // current user acting as the nonce
      fcl.authorizations([fcl.currentUser().authorization]), // current user will be first AuthAccount
      fcl.payer(fcl.currentUser().authorization), // current user is responsible for paying for the transaction
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
```
注意： limit 值不够，会引发报错。`proposer`、`authorizations`、`payer` 应该依次执行。
关于Flow 钱包账户体系的知识可以查看：[Accounts, Keys & Signing](https://docs.onflow.org/concepts/accounts-and-keys/) 

关于钱包的配置也在`config.js`的`challenge.handshake`字段中设置。

各个`scripts` 和 `transactions` 完成的过程基本上类似。详细查看 `src/flow` 中的文件，这里不再逐一分解。


另外，在我快要完成测试的时候，我修改了一次 Cadence 合约的函数，导致我无法更新合约了。 
这个时候，可以 删除原来的合约，然后重新部署,最后查看区块浏览器。 但这样数据是不会保存的。

```
flow accounts remove-contract Profile --network testnet

flow project deploy --network=testnet --update

https://flow-view-source.com/testnet/account/0x8f8f12c1c5ba67e9

```
删除合约需要注意,命令会读取`flow.json`文件的配置信息， 但它执行的`accounts`的地址总是 `emulator-account` 中记录的信息，我找不到合适的方法去调用出`testnet-account`。 
有个偷懒的办法，把`emulator-account`里面的内容换成`testnet-account`的。

但是，你发现，你无法重新部署新合约，因为在 `stores` 中包含了同名合约，修改合约名字来解决这个问题吧。
我把配置文件和Cadence文件`Profile`都改为`Profile1`。 但如果变量参数太多，建议直接换个地址部署。(暂时没找到好办法)



# 五、Flow dApp 前端开发与用户交互

通过上面的基本交互， 我们接下来需要完成 React 对于合约交互中各种状态的管理。
此部分内容属 `React` 知识，不再分析,仅供参考：
```
web/flow
web/hooks
web/components
```
更多详解查看: [flow-app-quickstart](https://docs.onflow.org/flow-js-sdk/flow-app-quickstart#extra-credit---adding-an-interface-that-uses-our-functions)


- 更多查看 

[awesome-flow](https://github.com/FlowFans/awesome-flow)
