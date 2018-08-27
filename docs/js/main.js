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

var LawConjunction1 = new Law("Conjunction introduction", '<A HREF="https://en.wikipedia.org/wiki/Conjunction_introduction" target="_blank">CONJUNCTION INTRODUCTION</A>', [A, B], AND(A,B));
var Exercise11 = new Exercise("1.1", "", [A, B], AND(AND(B,A),B));
Exercise11.unlocks(LawConjunction1);
Exercise11.completionMsg = 'Congratulations, you solved your first exercise!  Now two more exercises will be unlocked, as well as the next section of the text.  (For subsequent exercises, we will notify you of an exercise being solved by changing the color of the exercise and its proof to either green or blue, depending on whether you found the shortest known proof or not.  We also add a QED symbol (standing for "quod erat demonstrandum", or "what was to be demonstrated") to the end of the proof.)';
activateExerciseButton(Exercise11);

new Exercise("1.2", 'AND IS <A HREF="https://en.wikipedia.org/wiki/Idempotence" target="_blank">IDEMPOTENT</A>', [A], AND(A,A));

newSection("2", "Conjunction elimination");

var LawConjunction2 = new Law("Conjunction elimination (left)", '<A HREF="https://en.wikipedia.org/wiki/Conjunction_elimination" target="_blank">CONJUNCTION ELIMINATION</A> (left)', [AND(A,B)], A);
var LawConjunction3 = new Law("Conjunction elimination (right)", '<A HREF="https://en.wikipedia.org/wiki/Conjunction_elimination" target="_blank">CONJUNCTION ELIMINATION</A> (right)', [AND(A,B)], B);
var Exercise21 = new Exercise("2.1", 'AND IS <A HREF="https://en.wikipedia.org/wiki/Commutative_property" target="_blank">COMMUTATIVE</A>', [AND(A,B)], AND(B,A));
Exercise21.unlocks(LawConjunction2);
Exercise21.unlocks(LawConjunction3);

new Exercise("2.2(a)", 'AND IS <A HREF="https://en.wikipedia.org/wiki/Associative_property" target="_blank">ASSOCIATIVE</A> (left)', [AND(AND(A,B),C)], AND(A,AND(B,C)));

new Exercise("2.2(b)", 'AND IS <A HREF="https://en.wikipedia.org/wiki/Associative_property" target="_blank">ASSOCIATIVE</A> (right)', [AND(A,AND(B,C))], AND(AND(A,B),C));

newSection("3", "Disjunction introduction");

var LawDisjunction1 = new Law("Disjunction introduction (left)", '<A HREF="https://en.wikipedia.org/wiki/Disjunction_introduction" target="_blank">DISJUNCTION INTRODUCTION</A> (left)', [formulaContext(B), A], OR(A,B));
var LawDisjunction2 = new Law("Disjunction introduction (right)", '<A HREF="https://en.wikipedia.org/wiki/Disjunction_introduction" target="_blank">DISJUNCTION INTRODUCTION</A> (right)', [formulaContext(B), A], OR(B,A));
var Exercise31 = new Exercise("3.1(a)", "", [A, formulaContext(B), formulaContext(C)], OR(C,OR(A,B)));
Exercise31.unlocks(LawDisjunction1);
Exercise31.unlocks(LawDisjunction2);
Exercise31.revealFormulaWindow = true;

new Exercise("3.1(b)", 'OR IS <A HREF="https://en.wikipedia.org/wiki/Idempotence" target="_blank">IDEMPOTENT</A> (left)', [A], OR(A,A),3);

newSection("4", "Assumption");

var LawAssumption = new Law("Implication introduction", 'IMPLICATION INTRODUCTION', [formulaContext(A)], assuming(A,A));
var Exercise41 = new Exercise("4.1", "", [formulaContext(A)], assuming(AND(A,A),A));
Exercise41.unlocks(LawAssumption);


newSection("5", "Logical connectives");

var formAnd = new Law("And", 'AND', [formulaContext(A), formulaContext(B)], formulaContext(AND(A,B)));
var formOr = new Law("Or", 'OR', [formulaContext(A), formulaContext(B)], formulaContext(OR(A,B)));
var Exercise51 = new Exercise("5.1", "", [formulaContext(A), formulaContext(B), formulaContext(C)], assuming(OR(AND(A,B),C), OR(AND(A,B),C)),2);
Exercise51.unlocks(formAnd);
Exercise51.unlocks(formOr);

new Exercise("5.2", "", [formulaContext(A), formulaContext(B)], assuming(assuming(A,A),B));


newSection("6", "Deduction theorem");

