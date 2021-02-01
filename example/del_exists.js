const cacing = require('../dist');

(async () => {
  const dsn = 'cacing://root:root@localhost:6543';
  const c = await cacing.connect(dsn);

  const setResult = await c.set('user1', 'hadihammurabi');
  console.log('setResult => ', setResult);

  const isExists = await c.isExists('user1');
  if (isExists) {
    const user1 = await c.get('user1');
    console.log('user1 => ', user1);

    const delResult = await c.del('user1');
    console.log('delResult => ', delResult);
  }

  c.disconnect();
})();
