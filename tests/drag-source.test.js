const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function el(id) {
  const node = {
    id: id || '',
    type: '',
    style: {},
    children: [],
    childNodes: [],
    className: '',
    parentElement: null,
    setAttribute() {},
    appendChild(child) {
      child.parentElement = this;
      this.children.push(child);
      this.childNodes.push(child);
      return child;
    },
    removeChild() {},
    getElementsByTagName() { return []; },
    getElementsByClassName() { return []; },
  };
  return node;
}

const ids = {};
function getElementById(id) {
  if (!ids[id]) ids[id] = el(id);
  return ids[id];
}

const document = {
  getElementById,
  createElement(tag) { return el(''); },
  createTextNode(text) { return { text, parentElement: null }; },
  body: el('body'),
};

const localStorage = {
  length: 0,
  getItem() { return null; },
  setItem() {},
  removeItem() {},
  clear() {},
  key() { return null; },
};

const context = vm.createContext({
  document,
  localStorage,
  window: { localStorage },
  console,
  alert() {},
  location: { reload() {} },
});
vm.runInContext(fs.readFileSync(path.join(__dirname, '../docs/js/gui.js'), 'utf8'), context);

const box = el('id-sentence');
box.type = 'sentenceBox';
const em = el('');
em.parentElement = box;
box.appendChild(em);

let stored = null;
context.drag({
  target: em,
  currentTarget: box,
  dataTransfer: { setData(_k, v) { stored = v; } },
});
assert.equal(stored, 'id-sentence');

stored = null;
context.drag({
  target: em,
  dataTransfer: { setData(_k, v) { stored = v; } },
});
assert.equal(stored, 'id-sentence');

stored = 'untouched';
context.drag({
  target: { parentElement: null },
  dataTransfer: { setData(_k, v) { stored = v; } },
});
assert.equal(stored, 'untouched');

console.log('drag source: passed');
