"use strict";

var QED_I18N = {
  en: {
    deduce: "Deduce",
    formEnvironment: "Form environment",
    from: "From",
    given: "Given",
    noDeductions: "No available deductions can be formed from this selection.",
    undo: "IMMEDIATE UNDO",
    restart: "RESTART EXERCISE",
    unsolve: "UNSOLVE EXERCISE",
    prev: "PREVIOUS EXERCISE",
    next: "NEXT EXERCISE",
    reset: "RESET QED",
    editState: "EDIT STATE"
  }
};

var QED_LANG = (function () {
  if (typeof location === "undefined") return "en";
  var m = /(?:^|[?&])lang=([a-zA-Z-]+)/.exec(location.search);
  var lang = m ? m[1] : "en";
  return QED_I18N[lang] ? lang : "en";
})();

function qedStr(key) {
  var table = QED_I18N[QED_LANG] || QED_I18N.en;
  return table[key] || QED_I18N.en[key] || key;
}

function qedApplyDomStrings() {
  if (typeof document === "undefined") return;
  var map = {
    "undo-button": "undo",
    "restart-button": "restart",
    "unsolve-button": "unsolve",
    "prev-exercise": "prev",
    "next-exercise": "next",
    "reset-button": "reset",
    "edit-state-button": "editState"
  };
  Object.keys(map).forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.textContent = qedStr(map[id]);
  });
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", qedApplyDomStrings);
  } else {
    qedApplyDomStrings();
  }
}