var formImplies = new Law("Implies", 'IMPLIES', [formulaContext(A), formulaContext(B)], formulaContext(IMPLIES(A,B)));
var LawImplication = new Law("Deduction theorem", '<A HREF="https://en.wikipedia.org/wiki/Deduction_theorem" target="_blank">DEDUCTION THEOREM</A>', [assuming(B,A), rootEnvironmentContext()], IMPLIES(A,B));
var Exercise61 = new Exercise("6.1(a)", 'IMPLIES IS <A HREF=https://en.wikipedia.org/wiki/Idempotence" target="_blank">IDEMPOTENT</A>', [formulaContext(A)], IMPLIES(A,A));
Exercise61.unlocks(formImplies);
Exercise61.unlocks(LawImplication);

new Exercise("6.1(b)", "", [formulaContext(A), formulaContext(B)], IMPLIES(AND(A,OR(A,B)),A));

new Exercise("6.2", 'DOUBLE <A HREF="https://en.wikipedia.org/wiki/Deduction_theorem" target="_blank">DEDUCTION THEOREM</A>', [assuming(assuming(C,B),A), rootEnvironmentContext()], IMPLIES(A,IMPLIES(B,C)));

newSection("7", "Push");


var Push = new Law("Push", 'PUSH', [A, environmentContext([B])], assuming(A,B));
var PushAlt = new Law("Push (alt)", 'PUSH (alternate form)', [A, formulaContext(B)], assuming(A,B));
var Exercise71 = new Exercise("7.1", "", [formulaContext(A), formulaContext(B)], IMPLIES(A, IMPLIES(B,A)));
Exercise71.unlocks(Push);
Exercise71.unlocks(PushAlt);

new Exercise("7.2", "DOUBLE PUSH", [A, environmentContext([B,C])], assuming(assuming(A,C),B));

newSection("8", "Modus ponens");

var ModusPonens = new Law("Modus Ponens", '<A HREF="https://en.wikipedia.org/wiki/Modus_ponens" target="_blank">MODUS PONENS</A>', [A, IMPLIES(A,B)], B);
var Exercise81 = new Exercise("8.1(a)", '<A HREF="https://en.wikipedia.org/wiki/Modus_ponens" target="_blank">MODUS PONENS</A> (ASSUMPTION FORM)', [A, assuming(B,A)], B);
Exercise81.unlocks(ModusPonens);

new Exercise("8.1(b)", 'REVERSE <A HREF="https://en.wikipedia.org/wiki/Deduction_theorem" target="_blank">DEDUCTION THEOREM</A>', [IMPLIES(A,B)], assuming(B,A),5);

new Exercise("8.2", 'IMPLIES IS <A HREF="https://en.wikipedia.org/wiki/Transitive_relation" target="_blank">TRANSITIVE</A>', [IMPLIES(A,B), IMPLIES(B,C)], IMPLIES(A,C));

new Exercise("8.3", "", [formulaContext(A), formulaContext(B)], IMPLIES(AND(A,B),AND(B,A)));

new Exercise("8.4(a)", "", [IMPLIES(A,IMPLIES(B,C))], IMPLIES(AND(A,B),C));

new Exercise("8.4(b)", "", [IMPLIES(AND(A,B),C)], IMPLIES(A,IMPLIES(B,C)));

new Exercise("8.4(c)", "", [IMPLIES(A,IMPLIES(B,C))], IMPLIES(B,IMPLIES(A,C)));

new Exercise("8.5", '<A HREF="https://en.wikipedia.org/wiki/Absorption_(logic)" target="_blank">ABSORPTION</A>', [IMPLIES(A,B)], IMPLIES(A, AND(A,B)));

newSection("9", "Case analysis");

var caseAnalysis = new Law("Case analysis", '<A HREF="https://en.wikipedia.org/wiki/Proof_by_exhaustion" target="_blank">CASE ANALYSIS</A>', [assuming(C,A), assuming(C,B)], assuming(C,OR(A,B)));
var Exercise91 = new Exercise("9.1(a)", "OR IS COMMUTATIVE", [OR(A,B)], OR(B,A));
Exercise91.unlocks(caseAnalysis);

new Exercise("9.1(b)", 'OR IS <A HREF="https://en.wikipedia.org/wiki/Idempotence" target="_blank">IDEMPOTENT</A> (right)', [OR(A,A)], A);

new Exercise("9.2(a)", 'OR IS <A HREF="https://en.wikipedia.org/wiki/Associative_property" target="_blank">ASSOCIATIVE</A> (left)', [OR(OR(A,B),C)], OR(A,OR(B,C)));

new Exercise("9.2(b)", 'OR IS <A HREF="https://en.wikipedia.org/wiki/Associative_property" target="_blank">ASSOCIATIVE</A> (right)', [OR(A,OR(B,C))], OR(OR(A,B),C));

new Exercise("9.3(a)", 'OR <A HREF="https://en.wikipedia.org/wiki/Distributive_property" target="_blank">DISTRIBUTES</A> OVER AND (left)', [OR(A, AND(B,C))], AND(OR(A,B), OR(A,C)));

