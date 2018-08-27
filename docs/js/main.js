createExerciseButtonBox();
createExerciseBox();
createRootEnvironment();
createFormulaWindow();
createDeductionsBox();
createProofBox();
createTermWindow();
createAchievementsBox();
createNotificationsBox();
createOperatorsWindow();
createUndoButton();
createRestartButton();
createResetButton();
createEditStateButton();
document.body.setAttribute("onkeydown", "keydown(event)");


newSection("1", "Conjunction introduction");

var LawConjunction1 = new Law('<A HREF="https://en.wikipedia.org/wiki/Conjunction_introduction" target="_blank">CONJUNCTION INTRODUCTION</A>', [A, B], AND(A,B));
var Exercise11 = new Exercise("1.1", "", [A, B], AND(AND(B,A),B),5);
Exercise11.unlocks(LawConjunction1);
Exercise11.completionMsg = 'Congratulations, you solved your first exercise!  Now two more exercises will be unlocked, as well as the next section of the text.  (For subsequent exercises, we will notify you of an exercise being solved by changing the color of the exercise and its proof to either green or blue, depending on whether you found the shortest known proof or not.  We also add a QED symbol (standing for "quod erat demonstrandum", or "what was to be demonstrated") to the end of the proof.)';
activateExerciseButton(Exercise11);

var Exercise12 = new Exercise("1.2", 'AND IS <A HREF="https://en.wikipedia.org/wiki/Idempotence" target="_blank">IDEMPOTENT</A>', [A], AND(A,A),3);

newSection("2", "Conjunction elimination");

var LawConjunction2 = new Law('<A HREF="https://en.wikipedia.org/wiki/Conjunction_elimination" target="_blank">CONJUNCTION ELIMINATION</A> (left)', [AND(A,B)], A);
var LawConjunction3 = new Law('<A HREF="https://en.wikipedia.org/wiki/Conjunction_elimination" target="_blank">CONJUNCTION ELIMINATION</A> (right)', [AND(A,B)], B);
var Exercise21 = new Exercise("2.1", 'AND IS <A HREF="https://en.wikipedia.org/wiki/Commutative_property" target="_blank">COMMUTATIVE</A>', [AND(A,B)], AND(B,A),5);
Exercise21.unlocks(LawConjunction2);
Exercise21.unlocks(LawConjunction3);

var Exercise22 = new Exercise("2.2(a)", 'AND IS <A HREF="https://en.wikipedia.org/wiki/Associative_property" target="_blank">ASSOCIATIVE</A> (left)', [AND(AND(A,B),C)], AND(A,AND(B,C)),8);

var Exercise22b = new Exercise("2.2(b)", 'AND IS <A HREF="https://en.wikipedia.org/wiki/Associative_property" target="_blank">ASSOCIATIVE</A> (right)', [AND(A,AND(B,C))], AND(AND(A,B),C),7);

newSection("3", "Disjunction introduction");

var LawDisjunction1 = new Law('<A HREF="https://en.wikipedia.org/wiki/Disjunction_introduction" target="_blank">DISJUNCTION INTRODUCTION</A> (left)', [formulaContext(B), A], OR(A,B));
var LawDisjunction2 = new Law('<A HREF="https://en.wikipedia.org/wiki/Disjunction_introduction" target="_blank">DISJUNCTION INTRODUCTION</A> (right)', [formulaContext(B), A], OR(B,A));
var Exercise31 = new Exercise("3.1(a)", "", [A, formulaContext(B), formulaContext(C)], OR(C,OR(A,B)),4);
Exercise31.unlocks(LawDisjunction1);
Exercise31.unlocks(LawDisjunction2);
Exercise31.revealFormulaWindow = true;

var Exercise31b = new Exercise("3.1(b)", 'OR IS <A HREF="https://en.wikipedia.org/wiki/Idempotence" target="_blank">IDEMPOTENT</A> (left)', [A], OR(A,A),3);

newSection("4", "Assumption");

var LawAssumption = new Law('IMPLICATION INTRODUCTION', [formulaContext(A)], assuming(A,A));
var Exercise41 = new Exercise("4.1", "", [formulaContext(A)], assuming(AND(A,A),A),3);
Exercise41.unlocks(LawAssumption);


newSection("5", "Logical connectives");

var formAnd = new Law('AND', [formulaContext(A), formulaContext(B)], formulaContext(AND(A,B)));
var formOr = new Law('OR', [formulaContext(A), formulaContext(B)], formulaContext(OR(A,B)));
var Exercise51 = new Exercise("5.1", "", [formulaContext(A), formulaContext(B), formulaContext(C)], assuming(OR(AND(A,B),C), OR(AND(A,B),C)),2);
Exercise51.unlocks(formAnd);
Exercise51.unlocks(formOr);


var Exercise52 = new Exercise("5.2", "", [formulaContext(A), formulaContext(B)], assuming(assuming(A,A),B),3);


newSection("6", "Deduction theorem");

