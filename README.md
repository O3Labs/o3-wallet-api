# o3-wallet-api
APIs to O3 Wallet both Mobile and Desktop


### Installation

```html
<script src="o3-1.0.0.js" type="text/javascript"></script>
```

### Usage

Initialize `o3` object
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
	"data": {}
}
```

### APIs

- requestToConnect()
- getPlatform()
- getAccounts() 
- isAppAvailable()
- getPublicKey()
- requestToSignRawTransaction(unsignedRawTransaction)
- getDeviceInfo()
- request(toAddress, asset, amount, message)
