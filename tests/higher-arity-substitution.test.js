const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const logic = vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(__dirname, '../docs/js/logic.js'), 'utf8'), logic);
vm.runInContext(`
var a = primitiveTerm('a'), b = primitiveTerm('b'), c = primitiveTerm('c');
var operator = new Operator('f', 3, false);
var predicate = new Predicate('R', 3, false);
var terms = allSearchReplace(operatorTerm(operator, [a, b, a]), a, c);
var formulas = allSearchReplace(predicateSentence(predicate, [a, b, a]), a, c);
`, logic);
function assertAlternatives(alternatives, build) {
    const expected = new Set([[logic.a, logic.b, logic.a], [logic.a, logic.b, logic.c],
        [logic.c, logic.b, logic.a], [logic.c, logic.b, logic.c]].map(args => build(args).name));
    assert.equal(alternatives.length, 4);
    assert.deepEqual(new Set(Array.from(alternatives, item => item.name)), expected);
}
assertAlternatives(logic.terms, args => logic.operatorTerm(logic.operator, args));
assertAlternatives(logic.formulas, args => logic.predicateSentence(logic.predicate, args));
console.log('higher arity substitution: passed');
