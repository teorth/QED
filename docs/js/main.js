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
createPrevExerciseButtons();
createNextExerciseButtons();
createResetButton();
createEditStateButton();
document.body.setAttribute("onkeydown", "keydown(event)");

// A mapping from law shortName to the pair [givens, conclusion].
var lawsData = {
    "LawConjunction1":            [[A, B],                                                              AND(A,B)],
    "LawConjunction2":            [[AND(A,B)],                                                          A],
    "LawConjunction3":            [[AND(A,B)],                                                          B],
    "LawDisjunction1":            [[formulaContext(B), A],                                              OR(A,B)],
    "LawDisjunction2":            [[formulaContext(B), A],                                              OR(B,A)],
    "LawAssumption":              [[formulaContext(A)],                                                 assuming(A,A)],
    "And":                        [[formulaContext(A), formulaContext(B)],                              formulaContext(AND(A,B))],
    "Or":                         [[formulaContext(A), formulaContext(B)],                              formulaContext(OR(A,B))],
    "Implies":                    [[formulaContext(A), formulaContext(B)],                              formulaContext(IMPLIES(A,B))],
    "LawImplication":             [[assuming(B,A), rootEnvironmentContext()],                           IMPLIES(A,B)],
    "Push":                       [[A, environmentContext([B])],                                        assuming(A,B)],
    "PushAlt":                    [[A, formulaContext(B)],                                              assuming(A,B)],
    "ModusPonens":                [[A, IMPLIES(A,B)],                                                   B],
    "CaseAnalysis":               [[assuming(C,A), assuming(C,B)],                                      assuming(C,OR(A,B))],
    "Iff":                        [[formulaContext(A), formulaContext(B)],                              formulaContext(IFF(A,B))],
    "BiconditionalIntroduction":  [[IMPLIES(A,B), IMPLIES(B,A)],                                        IFF(A,B)],
    "BiconditionalElimination1":  [[IFF(A,B)],                                                          IMPLIES(A,B)],
    "BiconditionalElimination2":  [[IFF(A,B)],                                                          IMPLIES(B,A)],
    "Not":                        [[formulaContext(A)],                                                 formulaContext(NOT(A))],
    "caseElimination1":           [[OR(A,B), NOT(A)],                                                   B],
    "caseElimination2":           [[OR(A,B), NOT(B)],                                                   A],
    "ExcludedMiddle":             [[formulaContext(A)],                                                 OR(A,NOT(A))],
    "True":                       [[formulaContext(TRUE())],                                            TRUE()],
    "False":                      [[formulaContext(NOT(FALSE()))],                                      NOT(FALSE())],
    "False2":                     [[formulaContext(FALSE())],                                           NOT(FALSE())],
    "PushVar":                    [[A, x],                                                              assuming(A, x)],
    "free":                       [[toTerm(x)],                                                         x],
    "forAll":                     [[formulaContext(A), toTerm(X)],                                      formulaContext(forAll(A,X))],
    "thereExists":                [[formulaContext(A), toTerm(X)],                                      formulaContext(thereExists(A,X))],
    "PushSet":                    [[A, settingAssumption(B,x)],                                         assuming(A, settingAssumption(B,x))],
    "Pull":                       [[assuming(A, settingAssumption(B,x))],                               A],
    "Pull2":                      [[assuming(A, settingAssumption(B,x)), rootEnvironmentContext()],     A],
    "Existence":                  [[TRUE(), X],                                                         thereExists(TRUE(),X)],
    "Existence2":                 [[formulaContext(TRUE()), X],                                         thereExists(TRUE(),X)],
    "Reflexivity":                [[alpha],                                                             equals(alpha,alpha)],
    "UniversalIntroduction":      [[assuming(Px,x),toTerm(X)],                                          forAll(PX,X)],
    "UniversalIntroduction2":     [[assuming(Px,x), rootEnvironmentContext()],                          forAll(PX,X)],
    "UniversalRenamingBoundVar":  [[forAll(PX,X)],                                                      forAll(PY,Y)],
    "UniversalSpecification":     [[forAll(PX,X), alpha],                                               Pa],
    "UniversalSpecification2":    [[forAll(PX,X), toTerm(x)],                                           assuming(Px,x)],
    "ExistentialInstantiation":   [[thereExists(PX,X), toTerm(x)],                                      assuming(Px, settingAssumption(Px,x))],
    "ExistentialInstantiation2":  [[thereExists(PX,X)],                                                 assuming(Px, settingAssumption(Px,x))],
    "ExistentialIntroduction":    [[Pa, alpha],                                                         thereExists(PX,X)],
    "ExistentialIntroduction2":   [[Pa, alpha, X],                                                      thereExists(PX,X)],
    "Indiscernability":           [[Pa, equals(alpha,beta)],                                            Pb],
};