new Exercise("9.3(b)", 'AND <A HREF="https://en.wikipedia.org/wiki/Distributive_property" target="_blank">DISTRIBUTES</A> OVER OR (left)', [AND(A, OR(B,C))], OR(AND(A,B), AND(A,C)));

new Exercise("9.3(c)", 'AND <A HREF="https://en.wikipedia.org/wiki/Distributive_property" target="_blank">DISTRIBUTES</A> OVER OR (right)', [OR(AND(A,B), AND(A,C))], AND(A, OR(B,C)));

new Exercise("9.3(d)", 'OR <A HREF="https://en.wikipedia.org/wiki/Distributive_property" target="_blank">DISTRIBUTES</A> OVER AND (right)', [AND(OR(A,B), OR(A,C))], OR(A, AND(B,C)));

new Exercise("9.4(a)", '<A HREF="https://en.wikipedia.org/wiki/Constructive_dilemma" target="_blank">CONSTRUCTIVE DILEMMA</A> (left)', [OR(A,B), IMPLIES(A,C)], OR(C,B));

new Exercise("9.4(b)", '<A HREF="https://en.wikipedia.org/wiki/Constructive_dilemma" target="_blank">CONSTRUCTIVE DILEMMA</A> (right)', [OR(A,B), IMPLIES(B,C)], OR(A,C));

new Exercise("9.4(c)", '<A HREF="https://en.wikipedia.org/wiki/Constructive_dilemma" target="_blank">CONSTRUCTIVE DILEMMA</A> (both)', [OR(A,B), IMPLIES(A,C), IMPLIES(B,D)], OR(C,D));

new Exercise("9.5(a)", '<A HREF="https://en.wikipedia.org/wiki/Monotonic_function" target="_blank">MONOTONICITY</A> OF AND', [formulaContext(C), IMPLIES(A,B)], IMPLIES(AND(A,C), AND(B,C)));

new Exercise("9.5(b)", '<A HREF="https://en.wikipedia.org/wiki/Monotonic_function" target="_blank">MONOTONICITY</A> OF OR', [formulaContext(C), IMPLIES(A,B)], IMPLIES(OR(A,C), OR(B,C)));

newSection("10", "The biconditional");

var formIFF = new Law("Iff", 'IFF', [formulaContext(A), formulaContext(B)], formulaContext(IFF(A,B)));
var BiconditionalIntroduction = new Law("Biconditional introduction", 'BICONDITIONAL INTRODUCTION', [IMPLIES(A,B), IMPLIES(B,A)], IFF(A,B));
var BiconditionalElimination1 = new Law("Biconditional elimination (left)", 'BICONDITIONAL ELIMINATION (left)', [IFF(A,B)], IMPLIES(A,B));
var BiconditionalElimination2 = new Law("Biconditional elimination (right)", 'BICONDITIONAL ELIMINATION (right)', [IFF(A,B)], IMPLIES(B,A));
var Exercise101 = new Exercise("10.1(a)", "SUBSTITUTION", [A, IFF(A,B)], B);
Exercise101.unlocks(formIFF);
Exercise101.unlocks(BiconditionalIntroduction);
Exercise101.unlocks(BiconditionalElimination1);
Exercise101.unlocks(BiconditionalElimination2);

new Exercise("10.1(b)", "SUBSTITUTION FOR AND (left)", [AND(A,B), IFF(A,C)], AND(C,B));

new Exercise("10.1(c)", "SUBSTITUTION FOR AND (right)", [AND(A,B), IFF(B,C)], AND(A,C));

new Exercise("10.1(d)", "SUBSTITUTION FOR OR (left)", [OR(A,B), IFF(A,C)], OR(C,B));

new Exercise("10.1(e)", "SUBSTITUTION FOR OR (right)", [OR(A,B), IFF(B,C)], OR(A,C));

new Exercise("10.1(f)", "SUBSTITUTION FOR IMPLIES (left)", [IMPLIES(A,B), IFF(A,C)], IMPLIES(C,B));

new Exercise("10.1(g)", "SUBSTITUTION FOR IMPLIES (right)", [IMPLIES(A,B), IFF(B,C)], IMPLIES(A,C));

new Exercise("10.2(a)", 'IFF IS <A HREF="https://en.wikipedia.org/wiki/Symmetric_relation" target="_blank">SYMMETRIC</A>', [IFF(A,B)], IFF(B,A));

new Exercise("10.2(b)", 'IFF IS <A HREF="https://en.wikipedia.org/wiki/Transitive_relation" target="_blank">TRANSITIVE</A>', [IFF(A,B), IFF(B,C)], IFF(A,C));

