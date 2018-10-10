"use strict";

// polyfill the Array includes method (which is not supported in IE).  This code moved from index.html

if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, "includes", {
    enumerable: false,
    value: function(obj) {
        var newArr = this.filter(function(el) {
          return el == obj;
        });
        return newArr.length > 0;
      }
  });
}



/// Global variables

var sentences = [];  // sentences[name] is a sentence/term attached to a name string; easier to populate this dynamically than to create a general string to sentence/term parser.
var unlockedLaws = [];
var allLaws = [];  // list of all Laws
var lawsByShortName = {}; // laws indexed by shortname

// convert a list of sentences, boxes, or contexts to a string
function listToString(list) {
    if (list.length == 0) return "";
    var i;
    var str = "";

    for (i = 0; i < list.length; i++) {
        str += toContext(list[i]).name  + ", ";
    }
    str = str.substring(0, str.length - 2);
    return str;
}

// create a deduction string
function deductionString(prefix, list, conclusion)
{
 if (list.length == 0) {
    if (conclusion.type == "environment")
        return "Form environment " + conclusion.name + ".";
    else
        return "Deduce " + conclusion.name + ".";
 }
 else {
    if (conclusion.type == "environment")
        return prefix + " " + listToString(list) + ": form environment " + conclusion.name + ".";
    else
        return prefix + " " + listToString(list) + ": deduce " + conclusion.name + ".";
 }
}


//// FreeVariable object

function FreeVariable(name)
{
    this.type = "free variable";
    this.subtype = name;
    this.name = "<I>"+name+"</I>";
    this.longName = this.name;
}

// the name of a free variable associated to a non-negative integer i.  Note: this is the name without the italics; should be matched to the "subtype" of a variable rather than its name.

function FreeVariableName(i) {
    var str = "xyz"[i%3];

    var j;
    for (j=0; j < (i-2)/3; j++)  str += "'";

    return str;
}


//// BoundVariable object.  In this text, it is assumed that free and bound variables have disjoint namespaces; we'll use x,y,z,x',y', etc. for free variables and X,Y,Z,X',Y',etc. for bound variables.  Note: this is the name without the italics; should be matched to the "subtype" of a variable rather than its name.

function BoundVariable(name)
    {
    this.type = "bound variable";
    this.subtype = name;
    this.name = "<I>"+name+"</I>";
    this.longName = this.name;
}

/// the name of a bound variable associated to a non-negative integer i

function BoundVariableName(i) {
    var str="XYZ"[i%3];

    var j;

    for (j=0; j < (i-2)/3; j++)  str += "'";

    return str;
}

/// Operator object.  relationStyle is for 2-ary operators placed in between the arguments, e.g. x+y, as opposed to f(x,y).

function Operator( name, arity, relationStyle )
{
    this.type = "operator";
    this.subtype = name;
    this.name = "<I>" + name + "</I>";
    this.arity = arity;
    this.relationStyle = relationStyle;

    switch(this.arity)
    {
        case 0: this.longName = "Constant " + this.name; break;
        case 1: this.longName = "Unary operator " + this.name + "()"; break;
        case 2:
            if (this.relationStyle) this.longName = "Binary operator " + this.name;
            else this.longName = "Binary operator " + this.name + "(,)";
    }

}

/// Term object.  The only way to make a term is to use a free or bound variable or primitive term, or to apply an operator with a list of terms.

function Term()
{
    this.type = "term";
    this.subtype = "";  // will be "free variable", "bound variable", "primitive", or "operator evaluation"
    this.name = "";
    this.longName = "";
    this.operator = "";  // the operator used (only needed for operator subtype)
    this.argList = [];  // list of args, or just the variable
}

// turn a free variable into a term
function freeVariableTerm(free)
{
  var term = new Term();
  term.subtype = "free variable";
  term.name = free.name;
  term.longName = free.longName;
  term.argList = [free];
  return term;
}

// turn a bound variable into a term
function boundVariableTerm(bound)
{
  var term = new Term();
  term.subtype = "bound variable";
  term.name = bound.name;
  term.longName = bound.longName;
  term.argList = [bound];
  return term;
}

// turn an operator and some arguments into a term
function operatorTerm(operator, argList)
{
    var term = new Term();
    term.subtype = "operator evaluation";
    var i;
    term.operator = operator;

    for (i=0; i < term.operator.arity; i++)
        term.argList[i] = toTerm(argList[i]);

    if (term.operator.relationStyle) {
        term.name = term.argList[0].longName + " " + term.operator.name + " " + term.argList[1].longName;
        term.longName = "(" + term.name + ")";
    } else if (term.operator.arity == 0) {
        term.name = term.operator.name;
        term.longName = term.name;
    } else {
        var str = term.operator.name + "(";
        for (i = 0; i < term.operator.arity; i++ )
            str += term.argList[i].name + ", ";
        str = str.substring(0, str.length - 2);
        term.name = str + ")";
        term.longName = term.name;
    }
    return term;
}

function primitiveTerm(name)
{
    var term = new Term();
    term.subtype = "primitive";
    term.name = name;
    term.longName = name;
    return term;
}

// turn an object into a term if possible
function toTerm(obj)
{
    if (typeof(obj) == "string") return primitiveTerm(obj);

    if (obj.type == "term") return obj;

    if (obj.type == "free variable") return freeVariableTerm(obj);

    if (obj.type == "bound variable") return boundVariableTerm(obj);

    error("Unrecognised type for conversion to term.");
}

/// Predicate object.  relationStyle is for 2-ary predicates placed in between the arguments, e.g. x=y, as opposed to P(x,y).

function Predicate( name, arity, relationStyle )
{
    this.type = "predicate";
    this.subtype = name;
    this.name = "<I>" + name + "</I>";
    this.arity = arity;
    this.relationStyle = relationStyle;

    switch(this.arity)
    {
        case 0: this.longName = "Proposition " + this.name; break;
        case 1: this.longName = "Predicate " + this.name + "()"; break;
        case 2:
            if (this.relationStyle) this.longName = "Relation " + this.name;
            else this.longName = "Predicate " + this.name + "(,)";
    }
}

// we have one special predicate: the equality relation
var equality = new Predicate("=", 2, true);



// the sentence x=y

function equals(x,y) {
    return predicateSentence( equality, [x,y] );
}

//// Connective object

function Connective(name, arity) {
    this.name = name;   // "AND", "OR", "NOT", "IMPLIES", "IFF", "TRUE", "FALSE"
    this.arity = arity;   // 0, 1, or 2
}

var ANDConnective = new Connective("AND", 2);
var ORConnective = new Connective("OR", 2);
var NOTConnective = new Connective("NOT", 1);
var IMPLIESConnective = new Connective("IMPLIES", 2);
var IFFConnective = new Connective("IFF", 2);
var TRUEConnective = new Connective("TRUE", 0);
var FALSEConnective = new Connective("FALSE", 0);