var lawElements = getElement("lawContainer").children;

for (var i = 0; i < lawElements.length; i++) {
    var div = lawElements[i];
    var id = div.id;
    // An example id is "law-LawConjunction1".
    var shortName = id.split("-", 2)[1];
    var lawName = div.innerHTML;

    var pair = lawsData[shortName];
    if (!pair) {
        throw new Error("law shortName not found: " + shortName);
    }

    var givens = pair[0];
    var conclusion = pair[1];
    new Law(shortName, lawName, givens, conclusion);
}

// A mapping from exercise shortName to the pair [givens, conclusion].
var exerciseData = {
    "1.1": [[A, B, C], AND(AND(A,B),C)],
    "1.2": [[A], AND(A,A)],
    "2.1": [[AND(A,B)], AND(B,A)],
    "2.2(a)": [[AND(AND(A,B),C)], AND(A,AND(B,C))],
    "2.2(b)": [[AND(A,AND(B,C))], AND(AND(A,B),C)],
    "3.1(a)": [[A, formulaContext(B), formulaContext(C)], OR(C,OR(A,B))],
    "3.1(b)": [[A], OR(A,A)],
    "4.1": [[formulaContext(A)], assuming(AND(A,A),A)],
    "5.1": [[formulaContext(A), formulaContext(B), formulaContext(C)], assuming(OR(AND(A,B),C), OR(AND(A,B),C))],
    "5.2": [[formulaContext(A), formulaContext(B)], assuming(assuming(A,A),B)],
    "6.1(a)": [[formulaContext(A)], IMPLIES(A,A)],
    "6.1(b)": [[formulaContext(A), formulaContext(B)], IMPLIES(AND(A,OR(A,B)),A)],
    "6.2": [[assuming(assuming(C,B),A), rootEnvironmentContext()], IMPLIES(A,IMPLIES(B,C))],
    "7.1": [[formulaContext(A), formulaContext(B)], IMPLIES(A, IMPLIES(B,A))],
    "7.2": [[A, environmentContext([B,C])], assuming(assuming(A,C),B)],
    "8.1(a)": [[A, assuming(B,A)], B],
    "8.1(b)": [[IMPLIES(A,B)], assuming(B,A)],
    "8.2": [[IMPLIES(A,B), IMPLIES(B,C)], IMPLIES(A,C)],
    "8.3": [[formulaContext(A), formulaContext(B)], IMPLIES(AND(A,B),AND(B,A))],
    "8.4(a)": [[IMPLIES(A,IMPLIES(B,C))], IMPLIES(AND(A,B),C)],
    "8.4(b)": [[IMPLIES(AND(A,B),C)], IMPLIES(A,IMPLIES(B,C))],
    "8.4(c)": [[IMPLIES(A,IMPLIES(B,C))], IMPLIES(B,IMPLIES(A,C))],
    "8.5(a)": [[IMPLIES(A,B)], IMPLIES(A, AND(A,B))],
    "8.5(b)": [[IMPLIES(A,B)], IMPLIES(A, AND(B,A))],
    "8.6(a)": [[AND(A,B), IMPLIES(A,C)], AND(C,B)],
    "8.6(b)": [[AND(A,B), IMPLIES(B,C)], AND(A,C)],
    "9.1(a)": [[OR(A,B)], OR(B,A)],
    "9.1(b)": [[OR(A,A)], A],
    "9.2(a)": [[OR(OR(A,B),C)], OR(A,OR(B,C))],
    "9.2(b)": [[OR(A,OR(B,C))], OR(OR(A,B),C)],
    "9.3(a)": [[OR(A, AND(B,C))], AND(OR(A,B), OR(A,C))],
    "9.3(b)": [[AND(A, OR(B,C))], OR(AND(A,B), AND(A,C))],
    "9.3(c)": [[OR(AND(A,B), AND(A,C))], AND(A, OR(B,C))],
    "9.3(d)": [[AND(OR(A,B), OR(A,C))], OR(A, AND(B,C))],
    "9.4(a)": [[OR(A,B), IMPLIES(A,C)], OR(C,B)],
    "9.4(b)": [[OR(A,B), IMPLIES(B,C)], OR(A,C)],
    "9.4(c)": [[OR(A,B), IMPLIES(A,C), IMPLIES(B,D)], OR(C,D)],
    "9.5(a)": [[formulaContext(C), IMPLIES(A,B)], IMPLIES(AND(A,C), AND(B,C))],
    "9.5(b)": [[formulaContext(C), IMPLIES(A,B)], IMPLIES(OR(A,C), OR(B,C))],
    "9.5(c)": [[formulaContext(C), IMPLIES(A,B)], IMPLIES(AND(C,A), AND(C,B))],
    "9.5(d)": [[formulaContext(C), IMPLIES(A,B)], IMPLIES(OR(C,A), OR(C,B))],
    "10.1(a)": [[A, IFF(A,B)], B],
    "10.1(b)": [[AND(A,B), IFF(A,C)], AND(C,B)],
    "10.1(c)": [[AND(A,B), IFF(B,C)], AND(A,C)],
    "10.1(d)": [[OR(A,B), IFF(A,C)], OR(C,B)],
    "10.1(e)": [[OR(A,B), IFF(B,C)], OR(A,C)],
    "10.1(f)": [[IMPLIES(A,B), IFF(A,C)], IMPLIES(C,B)],
    "10.1(g)": [[IMPLIES(A,B), IFF(B,C)], IMPLIES(A,C)],
    "10.2(a)": [[IFF(A,B)], IFF(B,A)],
    "10.2(b)": [[IFF(A,B), IFF(B,C)], IFF(A,C)],
    "10.2(c)": [[formulaContext(A)], IFF(A,A)],
    "10.3": [[assuming(A,B), assuming(B,A)], IFF(A,B)],
    "10.4": [[formulaContext(A)], IFF(A, OR(A,A))],
    "10.5": [[formulaContext(A), formulaContext(B), formulaContext(C)], IFF(AND(AND(A,B),C),AND(A,AND(B,C)))],
    "11.1": [[AND(A,NOT(A)), formulaContext(B)], B],
    "11.2": [[AND(NOT(A),A), formulaContext(B)], B],
    "12.1(a)": [[assuming(AND(B,NOT(B)),A)], NOT(A)],
    "12.1(b)": [[assuming(B,A), assuming(NOT(B),A)], NOT(A)],
    "12.1(c)": [[assuming(B,A), assuming(B,NOT(A))], B],
    "12.1(d)": [[formulaContext(A)], OR(NOT(A),A)],
    "12.2(a)": [[NOT(NOT(A))], A],
    "12.2(b)": [[A], NOT(NOT(A))],
    "12.2(c)": [[formulaContext(A)], IFF(A,NOT(NOT(A)))],
    "12.3(a)": [[assuming(AND(B,NOT(B)),NOT(A))], A],
    "12.3(b)": [[assuming(AND(NOT(B),B),NOT(A))], A],
    "12.4(a)": [[IMPLIES(A,B)], OR( NOT(A), B)],
    "12.4(b)": [[OR( NOT(A), B)], IMPLIES(A,B)],
    "12.4(c)": [[formulaContext(A), formulaContext(B)], IFF(IMPLIES(A,B), OR( NOT(A), B))],
    "12.5(a)": [[NOT(OR(A,B))], AND(NOT(A), NOT(B))],
    "12.5(b)": [[OR(NOT(A), NOT(B))], NOT(AND(A,B))],
    "12.5(c)": [[NOT(AND(A,B))], OR(NOT(A), NOT(B))],
    "12.5(d)": [[AND(NOT(A), NOT(B))], NOT(OR(A,B))],
    "12.6(a)": [[IMPLIES(A,B)], IMPLIES(NOT(B),NOT(A))],
    "12.6(b)": [[IMPLIES(A,B), NOT(B)], NOT(A)],
    "12.6(c)": [[NOT(A), IFF(A,B)], NOT(B)],
    "12.7": [[IMPLIES(IMPLIES(A,B),A)], A],
    "12.8": [[OR(A,B), OR(NOT(A),C)], OR(C,B)],
    "13.1(a)": [[formulaContext(A)], IFF(A,AND(TRUE(),A))],
    "13.1(b)": [[formulaContext(A)], IFF(A,OR(FALSE(),A))],
    "13.2(a)": [[formulaContext(A)], NOT(AND(FALSE(),A))],
    "13.2(b)": [[formulaContext(A)], OR(TRUE(),A)],
    "13.3(a)": [[formulaContext(A)], IMPLIES(FALSE(),A)],
    "13.3(b)": [[formulaContext(A)], IMPLIES(A,TRUE())],
    "13.3(c)": [[formulaContext(A)], IFF(A, IMPLIES(TRUE(),A))],
    "13.3(d)": [[formulaContext(A)], IFF(NOT(A), IMPLIES(A,FALSE()))],
    "14.1": [[assuming(Px,x)], assuming(IMPLIES(Qx,AND(Px,Qx)),x)],
    "15.1": [[assuming(Px,x), assuming(assuming(Qxy,y),x)], assuming(assuming(AND(Px,Qxy),y),x)],
    "15.2(a)": [[A, environmentContext([x,y])], assuming(assuming(A,y),x)],
    "15.2(b)": [[A, environmentContext([B,x])], assuming(assuming(A,x),B)],
    "15.2(c)": [[A, environmentContext([x,B])], assuming(assuming(A,B),x)],
    "16.1": [[formulaContext(Qxy)], assuming(assuming(OR(Qxy, NOT(Qxy)),y),x)],
    "17.1": [[formulaContext(Px)], forAll(IMPLIES(PX,PX),X)],
    "17.2": [[formulaContext(QXY)], IMPLIES(forAll(forAll(QXY,Y),X),forAll(forAll(QXY,Y),X))],
    "18.1": ["UniversalRenamingBoundVar"],
    "18.2(a)": [[A, toTerm(X)], forAll(A,X)],
    "18.2(b)": ["UniversalSpecification2"],
    "18.3(a)": [[forAll(IMPLIES(PX,QX),X), Pa], Qa],
    "18.3(b)": [[forAll(IMPLIES(PX,QX),X), forAll(IMPLIES(RX,PX),X)], forAll(IMPLIES(RX,QX),X)],
    "18.4": [[forAll(forAll(QXY,Y),X)], forAll(forAll(QXY,X),Y)],
    "18.5": [[formulaContext(PX), formulaContext(QX)], IFF( forAll( AND(PX,QX), X ), AND(forAll(PX,X), forAll(QX,X)))],
    "18.6": [[formulaContext(A), formulaContext(PX)], IFF( IMPLIES(A, forAll( PX, X )), forAll(IMPLIES(A,PX),X))],
    "19.1": [[thereExists(PX,X), forAll(QX,X)], assuming(AND(Px,Qx), settingAssumption(Px,x))],
    "19.2(a)": [[A, environmentContext([B, settingAssumption(C,x)])], assuming(assuming(A,settingAssumption(C,x)),B)],
    "19.2(b)": [[A, environmentContext([settingAssumption(C,x), B])], assuming(assuming(A,B),settingAssumption(C,x))],
    "19.2(c)": [[A, environmentContext([settingAssumption(C,x), y])], assuming(assuming(A,y),settingAssumption(C,x))],
    "19.2(d)": [[A, environmentContext([y,settingAssumption(C,x)])], assuming(assuming(A,settingAssumption(C,x)),y)],
    "19.2(e)": [[A, environmentContext([settingAssumption(B,y),settingAssumption(C,x)])], assuming(assuming(A,settingAssumption(C,x)),settingAssumption(B,y))],
    "20.1": [[thereExists(A,X)], A],
    "20.2": [[assuming(assuming(A, settingAssumption(B,x)),settingAssumption(C,y)),rootEnvironmentContext()], A],
    "21.1": [[assuming(A, x), rootEnvironmentContext()], A],
    "22.1": [[Qaa], thereExists(AND(QaX,QXa),X)],
    "22.2": [[forAll(PX,X)], thereExists(PX,X)],    
    "22.3(a)": [[formulaContext(PX), formulaContext(Px), X], IFF( NOT(thereExists(PX, X)), forAll(NOT(PX),X))],
    "22.3(b)": [[formulaContext(PX), formulaContext(Px), X], IFF( NOT(forAll(PX, X)), thereExists(NOT(PX),X))],
    "22.4(a)": [[NOT(thereExists(AND(PX,QX),X)), forAll(IMPLIES(RX,PX),X), formulaContext(Px), formulaContext(Qx), formulaContext(Rx)], NOT(thereExists(AND(RX,QX),X))],
    "22.4(b)": [[forAll(IMPLIES(PX,QX),X), thereExists(AND(RX,PX),X)], thereExists(AND(RX,QX),X)],
    "22.4(c)": [[NOT(thereExists(AND(PX,QX),X)), thereExists(AND(RX,PX),X), formulaContext(Px), formulaContext(Qx), formulaContext(Rx)], thereExists(AND(RX,NOT(QX)),X)],
    "22.4(d)": [[forAll(IMPLIES(PX,QX), X), thereExists(AND(RX,NOT(QX)),X)], thereExists(AND(RX,NOT(PX)),X)],
    "22.4(e)": [[thereExists(AND(PX, NOT(QX)), X), forAll(IMPLIES(PX,RX), X), formulaContext(Px), formulaContext(Qx), formulaContext(Rx)], thereExists(AND(RX,NOT(QX)),X)],
    "22.5(a)": [[forAll(IMPLIES(PX,QX), X), forAll(IMPLIES(QX,RX),X), thereExists(PX, X)], thereExists(AND(PX,RX),X)],
    "22.5(b)": [[NOT(thereExists(AND(PX,QX),X)), forAll(IMPLIES(RX,PX),X), thereExists(RX, X), formulaContext(Px), formulaContext(Qx), formulaContext(Rx)], thereExists(AND(RX,NOT(QX)),X)],
    "22.5(c)": [[forAll(IMPLIES(PX,QX),X), NOT(thereExists(AND(RX,QX),X)), thereExists(RX,X), formulaContext(Px), formulaContext(Qx), formulaContext(Rx)], thereExists(AND(RX,NOT(PX)),X)],
    "22.5(d)": [[NOT(thereExists(AND(PX,QX),X)), forAll(IMPLIES(PX,RX),X), thereExists(PX,X), formulaContext(Px), formulaContext(Qx), formulaContext(Rx)], thereExists(AND(RX, NOT(QX)),X)],
    "22.5(e)": [[forAll(IMPLIES(PX,QX),X), forAll(IMPLIES(PX,RX),X), thereExists(PX,X)], thereExists(AND(RX, QX),X)],
    "22.6(a)": [[thereExists(thereExists(QXY,X),Y)], thereExists(thereExists(QXY,Y),X)],
    "22.6(b)": [[thereExists(forAll(QXY,X),Y)], forAll(thereExists(QXY,Y),X)],
    "22.7": [[formulaContext(Px), formulaContext(Qy)], IFF( AND(thereExists(PX,X), thereExists(QY,Y)), thereExists(thereExists(AND(PX,QY),Y),X))],
    "22.8": [[forAll(IMPLIES(PX,NOT(QX)),X), forAll(IMPLIES(NOT(QX),RX),X), NOT(thereExists(AND(RX,SX),X)), formulaContext(Px), formulaContext(Qx), formulaContext(Rx), formulaContext(Sx)], forAll(IMPLIES(PX, NOT(SX)),X)],
    "23.1(a)": [[], forAll(forAll(IMPLIES(QXY,QXY),Y),X)],
    "23.1(b)": [[], forAll(forAll(IMPLIES(gtXY,gtXY),Y),X)],
    "23.1(c)": [[], forAll(forAll(IMPLIES(PXplusY,PXplusY),Y),X)],
    "23.2": [[thereExists(forAll(IFF(YinX,NOT(YinY)),Y),X)], NOT(TRUE())],
    "23.3": [[forAll(NOT(XgteX1),X)], NOT(thereExists(forAll(XgteY,Y),X))],
    "24.1(a)": [[equals(alpha,beta)], equals(beta,alpha)],
    "24.1(b)": [[equals(alpha,beta), equals(beta,gamma)], equals(alpha,gamma)],
    "24.2": [[equals(alpha,beta)], equals(fa,fb)],
    "24.3": [[forAll(equals(multiply(alpha,X),X),X), forAll(equals(multiply(X,beta),X),X)], equals(alpha,beta)],
    "24.4": [[forAll(equals(multiply(one,X),X),X), forAll(forAll(forAll(equals(multiply(X,multiply(Y,Z)),multiply(multiply(X,Y),Z)), Z), Y), X), forAll(thereExists(equals(multiply(Y,X),one),Y),X), equals(multiply(alpha,beta),multiply(alpha,gamma))], equals(beta,gamma)],
    "24.5": [[forAll(equals(multiply(one,X),X),X), forAll(forAll(forAll(equals(multiply(X,multiply(Y,Z)),multiply(multiply(X,Y),Z)), Z), Y), X), thereExists(equals(multiply(X,alpha),one),X), thereExists(equals(multiply(X,beta),one),X)], thereExists(equals(multiply(X,multiply(alpha,beta)),one),X)],
    "24.6": [[forAll(equals(multiply(one,X),X),X), forAll(equals(multiply(X,one),X),X), forAll(forAll(forAll(equals(multiply(X,multiply(Y,Z)),multiply(multiply(X,Y),Z)), Z), Y), X), forAll(equals(multiply(fX,X),one),X)], forAll(equals(ffX,X),X)],
    "24.7": [[forAll(forAll(forAll(equals(power(power(X,Y),Z), power(X,multiply(Y,Z))),Z),Y),X), forAll(equals(multiply(sqrtX, sqrtX),X),X), forAll(equals(power(sqrtX,two),X),X), predicateSentence(R,[two]), NOT(predicateSentence(R,[sqrt2]))], thereExists(thereExists(AND(AND(NOT(RX),NOT(RY)), predicateSentence(R,[power(X,Y)])), Y), X)],        
};