new Exercise("10.2(c)", 'IFF IS <A HREF="https://en.wikipedia.org/wiki/Reflexive_relation" target="_blank">REFLEXIVE</A>', [formulaContext(A)], IFF(A,A));

new Exercise("10.3", "BICONDITIONAL INTRODUCTION (ASSUMPTION FORM)", [assuming(A,B), assuming(B,A)], IFF(A,B));

new Exercise("10.4", 'OR IS <A HREF="<A HREF="https://en.wikipedia.org/wiki/Idempotence" target="_blank">IDEMPOTENT</A> (biconditional form)', [formulaContext(A)], IFF(A, OR(A,A)));

new Exercise("10.5", "", [formulaContext(A), formulaContext(B), formulaContext(C)], IFF(AND(AND(A,B),C),AND(A,AND(B,C))));

newSection("11", "Disjunctive elimination");

var formNot = new Law("Not", 'NOT', [formulaContext(A)], formulaContext(NOT(A)));
var caseElimination1 = new Law("Disjunctive elimination (left)", '<A HREF="https://en.wikipedia.org/wiki/Disjunctive_syllogism" target="_blank">DISJUNCTIVE ELIMINATION</A> (left)', [OR(A,B), NOT(A)], B);
var caseElimination2 = new Law("Disjunctive elimination (right)", '<A HREF="https://en.wikipedia.org/wiki/Disjunctive_syllogism" target="_blank">DISJUNCTIVE ELIMINATION</A> (right)', [OR(A,B), NOT(B)], A);
var Exercise111 = new Exercise("11.1", '<A HREF="https://en.wikipedia.org/wiki/Principle_of_explosion" target="_blank">EX FALSO QUODLIBET</A>', [AND(A,NOT(A)), formulaContext(B)], B);
Exercise111.unlocks(formNot);
Exercise111.unlocks(caseElimination1);
Exercise111.unlocks(caseElimination2);

newSection("12", "Law of excluded middle");

var excludedMiddle = new Law("Excluded middle", '<A HREF="https://en.wikipedia.org/wiki/Law_of_excluded_middle" target="_blank">EXCLUDED MIDDLE</A>', [formulaContext(A)], OR(A,NOT(A)));
var Exercise121 = new Exercise("12.1(a)", '<A HREF="https://en.wikipedia.org/wiki/Reductio_ad_absurdum" target="_blank">REDUCTIO AD ABSURDUM</A>', [assuming(AND(B,NOT(B)),A)], NOT(A));
Exercise121.unlocks(excludedMiddle);

new Exercise("12.1(b)", '<A HREF="https://en.wikipedia.org/wiki/Reductio_ad_absurdum" target="_blank">REDUCTIO AD ABSURDUM</A> (separated form)', [assuming(B,A), assuming(NOT(B),A)], NOT(A));

new Exercise("12.1(c)", '<A HREF="https://en.wikipedia.org/wiki/Law_of_excluded_middle" target="_blank">EXCLUDED MIDDLE</A> (case analysis form)', [assuming(B,A), assuming(B,NOT(A))], B);

new Exercise("12.2(a)", 'DOUBLE NEGATION (right)', [NOT(NOT(A))], A);

new Exercise("12.2(b)", 'DOUBLE NEGATION (left)', [A], NOT(NOT(A)));

new Exercise("12.2(c)", 'DOUBLE NEGATION (both)', [formulaContext(A)], IFF(A,NOT(NOT(A))));

new Exercise("12.3", 'PROOF BY CONTRADICTION', [assuming(AND(B,NOT(B)),NOT(A))], A);

new Exercise("12.4(a)", "", [IMPLIES(A,B)], OR( NOT(A), B));

new Exercise("12.4(b)", "", [OR( NOT(A), B)], IMPLIES(A,B));

new Exercise("12.4(c)", "", [formulaContext(A), formulaContext(B)], IFF(IMPLIES(A,B), OR( NOT(A), B)));

new Exercise("12.5(a)", '<A HREF="https://en.wikipedia.org/wiki/De_Morgan%27s_laws" target="_blank">DE MORGAN\'S LAW</A> I', [NOT(OR(A,B))], AND(NOT(A), NOT(B)));

new Exercise("12.5(b)", '<A HREF="https://en.wikipedia.org/wiki/De_Morgan%27s_laws" target="_blank">DE MORGAN\'S LAW</A> II', [OR(NOT(A), NOT(B))], NOT(AND(A,B)));

new Exercise("12.5(c)", '<A HREF="https://en.wikipedia.org/wiki/De_Morgan%27s_laws" target="_blank">DE MORGAN\'S LAW</A> III', [NOT(AND(A,B))], OR(NOT(A), NOT(B)));

