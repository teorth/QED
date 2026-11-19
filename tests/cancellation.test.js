"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

function loadCancellation() {
    const context = vm.createContext({ localStorage: null });
    const sourceDirectory = path.join(__dirname, "../docs/js");
    for (const filename of ["logic.js", "gui.js"]) {
        vm.runInContext(fs.readFileSync(path.join(sourceDirectory, filename), "utf8"), context);
    }

    // Skip page layout and unrelated exercises, not law construction or matching.
    const main = fs.readFileSync(path.join(sourceDirectory, "main.js"), "utf8");
    for (const call of main.matchAll(/^(create\w+)\(\);$/gm)) {
        context[call[1]] = function () {};
    }
    context.document = { body: { setAttribute() {} } };
    context.getElement = function () { return { children: [] }; };
    context.newSection = function () {};
    context.checkForUnlocks = function () {};
    context.createExerciseButton = function () { return {}; };
    vm.runInContext(main, context);
    context.exerciseFromData("24.4", context.exerciseData["24.4"]);
    context.law = context.lawsByShortName["24.4"];
    return context;
}

function match(context, expression) {
    return vm.runInContext(`
        matchWithGivens(${expression}, law,
            listPrimitives(law, false, true, true, true, false, false, true, true))
    `, context);
}

test("24.8 can cancel x from x * (alpha * 1) = x * alpha", () => {
    const context = loadCancellation();
    vm.runInContext(`
        var env = [variableAssumption(x)];
        var equalityGiven = equals(multiply(x, multiply(alpha, one)), multiply(x, alpha));
        var selected = law.givens.slice(0, 3).map(function (given) {
            return sentenceContext(given.sentence, env);
        });
        selected.push(sentenceContext(equalityGiven, env));
    `, context);
    const output = match(context, "selected");
    assert.equal(output.matches, true);
    assert.equal(output.illegal, false);
    assert.equal(output.conclusion.sentence.name,
        vm.runInContext("equals(multiply(alpha, one), alpha).name", context));
    assert.equal(output.conclusion.environment.length, 1);
    assert.equal(context.isLegal(output.conclusion), true);
});

test("cancellation retains the inverse hypothesis", () => {
    const context = loadCancellation();
    assert.equal(context.law.givensTemplate.length, 4);
    assert.equal(match(context, "[law.givens[0], law.givens[1], law.givens[3]]").matches, false);
    assert.equal(match(context, "law.givens.slice()").matches, true);
});

test("each group axiom is checked rather than accepting an arbitrary fourth selection", () => {
    for (let index = 0; index < 3; index++) {
        const context = loadCancellation();
        vm.runInContext(`
            var selected = law.givens.slice();
            selected[${index}] = toContext(TRUE());
        `, context);
        assert.equal(match(context, "selected").matches, false);
    }
});

test("different left factors and different operators cannot be cancelled", () => {
    for (const expression of [
        "equals(multiply(alpha, beta), multiply(one, gamma))",
        "equals(operatorTerm(plus, [alpha, beta]), operatorTerm(plus, [alpha, gamma]))",
        "equals(multiply(alpha, beta), operatorTerm(plus, [alpha, gamma]))",
        "equals(alpha, beta)"
    ]) {
        const context = loadCancellation();
        vm.runInContext(`
            var selected = law.givens.slice(0, 3);
            selected.push(toContext(${expression}));
        `, context);
        assert.equal(match(context, "selected").matches, false);
    }
});

test("hypotheses from different environments cannot be combined", () => {
    const context = loadCancellation();
    vm.runInContext(`
        var selected = law.givens.slice();
        selected[3] = sentenceContext(selected[3].sentence, [sentenceAssumption(TRUE())]);
    `, context);
    assert.equal(match(context, "selected").matches, false);
});
