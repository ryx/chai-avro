# chai-avro

## A chaijs plugin to use Avro schema definitions in tests

by Rico Pfaus <ricopfaus@gmail.com> | (c) 2016 | MIT licensed

## About
This is a very simple plugin to use the [Avro modelling language](http://http://avro.apache.org) schemas
within the [chaijs](http://chaijs.com) testing framework. Currently only supports loading
protocol (*.avdl) files with Avro IDL.

## Usage

Load chai and chai-avro modules

    const chai = require('chai');
    const chaiAvro = require('chai-avro')
    chai.use(chaiAvro);

Load an Avro protocol (*.avdl) file (e.g. in before handler in mocha)

    chaiAvro
      .loadProtocol('./com/example/types/MyProtocolFile.avdl')
      .then(function() {
        // start tests
        done();
      });

Then test your objects against the Avro schema, using your favorite style

    expect(obj).to.be.a.avroType('com.example.types.Foo');
    assert.isAvroType(obj, 'com.example.types.Foo');