new Exercise("12.5(d)", '<A HREF="https://en.wikipedia.org/wiki/De_Morgan%27s_laws" target="_blank">DE MORGAN\'S LAW</A> IV', [AND(NOT(A), NOT(B))], NOT(OR(A,B)));

new Exercise("12.6(a)", '<A HREF="https://en.wikipedia.org/wiki/Contraposition" target="_blank">CONTRAPOSITION</A>', [IMPLIES(A,B)], IMPLIES(NOT(B),NOT(A)));

new Exercise("12.6(b)", '<A HREF="https://en.wikipedia.org/wiki/Modus_tollens" target="_blank">MODUS TOLLENS</A>', [IMPLIES(A,B), NOT(B)], NOT(A));

new Exercise("12.6(c)", "SUBSTITUTION FOR NOT", [NOT(A), IFF(A,B)], NOT(B));

new Exercise("12.7", '<A HREF="https://en.wikipedia.org/wiki/Peirce%27s_law" target="_blank">PEIRCE\'S LAW</A>', [IMPLIES(IMPLIES(A,B),A)], A);

new Exercise("12.8", '<A HREF="https://en.wikipedia.org/wiki/Resolution_(logic)" target="_blank">RESOLUTION</A>', [OR(A,B), OR(NOT(A),C)], OR(C,B));

newSection("13", "True and false");

var trueLaw = new Law("True", "TRUE", [formulaContext(TRUE())], TRUE());
var falseLaw = new Law("Not false", "NOT FALSE", [formulaContext(NOT(FALSE()))], NOT(FALSE()));
var Exercise131 = new Exercise("13.1(a)", "TRUE IS IDENTITY FOR AND", [formulaContext(A)], IFF(A,AND(TRUE(),A)),7);
Exercise131.unlocks(trueLaw);
Exercise131.unlocks(falseLaw);
Exercise131.revealTrueFalse = true;

new Exercise("13.1(b)", "FALSE IS IDENTITY FOR OR", [formulaContext(A)], IFF(A,OR(FALSE(),A)));

new Exercise("13.2(a)", "FALSE ANNULS AND", [formulaContext(A)], NOT(AND(FALSE(),A)));

new Exercise("13.2(b)", "TRUE ANNULS OR", [formulaContext(A)], OR(TRUE(),A));

new Exercise("13.3(a)", "EX FALSO QUODLIBET (boolean version)", [formulaContext(A)], IMPLIES(FALSE(),A));

new Exercise("13.3(b)", "", [formulaContext(A)], IMPLIES(A,TRUE()));

new Exercise("13.3(c)", "", [formulaContext(A)], IFF(A, IMPLIES(TRUE(),A)));

new Exercise("13.3(d)", "", [formulaContext(A)], IFF(NOT(A), IMPLIES(A,FALSE())));

newSection("14", "Free variables");


var Exercise141 = new Exercise("14.1", "", [assuming(Px,x)], assuming(IMPLIES(Qx,AND(Px,Qx)),x));

newSection("15", "Push (for free variables)");

var PushVar = new Law("Push (free variables", "PUSH (for free variables)", [A, x], assuming(A, x));
var Exercise151 = new Exercise("15.1", "", [assuming(Px,x), assuming(assuming(Qxy,y),x)], assuming(assuming(AND(Px,Qxy),y),x));
Exercise151.unlocks(PushVar);

new Exercise("15.2(a)", "DOUBLE PUSH (for free variables)", [A, environmentContext([x,y])], assuming(assuming(A,y),x));

new Exercise("15.2(b)", "DOUBLE PUSH (mixed version I)", [A, environmentContext([B,x])], assuming(assuming(A,x),B));

new Exercise("15.2(c)", "DOUBLE PUSH (mixed version II)", [A, environmentContext([x,B])], assuming(assuming(A,B),x));

newSection("16", "Free variable introduction");

var freeLaw = new Law("Free variable introduction", "FREE VARIABLE INTRODUCTION", [toTerm(x)], x);
var Exercise161 = new Exercise("16.1", "", [formulaContext(Qxy)], assuming(assuming(OR(Qxy, NOT(Qxy)),y),x));
Exercise161.unlocks(freeLaw);
Exercise161.revealTermWindow = true;

newSection("17", "Universal quantification");

var forAllLaw = new Law("For all", "FOR ALL", [formulaContext(A), toTerm(X)], formulaContext(forAll(A,X)));
var Exercise171 = new Exercise("17.1", "", [formulaContext(Px)], forAll(IMPLIES(PX,PX),X));
Exercise171.unlocks(forAllLaw);
Exercise171.unlocks(universalIntroduction);
Exercise171.unlocks(universalIntroduction2);
Exercise171.revealBoundButton = true;

new Exercise("17.2", "", [formulaContext(QXY)], IMPLIES(forAll(forAll(QXY,Y),X),forAll(forAll(QXY,Y),X)));

