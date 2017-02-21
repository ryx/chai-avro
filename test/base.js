const chai = require('chai');
const mocha = require('mocha');
const chaiAvro = require('../chai-avro');
chai.use(chaiAvro);

const assert = chai.assert;
const expect = chai.expect;

describe('chai-avro', function () {
  describe('loadProtocol', function () {
    it('should throw an error when loadProtocol wasn\'t called before isAvroType', function () {
      const test = () => assert.isAvroType('foo', 'bar');
      assert.throws(test, 'call loadProtocol first');
    });

    it('should load an Avro schema from file', function () {
      return chaiAvro.loadProtocol('./test/avdl/TestTypes.avdl')
        .then(function(protocol) {
          assert.isObject(protocol);
        });
    });

    it('should throw an error when file access failed for any reason', function () {
      return chaiAvro.loadProtocol('./booooom')
        .catch(function(err) {
          assert.include(err.message, 'call loadProtocol first');
        });
    });
  });

  describe('assertion', function () {
    it('should provide an "isAvroType" method in chai.assert', function () {
      assert.isFunction(assert.isAvroType);
    });

    it('should provide an "avroType" method in chai.expect', function () {
      assert.isFunction(expect({}).to.be.a.avroType);
    });

    // @FIXME: should use a testing interface in chaiAvro to directly access validation
    it('should successfuly handle a valid type', function () {
      const foo = {
        stringProp: 'some String value',
        intProp: 12345,
      };
      expect(foo).to.be.a.avroType('com.example.types.Foo');
    });

    // @FIXME: should use a testing interface in chaiAvro to directly access validation
    it('should successfully handle an invalid type', function () {
      const foo = 'bar';
      expect(foo).not.to.be.a.avroType('com.example.types.Foo');
    });
  });
});
