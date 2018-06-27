# o3-wallet-api
APIs to O3 Wallet both Mobile and Desktop


### Installation

```html
<script src="o3-1.0.0.js" type="text/javascript"></script>
```

### Usage

Initialize `o3` object
```js

function callback(event) {
  console.log(event);
};

o3.Init(callback: callback)
```

### APIs

- isO3Available()
- platform() `mobile/android`, `mobile/ios`, `desktop/windows` and `desktop/macos`
- getAccounts() 
- getPublicKey(account)
- signTransaction(account, rawToSign)
