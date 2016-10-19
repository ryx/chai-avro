/**
 * Plugin to use Avro schema definitions in chaijs assertions. Currently
 * only supports loading protocol (*.avdl) files with AVRO IDL.
 *
 * by Rico Pfaus <ricopfaus@gmail.com> | (c) 2016 | MIT licensed
 */
const avsc = require('avsc');

// currently loaded Avro protocol object
let currentProtocol = null;

/**
 * Load an Avro protocol file (*.avdl) and return a Promise.
 * @param {String}  fileName  path to an AVDL file with schema definition
 */
function loadProtocol(fileName) {
  return new Promise((resolve, reject) => {
    avsc.assemble(fileName, {}, (err, attrs) => {
      if (err) {
        reject(err);
      } else {
        try {
          currentProtocol = avsc.parse(attrs);
          resolve(currentProtocol);
        } catch (e) {
          reject(e);
        }
      }
    });
  });
}

/**
 * Actual plugin initialization code.
 */
function chaiAvro(chai) {
  // create chaijs helper (@XXX: use 'function' keyword to keep correct context of 'this'!)
  chai.Assertion.addMethod('avroType', function (typeName) {
    if (!currentProtocol) {
      throw new Error('chai-avro: no protocol defined, call loadProtocol first');
    }
    let msg = null;
    const type = currentProtocol.getType(typeName);
    const valid = type.isValid(this._obj, {
      errorHook: (p, a, t) => {
        msg = `expected field '${p}' with value '${a}' to be of type ${t}`;
      },
    });
    // type check
    this.assert(valid === true, msg);
  });

  // inject TDD-style API
  chai.assert.isAvroType = (val, typeName) => {
    new chai.Assertion(val).to.be.a.avroType(typeName);
  };
}

// create function shortcuts (@TODO: might be extended to e.g. directly add type definitions)
chaiAvro.loadProtocol = loadProtocol;

// export public API
module.exports = chaiAvro;
