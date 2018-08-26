# QED

Repository for the QED interactive text and possible extensions

Try the latest version at: <https://teorth.github.io/QED/>

This project was initially created by Terence Tao and released on July 28,
2018 at http://www.math.ucla.edu/~tao/QED/QED.html (old version). On Aug 21,
2018, the project was uploaded to GitHub in order to open up the project to
other coders.


## File Structure

The source code is stored in the [`docs`](docs) folder (to permit
[auto-deploying the code using GitHub Pages][github-publishing]). It consists
of these main files:

1. [`index.html`](docs/index.html) - the web page for the text.

2. [`main.css`](docs/main.css) - CSS stylesheet.

3. JavaScript ([`docs/js`](docs/js) folder)

   * [`logic.js`](docs/js/logic.js) - the code for the logical elements of the
     text (terms, operators, sentences, contexts, etc.). The most complex
     portion of the code is probably the matching algorithms that look for
     all the possible deductions that can be made from selected sentences
     given the laws available.

   * [`gui.js`](docs/js/gui.js) - code for buttons, boxes, and other GUI
     elements.

   * [`main.js`](docs/js/main.js) - mainly loads the content (exercises, notes,
     solutions, etc) into the HTML document.

In addition there is a text file at [`classes.txt`](docs/classes.txt) that
gives a "cheat sheet" summary of the main data structures used in the
javascript code.

## History

The version history can be found here: [`HISTORY.md`](HISTORY.md).

## License

The code is open source under the [MIT License](LICENSE).


[github-publishing]: https://help.github.com/articles/configuring-a-publishing-source-for-github-pages/#publishing-your-github-pages-site-from-a-docs-folder-on-your-master-branch