var formImplies = new Law('IMPLIES', [formulaContext(A), formulaContext(B)], formulaContext(IMPLIES(A,B)));
var LawImplication = new Law('<A HREF="https://en.wikipedia.org/wiki/Deduction_theorem" target="_blank">DEDUCTION THEOREM</A>', [assuming(B,A), rootEnvironmentContext()], IMPLIES(A,B));
var Exercise61 = new Exercise("6.1(a)", 'IMPLIES IS <A HREF=https://en.wikipedia.org/wiki/Idempotence" target="_blank">IDEMPOTENT</A>', [formulaContext(A)], IMPLIES(A,A),3);
Exercise61.unlocks(formImplies);
Exercise61.unlocks(LawImplication);


var Exercise61b = new Exercise("6.1(b)", "", [formulaContext(A), formulaContext(B)], IMPLIES(AND(A,OR(A,B)),A),4);

var Exercise62 = new Exercise("6.2", 'DOUBLE <A HREF="https://en.wikipedia.org/wiki/Deduction_theorem" target="_blank">DEDUCTION THEOREM</A>', [assuming(assuming(C,B),A), rootEnvironmentContext()], IMPLIES(A,IMPLIES(B,C)),4);

newSection("7", "Push");


var Push = new Law('PUSH', [A, environmentContext([B])], assuming(A,B));
var PushAlt = new Law('PUSH (alternate form)', [A, formulaContext(B)], assuming(A,B));
var Exercise71 = new Exercise("7.1", "", [formulaContext(A), formulaContext(B)], IMPLIES(A, IMPLIES(B,A)),4);
Exercise71.unlocks(Push);
Exercise71.unlocks(PushAlt);


var Exercise72 = new Exercise("7.2", "DOUBLE PUSH", [A, environmentContext([B,C])], assuming(assuming(A,C),B),4);

newSection("8", "Modus ponens");

var ModusPonens = new Law('<A HREF="https://en.wikipedia.org/wiki/Modus_ponens" target="_blank">MODUS PONENS</A>', [A, IMPLIES(A,B)], B);
var Exercise81 = new Exercise("8.1(a)", '<A HREF="https://en.wikipedia.org/wiki/Modus_ponens" target="_blank">MODUS PONENS</A> (ASSUMPTION FORM)', [A, assuming(B,A)], B,5);
Exercise81.unlocks(ModusPonens);

var Exercise81b = new Exercise("8.1(b)", 'REVERSE <A HREF="https://en.wikipedia.org/wiki/Deduction_theorem" target="_blank">DEDUCTION THEOREM</A>', [IMPLIES(A,B)], assuming(B,A),5);

var Exercise82 = new Exercise("8.2", 'IMPLIES IS <A HREF="https://en.wikipedia.org/wiki/Transitive_relation" target="_blank">TRANSITIVE</A>', [IMPLIES(A,B), IMPLIES(B,C)], IMPLIES(A,C),7);

var Exercise83 = new Exercise("8.3", "", [formulaContext(A), formulaContext(B)], IMPLIES(AND(A,B),AND(B,A)),4);

var Exercise84 = new Exercise("8.4(a)", "", [IMPLIES(A,IMPLIES(B,C))], IMPLIES(AND(A,B),C),9);


var Exercise84b = new Exercise("8.4(b)", "", [IMPLIES(AND(A,B),C)], IMPLIES(A,IMPLIES(B,C)),9);

var Exercise84c = new Exercise("8.4(c)", "", [IMPLIES(A,IMPLIES(B,C))], IMPLIES(B,IMPLIES(A,C)),6);

var Exercise85 = new Exercise("8.5", '<A HREF="https://en.wikipedia.org/wiki/Absorption_(logic)" target="_blank">ABSORPTION</A>', [IMPLIES(A,B)], IMPLIES(A, AND(A,B)),6);

newSection("9", "Case analysis");

var caseAnalysis = new Law('<A HREF="https://en.wikipedia.org/wiki/Proof_by_exhaustion" target="_blank">CASE ANALYSIS</A>', [assuming(C,A), assuming(C,B)], assuming(C,OR(A,B)),8);
var Exercise91 = new Exercise("9.1(a)", "OR IS COMMUTATIVE", [OR(A,B)], OR(B,A),8);
Exercise91.unlocks(caseAnalysis);

var Exercise91b = new Exercise("9.1(b)", 'OR IS <A HREF="https://en.wikipedia.org/wiki/Idempotence" target="_blank">IDEMPOTENT</A> (right)', [OR(A,A)], A,5);

var Exercise92 = new Exercise("9.2(a)", 'OR IS <A HREF="https://en.wikipedia.org/wiki/Associative_property" target="_blank">ASSOCIATIVE</A> (left)', [OR(OR(A,B),C)], OR(A,OR(B,C)),12);

var Exercise92b = new Exercise("9.2(b)", 'OR IS <A HREF="https://en.wikipedia.org/wiki/Associative_property" target="_blank">ASSOCIATIVE</A> (right)', [OR(A,OR(B,C))], OR(OR(A,B),C),7);

var Exercise93 = new Exercise("9.3(a)", 'OR <A HREF="https://en.wikipedia.org/wiki/Distributive_property" target="_blank">DISTRIBUTES</A> OVER AND (left)', [OR(A, AND(B,C))], AND(OR(A,B), OR(A,C)),14);

