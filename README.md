# o3-wallet-api
Integrate your decentralized application to O3 mobile app using our APIs and let users interact with your app in an easy and secure way.

### General concept
O3 dapp browser both on iOS and Android let user interact with your app by giving your app an access to current logged in wallet address and the ability to request user to sign a transaction. You don't have to deal with building out wallet functionalities so you can spend more time building other stuff.  




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
An error object contains a descriptive error when a function failed to execute of something is wrong.

#### `data`
An object field that contains a response of a calling command. Each command and response will be described below.



### APIs

#### `requestToConnect()`
Generally, dapp display a `Connect` button to a user when a user is not logged in. When dapp calls `requestToConnect` function, O3 app will offer a permission dialog to a user with a message saying that a `domain name` that your dapp is currently running on wants to connect. User can choose to allow or cancel the permission. when user cancel on this permission dialog, nothing will be returned. when user allowed your dapp to connect, `sessionID` and other data about user's logged in wallet will be returned.

#### Response
```
{
	"command": "requestToConnect",
	"sessionID":"",
	"data": {}
}
```
---

#### `verifySession(sessionID)`
Typically, dapp contains multiple pages. Asking user to log in on every page is not a good user experience. We suggest your app saving a `sessionID` into a `sessionStorage` and pass the saved session to this function to verify a session with O3 app. If a session is still valid, the same object as in `requestToConnect` will be returned. If a session is not valid or already expired. A response will contains an `error` object.

#### Response
```
{
	"command": "verifySession",
	"sessionID":"",
	"data": {}
}
```
--- 

__Below are functions that can only be called after user allowed your dapp to connect with O3 app.__

#### `getPlatform()` 
Call this function when you want to know what platform o3 app is running on. `ios` or `android` 
#### Response
```
{
	"command": "getPlatform",
	"sessionID":"",
	"data": {}
}
```
--- 

- getAccounts() 
- isAppAvailable()
- getPublicKey()
- requestToSignRawTransaction(unsignedRawTransaction)
- getDeviceInfo()
- request(toAddress, asset, amount, message)
### Events
- revokedSession 
