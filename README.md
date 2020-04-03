## prometheus express bug

Minimal example of bug where custom metrics are not registered

 If I have understood this correct, it happens because
 express-prometheus-middleware uses a global variable for the metrics
 registry, but this is module scoped. When I explicitly include
 prom-client as a dependency, we get two registers referring to different registries

## How to run

```
npm install
npm start
```

this starts the express server on http://localhost:8080. Whenever we access http://localhost:8080 a counter "hellocounter" is supposed to increment, but this counter is never exposed to our metrics endpoint http://localhost:8080/metrics.

This can be seen in tests:

```
npm test
```

This should cause the second test to fail, because our prometheus endpoint does not expose the metric "hellocounter":

```
 npm test

> jest --env node

 FAIL  tests/test.js
  ✓ should register default metrics (28ms)
  ✕ should register custom metrics (6ms)

  ● should register custom metrics

    expect(received).toContain(expected) // indexOf

    Expected substring: "hellocounter"
    ...
```