//// Sentence object

function Sentence() {
    this.type = "";      // "primitive", "connective", "quantifier"
    this.subtype = "";   // "AND", "OR", "NOT", "IMPLIES", "IFF" for connectives; "atomic" or "predicate" for primitives; "for all" or "there exists" for quantifiers
    this.name = ""; // name of sentence when used standalone
    this.longName = "";  // name of sentence when combined with other sentences
    this.argList = [];   // the list of arguments in this sentence (usually of length 0, 1, or 2)
    this.predicate = ""; // the predicate used (only relevant for predicate subtype)
    this.connective = ""; // the connective used (only relevant for connective subtype)
}

// create an atomic sentence
function atomicSentence(name) {
    var sentence = new Sentence();
    sentence.type = "primitive";
    sentence.subtype = "atomic";
    sentence.name = "<em>"+name+"</em>";
    sentence.longName = sentence.name;
    return sentence;
}

// create a sentence from predicate and args

function predicateSentence(predicate, argList) {
    var sentence = new Sentence;
    sentence.type = "primitive";
    sentence.subtype = "predicate";
    sentence.predicate = predicate;

    var i;

    for (i=0; i < argList.length; i++)
        sentence.argList[i] = toTerm(argList[i]);

    if (sentence.predicate.relationStyle) {
        sentence.name = argList[0].longName + " " + sentence.predicate.name + " " + argList[1].longName;
        sentence.longName = "(" + sentence.name + ")";
    } else if (sentence.predicate.arity == 0) {
        sentence.name = sentence.predicate.name;
        sentence.longName = sentence.name;
    } else {
        var str = sentence.predicate.name + "(";
        for (i = 0; i < sentence.predicate.arity; i++ )
            str += toTerm(argList[i]).name + ", ";
        str = str.substring(0, str.length - 2);
        sentence.name = str + ")";
        sentence.longName = sentence.name;
    }

    sentence.name = sentence.name;
    return sentence;
}

// from a sentence from a connective and list of arguments

function connectiveSentence(connective, argList) {
    var sentence = new Sentence();
    sentence.type = "connective";
    sentence.subtype = connective.name;
    sentence.argList = argList;
    sentence.connective = connective;

    switch(connective.arity) {
        case 0:
            sentence.name = connective.name;
            sentence.longName = sentence.name;
            break;
        case 1:
            sentence.name = connective.name + " " + argList[0].longName;
            sentence.longName = "(" + sentence.name + ")";
            break;
        case 2:
            sentence.name = argList[0].longName + " " + connective.name + " " + argList[1].longName;
            sentence.longName = "(" + sentence.name + ")";
            break;
    }
    return sentence;
}

// form the conjunction of two sentences
function AND( sentence1, sentence2) {
    return connectiveSentence(ANDConnective, [sentence1, sentence2]);
}

// form the disjunction of two sentences
function OR( sentence1, sentence2) {
    return connectiveSentence(ORConnective, [sentence1, sentence2]);
}

// form the implication of two sentences
function IMPLIES( sentence1, sentence2) {
    return connectiveSentence(IMPLIESConnective, [sentence1, sentence2]);
}

// form the iff of two sentences
function IFF( sentence1, sentence2) {
    return connectiveSentence(IFFConnective, [sentence1, sentence2]);
}

// form the negation of a sentence
function NOT( sentence1) {
    return connectiveSentence(NOTConnective, [sentence1]);
}

// form the TRUE sentence
function TRUE() {
    return connectiveSentence(TRUEConnective, []);
}

// form the FALSE sentence
function FALSE() {
    return connectiveSentence(FALSEConnective, []);
}

// a sentence of the form "for all <bound>: <predicate>"
function forAll(predicate, bound) {
    var sentence = new Sentence();
    sentence.type = "quantifier";
    sentence.subtype = "for all";
    sentence.name = "FOR ALL " + bound.name + ": " + predicate.longName;
    sentence.longName = "(" + sentence.name + ")";
    sentence.argList = [predicate, toTerm(bound)];
    sentence.name = sentence.name;
    return sentence;
}

// a sentence of the form "there exists <bound>: <predicate>"
function thereExists(predicate, bound) {
    var sentence = new Sentence();
    sentence.type = "quantifier";
    sentence.subtype = "there exists";
    sentence.name = "THERE EXISTS " + bound.name + ": " + predicate.longName;
    sentence.longName = "(" + sentence.name + ")";
    sentence.argList = [predicate, toTerm(bound)];
    sentence.name = sentence.name;
    return sentence;
}

// tries to convert an obj to sentence if it can

function toSentence(obj) {
    if (typeof(obj) == 'string') return atomicSentence(obj);
    if (obj instanceof Sentence ) return obj;
    if (obj instanceof Context ) return obj.sentence;
    if (obj instanceof Law) return obj.conclusion.sentence;
    if (obj instanceof Exercise) return obj.law.conclusion.sentence;
    if (obj instanceof Assumption) return obj.sentence;
    if (obj.type == "sentenceBox") return obj.sentence;
    if (obj.type == "formulaBox") return obj.sentence;
    error("Unable to convert object to sentence.");
}


//some atomic sentences.  Moved from index.html

 var A = atomicSentence("A");
 var B = atomicSentence("B");
 var C = atomicSentence("C");
 var D = atomicSentence("D");

// Law object

function Law(shortName, name, givens, conclusion) {
    this.shortName = shortName;
    this.name = name;   // name of law, e.g. "EXERCISE 1.1"


// givens is an array of given hypotheses (can be empty).  I allow sentences as givens, so these need to be converted to contexts.
    var givenslist = [];
    givens.forEach( function(given) {
       givenslist.push(toContext(given));
    });
    this.givens = givenslist;
    this.conclusion = toContext(conclusion);  // given conclusion
    this.unlocked = false;         // by default the law is not unlocked
    this.string = deductionString("Given", givens, this.conclusion);
    this.index = allLaws.length;  // the order of the law in the text (used to determine circularity) - the allLaws.length is a placeholder, will be overwritten
    this.clone = "";  // points to the clone of the law with additional root environment, if needed

// for most laws, the matching givens and conclusions template is the same as what is displayed to the user.  
    this.givensTemplate = this.givens;
    this.conclusionTemplate = this.conclusion;

    allLaws.push(this);
    lawsByShortName[shortName] = this;

    if (allFormulas(this.givens)) {
        if (this.conclusion.type == 'sentence in environment' || this.conclusion.type == 'environment') {
            var givensClone = this.givens.slice(0);
            givensClone.push(rootEnvironmentContext());
            this.clone = new Law(this.shortName + "Clone", this.name, givensClone, this.conclusion);
        }
    }
}




