# QED

Repository for the QED interactive text and possible extensions

Try the latest version at: https://teorth.github.io/QED/QED.html

This project was initially created by Terence Tao and released on July 28,
2018 at http://www.math.ucla.edu/~tao/QED/QED.html (old version). On Aug 21,
2018, the project was uploaded to GitHub in order to open up the project to
other coders.


## File Structure

The source code is stored in the [`docs`](docs) folder (to permit
[auto-deploying the code using GitHub Pages][github-publishing]). It consists
of three main files:

1. [`QED.html`](docs/QED.html) - the web page for the text. Consists mainly
of CSS styling, loading of the javascript elements from the other two files,
and listing the exercises, notes, and solutions of the text.

2. [`logic.js`](docs/logic.js) - the code for the logical elements of the
text (terms, operators, sentences, contexts, etc.). The most complex portion
of the code is probably the matching algorithms that look for all the
possible deductions that can be made from selected sentences given the laws
available.

3. [`gui.js`](docs/gui.js) - code for buttons, boxes, and other GUI elements.

In addition there is a text file at [`classes.txt`](docs/classes.txt) that
gives a "cheat sheet" summary of the main data structures used in the
javascript code.

## History

The version history can be found here: [`HISTORY.md`](HISTORY.md).

## License

The code is open source under the [MIT License](LICENSE).


[github-publishing]: https://help.github.com/articles/configuring-a-publishing-source-for-github-pages/#publishing-your-github-pages-site-from-a-docs-folder-on-your-master-branch
