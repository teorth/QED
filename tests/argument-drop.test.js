const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const term = {name: '<I>x</I>'};
const context = vm.createContext({document: {getElementById: () => ({type: 'termBox', term})}});
vm.runInContext(fs.readFileSync(path.join(__dirname, '../docs/js/gui.js'), 'utf8'), context);
const li = {operator: {arity: 2}, args: ['', ''], fields: []};
const field = {li, i: 0};
li.fields[0] = field;
const event = target => ({target, currentTarget: field, preventDefault() {}, dataTransfer: {getData: () => 'term'}});
// A second drop can hit the <I> inside the term inserted by the first drop.
context.argDrop(event(field));
assert.equal(li.args[0], term);
li.args[0] = '';
context.argDrop(event({parentElement: field}));
assert.equal(li.args[0], term);
assert.equal(field.innerHTML, term.name);
console.log('nested argument drops: passed');