// add  (name of) expr to list if not already there

function record(list, expr) {
    if (!list.includes(expr.name)) {
        list.push(expr.name);
        sentences[expr.name] = expr;  // remember the variable object associated to name
    }
}

function makeOptions(getPrimitives, getFreeVars, getBoundVars, getPrimTerms, getPredicates, getOperators, getAtomic) {
    var options = [];
    options.getPrimitives = getPrimitives;
    options.getFreeVars = getFreeVars;
    options.getBoundVars = getBoundVars;
    options.getPrimTerms = getPrimTerms;
    options.getPredicates = getPredicates;
    options.getOperators = getOperators;
    options.getAtomic = getAtomic;
    return options;
}

// list the (names of) atomic primitives, free variables, bound variables, primitive terms, predicates, operators occurring in a law

function listPrimitives(law, getPrimitives, getFreeVars, getBoundVars, getPrimTerms, getPredicates, getOperators, getAtomic, useTemplate) {
    var list = [];
    var options = makeOptions(getPrimitives, getFreeVars, getBoundVars, getPrimTerms, getPredicates, getOperators, getAtomic);

    var givens;
    var conclusion;

    if (useTemplate) {
        givens = law.givensTemplate;
        conclusion = law.conclusionTemplate;
    } else {
        givens = law.givens;
        conclusion = law.conclusion;
    }

    givens.forEach( function(item) {
        pushPrimitivesFromContext(list, toContext(item), options);
    });

// usually the line below is redundant, as any primitives in conclusion should have already appeared in one of the givens, but there are some exceptions, e.g. universal introduction without specifying the bound variable
    pushPrimitivesFromContext(list, conclusion, options);

     return list;
}

// push all the primitives from context onto list (removing duplicates)
function pushPrimitivesFromContext(list, context, options) {

    if (context.type == "formula" || context.type == "sentence in environment") {
        pushPrimitivesFromSentence(list, context.sentence, options);
    }
    if (context.type == "environment" || context.type == "sentence in environment")
    {
        context.environment.forEach( function(item) {
            if (item.type == "assuming" || item.type == "setting") {
                pushPrimitivesFromSentence(list, item.sentence, options);
            }
            if (item.type == "setting" || item.type == "letting") {
                if (options.getFreeVars) {
                    record(list, item.variable);
                }
            }
        });
    }
    if (context.type == "term context") {
        pushPrimitivesFromSentence(list, context.term, options);
    }
}

// push all the primitives from sentence/term onto list (removing duplicates)
function pushPrimitivesFromSentence(list, sentence, options)
{

    switch(sentence.type) {
        case "primitive":
            if (options.getPrimitives) record(list, sentence);

            switch(sentence.subtype) {
                case "atomic":
                    if (options.getAtomic) record(list, sentence);
                    break;
                case "predicate":
                    if (options.getPredicates) record(list, sentence.predicate);
                    sentence.argList.forEach( function(arg) { pushPrimitivesFromSentence(list,arg, options);} );
                    break;
            }
            break;
        case "quantifier":
            if (options.getBoundVars) record(list, sentence.argList[1]);
            pushPrimitivesFromSentence(list, sentence.argList[0], options);
            break;
        case "connective":
            sentence.argList.forEach( function(arg) { pushPrimitivesFromSentence(list,arg, options);} );
            break;
        case "term":
            switch(sentence.subtype) {
                case "primitive":
                    if (options.getPrimTerms) record(list,sentence);
                    return;
                case "operator evaluation":
                    if (options.getOperators)  record(list, sentence.operator);
                    sentence.argList.forEach( function(arg) { pushPrimitivesFromSentence(list,arg, options);} );
                    return;
                case "free variable":
                    if (options.getFreeVars) record(list, sentence.argList[0]);
                    return;
                case "bound variable":
                    if (options.getBoundVars) record(list, sentence.argList[0]);
                    return;
            }
    }
}



// returns true if all terms in givens are formulas or terms (i.e., no environment is involved)

function allFormulas(givens) {
    var i;
    for (i = 0; i < givens.length; i++) {
        if (givens[i].type != "formula" && givens[i].type != "term context") return false;
       }
    return true;
}

// a tricky routine: tries to match arglist to the givens of a law and see what the primitives are, returning this data in an output object.  Note: for predicate logic, some of the matches need to be discarded because the conclusion does not obey scoping laws (e.g. repeated free variables, etc.). Also there may be situations where there are multiple possible substitutions (creating existential quantifier)

function matchWithGivens( arglist, law, primitives ) {

    // for matching, we use the template, rather than the givens and conclusion displayed to user (but these are usually the same)
    var givens = law.givensTemplate;
    var conclusion = law.conclusionTemplate;

    var output = new Object();
    output.matches = true;  // so far, no reason to doubt a match.
    output.illegal = false; // sometimes there is technically a match but something is ill-formed
    output.multivalued = false;  // do we need multiple conclusions, or just one?
    output.env = [];        // by default, the output environment will be the root one.

    primitives.forEach( function(primitive) {
        output[primitive] = "";
    });


// technically one needs to ensure that primitives and free variables avoid reserved words such as "matches".  This is unlikely to come up in practice.

    if (arglist.length != givens.length) {
        output.matches = false;
        return output;
    }

// convert everything to contexts if not already done so (this step may be redundant)

   var i;
   for (i = 0; i < givens.length; i++) {
        arglist[i] = toContext(arglist[i]);
       givens[i] = toContext(givens[i]);
   }

// check if all the givens are formulas

   if (!allFormulas(givens))
   {
    var proposedYet = false;
    var proposedEnv = [];


    for (i = 0; i < givens.length; i++) {
        if (givens[i].type == "sentence in environment" || givens[i].type == "environment") {
            if (arglist[i].environment.length < givens[i].environment.length) {
                // can't match if the template has more deeply nested assumptions than the arglist!
                output.matches = false;
                return output;
            }
            var candidateEnv = arglist[i].environment.slice( 0, arglist[i].environment.length - givens[i].environment.length);
            if (proposedYet == false) {
                proposedYet = true;
                proposedEnv = candidateEnv;
            }
            else if (assumptionListToString(proposedEnv) != assumptionListToString(candidateEnv)) {  // need to convert to string here as a proxy for passing by value rather than by reference
                output.matches = false;
                return output;
            }
        }
    }
    output.env = proposedEnv;
   }

    switch(law.shortName) { // a number of laws are too complex to be matched by the standard algorithm and have to be treated separately
        case "UniversalIntroduction":
        case "UniversalIntroduction2":
            matchUniversalIntroduction(arglist, output, law);
            break;
        case "UniversalSpecification":
        case "UniversalSpecification2":
            matchUniversalSpecification(arglist, output, law);
            break;
        case "ExistentialInstantiation":
        case "ExistentialInstantiation2":
            matchExistentialInstantiation(arglist, output, law);
            break;
        case "ExistentialIntroduction":
        case "ExistentialIntroduction2":
            matchExistentialIntroduction(arglist, output, law);
            break;
        case "Indiscernability":
            matchIndiscernability(arglist, output, law);
            break;
        case "UniversalRenamingBoundVar":
        case "ExistentialRenamingBoundVar":
            matchRenamingBoundVar(arglist, output, law);
            break;
        case "BarbaraSingular":
            matchBarbaraSingular(arglist, output);
            break;
        default:
            var i;

            for (i = 0; i < givens.length; i++) {
                matchWithGiven( arglist[i], givens[i], output);
                if (!output.matches) return output;
            }

            for (i=0; i < primitives.length; i++) {
                if (output[primitives[i]] == "")  { // somehow failed to match one of the primitives
                    output.matches = false;
                    return output;
                }
            }
            output.conclusion = subs(conclusion, output);
    }

    return output;
}

