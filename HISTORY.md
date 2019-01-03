# QED - Release History

* **Version 2.10.3** (released Dec 24, 2018). New record for 22.3(b).

* **Version 2.10.2** (released Oct 10, 2018).  "use strict" implemented, some accidentally global variables now local.  New records for 22.8, 22.4(cd), 22.5(abcde).
* **Version 2.10.1** (released Oct 8, 2018).  Matching fixed for 22.4(bd).  Fixed a technical matching bug involving matching bound variables.  New record for 22.5(d).

* **Version 2.10** (released Oct 8, 2018).  New record for 22.5(bc).  New helper exercise (12.6(d)).

* **Version 2.9.3** (released Oct 6, 2018).  New record for 24.8.  

* **Version 2.9.2** (released Oct 6, 2018).  New record for 24.8.  Added links to similar "logic games".

* **Version 2.9.1** (released Oct 3, 2018).  New record for 24.8.

* **Version 2.9** (released Oct 2, 2018).  New exercise (24.8), suggested by Martin Epstein.

* **Version 2.8.6** (released Sep 16, 2018).  New record for 22.5(b).

* **Version 2.8.5** (released Sep 2, 2018).  New records for 22.5(ade).

* **Version 2.8.4** (released Sep 1, 2018).  Matching coded for Ex 18.3(a) (Barbara syllogism, singular form).

* **Version 2.8.3** (released Sep 1, 2018).  Matching coded for Ex 18.1 (renaming universal bound variable).  Code added to ensure legacy solved exercises still load all relevant laws.  Added an existential counterpart to Ex 18.1, Ex 22.6(c).

* **Version 2.8.2** (released Aug 31, 2018).  New records for 22.3(b), 22.5(ab), 22.8.

* **Version 2.8.1** (released Aug 30, 2018).  New records for 22.4(cd).  "Unsolve exercise" button added to reset the solved status of an exercise (can be useful for legacy exercises which have been altered by version changes).

* **Version 2.8** (released Aug 30, 2018).  Proxy matching implemented for several more exercises (including all of the syllogism ones).  This feature may not be completely bug-free.

* **Version 2.7.6** (released Aug 30, 2018).  Proxy matching templates for laws implemented, allowing in particular for matching for laws 22.2 and 22.6(a).  More to follow shortly.

* **Version 2.7.5** (released Aug 30, 2018).  Exercises now loaded from an array, section by section.

* **Version 2.7.4** (released Aug 30, 2018).  Made explicit the exercises for which matching is not currently implemented.

* **Version 2.7.3** (released Aug 30, 2018).  New records for Exercise 9.5(c), 12.4(a), 22.4(abe), 24.7.  Exercise 1.1 changed to something more useful and less cluttering; text for first few exercises adjusted accordingly.

* **Version 2.7.2** (released Aug 29, 2018).  Change the Exercise constructor
  to require a Law object.

* **Version 2.7.1** (released Aug 29, 2018).  Remove support for passing a
  non-empty string lawName to the Exercise constructor.

* **Version 2.7** (released Aug 29, 2018).  Several new helper exercises added to Sections 8-12.  (Note that due to exercise renumbering, some exercises may need to be reproven.)

* **Version 2.6.3** (released Aug 29, 2018).  Ability to delete sentences and environments added.

* **Version 2.6.2** (released Aug 29, 2018).  Duplicate sentences or terms are no longer produced in windows by deduction rules.

* **Version 2.6.1** (released Aug 29, 2018).  "Previous exercise" and "Next exercise" buttons added, together with "<" and ">" hotkeys.

* **Version 2.6** (released Aug 29, 2018).  Split Predicates and Operators window into two.  Fixed a bug with naming of law clones.  Reversed order of notifications window, which is now renamed to "Event log" window; availability notifications arising from loading from localStorage is now disabled.  Fixed missing ExistentialInstantiation law unlocks in Ex 19.1.

* **Version 2.5.13** (released Aug 29, 2018).  Refactored laws to be partially drawn from HTML rather than javascript.  Alternate form of FALSE law added (triggering on the FALSE formula rather than NOT FALSE)