var Exercise93b = new Exercise("9.3(b)", 'AND <A HREF="https://en.wikipedia.org/wiki/Distributive_property" target="_blank">DISTRIBUTES</A> OVER OR (left)', [AND(A, OR(B,C))], OR(AND(A,B), AND(A,C)),14);

var Exercise93c = new Exercise("9.3(c)", 'AND <A HREF="https://en.wikipedia.org/wiki/Distributive_property" target="_blank">DISTRIBUTES</A> OVER OR (right)', [OR(AND(A,B), AND(A,C))], AND(A, OR(B,C)) ,14);

var Exercise93d = new Exercise("9.3(d)", 'OR <A HREF="https://en.wikipedia.org/wiki/Distributive_property" target="_blank">DISTRIBUTES</A> OVER AND (right)', [AND(OR(A,B), OR(A,C))], OR(A, AND(B,C)) ,16);

var Exercise94 = new Exercise("9.4(a)", '<A HREF="https://en.wikipedia.org/wiki/Constructive_dilemma" target="_blank">CONSTRUCTIVE DILEMMA</A> (left)', [OR(A,B), IMPLIES(A,C)], OR(C,B),9);

var Exercise94b = new Exercise("9.4(b)", '<A HREF="https://en.wikipedia.org/wiki/Constructive_dilemma" target="_blank">CONSTRUCTIVE DILEMMA</A> (right)', [OR(A,B), IMPLIES(B,C)], OR(A,C),6);

var Exercise94c = new Exercise("9.4(c)", '<A HREF="https://en.wikipedia.org/wiki/Constructive_dilemma" target="_blank">CONSTRUCTIVE DILEMMA</A> (both)', [OR(A,B), IMPLIES(A,C), IMPLIES(B,D)], OR(C,D),6);

var Exercise95 = new Exercise("9.5(a)", '<A HREF="https://en.wikipedia.org/wiki/Monotonic_function" target="_blank">MONOTONICITY</A> OF AND', [formulaContext(C), IMPLIES(A,B)], IMPLIES(AND(A,C), AND(B,C)),6);

var Exercise95b = new Exercise("9.5(b)", '<A HREF="https://en.wikipedia.org/wiki/Monotonic_function" target="_blank">MONOTONICITY</A> OF OR', [formulaContext(C), IMPLIES(A,B)], IMPLIES(OR(A,C), OR(B,C)),6);

newSection("10", "The biconditional");

var formIFF = new Law('IFF', [formulaContext(A), formulaContext(B)], formulaContext(IFF(A,B)));
var BiconditionalIntroduction = new Law('BICONDITIONAL INTRODUCTION', [IMPLIES(A,B), IMPLIES(B,A)], IFF(A,B));
var BiconditionalElimination1 = new Law('BICONDITIONAL ELIMINATION (left)', [IFF(A,B)], IMPLIES(A,B));
var BiconditionalElimination2 = new Law('BICONDITIONAL ELIMINATION (right)', [IFF(A,B)], IMPLIES(B,A));
var Exercise101 = new Exercise("10.1(a)", "SUBSTITUTION", [A, IFF(A,B)], B,5);
Exercise101.unlocks(formIFF);
Exercise101.unlocks(BiconditionalIntroduction);
Exercise101.unlocks(BiconditionalElimination1);
Exercise101.unlocks(BiconditionalElimination2);

var Exercise101b = new Exercise("10.1(b)", "SUBSTITUTION FOR AND (left)", [AND(A,B), IFF(A,C)], AND(C,B),6);

var Exercise101c = new Exercise("10.1(c)", "SUBSTITUTION FOR AND (right)", [AND(A,B), IFF(B,C)], AND(A,C),6);

var Exercise101d = new Exercise("10.1(d)", "SUBSTITUTION FOR OR (left)", [OR(A,B), IFF(A,C)], OR(C,B),5);

var Exercise101e = new Exercise("10.1(e)", "SUBSTITUTION FOR OR (right)", [OR(A,B), IFF(B,C)], OR(A,C),5);

var Exercise101f = new Exercise("10.1(f)", "SUBSTITUTION FOR IMPLIES (left)", [IMPLIES(A,B), IFF(A,C)], IMPLIES(C,B),5);

var Exercise101g = new Exercise("10.1(g)", "SUBSTITUTION FOR IMPLIES (right)", [IMPLIES(A,B), IFF(B,C)], IMPLIES(A,C),5);

var Exercise102 = new Exercise("10.2(a)", 'IFF IS <A HREF="https://en.wikipedia.org/wiki/Symmetric_relation" target="_blank">SYMMETRIC</A>', [IFF(A,B)], IFF(B,A),5);

var Exercise102b = new Exercise("10.2(b)", 'IFF IS <A HREF="https://en.wikipedia.org/wiki/Transitive_relation" target="_blank">TRANSITIVE</A>', [IFF(A,B), IFF(B,C)], IFF(A,C),8);

