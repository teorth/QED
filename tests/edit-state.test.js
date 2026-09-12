'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');

function openEditor() {
    const saved = new Map([['Exercise 1.1', 'solved'], ['lines Exercise 1.1', '3']]);
    const button = {};
    const alerts = [];
    let reloads = 0;
    let importState;
    const storage = {
        clear() { saved.clear(); },
        setItem(key, value) { saved.set(key, String(value)); }
    };
    const context = vm.createContext({
        document: { getElementById() { return button; } },
        localStorage: storage,
        window: { localStorage: storage },
        location: { reload() { reloads++; } },
        alert(message) { alerts.push(message); }
    });
    vm.runInContext(fs.readFileSync(path.join(__dirname, '../docs/js/gui.js'), 'utf8'), context);
    context.myprompt = (message, value, callback) => { importState = callback; };
    context.createEditStateButton().onclick();
    return { saved, alerts, importState: value => importState(value), reloads: () => reloads };
}

for (const input of ['{broken', 'null', '[]', '"text"', '42', 'true']) {
    test('invalid state preserves progress: ' + input, () => {
        const editor = openEditor();
        const before = Array.from(editor.saved);
        assert.doesNotThrow(() => editor.importState(input));
        assert.deepEqual(Array.from(editor.saved), before);
        assert.equal(editor.reloads(), 0);
        assert.equal(editor.alerts.length, 1);
    });
}

test('valid state replaces progress and reloads', () => {
    const editor = openEditor();
    editor.importState('{"Exercise 2.1":"unlocked","lines Exercise 2.1":5}');
    assert.deepEqual(Array.from(editor.saved), [['Exercise 2.1', 'unlocked'], ['lines Exercise 2.1', '5']]);
    assert.equal(editor.reloads(), 1);
    assert.equal(editor.alerts.length, 0);
});

test('an empty object intentionally clears progress', () => {
    const editor = openEditor();
    editor.importState('{}');
    assert.equal(editor.saved.size, 0);
    assert.equal(editor.reloads(), 1);
});