// match arglist against one of the two laws of universal introduction and report the conclusions in output
function matchUniversalIntroduction(arglist, output, law) {
    if (!output.matches) return;

    // arglist[0] needs to be of the form "A, [letting x be arbitrary]" after the output.env
    if (arglist[0].type != "sentence in environment") {
        output.matches = false;
        return;
    }

    var assumption = arglist[0].environment[output.env.length];

    if (assumption.type != "letting") {
        output.matches = false;
        return;
    }

    var freeVariable = assumption.variable;
    var statement = arglist[0].sentence;

    var boundVariable;

    switch (law.shortName) {
        case "UniversalIntroduction":
            if (arglist[1].type != "term context") {
                output.matches = false;
                return;
            }
            if (arglist[1].term.subtype != "bound variable") {
                output.matches = false;
                return;
            }
            boundVariable = arglist[1].term.argList[0];
            break;
        case "UniversalIntroduction2":
            if (arglist[1].type != "environment") {
                output.matches = false;
                return;
            }
            // choose the next available bound Variable
            boundVariable = nextAvailableBoundVariable(statement);
            break;
    }


    var newSentence = forAll(  searchReplace( statement, freeVariable, boundVariable), boundVariable);
    output.conclusion = sentenceContext( newSentence, output.env );
}


// return the next availalbe bound variable not already in a statement

function nextAvailableBoundVariable(statement) {
    var boundVars = [];


    pushPrimitivesFromSentence(boundVars, statement, makeOptions(false, false, true,false, false, false, false));


    var num=0;
    var match;
    var str, longStr;

    do {
        str = BoundVariableName(num);
        longStr = "<I>"+str+"</I>";
        match = boundVars.includes(longStr);
        num++;
    } while (match);
    return new BoundVariable(str);

}


// match arglist against the law of universal specification and report the conclusions in output
function matchUniversalSpecification(arglist, output, law) {
    if (!output.matches) return;


    // arglist[0] needs to be of the form "FOR ALL X: P(X)" after the output.env
    if (arglist[0].type != "sentence in environment") {
        output.matches = false;
        return;
    }

    if (arglist[0].sentence.type != "quantifier" || arglist[0].sentence.subtype != "for all") {
        output.matches = false;
        return;
    }

    var sentence = arglist[0].sentence.argList[0];
    var boundVar = toTerm(arglist[0].sentence.argList[1]).argList[0];

    if (arglist[1].type != "term context") {
        output.matches = false;
        return;
    }

    var term = toTerm(arglist[1].term);
    var newSentence = searchReplace( sentence, boundVar, term );

    if (law.shortName == "UniversalSpecification") {
        if (hasBoundOrUnknownFree(term, output.env)) {
            output.illegal = true; // will keep matching but will display in silver
        }
        output.conclusion = sentenceContext( newSentence, output.env );
    } else if (law.shortName == "UniversalSpecification2") {
        if (term.subtype != "free variable") {
            output.matches = false;
            return;
        }
        var env = output.env.slice(0);
        env.push(toAssumption(term.argList[0]));
        output.conclusion = sentenceContext( newSentence, env );
    }

}

// returns true if term contains a bound variable or a free variable not already in environment

function hasBoundOrUnknownFree(term,env) {
    switch(term.subtype) {
        case "primitive":
            return false;
        case "free variable":
            var i;
            for (i=0; i < env.length; i++)
                if (env[i].type == 'letting' || env[i].type == 'setting')
                    if (env[i].variable.name == term.argList[0].name)
                        return false;
            return true;
        case "bound variable":
            return true;
        case "operator":
            var i;
            for (i=0; i < term.argList.length; i++)
                if (hasBoundOrUnknownFree(term.argList[i],env)) return true;
            return false;
    }
}

// replace all occurrences of term "search" with term "replace"

function searchReplace(statement, search, replace) {
    var newArgList = [];
    var i;


    if (statement.type == "free variable" || statement.type == "bound variable") return statement;

    if (statement.name == search.name) return toTerm(replace);

    for (i=0; i < statement.argList.length; i++)
        newArgList[i] = searchReplace(statement.argList[i], search, replace);


    switch (statement.type) {
        case "term":
            if (statement.subtype == "free variable") return statement;
            if (statement.subtype == "bound variable") return statement;
            if (statement.subtype == "primitive") return statement;
            if (statement.subtype == "operator evaluation") return operatorTerm(statement.operator, newArgList);
            return;
        case "primitive":
            if (statement.subtype == "atomic") return statement;
            if (statement.subtype == "predicate") return predicateSentence(statement.predicate, newArgList);
            return;
        case "connective":
            return connectiveSentence(statement.connective, newArgList);
        case "quantifier":
            if (statement.subtype == "for all") return forAll( newArgList[0], newArgList[1]);
            if (statement.subtype == "there exists") return thereExists( newArgList[0], newArgList[1]);
            return;
    }
}