newSection("18", "Universal specification");


var Exercise181 = new Exercise("18.1", "RENAMING BOUND VARIABLE (universal)", [forAll(PX,X)], forAll(PY,Y));
Exercise181.unlocks(universalSpecification);

new Exercise("18.2(a)", "", [A, toTerm(X)], forAll(A,X));

new Exercise("18.2(b)", universalSpecification2, null, null);

new Exercise("18.3(a)", "BARBARA SYLLOGISM (singular form)", [forAll(IMPLIES(PX,QX),X), Pa], Qa);

new Exercise("18.3(b)", "BARBARA SYLLOGISM (classical form)", [forAll(IMPLIES(PX,QX),X), forAll(IMPLIES(RX,PX),X)], forAll(IMPLIES(RX,QX),X));

new Exercise("18.4", 'FOR ALL IS <A HREF="https://en.wikipedia.org/wiki/Commutative_property" target="_blank">COMMUTATIVE</A>', [forAll(forAll(QXY,Y),X)], forAll(forAll(QXY,X),Y));

new Exercise("18.5", "AND COMMUTES WITH FOR ALL", [formulaContext(PX), formulaContext(QX)], IFF( forAll( AND(PX,QX), X ), AND(forAll(PX,X), forAll(QX,X))));

new Exercise("18.6", "IMPLIES COMMUTES WITH FOR ALL", [formulaContext(A), formulaContext(PX)], IFF( IMPLIES(A, forAll( PX, X )), forAll(IMPLIES(A,PX),X)));


newSection("19", "Existential quantification");

var thereExistsLaw = new Law("There exists", "THERE EXISTS", [formulaContext(A), toTerm(X)], formulaContext(thereExists(A,X)));
var PushSet = new Law("Push (set variables)", "PUSH (for set variables)", [A, settingAssumption(B,x)], assuming(A, settingAssumption(B,x)));

var Exercise191 = new Exercise("19.1", "", [thereExists(PX,X), forAll(QX,X)], assuming(AND(Px,Qx), settingAssumption(Px,x)));
Exercise191.unlocks(thereExistsLaw);
Exercise191.unlocks(existentialInstantiation);
Exercise191.unlocks(existentialInstantiation2);
Exercise191.unlocks(PushSet);

new Exercise("19.2(a)", "DOUBLE PUSH (mixed III)", [A, environmentContext([B, settingAssumption(C,x)])], assuming(assuming(A,settingAssumption(C,x)),B));

new Exercise("19.2(b)", "DOUBLE PUSH (mixed IV)", [A, environmentContext([settingAssumption(C,x), B])], assuming(assuming(A,B),settingAssumption(C,x)));

new Exercise("19.2(c)", "DOUBLE PUSH (mixed V)", [A, environmentContext([settingAssumption(C,x), y])], assuming(assuming(A,y),settingAssumption(C,x)));

new Exercise("19.2(d)", "DOUBLE PUSH (mixed VI)", [A, environmentContext([y,settingAssumption(C,x)])], assuming(assuming(A,settingAssumption(C,x)),y));

new Exercise("19.2(e)", "DOUBLE PUSH (for set variables)", [A, environmentContext([settingAssumption(B,y),settingAssumption(C,x)])], assuming(assuming(A,settingAssumption(C,x)),settingAssumption(B,y)));

newSection("20", "Pull");

var Pull = new Law("Pull", "PULL", [assuming(A, settingAssumption(B,x))], A);
var Pull2 = new Law("Pull 2", "PULL", [assuming(A, settingAssumption(B,x)),rootEnvironmentContext()], A);

var Exercise201 = new Exercise("20.1", "PULL (existential form)", [thereExists(A,X)], A);

Exercise201.unlocks(Pull);
Exercise201.unlocks(Pull2);

new Exercise("20.2", "DOUBLE PULL", [assuming(assuming(A, settingAssumption(B,x)),settingAssumption(C,y)),rootEnvironmentContext()], A);

newSection("21", "Existence");

var Existence = new Law("Existence", "EXISTENCE", [TRUE(), X], thereExists(TRUE(),X));
var Existence2 = new Law("Existence 2", "EXISTENCE", [formulaContext(TRUE()), X], thereExists(TRUE(),X));

var Exercise211 = new Exercise("21.1", "PULL (for arbitrary variables)", [assuming(A, x), rootEnvironmentContext()], A);
Exercise211.unlocks(Existence);
Exercise211.unlocks(Existence2);

newSection("22", "Existential introduction");

var Exercise221 = new Exercise("22.1", "", [Qaa], thereExists(AND(QaX,QXa),X));
Exercise221.unlocks(existentialIntroduction);
Exercise221.unlocks(existentialIntroduction2);

new Exercise("22.2", "FOR ALL IMPLIES THERE EXISTS", [forAll(PX,X)], thereExists(PX,X));

