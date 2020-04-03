const {startServer} = require("../src/server");
const fetch = require("isomorphic-fetch");
const promclient = require("prom-client");

let server;

beforeAll(async (done) =>  {
    server = startServer();
    done();
});

afterAll(async (done) => {
  server.close(done);
});

test('should register default metrics', async (done) => {
  const url = "http://localhost:8080";

  const res = await fetch(url, { method: 'GET' });
  expect(await res.text()).toContain("hellocounter 1");

  const metricsRes = await fetch(`${url}/metrics`, { method: 'GET' });
  expect(await metricsRes.text()).toContain("http_request_duration_seconds_bucket");

  done();
});

test('should register custom metrics', async (done) => {
  const url = "http://localhost:8080";

  const res = await fetch(url, { method: 'GET' });
  expect(await res.status).toStrictEqual(200);

  // this works
  expect(promclient.register.metrics()).toContain("hellocounter 1");

  // but it is not served in our metrics endpoint
  const metricsRes = await fetch(`${url}/metrics`, { method: 'GET' });
  expect(await metricsRes.text()).toContain("hellocounter");

  done();
});
