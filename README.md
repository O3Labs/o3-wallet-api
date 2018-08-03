# o3-wallet-api
Integrate your decentralized application to O3 mobile app using our APIs and let users interact with your app in an easy and secure way.

### General concept
O3 dapp browser both on iOS and Android let user interact with your app by giving your app an access to current logged in wallet address and the ability to request user to sign a transaction. You don't have to deal with building out wallet functionalities so you can spend more time building other stuff.  

### Workflow
A user must grant permission for a dapp to access user information, including user's address, public key, platform and device information. 
![flow](https://raw.githubusercontent.com/O3Labs/o3-wallet-api/master/O3%20Mobile%20Dapp%20Browser.png?token=AA90tBwEwFB9y6wbui3WUzuGk9446HQ4ks5bTYTHwA%3D%3D)


### Installation

```html
<script src="o3-1.0.0.js" type="text/javascript"></script>
```

### Usage

Initialize `o3` object with a callback function. A given callback function will be called with a single returned object `response` when O3 app responds to a function you are calling.


```js

function callback(response) {
  if (response == null) {
    console.log("It's not running inside o3 app.")
    return;
  }
  console.log("response ", JSON.stringify(response));
};

o3.init(callback)
```

### Response object

```
{
	"command": "",
	"sessionID":"",
	"error": {},
	"data": {}
}
```

#### `command` 
A string field of a calling command. A command in a response will be the same as a javascript function name you are calling.

#### `sessionID`
A string field of session identifier, this session id will be returned when user allowed your dapp to connect with a user's wallet. The session is valid until user logged out or the app is closed.

#### `error`
An error object contains a descriptive error when a function failed to execute or something is wrong.

#### `data`
An object field that contains a response of a calling command. Each command and response will be described below.

---

### APIs
A list of available APIs that your dapp can call.

#### `o3.requestToConnect()`
Generally, dapp display a `Connect` button to a user when a user is not logged in. When dapp calls `requestToConnect` function, O3 app will offer a permission dialog to a user with a message saying that a `domain name` that your dapp is currently running on wants to connect. User can choose to allow or cancel the permission. when user cancel on this permission dialog, nothing will be returned. when user allowed your dapp to connect, `sessionID` and other data about user's logged in wallet will be returned.

#### Response
```
{
	"command": "requestToConnect",
	"data": {
		"publicKey": "03b0ca78d8bc3bfc36d1a659114bdaec91139cf2809d1a01da0cbf593ee3167f8c",
		"address": "AcydXy1MvrzaT8qD3Qe4B8mqEoinTvRy8U"
	},
	"sessionID": "B3B224E8-F4CC-4686-8773-971144A14A2D"
}
```
---

#### `o3.verifySession(sessionID)`
Typically, dapp contains multiple pages. Asking user to log in on every page is not a good user experience. We suggest your app saving a `sessionID` into a `sessionStorage` and pass the saved session to this function to verify a session with O3 app. If a session is still valid, the same object as in `requestToConnect` will be returned. If a session is not valid or already expired. A response will contains an `error` object.

#### Response
```
{
	"command": "verifySession",
	"data": {
		"publicKey": "03b0ca78d8bc3bfc36d1a659114bdaec91139cf2809d1a01da0cbf593ee3167f8c",
		"address": "AcydXy1MvrzaT8qD3Qe4B8mqEoinTvRy8U"
	},
	"sessionID": "B3B224E8-F4CC-4686-8773-971144A14A2D"
}
```
--- 

__Below are functions that can only be called after user allowed your dapp to connect with O3 app.__

#### `o3.getPlatform()` 
Call this function when you want to know what platform o3 app is running on. `ios` or `android` 
#### Response
```
{
	"command": "getPlatform",
	"data": {
		"platform": "ios",
		"version": "1.6.1"
	},
	"sessionID": "B3B224E8-F4CC-4686-8773-971144A14A2D"
}
```
--- 

#### `o3.getAccounts()`
Get user's active account including address and public key.
#### Response
```
{
	"command": "getAccounts",
	"data": {
		"accounts": {
			"neo": {
				"publicKey": "03b0ca78d8bc3bfc36d1a659114bdaec91139cf2809d1a01da0cbf593ee3167f8c",
				"address": "AcydXy1MvrzaT8qD3Qe4B8mqEoinTvRy8U"
			}
		}
	},
	"sessionID": "B3B224E8-F4CC-4686-8773-971144A14A2D"
}
```
--- 


#### `o3.isAppAvailable()`
Your dapp can preriodically call this function to check if user is still active within your dapp.
#### Response
```
{
	"command": "isAppAvailable",
	"data": {
		"isAppAvailable": true
	},
	"sessionID": "B3B224E8-F4CC-4686-8773-971144A14A2D"
}
```
--- 
#### `o3.getDeviceInfo()`
Get user's device information. (more info is coming)

#### Response
```
{
	"command": "getDeviceInfo",
	"data": {
		"device": "iPhone"
	},
	"sessionID": "B3B224E8-F4CC-4686-8773-971144A14A2D"
}
```
--- 
#### `o3.getBalances()`
Get logged in account's balances. Native assets and all NEP5 tokens with amount more than zero will be returned.

#### Response
```
{
	"command": "getBalances",
	"data": {
		"balances": {
			"GAS": {
				"decimals": 8,
				"name": "GAS",
				"value": 40.127622499999994,
				"id": "0x602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7",
				"symbol": "GAS"
			},
			"NNC": {
				"decimals": 2,
				"name": "NEO Name Credit",
				"value": 1,
				"id": "fc732edee1efdf968c23c20a9628eaa5a6ccb934",
				"symbol": "NNC"
			},
			"ONT": {
				"decimals": 8,
				"name": "Ontology Token",
				"value": 125.00000003,
				"id": "ceab719b8baa2310f232ee0d277c061704541cfb",
				"symbol": "ONT"
			},
			"NEO": {
				"decimals": 0,
				"name": "NEO",
				"value": 10,
				"id": "0xc56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b",
				"symbol": "NEO"
			},
			"SWTH": {
				"decimals": 8,
				"name": "Switcheo",
				"value": 5694.7608389100005,
				"id": "ab38352559b8b203bde5fddfa0b07d8b2525e132",
				"symbol": "SWTH"
			}
		},
		"account": {
			"publicKey": "03b0ca78d8bc3bfc36d1a659114bdaec91139cf2809d1a01da0cbf593ee3167f8c",
			"address": "AcydXy1MvrzaT8qD3Qe4B8mqEoinTvRy8U"
		}
	},
	"sessionID": "D3429985-6387-4DE8-AE07-7988069D3E10"
}
```
--- 

#### `o3.requestToSignRawTransaction(unsignedRawTransaction)`
You can construct an unsigned transaction and request user to sign a transaction. O3 app will show a popup asking a user that your dapp request he/she to sign a transaction. A user can either cancel or sign a transaction. If you chose to sign a transaction, signed transaction along with user's account will be returned then you are ready to send the transaction off to NEO blockchain.
#### Response
```
{
	"command": "requestToSign",
	"data": {
		"signatureData": "2c5c053bce0b5fd8273e4f84af9bf19271d93644e3b25404aff6b3570bce460d0f9a4d890483591e58c6f34a5ba68e8b2f28b1bda33c22ccd2b34ee7cb8ec3a6",
		"account": {
			"publicKey": "03b0ca78d8bc3bfc36d1a659114bdaec91139cf2809d1a01da0cbf593ee3167f8c",
			"address": "AcydXy1MvrzaT8qD3Qe4B8mqEoinTvRy8U"
		}
	},
	"sessionID": "B3B224E8-F4CC-4686-8773-971144A14A2D"
}
```
--- 

#### `o3.request(toAddress, asset, amount, message)`
Make a request to user to send specific asset and amount to an address. You don't have to construct a raw transaction nor submit a transaction to a NEO blockchain. O3 app will show a popup saying that your dapp is requesting he/she to send. Once a user authorized the transaciton, a transaction id will be sent to a callback function.
#### Response
```
{
	"command": "request",
	"sessionID":"",
	"data": {}
}
```
--- 


### Events
All available events that can occur during a session.

#### `revokedSession`
User can choose to disconnect or log out at any time. Once a user logged out. O3 app will call your dapp's callback function to notify that user has loged out so your dapp can do something accordingly.

#### Response
```
{
	"command": "revokedSession",
	"data": {}
}
```
--- 
