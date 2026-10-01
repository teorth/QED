const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const context = vm.createContext({document: {getElementById: () => ({type: 'sentenceBox'})}});
vm.runInContext(fs.readFileSync(path.join(__dirname, '../docs/js/gui.js'), 'utf8'), context);
const formula = {type: 'formula window'};
assert.equal(context.correctTarget({target: {parentElement: formula}}), formula);
const outside = {parentElement: {parentElement: null}};
assert.equal(context.correctTarget({target: outside}), null);
assert.equal(context.correctTarget({target: null}), null);
let prevented = false;
context.drop({target: outside, preventDefault: () => { prevented = true; },
              dataTransfer: {getData: () => 'sentence'}});
assert.equal(prevented, true);
console.log('drop targets: passed');
