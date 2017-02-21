# chai-avro

A chaijs plugin to use [Avro](http://avro.apache.org) schema definitions in tests

## Info
This is a very simple plugin to use the Avro schemas within the [chaijs](http://chaijs.com)
testing framework, which allows for easily testing against schemas. Behind the scenes it is based on
the Avro implementation from [AVSC](https://github.com/mtth/avsc). Currently only supports loading
protocols from [Avro IDL](http://avro.apache.org/docs/current/idl.html) files (*.avdl).

## Usage

Load chai and chai-avro modules

```javascript
const chai = require('chai');
const chaiAvro = require('chai-avro');
chai.use(chaiAvro);
```

Load an Avro protocol from IDL (*.avdl) file (e.g. in before handler in [mocha](mochajs.org))

```javascript
chaiAvro
  .loadProtocol('./com/example/types/MyProtocolFile.avdl')
  .then(function() {
    // start tests
  });
```

Test your objects against the Avro schema, using your favorite style

```javascript
expect(obj).to.be.a.avroType('com.example.types.Foo');
assert.isAvroType(obj, 'com.example.types.Foo');
```

For real-world examples see docs/example-mochajs.md.

## About

by Rico Pfaus | (c) 2016 | MIT licensed

