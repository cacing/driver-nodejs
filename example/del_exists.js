const cacing = require('../dist');

(async () => {
  const cacingClient = await cacing.connect('cacing://root:root@localhost:6543');

  const setResult = await cacingClient.set('user1', 'hadihammurabi');
  console.log(setResult);

  const isExists = await cacingClient.isExists('user1');
  console.log(isExists);

  // const delResult = await cacingClient.del('user1');
  // console.log(delResult);

  cacingClient.disconnect();
})();