var Exercise102c = new Exercise("10.2(c)", 'IFF IS <A HREF="https://en.wikipedia.org/wiki/Reflexive_relation" target="_blank">REFLEXIVE</A>', [formulaContext(A)], IFF(A,A), 3);

var Exercise103 = new Exercise("10.3", "BICONDITIONAL INTRODUCTION (ASSUMPTION FORM)", [assuming(A,B), assuming(B,A)], IFF(A,B), 6);

var Exercise104 = new Exercise("10.4", 'OR IS <A HREF="<A HREF="https://en.wikipedia.org/wiki/Idempotence" target="_blank">IDEMPOTENT</A> (biconditional form)', [formulaContext(A)], IFF(A, OR(A,A)),5);

var Exercise105 = new Exercise("10.5", "", [formulaContext(A), formulaContext(B), formulaContext(C)], IFF(AND(AND(A,B),C),AND(A,AND(B,C))),6);

newSection("11", "Disjunctive elimination");

var formNot = new Law('NOT', [formulaContext(A)], formulaContext(NOT(A)));
var caseElimination1 = new Law('<A HREF="https://en.wikipedia.org/wiki/Disjunctive_syllogism" target="_blank">DISJUNCTIVE ELIMINATION</A> (left)', [OR(A,B), NOT(A)], B);
var caseElimination2 = new Law('<A HREF="https://en.wikipedia.org/wiki/Disjunctive_syllogism" target="_blank">DISJUNCTIVE ELIMINATION</A> (right)', [OR(A,B), NOT(B)], A);
var Exercise111 = new Exercise("11.1", '<A HREF="https://en.wikipedia.org/wiki/Principle_of_explosion" target="_blank">EX FALSO QUODLIBET</A>', [AND(A,NOT(A)), formulaContext(B)], B,6);
Exercise111.unlocks(formNot);
Exercise111.unlocks(caseElimination1);
Exercise111.unlocks(caseElimination2);

newSection("12", "Law of excluded middle");

var excludedMiddle = new Law('<A HREF="https://en.wikipedia.org/wiki/Law_of_excluded_middle" target="_blank">EXCLUDED MIDDLE</A>', [formulaContext(A)], OR(A,NOT(A)));
var Exercise121 = new Exercise("12.1(a)", '<A HREF="https://en.wikipedia.org/wiki/Reductio_ad_absurdum" target="_blank">REDUCTIO AD ABSURDUM</A>', [assuming(AND(B,NOT(B)),A)], NOT(A),7);
Exercise121.unlocks(excludedMiddle);

var Exercise121b = new Exercise("12.1(b)", '<A HREF="https://en.wikipedia.org/wiki/Reductio_ad_absurdum" target="_blank">REDUCTIO AD ABSURDUM</A> (separated form)', [assuming(B,A), assuming(NOT(B),A)], NOT(A),5);

var Exercise121c = new Exercise("12.1(c)", '<A HREF="https://en.wikipedia.org/wiki/Law_of_excluded_middle" target="_blank">EXCLUDED MIDDLE</A> (case analysis form)', [assuming(B,A), assuming(B,NOT(A))], B,6);

var Exercise122 = new Exercise("12.2(a)", 'DOUBLE NEGATION (right)', [NOT(NOT(A))], A,4);

var Exercise122b = new Exercise("12.2(b)", 'DOUBLE NEGATION (left)', [A], NOT(NOT(A)),5);

var Exercise122c = new Exercise("12.2(c)", 'DOUBLE NEGATION (both)', [formulaContext(A)], IFF(A,NOT(NOT(A))),6);

var Exercise123 = new Exercise("12.3", 'PROOF BY CONTRADICTION', [assuming(AND(B,NOT(B)),NOT(A))], A,4);

var Exercise124 = new Exercise("12.4(a)", "", [IMPLIES(A,B)], OR( NOT(A), B),5);

var Exercise124b = new Exercise("12.4(b)", "", [OR( NOT(A), B)], IMPLIES(A,B),7);

var Exercise124c = new Exercise("12.4(c)", "", [formulaContext(A), formulaContext(B)], IFF(IMPLIES(A,B), OR( NOT(A), B)),6);

var Exercise125 = new Exercise("12.5(a)", '<A HREF="https://en.wikipedia.org/wiki/De_Morgan%27s_laws" target="_blank">DE MORGAN\'S LAW</A> I', [NOT(OR(A,B))], AND(NOT(A), NOT(B)),11);

var Exercise125b = new Exercise("12.5(b)", '<A HREF="https://en.wikipedia.org/wiki/De_Morgan%27s_laws" target="_blank">DE MORGAN\'S LAW</A> II', [OR(NOT(A), NOT(B))], NOT(AND(A,B)),7);

var Exercise125c = new Exercise("12.5(c)", '<A HREF="https://en.wikipedia.org/wiki/De_Morgan%27s_laws" target="_blank">DE MORGAN\'S LAW</A> III', [NOT(AND(A,B))], OR(NOT(A), NOT(B)),10);

var Exercise125d = new Exercise("12.5(d)", '<A HREF="https://en.wikipedia.org/wiki/De_Morgan%27s_laws" target="_blank">DE MORGAN\'S LAW</A> IV', [AND(NOT(A), NOT(B))], NOT(OR(A,B)),8);