// match arglist against the law of existential instantiation and report the conclusions in output
function matchExistentialInstantiation(arglist, output, law) {
    if (!output.matches) return;

    // arglist[0] needs to be of the form "THERE EXISTS X: P(X)" after the output.env
    if (arglist[0].type != "sentence in environment") {
        output.matches = false;
        return;
    }

    if (arglist[0].sentence.type != "quantifier" || arglist[0].sentence.subtype != "there exists") {
        output.matches = false;
        return;
    }

    var sentence = arglist[0].sentence.argList[0];
    var boundVar = toTerm(arglist[0].sentence.argList[1]).argList[0];

    var freeVariable;

    if (law.shortName == "ExistentialInstantiation") {
        if (arglist[1].type != "term context") {
            output.matches = false;
            return;
        }
        if (arglist[1].term.subtype != "free variable") {
            output.matches = false;
            return;
        }
        freeVariable = arglist[1].term.argList[0];
    } else  if (law.shortName == "ExistentialInstantiation2") {
        // choose the next available free Variable
        var freeVars = [];

        pushPrimitivesFromContext(freeVars, sentenceContext(sentence,output.env), makeOptions(false, true, false, false, false, false, false));

        var num=0;
        var match;
        var str, longStr;

        do {
            str = FreeVariableName(num);
            longStr = "<I>"+str+"</I>";
            match = freeVars.includes(longStr);
            num++;
        } while (match);

        freeVariable = new FreeVariable(str);
    }

    var newSentence = searchReplace( sentence, boundVar, freeVariable );
    var env = output.env.slice(0);
    env.push( settingAssumption(newSentence, freeVariable) );
    output.conclusion = sentenceContext( newSentence, env );
}

// match arglist against one of the two laws of existential introduction and report the conclusions in output
function matchExistentialIntroduction(arglist, output, law) {
    if (!output.matches) return;


    // arglist[0] needs to be of the form "P(X)" after the output.env
    if (arglist[0].type != "sentence in environment") {
        output.matches = false;
        return;
    }

    var sentence = arglist[0].sentence;

    // arglist[1] needs to be a term context

    if (arglist[1].type != "term context") {
        output.matches = false;
        return;
    }

    var term = arglist[1].term;

    if (hasBoundOrUnknownFree(term, output.env)) {
        output.illegal = true; // will keep matching but will display in silver
    }

    var boundVariable;

    switch (law.shortName) {
        case "ExistentialIntroduction2":
            if (arglist[2].type != "term context") {
                output.matches = false;
                return;
            }
            if (arglist[2].term.subtype != "bound variable") {
                output.matches = false;
                return;
            }
            boundVariable = arglist[2].term.argList[0];
            break;
        case "ExistentialIntroduction":
            // choose the next available bound Variable
            boundVariable = nextAvailableBoundVariable(sentence);
            break;
    }

    output.multivalued = true;

    var translations = allSearchReplace(sentence, term, boundVariable);

    output.conclusions = [];
    var i;
    for (i=0; i < translations.length; i++)
        output.conclusions.push(sentenceContext( thereExists(translations[i],boundVariable), output.env ));
}


// match arglist against the law of indiscernability and report the conclusions in output
function matchIndiscernability(arglist, output, law) {
    if (!output.matches) return;

    // arglist[0], arglist[1] have to be sentences
    if (arglist[0].type != "sentence in environment" || arglist[1].type != "sentence in environment") {
        output.matches = false;
        return;
    }

    var sentence = arglist[0].sentence;
    var sentence2 = arglist[1].sentence;

    // sentence2 needs to be of the form alpha=beta

    if (sentence2.subtype != "predicate" || sentence2.predicate != equality) {
        output.matches = false;
        return;
    }

    var alpha = sentence2.argList[0];
    var beta = sentence2.argList[1];

    output.multivalued = true;

    var translations = allSearchReplace(sentence, alpha, beta);

    output.conclusions = [];
    var i;
    for (i=0; i < translations.length; i++)
        if (translations[i].name != sentence.name)  //remove trivial applications of indiscernability in which ibe deduces a sentence from itself
            output.conclusions.push(sentenceContext( translations[i], output.env ));
}

// match arglist against the law of existential instantiation and report the conclusions in output
function matchExistentialInstantiation(arglist, output, law) {
    if (!output.matches) return;

    // arglist[0] needs to be of the form "THERE EXISTS X: P(X)" after the output.env
    if (arglist[0].type != "sentence in environment") {
        output.matches = false;
        return;
    }

    if (arglist[0].sentence.type != "quantifier" || arglist[0].sentence.subtype != "there exists") {
        output.matches = false;
        return;
    }

    var sentence = arglist[0].sentence.argList[0];
    var boundVar = toTerm(arglist[0].sentence.argList[1]).argList[0];

    var freeVariable;

    if (law.shortName == "ExistentialInstantiation") {
        if (arglist[1].type != "term context") {
            output.matches = false;
            return;
        }
        if (arglist[1].term.subtype != "free variable") {
            output.matches = false;
            return;
        }
        freeVariable = arglist[1].term.argList[0];
    } else  if (law.shortName == "ExistentialInstantiation2") {
        // choose the next available free Variable
        var freeVars = [];

        pushPrimitivesFromContext(freeVars, sentenceContext(sentence,output.env), makeOptions(false, true, false, false, false, false, false));

        var num=0;
        var match;
        var str, longStr;

        do {
            str = FreeVariableName(num);
            longStr = "<I>"+str+"</I>";
            match = freeVars.includes(longStr);
            num++;
        } while (match);

        freeVariable = new FreeVariable(str);
    }

    var newSentence = searchReplace( sentence, boundVar, freeVariable );
    var env = output.env.slice(0);
    env.push( settingAssumption(newSentence, freeVariable) );
    output.conclusion = sentenceContext( newSentence, env );
}

// match arglist against the law of universal or existential renaming of bound variables and report the conclusions in output
function matchRenamingBoundVar(arglist, output,law) {
    if (!output.matches) return;

    // arglist[0] needs to be of the form "FOR ALL X: P(X)" or "THERE EXISTS X: P(X)" after the output.env
    if (arglist[0].type != "sentence in environment") {
        output.matches = false;
        return;
    }

    var subtype;
    if (law.shortName == "UniversalRenamingBoundVar") subtype = "for all";
    if (law.shortName == "ExistentialRenamingBoundVar") subtype = "there exists";

    if (arglist[0].sentence.type != "quantifier" || arglist[0].sentence.subtype != subtype) {
        output.matches = false;
        return;
    }

    var sentence = arglist[0].sentence.argList[0];
    var boundVar = arglist[0].sentence.argList[1];

    // arglist[1] needs to be a bound variable
    
    if (arglist[1].type != "term context") {
        output.matches = false;
        return;
    }

    if (arglist[1].term.subtype != "bound variable") {
        output.matches = false;
        return;
    }

    var newBoundVar = arglist[1].term.argList[0];

    // it can happen that newBoundVar already appears in sentence; this makes the conclusion illegal, but we will still list the deduction as being greyed out


    var newSentence = searchReplace(sentence, boundVar, newBoundVar);

    if (law.shortName == "UniversalRenamingBoundVar") 
        output.conclusion = sentenceContext( forAll( newSentence, newBoundVar), output.env);

    if (law.shortName == "ExistentialRenamingBoundVar") 
        output.conclusion = sentenceContext( thereExists( newSentence, newBoundVar), output.env);

}


