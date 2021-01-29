const cacing = require('../dist');

(async () => {
  const cacingClient = await cacing.connect('cacing://root:root@localhost:6543');
  const setResult = await cacingClient.set('user1', 'hadihammurabi');
  console.log(setResult);

  const getResult = await cacingClient.get('user1');
  console.log(getResult);
})();