var Exercise126 = new Exercise("12.6(a)", '<A HREF="https://en.wikipedia.org/wiki/Contraposition" target="_blank">CONTRAPOSITION</A>', [IMPLIES(A,B)], IMPLIES(NOT(B),NOT(A)),7);

var Exercise126b = new Exercise("12.6(b)", '<A HREF="https://en.wikipedia.org/wiki/Modus_tollens" target="_blank">MODUS TOLLENS</A>', [IMPLIES(A,B), NOT(B)], NOT(A),5);

var Exercise126c = new Exercise("12.6(c)", "SUBSTITUTION FOR NOT", [NOT(A), IFF(A,B)], NOT(B),5);

var Exercise127 = new Exercise("12.7", '<A HREF="https://en.wikipedia.org/wiki/Peirce%27s_law" target="_blank">PEIRCE\'S LAW</A>', [IMPLIES(IMPLIES(A,B),A)], A,9);

var Exercise128 = new Exercise("12.8", '<A HREF="https://en.wikipedia.org/wiki/Resolution_(logic)" target="_blank">RESOLUTION</A>', [OR(A,B), OR(NOT(A),C)], OR(C,B), 5);

newSection("13", "True and false");

var trueLaw = new Law("TRUE", [formulaContext(TRUE())], TRUE());
var falseLaw = new Law("NOT FALSE", [formulaContext(NOT(FALSE()))], NOT(FALSE()));
var Exercise131 = new Exercise("13.1(a)", "TRUE IS IDENTITY FOR AND", [formulaContext(A)], IFF(A,AND(TRUE(),A)),7);
Exercise131.unlocks(trueLaw);
Exercise131.unlocks(falseLaw);
Exercise131.revealTrueFalse = true;

var Exercise131b = new Exercise("13.1(b)", "FALSE IS IDENTITY FOR OR", [formulaContext(A)], IFF(A,OR(FALSE(),A)),7);

var Exercise132 = new Exercise("13.2(a)", "FALSE ANNULS AND", [formulaContext(A)], NOT(AND(FALSE(),A)),4);

var Exercise132b = new Exercise("13.2(b)", "TRUE ANNULS OR", [formulaContext(A)], OR(TRUE(),A),3);

var Exercise133 = new Exercise("13.3(a)", "EX FALSO QUODLIBET (boolean version)", [formulaContext(A)], IMPLIES(FALSE(),A),4);

var Exercise133b = new Exercise("13.3(b)", "", [formulaContext(A)], IMPLIES(A,TRUE()),4);

var Exercise133c = new Exercise("13.3(c)", "", [formulaContext(A)], IFF(A, IMPLIES(TRUE(),A)),7);

var Exercise133d = new Exercise("13.3(d)", "", [formulaContext(A)], IFF(NOT(A), IMPLIES(A,FALSE())),8);

newSection("14", "Free variables");


var Exercise141 = new Exercise("14.1", "", [assuming(Px,x)], assuming(IMPLIES(Qx,AND(Px,Qx)),x), 6);

newSection("15", "Push (for free variables)");

var PushVar = new Law("PUSH (for free variables)", [A, x], assuming(A, x));
var Exercise151 = new Exercise("15.1", "", [assuming(Px,x), assuming(assuming(Qxy,y),x)], assuming(assuming(AND(Px,Qxy),y),x), 5);
Exercise151.unlocks(PushVar);

var Exercise152 = new Exercise("15.2(a)", "DOUBLE PUSH (for free variables)", [A, environmentContext([x,y])], assuming(assuming(A,y),x),5);

var Exercise152b = new Exercise("15.2(b)", "DOUBLE PUSH (mixed version I)", [A, environmentContext([B,x])], assuming(assuming(A,x),B),5);

var Exercise152c = new Exercise("15.2(c)", "DOUBLE PUSH (mixed version II)", [A, environmentContext([x,B])], assuming(assuming(A,B),x),5);

newSection("16", "Free variable introduction");

var freeLaw = new Law("FREE VARIABLE INTRODUCTION", [toTerm(x)], x);
var Exercise161 = new Exercise("16.1", "", [formulaContext(Qxy)], assuming(assuming(OR(Qxy, NOT(Qxy)),y),x), 4);
Exercise161.unlocks(freeLaw);
Exercise161.revealTermWindow = true;

newSection("17", "Universal quantification");

var forAllLaw = new Law("FOR ALL", [formulaContext(A), toTerm(X)], formulaContext(forAll(A,X)));
var Exercise171 = new Exercise("17.1", "", [formulaContext(Px)], forAll(IMPLIES(PX,PX),X), 4);
Exercise171.unlocks(forAllLaw);
Exercise171.unlocks(universalIntroduction);
Exercise171.unlocks(universalIntroduction2);
Exercise171.revealBoundButton = true;

var Exercise172 = new Exercise("17.2", "", [formulaContext(QXY)], IMPLIES(forAll(forAll(QXY,Y),X),forAll(forAll(QXY,Y),X)), 2);

