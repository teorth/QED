const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
let undos = 0;
const context = vm.createContext({document: {getElementById: () => ({onclick: () => undos++})}});
vm.runInContext(fs.readFileSync(path.join(__dirname, '../docs/js/gui.js'), 'utf8'), context);
for (const props of [
  {target: {tagName: 'INPUT'}}, {target: {tagName: 'TEXTAREA'}},
  {target: {tagName: 'SELECT'}}, {target: {isContentEditable: true}},
  {ctrlKey: true}, {metaKey: true}, {altKey: true},
  {isComposing: true}, {defaultPrevented: true}
]) context.keydown({key: 'u', ...props});
assert.equal(undos, 0);
context.keydown({key: 'u', target: {tagName: 'BODY'}});
context.keydown({key: 'U', shiftKey: true, target: {tagName: 'BODY'}});
assert.equal(undos, 2);
console.log('keyboard shortcuts: passed');
