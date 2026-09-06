"use strict";

// Hand-coded assertions for logic.js, as proposed in issue 31.
// No test runner: failures throw, and a summary is written into #results.

var failures = [];
var passes = 0;

function assert(cond, msg) {
    if (cond) {
        passes++;
        return;
    }
    failures.push(msg);
}

function sentenceName(s) {
    return s.name;
}

function runTests() {
    assert(TRUE().name.indexOf("TRUE") !== -1, "TRUE() should mention TRUE");
    assert(FALSE().name.indexOf("FALSE") !== -1, "FALSE() should mention FALSE");

    var aAndB = AND(A, B);
    var bAndA = AND(B, A);
    assert(aAndB.name !== bAndA.name, "AND is ordered; A AND B is not B AND A");
    assert(NOT(A).name.indexOf("NOT") !== -1, "NOT(A) should mention NOT");
    assert(IFF(A, A).name.indexOf("IFF") !== -1, "IFF(A,A) should mention IFF");

    var mp = new Law("TestModusPonens", "modus ponens", [A, IMPLIES(A, B)], B);
    var primitives = listPrimitives(mp, false, true, true, true, false, false, true, true);
    var hit = matchWithGivens([A, IMPLIES(A, B)].map(toContext), mp, primitives);
    assert(hit.matches, "modus ponens should match A and IMPLIES(A,B)");
    assert(!hit.illegal, "modus ponens match should be well-formed");

    var miss = matchWithGivens([A].map(toContext), mp, primitives);
    assert(!miss.matches, "modus ponens should not match a single hypothesis");

    var fc = formulaContext(A);
    assert(fc.type === "formula", "formulaContext(A) should have type formula");
    var sc = toContext(A);
    assert(sc.type === "sentence in environment", "a bare sentence becomes a sentence-in-environment");

    var allFormulaLaw = new Law("TestTrueIdent", "true ident", [formulaContext(A)], IFF(A, AND(TRUE(), A)));
    assert(allFormulas(allFormulaLaw.givens), "TRUE-identity law hypotheses are formulas");
    assert(!allFormulas(mp.givens), "modus ponens hypotheses are not all formulas");

    var ds = deductionString("Given", [A], B);
    assert(ds.indexOf("Given") !== -1 && ds.indexOf("deduce") !== -1, "deductionString should mention Given and deduce");

    var x = new FreeVariable("x");
    var eq = equals(toTerm(x), toTerm(x));
    assert(eq.name.indexOf("=") !== -1, "equals(x,x) should form an equality sentence");
}

function report() {
    var el = (typeof document !== "undefined") ? document.getElementById("results") : null;
    var text;
    if (failures.length === 0) {
        text = "ok: " + passes + " assertions passed.";
    } else {
        text = "FAIL: " + failures.length + " of " + (passes + failures.length) + "\n" + failures.join("\n");
    }
    if (el) el.textContent = text;
    if (typeof console !== "undefined") console.log(text);
    if (failures.length) throw new Error(text);
}

runTests();
report();