newSection("18", "Universal specification");


var Exercise181 = new Exercise("18.1", "RENAMING BOUND VARIABLE (universal)", [forAll(PX,X)], forAll(PY,Y), 6);
Exercise181.unlocks(universalSpecification);

var Exercise182 = new Exercise("18.2(a)", "", [A, toTerm(X)], forAll(A,X), 5);

var Exercise182b = new Exercise("18.2(b)", universalSpecification2, null, null, 5);

var Exercise183 = new Exercise("18.3(a)", "BARBARA SYLLOGISM (singular form)", [forAll(IMPLIES(PX,QX),X), Pa], Qa, 5);

var Exercise183b = new Exercise("18.3(b)", "BARBARA SYLLOGISM (classical form)", [forAll(IMPLIES(PX,QX),X), forAll(IMPLIES(RX,PX),X)], forAll(IMPLIES(RX,QX),X), 7);

var Exercise184 = new Exercise("18.4", 'FOR ALL IS <A HREF="https://en.wikipedia.org/wiki/Commutative_property" target="_blank">COMMUTATIVE</A>', [forAll(forAll(QXY,Y),X)], forAll(forAll(QXY,X),Y), 8);

var Exercise185 = new Exercise("18.5", "AND COMMUTES WITH FOR ALL", [formulaContext(PX), formulaContext(QX)], IFF( forAll( AND(PX,QX), X ), AND(forAll(PX,X), forAll(QX,X))), 16);

var Exercise186 = new Exercise("18.6", "IMPLIES COMMUTES WITH FOR ALL", [formulaContext(A), formulaContext(PX)], IFF( IMPLIES(A, forAll( PX, X )), forAll(IMPLIES(A,PX),X)), 17);


newSection("19", "Existential quantification");

var thereExistsLaw = new Law("THERE EXISTS", [formulaContext(A), toTerm(X)], formulaContext(thereExists(A,X)));
var PushSet = new Law("PUSH (for set variables)", [A, settingAssumption(B,x)], assuming(A, settingAssumption(B,x)));

var Exercise191 = new Exercise("19.1", "", [thereExists(PX,X), forAll(QX,X)], assuming(AND(Px,Qx), settingAssumption(Px,x)), 7);
Exercise191.unlocks(thereExistsLaw);
Exercise191.unlocks(existentialInstantiation);
Exercise191.unlocks(existentialInstantiation2);
Exercise191.unlocks(PushSet);

var Exercise192 = new Exercise("19.2(a)", "DOUBLE PUSH (mixed III)", [A, environmentContext([B, settingAssumption(C,x)])], assuming(assuming(A,settingAssumption(C,x)),B), 5);

var Exercise192b = new Exercise("19.2(b)", "DOUBLE PUSH (mixed IV)", [A, environmentContext([settingAssumption(C,x), B])], assuming(assuming(A,B),settingAssumption(C,x)), 5);

var Exercise192c = new Exercise("19.2(c)", "DOUBLE PUSH (mixed V)", [A, environmentContext([settingAssumption(C,x), y])], assuming(assuming(A,y),settingAssumption(C,x)), 5);

var Exercise192d = new Exercise("19.2(d)", "DOUBLE PUSH (mixed VI)", [A, environmentContext([y,settingAssumption(C,x)])], assuming(assuming(A,settingAssumption(C,x)),y), 5);

var Exercise192e = new Exercise("19.2(e)", "DOUBLE PUSH (for set variables)", [A, environmentContext([settingAssumption(B,y),settingAssumption(C,x)])], assuming(assuming(A,settingAssumption(C,x)),settingAssumption(B,y)), 5);

newSection("20", "Pull");

var Pull = new Law("PULL", [assuming(A, settingAssumption(B,x))], A);
var Pull2 = new Law("PULL", [assuming(A, settingAssumption(B,x)),rootEnvironmentContext()], A);

var Exercise201 = new Exercise("20.1", "PULL (existential form)", [thereExists(A,X)], A, 4);

Exercise201.unlocks(Pull);
Exercise201.unlocks(Pull2);

Exercise202 = new Exercise("20.2", "DOUBLE PULL", [assuming(assuming(A, settingAssumption(B,x)),settingAssumption(C,y)),rootEnvironmentContext()], A, 4);

newSection("21", "Existence");

var Existence = new Law("EXISTENCE", [TRUE(), X], thereExists(TRUE(),X));
var Existence2 = new Law("EXISTENCE", [formulaContext(TRUE()), X], thereExists(TRUE(),X));

var Exercise211 = new Exercise("21.1", "PULL (for arbitrary variables)", [assuming(A, x), rootEnvironmentContext()], A, 8);
Exercise211.unlocks(Existence);
Exercise211.unlocks(Existence2);

newSection("22", "Existential introduction");

var Exercise221 = new Exercise("22.1", "", [Qaa], thereExists(AND(QaX,QXa),X), 4);
Exercise221.unlocks(existentialIntroduction);
Exercise221.unlocks(existentialIntroduction2);