new Exercise("22.3(a)", "DE MORGAN'S LAW FOR QUANTIFIERS I", [formulaContext(PX), formulaContext(Px), X], IFF( NOT(thereExists(PX, X)), forAll(NOT(PX),X)));

new Exercise("22.3(b)", "DE MORGAN'S LAW FOR QUANTIFIERS II", [formulaContext(PX), formulaContext(Px), X], IFF( NOT(forAll(PX, X)), thereExists(NOT(PX),X)));

new Exercise("22.4(a)", "CELARENT SYLLOGISM", [NOT(thereExists(AND(PX,QX),X)), forAll(IMPLIES(RX,PX),X), formulaContext(Px), formulaContext(Qx), formulaContext(Rx)], NOT(thereExists(AND(RX,QX),X)));

new Exercise("22.4(b)", "DARII SYLLOGISM", [forAll(IMPLIES(PX,QX),X), thereExists(AND(RX,PX),X)], thereExists(AND(RX,QX),X));

new Exercise("22.4(c)", "FERIOQUE SYLLOGISM", [NOT(thereExists(AND(PX,QX),X)), thereExists(AND(RX,PX),X), formulaContext(Px), formulaContext(Qx), formulaContext(Rx)], thereExists(AND(RX,NOT(QX)),X));

new Exercise("22.4(d)", "BAROCO SYLLOGISM", [forAll(IMPLIES(PX,QX), X), thereExists(AND(RX,NOT(QX)),X)], thereExists(AND(RX,NOT(PX)),X));

new Exercise("22.4(e)", "BOCARDO SYLLOGISM", [thereExists(AND(PX, NOT(QX)), X), forAll(IMPLIES(PX,RX), X), formulaContext(Px), formulaContext(Qx), formulaContext(Rx)], thereExists(AND(RX,NOT(QX)),X));

new Exercise("22.5(a)", "BARBARI SYLLOGISM", [forAll(IMPLIES(PX,QX), X), forAll(IMPLIES(QX,RX),X), thereExists(PX, X)], thereExists(AND(PX,RX),X));

new Exercise("22.5(b)", "CELARONT SYLLOGISM", [NOT(thereExists(AND(PX,QX),X)), forAll(IMPLIES(RX,PX),X), thereExists(RX, X), formulaContext(Px), formulaContext(Qx), formulaContext(Rx)], thereExists(AND(RX,NOT(QX)),X));

new Exercise("22.5(c)", "CAMESTROS SYLLOGISM", [forAll(IMPLIES(PX,QX),X), NOT(thereExists(AND(RX,QX),X)), thereExists(RX,X), formulaContext(Px), formulaContext(Qx), formulaContext(Rx)], thereExists(AND(RX,NOT(PX)),X));

new Exercise("22.5(d)", "FELAPTON SYLLOGISM", [NOT(thereExists(AND(PX,QX),X)), forAll(IMPLIES(PX,RX),X), thereExists(PX,X), formulaContext(Px), formulaContext(Qx), formulaContext(Rx)], thereExists(AND(RX, NOT(QX)),X));

new Exercise("22.5(e)", "DARAPTI SYLLOGISM", [forAll(IMPLIES(PX,QX),X), forAll(IMPLIES(PX,RX),X), thereExists(PX,X)], thereExists(AND(RX, QX),X));

new Exercise("22.6(a)", "THERE EXISTS IS COMMUTATIVE", [thereExists(thereExists(QXY,X),Y)], thereExists(thereExists(QXY,Y),X));

new Exercise("22.6(b)", "INTERCHANGING FOR ALL AND THERE EXISTS", [thereExists(forAll(QXY,X),Y)], forAll(thereExists(QXY,Y),X));

new Exercise("22.7", "", [formulaContext(Px), formulaContext(Qy)], IFF( AND(thereExists(PX,X), thereExists(QY,Y)), thereExists(thereExists(AND(PX,QY),Y),X)));

new Exercise("22.8", "LEWIS CARROLL SYLLOGISM", [forAll(IMPLIES(PX,NOT(QX)),X), forAll(IMPLIES(NOT(QX),RX),X), NOT(thereExists(AND(RX,SX),X)), formulaContext(Px), formulaContext(Qx), formulaContext(Rx), formulaContext(Sx)], forAll(IMPLIES(PX, NOT(SX)),X));

newSection("23", "Predicates and operators");

var Exercise231 = new Exercise("23.1(a)", "", [], forAll(forAll(IMPLIES(QXY,QXY),Y),X));
Exercise231.revealOperatorsWindow = true;

new Exercise("23.1(b)", "", [], forAll(forAll(IMPLIES(gtXY,gtXY),Y),X));

new Exercise("23.1(c)", "", [], forAll(forAll(IMPLIES(PXplusY,PXplusY),Y),X));

