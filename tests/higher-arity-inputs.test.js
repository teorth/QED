const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
function element() {
    return {children: [], appendChild(child) { this.children.push(child); }, setAttribute() {}};
}
const elements = {'operators-list': element(), 'predicates-list': element()};
const logic = vm.createContext({document: {createElement: element, getElementById: id => elements[id]}});
for (const file of ['logic.js', 'gui.js'])
    vm.runInContext(fs.readFileSync(path.join(__dirname, '../docs/js', file), 'utf8'), logic);
vm.runInContext(`
var contexts = [];
addContext = context => contexts.push(context);
var ternary = new Predicate('R', 3, false);
var quaternary = new Operator('f', 4, false);
sentences[ternary.name] = ternary;
sentences[quaternary.name] = quaternary;
addPredicate(ternary.name);
addPredicate(quaternary.name);
`, logic);
for (const [name, arity] of [['predicates-list', 3], ['operators-list', 4]]) {
    const li = elements[name].children[0];
    assert.equal(li.fields.length, arity);
    for (let i = 0; i < arity; i++) {
        elements.term = {type: 'termBox', term: logic.primitiveTerm(String(i))};
        logic.argDrop({target: li.fields[i], preventDefault() {}, dataTransfer: {getData: () => 'term'}});
    }
    assert.equal(logic.contexts.length, name === 'predicates-list' ? 1 : 2);
    const context = logic.contexts.at(-1);
    assert.equal((context.sentence.argList.length || context.term.argList.length), arity);
    assert.ok(li.args.every(arg => arg === ''));
}
console.log('higher arity inputs: passed');