var Exercise222 = new Exercise("22.2", "FOR ALL IMPLIES THERE EXISTS", [forAll(PX,X)], thereExists(PX,X), 5);

var Exercise223 = new Exercise("22.3(a)", "DE MORGAN'S LAW FOR QUANTIFIERS I", [formulaContext(PX), formulaContext(Px), X], IFF( NOT(thereExists(PX, X)), forAll(NOT(PX),X)), 18);

var Exercise223b = new Exercise("22.3(b)", "DE MORGAN'S LAW FOR QUANTIFIERS II", [formulaContext(PX), formulaContext(Px), X], IFF( NOT(forAll(PX, X)), thereExists(NOT(PX),X)), 21);

var Exercise224 = new Exercise("22.4(a)", "CELARENT SYLLOGISM", [NOT(thereExists(AND(PX,QX),X)), forAll(IMPLIES(RX,PX),X), formulaContext(Px), formulaContext(Qx), formulaContext(Rx)], NOT(thereExists(AND(RX,QX),X)), 13);

var Exercise224b = new Exercise("22.4(b)", "DARII SYLLOGISM", [forAll(IMPLIES(PX,QX),X), thereExists(AND(RX,PX),X)], thereExists(AND(RX,QX),X), 12);Exercise224b.unlockedBy(Exercise221);

var Exercise224c = new Exercise("22.4(c)", "FERIOQUE SYLLOGISM", [NOT(thereExists(AND(PX,QX),X)), thereExists(AND(RX,PX),X), formulaContext(Px), formulaContext(Qx), formulaContext(Rx)], thereExists(AND(RX,NOT(QX)),X), 15);

var Exercise224d = new Exercise("22.4(d)", "BAROCO SYLLOGISM", [forAll(IMPLIES(PX,QX), X), thereExists(AND(RX,NOT(QX)),X)], thereExists(AND(RX,NOT(PX)),X), 12);

var Exercise224e = new Exercise("22.4(e)", "BOCARDO SYLLOGISM", [thereExists(AND(PX, NOT(QX)), X), forAll(IMPLIES(PX,RX), X), formulaContext(Px), formulaContext(Qx), formulaContext(Rx)], thereExists(AND(RX,NOT(QX)),X), 10);

var Exercise225 = new Exercise("22.5(a)", "BARBARI SYLLOGISM", [forAll(IMPLIES(PX,QX), X), forAll(IMPLIES(QX,RX),X), thereExists(PX, X)], thereExists(AND(PX,RX),X), 14);

var Exercise225b = new Exercise("22.5(b)", "CELARONT SYLLOGISM", [NOT(thereExists(AND(PX,QX),X)), forAll(IMPLIES(RX,PX),X), thereExists(RX, X), formulaContext(Px), formulaContext(Qx), formulaContext(Rx)], thereExists(AND(RX,NOT(QX)),X), 17);

var Exercise225c = new Exercise("22.5(c)", "CAMESTROS SYLLOGISM", [forAll(IMPLIES(PX,QX),X), NOT(thereExists(AND(RX,QX),X)), thereExists(RX,X), formulaContext(Px), formulaContext(Qx), formulaContext(Rx)], thereExists(AND(RX,NOT(PX)),X), 16);

var Exercise225d = new Exercise("22.5(d)", "FELAPTON SYLLOGISM", [NOT(thereExists(AND(PX,QX),X)), forAll(IMPLIES(PX,RX),X), thereExists(PX,X), formulaContext(Px), formulaContext(Qx), formulaContext(Rx)], thereExists(AND(RX, NOT(QX)),X), 17);

var Exercise225e = new Exercise("22.5(e)", "DARAPTI SYLLOGISM", [forAll(IMPLIES(PX,QX),X), forAll(IMPLIES(PX,RX),X), thereExists(PX,X)], thereExists(AND(RX, QX),X), 14);

var Exercise226 = new Exercise("22.6(a)", "THERE EXISTS IS COMMUTATIVE", [thereExists(thereExists(QXY,X),Y)], thereExists(thereExists(QXY,Y),X), 7);

var Exercise226b = new Exercise("22.6(b)", "INTERCHANGING FOR ALL AND THERE EXISTS", [thereExists(forAll(QXY,X),Y)], forAll(thereExists(QXY,Y),X), 7);

var Exercise227 = new Exercise("22.7", "", [formulaContext(Px), formulaContext(Qy)], IFF( AND(thereExists(PX,X), thereExists(QY,Y)), thereExists(thereExists(AND(PX,QY),Y),X)), 22);

var Exercise228 = new Exercise("22.8", "LEWIS CARROLL SYLLOGISM", [forAll(IMPLIES(PX,NOT(QX)),X), forAll(IMPLIES(NOT(QX),RX),X), NOT(thereExists(AND(RX,SX),X)), formulaContext(Px), formulaContext(Qx), formulaContext(Rx), formulaContext(Sx)], forAll(IMPLIES(PX, NOT(SX)),X), 15);

newSection("23", "Predicates and operators");

var Exercise231 = new Exercise("23.1(a)", "", [], forAll(forAll(IMPLIES(QXY,QXY),Y),X), 6);
Exercise231.revealOperatorsWindow = true;