function exerciseFromShortName(shortName) {
    var args = exerciseData[shortName];
    if (!args) {
        throw new Error("exercise shortName not found: " + shortName);
    }
    exerciseFromData(shortName, args);
}

newSection("1", "Conjunction introduction");
newSection("2", "Conjunction elimination");
newSection("3", "Disjunction introduction");
newSection("4", "Assumption");
newSection("5", "Logical connectives");
newSection("6", "Deduction theorem");
newSection("7", "Push");
newSection("8", "Modus ponens");
newSection("9", "Case analysis");
newSection("10", "The biconditional");
newSection("11", "Disjunctive elimination");
newSection("12", "Law of excluded middle");
newSection("13", "True and false");
newSection("14", "Free variables");
newSection("15", "Push (for free variables)");
newSection("16", "Free variable introduction");
newSection("17", "Universal quantification");
newSection("18", "Universal specification");
newSection("19", "Existential quantification");
newSection("20", "Pull");
newSection("21", "Existence");
newSection("22", "Existential introduction");
newSection("23", "Predicates and operators");
newSection("24", "Equality");

// load notes, proofs, best length, and unlockedBy for exercises from HTML

exerciseList.forEach( function( exercise ) {
    var div = getElement("EXERCISE-"+exercise.shortName);
    if (div == null) return;

    var unlockedBy;
    if (unlockedBy = div.getAttribute("data-unlocked-by")) {
        var unlocker = exercisesByShortName[unlockedBy];
        exercise.unlockedBy(unlocker);
    } else {
        // Otherwise, this is the first exercise.
        activateExerciseButton(exercise);
    }

    var unlocks;
    if (unlocks = div.getAttribute("data-unlocks")) {
        var split = unlocks.split(" ");
        split.forEach( function( str ) {
            exercise.unlocks(lawsByShortName[str]);
        } );
    }

    var revealTarget;
    if (revealTarget = div.getAttribute("data-reveals")) {
        // For example, sets exercise.revealBoundButton to true.
        exercise["reveal" + revealTarget] = true;
    }

    if (div.getElementsByClassName("name").length > 0) {
        var str = div.getElementsByClassName("name")[0].innerHTML;
        if (str != "")
        {
            exercise.law.name = str;
// need to assign name to the clone of law as well
            if (exercise.law.clone != "") exercise.law.clone.name = exercise.law.name;
        }
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