* **Version 2.5.12** (released Aug 29, 2018).  Fix the unlocking of
  Reflexivity and Indiscernability
  ([PR #16](https://github.com/teorth/QED/pull/16)).

* **Version 2.5.11** (released Aug 29, 2018).  Add `data-reveals` attribute
  to HTML exercise elements.

* **Version 2.5.10** (released Aug 29, 2018).  Make exercise 11.1 unlock
  "NOT" again ([issue #14](https://github.com/teorth/QED/issues/14)).

* **Version 2.5.9** (released Aug 28, 2018).  Spaces in HTML element id's changed to hyphens.  Ids and display names decoupled in reveal() function.

* **Version 2.5.8** (released Aug 28, 2018).  Exercise text window initially hidden to prevent "flicker" effect on startup.  Exercise 1.1 completion message recoded to activate whenever an exercise is solved for the first time.

* **Version 2.5.7** (released Aug 28, 2018).  Law unlock information now stored in HTML rather than in javascript.  Some redundant variable names now removed.

* **Version 2.5.6** (released Aug 28, 2018).  Spaces and other special characters removed from law short names.  (This may cause some disruptions to any laws unlocked between 2.5.3 and 2.5.6.)

* **Version 2.5.5** (released Aug 28, 2018).  Edit state popup window replaced by a custom window in order to evade text length restrictions in Chrome popup windows.

* **Version 2.5.4** (released Aug 27, 2018).  Exercise names are now stored in HTML rather than as javascript strings.

* **Version 2.5.3** (released Aug 27, 2018).  Laws now have a short name which is used in local storage (and in future, for lookup in HTML).

* **Version 2.5.2** (released Aug 27, 2018).  Typos in text for Exercises 24.1(a) and 24.6 corrected (thanks to Antoine Deleforge for pointing them out).

* **Version 2.5.1** (released Aug 27, 2018).  Computed best known proof lengths automatically from stored proof, rather than manual entry.

* **Version 2.5** (released Aug 27, 2018).  Added an "EDIT STATE" button to permit save/restore of states, and to transfer states from legacy versions of the text.

* **Version 2.4.8** (released Aug 27, 2018).  Change `"unlockedby"` to
  `"data-unlocked-by"`.

* **Version 2.4.7** (released Aug 26, 2018).  Add initial support for an
`"unlockedby"` attribute of the exercise HTML elements.

* **Version 2.4.6** (released Aug 26, 2018).  Migrated notes and proof to HTML format.

* **Version 2.4.5** (released Aug 26, 2018).  Fixed typo in Exercise 24.1 notes.  Removed alpha release statement in Exercise 14.1.

* **Version 2.4.4** (released Aug 26, 2018).  Moved remaining JS files
  `logic.js` and `gui.js` to `js` folder.

* **Version 2.4.3** (released Aug 26, 2018).  Error in Exercise 24.3 corrected.

* **Version 2.4.2** (released Aug 26, 2018).  Noscript added to HTML file.

* **Version 2.4.1** (released Aug 26, 2018). Move the remaining JS inside
  `index.html` into a separate file `js/main.js`.

* **Version 2.4** (released Aug 25, 2018). Change the main page from
  `QED.html` to `index.html` so the URL can be the simpler
  [https://teorth.github.io/QED/](https://teorth.github.io/QED/)
  ([issue #4](https://github.com/teorth/QED/issues/4)).

* **Version 2.3.3** (released Aug 25, 2018). Move CSS to `main.css`.

* **Version 2.3.2** (released Aug 25, 2018).  New record for Exercise 24.7.

* **Version 2.3.1** (released Aug 25, 2018). Moved version history to
  `HISTORY.md` in the GitHub repo.

* **Version 2.3** (released Aug 24, 2018). Two more challenging exercises
  added (24.6, inverse is an involution; and 24.7, irrational to irrational
  can be rational). Subtitle of Exercise 24.1(a) fixed.

* **Version 2.2.2** (released Aug 24, 2018). Several records shortened using
  double pull.

* **Version 2.2.1** (released Aug 24, 2018). New record for Exercise 24.4.

* **Version 2.2** (released Aug 24, 2018). New exercise (24.5, product of
  invertibles; also another helper push exercise). Bug with locating next
  available free and bound variables (inadvertently introduced in 2.1) now
  fixed.

* **Version 2.1.5** (released Aug 24, 2018). New exercise (24.4,
  cancellation law; also two helper push exercises).

* **Version 2.1.4** (released Aug 24, 2018). New record for Exercise 22.8.

* **Version 2.1.3** (released Aug 23, 2018). New records for Exercises 22.8,
  23.2. Attribution restored for Exercise 22.4(e). Typo in root environment
  fixed (thanks to Yahya Abdal-Aziz for reporting this).

* **Version 2.1.2** (released Aug 23, 2018). Further bugfix with circularity
  detection. New record for 9.2(a).

* **Version 2.1.1** (released Aug 23, 2018). Some quotes added to text; new
  exercise (IFF is reflexive, Exercise 10.2(c))

* **Version 2.1** (released Aug 23, 2018). New exercises (Russell's paradox,
  Exercise 23.2, no largest natural number, Exercise 23.3, and a Lewis
  Carroll logic puzzle, Exercise 22.8) added. Fixed a bug introduced in 2.0.3
  with alternate versions of deduction laws being interpreted as circular.

* **Version 2.0.3** (released Aug 22, 2018). Minified CSS. Some code moved
  from QED.html file to logic.js file (and some moved from logic.js to
  gui.js) to make the latter stand-alone.

* **Version 2.0.2** (released Aug 21, 2018). Code moved to Github, now under
  an MIT license.

* **Version 2.0.1** (released Aug 20, 2018). Meta-key now has same
  functionality as CTRL-key (for Mac users). (Thanks to Jacob H. for the
  suggestion.)

* **Version 2.0** (released Aug 18, 2018). Cleaned up version of Version
  1.17, hopefully stable release.

* **Version 1.17** (released Aug 16, 2018). Alpha version of Section 24,
  introducing the equality relation.

* **Version 1.16.1** (released Aug 15, 2018). New records for 22.4(ae),
  using some additional formulas that were not previously available until the
  predicates and operators window was unlocked. (These formulas have since
  been added to the problem.)

* **Version 1.16** (released Aug 13, 2018). Alpha version of Section 23,
  introducing the predicates and operators window.

* **Version 1.15.5** (released Aug 13, 2018). New record for 22.6(b).
  Spelling corrections.

* **Version 1.15.4** (released Aug 13, 2018). Text for Exercise 22.4(ce) and
  22.5(a) fixed (thanks to Anders Kaseorg for pointing out the issue). Three
  new exercises added to Section 22.

* **Version 1.15.3** (released Aug 12, 2018). New records for Exercises
  22.4(acd), 22.5(c). Text for Exercise 22.4(c) fixed.

* **Version 1.15.2** (released Aug 12, 2018). New records for Exercises
  18.4, 22.2. Further bug in universal specification legality checking
  patched (thanks to Andre Maute for reporting the error), as well as a
  technical bug in the search-and-replace code. UI for pull (arbitrary
  variables) changed.

* **Version 1.15.1** (released Aug 12, 2018). Bug with variable matching
  fixed (thanks to dP dt and Andre Maute for reporting the error). Also
  patched bugs in universal specification and universal introduction (thanks
  to dP dt for reporting the first error).

* **Version 1.15** (released Aug 11, 2018). Alpha version of Section 22,
  introducing the existential introduction law (the first law in which one
  can have multiple deductions from a single choice of inputs for reasons
  other than permutation of the inputs). Several "invisible" changes to data
  structures. Some helper exercises in earlier sections added.

* **Version 1.14.3** (released Aug 9, 2018). Sections and exercises layout
  revamped (thanks to dP dt for the suggestion). Exercises now come with the
  section title as well.

* **Version 1.14.2** (released Aug 9, 2018). Instructions for Exercise 21.1
  corrected (thanks to Andrew Lei for pointing out the error). Link to blog
  post added at bottom of page (thanks to dP dt for the suggestion).

* **Version 1.14.1** (released Aug 9, 2018). More accurate discussion of
  boolean duality in Exercise 12.5(d). New record for Exercise 18.6. Enforced
  a further requirement in the law of universal specification, namely that
  the term one specifies also cannot use free variables that are not
  recognised by the current environment (thanks to Pranjal Vachaspati for
  discovering this issue).</I>

* **Version 1.14** (released Aug 9, 2018). Alpha versions of Sections 20, 21
  added, introducing a "pull" law and also an existence law to rule out empty
  domains of discourse. Section 13 rearranged and expanded, with a new helper
  exercise (13.2(b)) that shortens some subsequent proofs. Enforced an
  important requirement in the law of universal specification, namely that
  the term one specifies to cannot involve bound variables.

* **Version 1.13.1** (released Aug 8, 2018). Text of Exercise 19.1 fixed.
  Double push exercise added in Exercise 15.2. Deductions resulting in
  ill-formed statements will now be displayed but grayed out, rather than
  hidden completely (thanks to Keith Winstein for this suggestion). Layout of
  main windows rearranged.

* **Version 1.13** (released Aug 7, 2018). Alpha version of Section 19
  added, introducing the existential quantifier and the ability to
  instantiate an existential statement using a "setting" environment. Section
  10 reorganised with a new exercise intended to shorten the proofs of
  subsequent exercises proving IFF statements (in particular, several
  exercises in Section 10 onwards (particularly those whose conclusion
  involves IFF) now have shorter proofs). New hotkeys: 'n' for first
  available unsolved exercise, 'N' for last available unsolved exercise. New
  record for 9.5(a). Bug with new free and bound variables in Exercise
  18.2(a) fixed, as well as incorrect text for Exercise 18.4 (thanks to Keith
  Winstein for reporting these bugs).

* **Version 1.12** (released Aug 7, 2018). Alpha version of Section 18
  added, introducing the ability to specialise a universal statement to a
  term. Primitive terms also introduced.

* **Version 1.11** (released Aug 7, 2018). Alpha version of Section 17
  added, introducing the ability to introduce a universal quantifier over a
  bound variables (which is now equipped with a button to generate such
  variables). Some bugs with finding available deductions fixed. Alternate
  push law functionality added in which one can push to an environment not
  yet created by dragging to a formula rather than to the environment. (As a
  consequence, Exercises 7.1 and 7.2 now have shorter proofs.) Bad hyperlink
  (to idempotence) fixed.

* **Version 1.10.1** (released Aug 6, 2018). An exploit involving enabling a
  deduction, undoing the previous deduction, then selecting a (now
  unjustified) deduction has been patched (thanks to Keith Winstein for
  finding the exploit). Some rewording for the Exercise 1.1 text (following
  suggestions by arch1).

* **Version 1.10** (released Aug 5, 2018). Alpha version of Section 16
  added, introducing the ability to introduce free variables from a new Term
  window (which is also equipped with a button to generate new variables).
  Code separated into logic.js, which contains the GUI-independent components
  of the code, and gui.js, which contains the GUI-dependent components (for
  future modularity).

* **Version 1.9** (released Aug 4, 2018). Environments now clickable.
  Hotkeys "u" for immediate undo and "r" for restart. Alpha version of
  Sections 14, 15 added, introducing free variable environments and atomic
  sentences involving predicates and free variables, and a new PUSH law. Some
  bad hyperlinks (reported by Mauricio de Oliveira) repaired. Fixed a bug
  (reported by Matthew Steffen) regarding whether cloned laws qualified for
  non-circular proofs. Some laws taking a target environment as an input now
  have that environment removed in view of the clone functionality.

* **Version 1.8.1** (released Aug 4, 2018). Error in PUSH law (and other
  laws involving a non-root environment) fixed. (Thanks to Andre Maute for
  reporting the bug.)

* **Version 1.8** (released Aug 3, 2018). Restart exercise button added.
  Further "under the hood" changes. Laws with root environment default now
  come with a "clone" with one additional hypothesis that allows one to
  select the root environment.

* **Version 1.7.1** (released Aug 2, 2018). Can now use ctrl-click to select
  items, in particular allowing for more than two items to be selected. The
  numbers 1-9 are now keyboard shortcuts for the first 9 deductions in the
  Available deductions window.

* **Version 1.7** (released Aug 2, 2018). Dragging X to Y now also checks
  for laws available from dragging Y to X. Exercise 1.1 changed (so legacy
  players may artificially have beaten the shortest length now for this
  exercise). Various "under the hood" code changes in preparation for
  extension to first order logic. Various sections of game now collapsed by
  default.

* **Version 1.6.2** (released Aug 1, 2018). New records for Exercises
  9.5(b), 10.1(b), 13.2(a), 13.3(a), 13.3(d). Duplicate unlocking of laws
  prevented. Table of boolean duality added to Exercise 12.5(d). Typo
  corrections.

* **Version 1.6.1** (released July 31, 2018). New records for Exercises
  9.5(a), 13.3(a), 13.3(d).

* **Version 1.6** (released July 31, 2018). New 0-ary operators TRUE and
  FALSE; new exercises (and a new section) added.

* **Version 1.5.3** (released July 31, 2018). Rules appearing in text at or
  after an exercise can still be used, but have an asterisk attached to them
  and no longer trigger records.

* **Version 1.5.2** (released July 30, 2018). New record for Exercise 10.4.

* **Version 1.5.1** (released July 30, 2018). New record for Exercise
  9.3(d). Improved backwards capability (game states from prior versions
  should now be able to re-unlock exercises and laws).

* **Version 1.5** (released July 30, 2018). Completing all exercises allows
  one to reveal the shortest known proofs. Some inaccuracies in the shortest
  known proofs corrected. A bug regarding the interaction between the UNDO
  button and the number of lines of the proof has been fixed.

* **Version 1.4** (released July 30, 2018). Exercises organised by section.
  Solved exercises are now green or blue depending on whether the shortest
  length was achieved. HTML links now open in a new tab so as not to disrupt
  game state. Immediate UNDO button added.

* **Version 1.3.2** (released July 30, 2018). New records for Exercises
  2.2(b), 12.5(c). Clarifications and typo fixes to text.

* **Version 1.3.1** (released July 30, 2018). Implemented the styling
  suggestions of redblobgames.

* **Version 1.3** (released July 30, 2018). Newer record for Exercise
  12.6(a). Bad hyperlink (pointed out by Andrew Lei) fixed. Successful proofs
  can now be expanded and collapsed in the notifications window.

* **Version 1.2.2** (released July 29, 2018). New record for Exercise
  12.6(a). A typo causing exercises to not load beyond 12.2(b) has been
  repaired. (Thanks to William Chargin for pointing out the issue and
  providing a fix.)

* **Version 1.2.1** (released July 29, 2018). New records for Exercises
  7.2, 9.2(a), 12.2(b), 12.2(c), 12.4(b), 12.6(c). Some incorrect proof
  lengths fixed.

* **Version 1.2** (released July 29, 2018). Achievements and notifications
  windows now side-by side. Achievements now list from newest to oldest
  rather than vice versa. "No available deductions" response added. Clicking
  on deductions twice no longer creates duplicates (thanks to ahartel for
  this suggestion). Some clarifications added to text. Best known proof
  lengths added. Exercises 5.1 and 12.1(c) corrected; other minor
  corrections. Some new exercises added.

* **Version 1.1** (released July 29, 2018). Tests if local storage is
  supported. Exercise 7.2 repaired (and all subsequent exercises now
  accessible). All exercise buttons now visible (not just unlocked ones).
  Spelling corrections.

* **Version 1.0** (released July 28, 2018). Beta release.