var Exercise231b = new Exercise("23.1(b)", "", [], forAll(forAll(IMPLIES(gtXY,gtXY),Y),X), 6);

var Exercise231c = new Exercise("23.1(c)", "", [], forAll(forAll(IMPLIES(PXplusY,PXplusY),Y),X), 6);

var Exercise232 = new Exercise("23.2", '<A HREF="https://en.wikipedia.org/wiki/Russell%27s_paradox" target="_blank">RUSSELL\'S PARADOX</A>', [thereExists(forAll(IFF(YinX,NOT(YinY)),Y),X)], NOT(TRUE()),11);

var Exercise233 = new Exercise("23.3", 'NO LARGEST NATURAL NUMBER', [forAll(NOT(XgteX1),X)], NOT(thereExists(forAll(XgteY,Y),X)),11);

newSection("24", "Equality");

var reflexivity = new Law('EQUALITY IS <A HREF="https://en.wikipedia.org/wiki/Reflexive_relation" target="_blank">REFLEXIVE</A>', [alpha], equals(alpha,alpha));
var Exercise241 = new Exercise("24.1(a)", 'EQUALITY IS <A HREF="https://en.wikipedia.org/wiki/Symmetric_relation" target="_blank">SYMMETRIC</A>', [equals(alpha,beta)], equals(beta,alpha), 4);
Exercise241.unlocks(reflexivity);
Exercise241.unlocks(indiscernability);

var Exercise241b = new Exercise("24.1(b)", 'EQUALITY IS <A HREF="https://en.wikipedia.org/wiki/Transitive_relation" target="_blank">TRANSITIVE</A>', [equals(alpha,beta), equals(beta,gamma)], equals(alpha,gamma), 4);

var Exercise242 = new Exercise("24.2", 'SUBSTITUTION', [equals(alpha,beta)], equals(fa,fb), 4);

var Exercise243 = new Exercise("24.3", 'LEFT IDENTITY EQUALS RIGHT IDENTITY', [forAll(equals(multiply(alpha,X),X),X), forAll(equals(multiply(X,beta),X),X)], equals(alpha,beta), 6);

var Exercise244 = new Exercise("24.4", '<A HREF="https://en.wikipedia.org/wiki/Cancellation_property" target="_blank">CANCELLATION LAW</A>', [forAll(equals(multiply(one,X),X),X), forAll(forAll(forAll(equals(multiply(X,multiply(Y,Z)),multiply(multiply(X,Y),Z)), Z), Y), X), forAll(thereExists(equals(multiply(Y,X),one),Y),X), equals(multiply(alpha,beta),multiply(alpha,gamma))], equals(beta,gamma), 21);

var Exercise245 = new Exercise("24.5", 'PRODUCT OF INVERTIBLE ELEMENTS IS INVERTIBLE', [forAll(equals(multiply(one,X),X),X), forAll(forAll(forAll(equals(multiply(X,multiply(Y,Z)),multiply(multiply(X,Y),Z)), Z), Y), X), thereExists(equals(multiply(X,alpha),one),X), thereExists(equals(multiply(X,beta),one),X)], thereExists(equals(multiply(X,multiply(alpha,beta)),one),X), 24);

var Exercise246 = new Exercise("24.6", 'INVERSE IS AN <A HREF="https://en.wikipedia.org/wiki/Involution_(mathematics)" target="_blank">INVOLUTION</A>', [forAll(equals(multiply(one,X),X),X), forAll(equals(multiply(X,one),X),X), forAll(forAll(forAll(equals(multiply(X,multiply(Y,Z)),multiply(multiply(X,Y),Z)), Z), Y), X), forAll(equals(multiply(fX,X),one),X)], forAll(equals(ffX,X),X), 20);

var Exercise247 = new Exercise("24.7", 'IRRATIONAL TO IRRATIONAL CAN BE RATIONAL', [forAll(forAll(forAll(equals(power(power(X,Y),Z), power(X,multiply(Y,Z))),Z),Y),X), forAll(equals(multiply(sqrtX, sqrtX),X),X), forAll(equals(power(sqrtX,two),X),X), predicateSentence(R,[two]), NOT(predicateSentence(R,[sqrt2]))], thereExists(thereExists(AND(AND(NOT(RX),NOT(RY)), predicateSentence(R,[power(X,Y)])), Y), X), 29);

// load notes and proofs for exercises from HTML

exerciseList.forEach( function( exercise ) {
    var div = getElement(exercise.name);
    if (div == null) return;

    var unlockedBy = div.getAttribute("data-unlocked-by");
    if (unlockedBy) {
        var unlocker = exercisesByShortName[unlockedBy];
        exercise.unlockedBy(unlocker);
    }

    var children = div.childNodes;
    var i;

    for (i=0; i < children.length; i++)
    {
        var element = children[i];
        if (element.className == "notes") exercise.notes = element.innerHTML;
        if (element.className == "proof") exercise.proof = element.innerHTML;
    }
});



// this command has to be executed after all laws and exercises defined and all GUI elements are in place
checkForUnlocks();