// match arglist against the singular form of the Barbara syllogism and report the conclusions in output
function matchBarbaraSingular(arglist, output) {
    if (!output.matches) return;

    // arglist[0] needs to be of the form "FOR ALL X: P(X) IMPLIES Q(X)" after the output.env
    if (arglist[0].type != "sentence in environment") {
        output.matches = false;
        return;
    }
    if (arglist[0].sentence.type != "quantifier" || arglist[0].sentence.subtype != "for all") {
        output.matches = false;
        return;
    }

    var sentence = arglist[0].sentence.argList[0];
    var X = arglist[0].sentence.argList[1];

    if (sentence.type != "connective" || sentence.subtype != "IMPLIES") {
        output.matches = false;
        return;
    }

    var PX = sentence.argList[0];
    var QX = sentence.argList[1];

    // arglist[1] needs to be a sentence
    
    if (arglist[1].type != "sentence in environment") {
        output.matches = false;
        return;
    }

    var Pa = arglist[1].sentence;

    // arglist[2] needs to be a term

    if (arglist[2].type != "term context") {
        output.matches = false;
        return;
    }

    var alpha = arglist[2].term;

// as with universalSpecification, alpha cannot contain bound variables or free variables not present in the environment.

    if (hasBoundOrUnknownFree(alpha, output.env)) {
        output.illegal = true; // will keep matching but will display in silver
    }

// Pa has to match what happens to PX when X is replaced by alpha

    var testSentence = searchReplace(PX, X, alpha);
    
    if (testSentence.name != Pa.name) {
        output.matches = false;
        return;
    }

    output.conclusion = sentenceContext( searchReplace(QX, X, alpha), output.env);
}


// return a list of all possible ways in which appearances of "search" in sentence can be replaced with "replace"

function allSearchReplace(statement, search, replace)
{
    if (statement.type == "free variable" || statement.type == "bound variable") return [statement];

    var list = [];
    var newArgList = [];
    var i,j;

    if (statement.name == search.name) list.push(toTerm(replace));

    for (i=0; i < statement.argList.length; i++)
        newArgList[i] = allSearchReplace(statement.argList[i], search, replace);

    switch (statement.type) {
        case "term":
            switch (statement.subtype) {
                case "free variable":
                case "bound variable":
                case "primitive":
                    list.push(statement);
                    break;
                case "operator evaluation":
                    switch(statement.operator.arity) {
                        case 0:
                            list = [operatorTerm(statement.operator, [])];
                            break;
                        case 1:
                            for (i=0; i < newArgList[0].length; i++)
                                list.push( operatorTerm(statement.operator, [newArgList[0][i]]));
                            break;
                        case 2:
                            for (i=0; i < newArgList[0].length; i++)
                                for (j=0; j < newArgList[1].length; j++)
                                    list.push( operatorTerm( statement.operator, [newArgList[0][i], newArgList[1][j]]));
                            break;
                    }
                    break;
            }
            break;
        case "primitive":
            switch(statement.subtype) {
                case "atomic":
                    list.push(statement);
                    break;
                case "predicate":
                    switch(statement.predicate.arity) {
                        case 0:
                            list.push(predicateSentence(statement.predicate, []));
                            break;
                        case 1:
                            for (i=0; i < newArgList[0].length; i++)
                                list.push( predicateSentence(statement.predicate, [newArgList[0][i]]));
                            break;
                        case 2:
                            for (i=0; i < newArgList[0].length; i++)
                                for (j=0; j < newArgList[1].length; j++)
                                    list.push( predicateSentence( statement.predicate, [newArgList[0][i], newArgList[1][j]]));
                            break;
                    }
                    break;
            }
            break;
        case "connective":
            switch(statement.connective.arity) {
                case 0:
                    list.push(connectiveSentence(statement.connective, []));
                    break;
                case 1:
                    for (i=0; i < newArgList[0].length; i++)
                        list.push( connectiveSentence(statement.connective, [newArgList[0][i]]));
                    break;
                case 2:
                    for (i=0; i < newArgList[0].length; i++)
                        for (j=0; j < newArgList[1].length; j++)
                            list.push( connectiveSentence( statement.connective, [newArgList[0][i], newArgList[1][j]]));
                    break;
        }
        break;
        case "quantifier":
            switch(statement.subtype) {
                case "for all":
                    for (i=0; i < newArgList[0].length; i++)
                        for (j=0; j < newArgList[1].length; j++)
                            list.push( forAll( newArgList[0][i], newArgList[1][j]));
                    break;
                case "there exists":
                    for (i=0; i < newArgList[0].length; i++)
                        for (j=0; j < newArgList[1].length; j++)
                            list.push( thereExists( newArgList[0][i], newArgList[1][j]));
                    break;
            }
            break;
    }
    return list;
}


// try to match a context with a template context and store the match in output

function matchWithGiven( context, template, output) {
  if (!output.matches) return;

  if (context.type != template.type) {
    output.matches = false;
    return;
  }

  if (template.type == "environment" || template.type == "sentence in environment") {
      var i;
      for (i = 0; i < template.environment.length; i++) {
        matchWithGivenAssumption( context.environment[i + output.env.length], template.environment[i], output);
        if (!output.matches) return;
      }
  }

  if (template.type == "formula" || template.type == "sentence in environment")
    matchWithGivenSentence( context.sentence, template.sentence, output);

  if (template.type == "term context")
    matchWithGivenSentence( context.term, template.term, output);
}

// match item to template object in output if this has not already been done
function makeMatch(item, template, output) {
    if (item.name == output[template.name].name) {
        // good, it matches what we've already fit to the template!
        return;
    }
    if (output[template.name] == "") {
        output[template.name] = item;
        return;
    }
    output.matches = false;
    return;

}

// try to match an assumption with a template sentence and store the match in output

function matchWithGivenAssumption( assumption, template, output) {
    if (!output.matches) return;

    if (assumption.type != template.type) {
        output.matches = false;
        return;
    }


    if (assumption.type == 'assuming' || assumption.type == 'setting') {
        matchWithGivenSentence( assumption.sentence, template.sentence, output);
    }

    if (assumption.type == 'letting' || assumption.type == 'setting') {
        makeMatch(assumption.variable, template.variable, output);
    }

}

// try to match a sentence or term with a template and store the match in output

