const express = require('express');
const promMid = require('express-prometheus-middleware');
const client = require('prom-client');

const startServer = () => {
  const app = express();
  const port = 8080;

  const counter = new client.Counter({
    name: 'hellocounter',
    help: 'Counting hellos',
  });


  app.use(promMid({
    metricsPath: '/metrics',
    collectDefaultMetrics: true,
  }));


  app.get('/', (req, res) => {
    counter.inc(1);
    res.send(client.register.metrics());
  });

  return app.listen(port, () => {
    console.log(`Server started`);
  });

};


module.exports = {
  startServer: startServer,
};