new Exercise("23.2", '<A HREF="https://en.wikipedia.org/wiki/Russell%27s_paradox" target="_blank">RUSSELL\'S PARADOX</A>', [thereExists(forAll(IFF(YinX,NOT(YinY)),Y),X)], NOT(TRUE()));

new Exercise("23.3", 'NO LARGEST NATURAL NUMBER', [forAll(NOT(XgteX1),X)], NOT(thereExists(forAll(XgteY,Y),X)));

newSection("24", "Equality");

var reflexivity = new Law("Reflexivity", 'EQUALITY IS <A HREF="https://en.wikipedia.org/wiki/Reflexive_relation" target="_blank">REFLEXIVE</A>', [alpha], equals(alpha,alpha));
var Exercise241 = new Exercise("24.1(a)", 'EQUALITY IS <A HREF="https://en.wikipedia.org/wiki/Symmetric_relation" target="_blank">SYMMETRIC</A>', [equals(alpha,beta)], equals(beta,alpha));
Exercise241.unlocks(reflexivity);
Exercise241.unlocks(indiscernability);

new Exercise("24.1(b)", 'EQUALITY IS <A HREF="https://en.wikipedia.org/wiki/Transitive_relation" target="_blank">TRANSITIVE</A>', [equals(alpha,beta), equals(beta,gamma)], equals(alpha,gamma));

new Exercise("24.2", 'SUBSTITUTION', [equals(alpha,beta)], equals(fa,fb));

new Exercise("24.3", 'LEFT IDENTITY EQUALS RIGHT IDENTITY', [forAll(equals(multiply(alpha,X),X),X), forAll(equals(multiply(X,beta),X),X)], equals(alpha,beta));

new Exercise("24.4", '<A HREF="https://en.wikipedia.org/wiki/Cancellation_property" target="_blank">CANCELLATION LAW</A>', [forAll(equals(multiply(one,X),X),X), forAll(forAll(forAll(equals(multiply(X,multiply(Y,Z)),multiply(multiply(X,Y),Z)), Z), Y), X), forAll(thereExists(equals(multiply(Y,X),one),Y),X), equals(multiply(alpha,beta),multiply(alpha,gamma))], equals(beta,gamma));

new Exercise("24.5", 'PRODUCT OF INVERTIBLE ELEMENTS IS INVERTIBLE', [forAll(equals(multiply(one,X),X),X), forAll(forAll(forAll(equals(multiply(X,multiply(Y,Z)),multiply(multiply(X,Y),Z)), Z), Y), X), thereExists(equals(multiply(X,alpha),one),X), thereExists(equals(multiply(X,beta),one),X)], thereExists(equals(multiply(X,multiply(alpha,beta)),one),X));

new Exercise("24.6", 'INVERSE IS AN <A HREF="https://en.wikipedia.org/wiki/Involution_(mathematics)" target="_blank">INVOLUTION</A>', [forAll(equals(multiply(one,X),X),X), forAll(equals(multiply(X,one),X),X), forAll(forAll(forAll(equals(multiply(X,multiply(Y,Z)),multiply(multiply(X,Y),Z)), Z), Y), X), forAll(equals(multiply(fX,X),one),X)], forAll(equals(ffX,X),X));

new Exercise("24.7", 'IRRATIONAL TO IRRATIONAL CAN BE RATIONAL', [forAll(forAll(forAll(equals(power(power(X,Y),Z), power(X,multiply(Y,Z))),Z),Y),X), forAll(equals(multiply(sqrtX, sqrtX),X),X), forAll(equals(power(sqrtX,two),X),X), predicateSentence(R,[two]), NOT(predicateSentence(R,[sqrt2]))], thereExists(thereExists(AND(AND(NOT(RX),NOT(RY)), predicateSentence(R,[power(X,Y)])), Y), X));

// load notes, proofs, best length, and unlockedBy for exercises from HTML

exerciseList.forEach( function( exercise ) {
    var div = getElement(exercise.name);
    if (div == null) return;

    var unlockedBy = div.getAttribute("data-unlocked-by");
    if (unlockedBy) {
        var unlocker = exercisesByShortName[unlockedBy];
        exercise.unlockedBy(unlocker);
    }

    if (div.getElementsByClassName("notes").length > 0)
        exercise.notes = div.getElementsByClassName("notes")[0].innerHTML;

    if (div.getElementsByClassName("proof").length > 0) {
        var proof = div.getElementsByClassName("proof")[0];
        exercise.proof= proof.innerHTML;
        exercise.bestLength = proof.getElementsByTagName("LI").length;
    }

    colorExerciseButton(exercise.button, false);

});



// this command has to be executed after all laws and exercises defined and all GUI elements are in place
checkForUnlocks();