function matchWithGivenSentence( sentence, template, output) {
    if (!output.matches) return;

    switch (template.type) {
        case "primitive":
            switch (template.subtype) {
                case "atomic":
                    makeMatch(sentence,template,output);
                    return;
                case "predicate":
                    if (template.predicate == equality) {
                        if (sentence.predicate != equality) {
                            output.matches = false;
                            return;
                        }
                        var i;

                        for (i=0; i<template.argList.length; i++)
                            matchWithGivenSentence( sentence.argList[i], template.argList[i], output);
                        return;
                    }
                    // need some code for matching with a predicate sentence not involving equality.  Right now, we simply refuse to match:
                    output.matches=false;
                    return;
            }
        case "connective":
        case "quantifier":
            if (template.type != sentence.type) {
                output.matches = false;
                return;
            }

            if (template.subtype != sentence.subtype) {
                output.matches = false;
                return;
            }

            var i;

            for (i=0; i<template.argList.length; i++) {
                matchWithGivenSentence( sentence.argList[i], template.argList[i], output);
            }
            return;
        case "term":
            if (template.type != sentence.type) {
                output.matches = false;
                return;
            }
            switch(template.subtype) {
                case "free variable":
                case "bound variable":
                    if (sentence.subtype != template.subtype) {
                        output.matches = false;
                        return;
                    }
                    makeMatch(sentence.argList[0], template.argList[0], output);
                    return;
                case "primitive":
                    makeMatch(sentence, template, output);
                    return;
                case "operator evaluation":
                    // need some code for matching with a predicate sentence.  Right now, we simply refuse to match:
                    output.matches=false;
                    return;
            }
            return;
        case "free variable":
        case "bound variable":
            if (sentence.type != template.type) {
                output.matches = false;
                return;
            }
            makeMatch(sentence, template, output);
            return;
    }
}


// insert the values of the output object (previously obtained by matchWithGivens) to a template sentence or term

function subsSentence(template, output)
{
    switch (template.type) {
        case "free variable":
        case "bound variable":
            return toTerm( output[template.name] );
        case "term":
            if (template.subtype == "free variable" || template.subtype == "bound variable") {
                return toTerm( output[template.argList[0].name]);
            }
            if (template.subtype == "operator evaluation") {
                output.matches = false;
                return new Term();
            }
            if (template.subtype == "primitive") {
                return toTerm( output[template.name] );
            }
            break;
        case "primitive":
            if (template.subtype == "atomic") {
                return output[template.name];
            }
            if (template.subtype == "predicate") {
                if (template.predicate == equality) { // this is the one operator for which we do implement matching
                    return equals( subsSentence(template.argList[0] , output), subsSentence(template.argList[1] , output))
                }
                else {
                    // need (rather complicated) code here.  For now, just fail to match.
                    output.matches = false;
                    return new Sentence();
                }
            }
            break;
        case "quantifier":
            if (template.subtype == "for all")
                return forAll( subsSentence(template.argList[0], output), subsSentence(template.argList[1], output) );
            if (template.subtype == "there exists")
                return thereExists( subsSentence(template.argList[0], output), subsSentence(template.argList[1], output) );
            break;
        case "connective":
            var newArgList = [];
            var i;

            for (i=0; i < template.argList.length; i++)
                newArgList[i] = subsSentence(template.argList[i], output);

            return connectiveSentence(template.connective, newArgList);
        default:
            error("Unrecognised type for substitution.");
    }
}

// insert the values of the output object (previously obtained by matchWithGivens) to an environment; starts with the object ambient environment

function subsEnvironment(env, output) {
    var list = output.env;

    env.forEach( function(item) {
        if (item.type == "assuming") {
            list.push( toAssumption(subsSentence(item.sentence, output)) );
        }
        if (item.type == "letting") {
            list.push(toAssumption( output[item.variable.name]));
        }
        if (item.type == "setting") {
            list.push(settingAssumption( subsSentence(item.sentence,output), output[item.variable.name]));
        }
    });
    return list;
}

// insert the values of the output object (previously obtained by matchWithGivens) to a template context

function subs(template, output)
{
    // TODO: in some laws there will be bound variables that are not currently set in output.  If so, they need to be set to first available bound variable
    // for now such laws will be coded in by hand.

    if (template.type == "formula") {
        return formulaContext(subsSentence(template.sentence, output));
    }
    if (template.type == "environment") {
        return environmentContext(subsEnvironment(template.environment, output));;
    }
    if (template.type == "sentence in environment") {
        return sentenceContext(subsSentence(template.sentence, output), subsEnvironment(template.environment, output));
    }
    error("Template type not recognised:" + template.type);
}


// assumption object

function Assumption() {
    this.type = "";  // "assuming", "letting", "setting"
    this.sentence = new Sentence();   // the sentence being assumed (for "assuming" and "setting" types)
    this.variable = new FreeVariable();    // the free variable used (for "letting" and "setting types")
    this.name = "";
}

function sentenceAssumption(sentence)
{
    var assumption = new Assumption();
    assumption.type = "assuming";
    assumption.sentence = sentence;
    assumption.name = "Assume " + sentence.name;
    return assumption;
}

function variableAssumption(variable)
{
    var assumption = new Assumption();
    assumption.type = "letting";
    assumption.variable = variable;
    assumption.name = "Let " + variable.name + " be arbitrary";
    return assumption;
}

function settingAssumption(sentence, variable) {
    var assumption = new Assumption();
    assumption.type = "setting";
    assumption.sentence = sentence;
    assumption.variable = variable;
    assumption.name = "Set " + variable.name + " s.t. " + sentence.name;
    return assumption;
}

function toAssumption(obj) {
    if (obj instanceof Assumption) return obj;

    if (obj instanceof Sentence) return sentenceAssumption(obj);

    if (obj instanceof FreeVariable) return variableAssumption(obj);

    error("Unrecognised type to convert to assumption.");
}

// convert a list of assumptions to a string

function assumptionListToString( assumptions )
{
    var currentType = "";
    var name = "";
    var longName = "";
    var shortHalfText = "";
    var longHalfText = "";

    if (assumptions.length == 0) return "root environment";

    assumptions.forEach( function( assumption ) {
        if (assumption.type == "assuming")
        {
            if (currentType == "assuming") {
                name = longName + assumption.sentence.name;
                longName = name + ", ";

            }
            else {
                name = longName + "assuming " + assumption.sentence.name;
                longName = name + ", ";
            }
        }
        else if (assumption.type == "letting")
        {
            if (currentType == "letting") {
                shortHalfText = longHalfText + assumption.variable.name;
                longHalfText = shortHalfText + ", ";
                name = shortHalfText + " be arbitrary";
                longName = name + ", ";
            } else {
                shortHalfText = longName + "letting " + assumption.variable.name;
                longHalfText = shortHalfText + ", ";
                name = shortHalfText + " be arbitrary";
                longName = name + ", ";

            }
        } else if (assumption.type == "setting") {
            name = longName + "setting " + assumption.variable.name + " s.t. " + assumption.sentence.name;
            longName = name + ", ";
        }
        currentType = assumption.type;
    });

    return name;
}

