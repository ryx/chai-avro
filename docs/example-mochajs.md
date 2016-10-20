# Using chai-avro with mochajs

This is a very simple example of a testing flow when using
chai-avro. Honestly, Avro schemas don't add much value for a few
simple objects. It starts getting extremely useful when you have
many type definitions that are also used within a backend
application.

## Avro Schema (in file './types.avdl')

    @namespace("com.example.types")

    record Foo {
      string  stringProp;
      int intProp;
    }

## Javascript object to be tested

```javascript
const foo = {
  stringProp: 'some String value',
  intProp: 12345,
}
```

## Test using chaijs and chai-avro

```javascript
const chai = require('chai');
const chaiAvro = require('chai-avro');
chai.use(chaiAvro);

describe('suite', function () {

  // init chai-avro using a Promise
  before(function(done) {
    chaiAvro.loadProtocol('./types.avdl').then(function() {
      done();
    })
  });

  it('should comply with the Avro schema', function () {
    assert.isAvroType(foo, 'com.example.types.Foo');
    // or: expect(foo).to.be.a.avroType('com.example.types.Foo');
  });

});
```
