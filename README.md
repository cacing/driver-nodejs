## Cacing's client driver for NodeJS.
![screenshot](https://user-images.githubusercontent.com/16364286/106288556-c674af00-627a-11eb-9f1f-852d20f5e121.png)

# Features
* Simple usage
* Modern API
* Async by default

# Usage
```js
const cacing = require('cacing');

(async () => {
  try {
    const cacingClient = await cacing.createClient('cacing://username:password@localhost:6543');

    await cacingClient.set('user1', 'cacing');
    await cacingClient.set('user2', 'hadihammurabi');
    await cacingClient.set('user3', 'needkopi');

    console.log(await cacingClient.get('user1'));
    console.log(await cacingClient.get('user2'));
    console.log(await cacingClient.get('user3'));
  } catch(err) {
    console.error(err);
  }
})();
```
