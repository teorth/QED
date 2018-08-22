# QED
Repository for the QED interactive text and possible extensions


This project was initially created by Terence Tao and released on July 28, 2018 at http://www.math.ucla.edu/~tao/QED/QED.html .  On Aug 21, 2018, the project was uploaded to github in order to open up the project to other coders.   

The original code is stored in the folder "Original interactive text".  It consists of three main files:

QED.html - the web page for the text.  Consists mainly of CSS styling, loading of the javascript elements from the other two files, and listing the exercises, notes, and solutions of the text.

logic.js - the code for the logical elements of the text (terms, operators, sentences, contexts, etc..).  The most complex portion of the code is probably the matching algorithms that look for all the possible deductions that can be made from selected sentences given the laws available.

gui.js - code for buttons, boxes, and other GUI elements.

The three files are not as decoupled from each other as one would like, so a first step may be to move the code to another format in which the GUI is not entangled with the code or the text.
