const app = require('../../utils/app');

app.get('*', async (req, res) => {
  try {
    const date = Date.now();

    res.set('cache-control', 's-maxage=1, maxage=0, stale-while-revalidate');
    res.status(200).json({ date });
  } catch (e) {
    res.status(500).json({ error: e.message || 'uh oh ' });
  }
});

module.exports = app;