// Context object

// perhaps the most complicated object in the code.  A context is one of four things:
// A sentence inside an environment ("A [assuming B]";
// An environment ("[assuming A]", or "[Root environment]");
// A formula "Formula "A"" (a sentence without environment)
// A term (in the term window)
// A free variable (in the free variable or term window)

function Context() {
    this.type = "";      // "sentence in environment", "environment", "formula", "term context"
    this.sentence = new Sentence(); // sentence used (for sentence, sentence-in-envrionment, and formula types)
    this.environment = [];  // environment used (for sentence-in-environment and environment types); an ordered list of assumptions
    this.term = new Term();  // term used (For term context types)
    this.name = "";
}

// return th ename of a context

function ContextToString(context) {
    switch (context.type) {
        case "formula":
            return 'formula "' + context.sentence.name + '"';
        case "term context":
            return 'term "' + context.term.name + '"';
        case "environment":
            return "[" + assumptionListToString(context.environment) + "]";
        case "sentence in environment":
            if (context.environment.length == 0)
                return context.sentence.name;
            else
            {
                return context.sentence.name + " [" + assumptionListToString(context.environment) + "]";
            }
        default:
            error("Unknown context type!");
            return "";
    }
}

// obj is either a sentence, or a string to which one can look up a sentence

function formulaContext(obj) {
  var formula = new Context();
  formula.type = "formula";

  if (typeof obj == 'string')
  {
      formula.sentence = sentences[obj];
  }
  else
      formula.sentence = obj;

  formula.name = ContextToString(formula);
  return formula;
}

function termContext(obj) {
    var context = new Context();
    context.type = "term context";

    if (typeof obj == 'string')
    {
        context.term = toTerm(sentences[obj]);
    }
    else
        context.term = toTerm(obj);

    context.name = ContextToString(context);
    return context;
  }

function sentenceContext(sentence, env) {
    var context = new Context();
    context.type = "sentence in environment";
    context.sentence = sentence;
    context.environment = env;
    context.name = ContextToString(context);
    return context;
}

function environmentContext(env) {
    var context = new Context();
    context.type = "environment";
    context.environment = [];
    env.forEach( function(assumption) { context.environment.push(toAssumption(assumption));});
    context.name = ContextToString(context);
    return context;
}

function rootEnvironmentContext() {
    return environmentContext([]);
}

// create a new context from an existing context with an additional assumption.  This assumption is put at the bottom of the assumption nesting, e.g. assuming("A assuming B", C) would give "A assuming B,C"
// assumption can be a sentence, free variable, or setting a variable
function assuming(context, assumption) {
// in case one is passed a sentence or box instead of a context
    var newcontext = toContext(context);


// need a copy of newcontext.environment, otherwise push would modify the original environment.
    var envclone = newcontext.environment.slice(0);

    envclone.unshift(toAssumption(assumption));

    return sentenceContext(newcontext.sentence, envclone);
}


// checks a sentence, term, or variable is legal given the available free and bound variables.  If freeVariables = "ALL" then all free variables are legitimate.  If allowUnbound is true, allow bound variables that are not bound by quantifiers.

function isLegalSentence(obj, freeVariables, boundVariables, allowUnbound) {
    if (obj instanceof Sentence || obj instanceof Term) {

        var newBoundVariables = boundVariables.slice(0);

        if (obj.type == 'quantifier') {
            var boundVar = toTerm(obj.argList[1]).argList[0];  // the bound variable in the quantifier
            if (newBoundVariables.includes(boundVar.name)) { // uh oh, trying to bound a variable twice?
               return false;
            } else {
                newBoundVariables.push(boundVar.name);
            }
        }

        var i;
        for (i=0; i < obj.argList.length; i++)
        {
            if (!isLegalSentence(obj.argList[i], freeVariables, newBoundVariables, allowUnbound)) return false;
        }
        return true;
    }
    if (obj instanceof FreeVariable) {
        if (freeVariables == "ALL") return true;
        else return freeVariables.includes(obj.name);
    }
    if (obj instanceof BoundVariable) {
        if (allowUnbound) return true;
        return boundVariables.includes(obj.name);
    }
    return true;
}

// checks if a context is actually legal.  This means:
// * no repeated free variables
// * no unquantified bound variables
// * no repeated bound variables
// * Sentence only depends on ambient free variables

function isLegal(context) {
// don't check for legality for  terms
    if (context.type == 'term context') return true;

// for formulae, bound variables not bounded by quantifiers are OK
    if (context.type == 'formula')
        return isLegalSentence(context.sentence, "ALL", [], true);

    var freeVariables = [];  // list of available free variables
    var i;

    for (i=0; i<context.environment.length; i++) {
        var assumption = context.environment[i];
        if (assumption.type == "letting" || assumption.type == "setting") {
            if (freeVariables.includes(assumption.variable.name)) {
                return false;  // assumptions involve repeated free variables
            } else {
                freeVariables.push(assumption.variable.name);
            }
        }
        if (assumption.type == "assuming" || assumption.type == "setting") {
            if (!isLegalSentence(assumption.sentence, freeVariables, [], false))
            {
                return false;
            }
        }
      }

    if (context.type == "sentence in environment")
        if (!isLegalSentence(context.sentence, freeVariables, [], false))
            return false;

    return true;
}


// return the list of assumptions associated to an environment box
function listAssumptions(env) {
    if (env.id == "root-environment") {
        return [];
    } else {
        var list = listAssumptions(env.parentElement).slice(0);
        list.push( env.assumption );
        return list;
    }
}


// convert obj to context, where object is either a sentence, a context, or a box
function toContext(obj) {
    if (obj instanceof Sentence) {
        return sentenceContext(obj, []);
    }

    if (obj instanceof Term) {
        return termContext(obj);
    }

    if (obj instanceof Context) {
        return obj;
    }

    if (obj instanceof FreeVariable) {
        return environmentContext([ toAssumption(obj) ]);
    }

    if (obj instanceof Assumption) {
        return environmentContext([obj]);
    }

    if (obj instanceof BoundVariable) {
        return toContext(toTerm(obj));
    }

    // only remaining possibility is that it is a sentencebox, formulabox, termBox or an environment

    if (obj.type == "environment") {
        return environmentContext(listAssumptions(obj));
    }

    if (obj.type == "sentenceBox") {
        var context = sentenceContext(obj.sentence, listAssumptions(obj.parentElement));
        return context;
    }

    if (obj.type == "formulaBox") {
        return formulaContext(obj.sentence);
    }

    if (obj.type == "termBox") {
        return termContext(obj.term);
    }

    error("Unrecognised type: " + obj.type);
    return new Context();

}





