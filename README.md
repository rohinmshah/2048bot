2048bot
=======

An example Chrome extension that plays 2048 by continuously pressing left and down.  Its purpose is not to be a good AI for 2048 - that would require minimax or some similar algorithm - it is meant to demonstrate a non-trivial example of a Chrome extension, as well as how one would go about building it.

Installation
============

Open Chrome, and go to the Extensions page, either by typing chrome://extensions in the address bar, or by selecting Menu -> More Tools -> Extensions.  Check the "Developer mode" checkbox, and then click "Load unpacked extension".  Navigate to the folder which you would like to install (for example, `2048bot/v1`).  If you already have 2048 open, you will have to refresh the page in order for the extension to have an effect.

Development Process
===================

Google "chrome extension development".  Find the [Getting Started](https://developer.chrome.com/extensions/getstarted) page for Chrome Extensions.  By following the instructions there, we create a browser action with a simple popup html page.  We don't bother with the `popup.js` and `popup.html` pages that are used there - we're only going to use this as a starting point for our extension, so we'll get rid of `popup.js` and we'll have a very simple `popup.html` that just says "Blank" for now.  Instead of using the provided icon, we go to the 2048 game, and look at the source html in order to find their icon, which we then download and use as our own icon.

At this point, the extension should look like the one in `2048bot/v1`.  We have an always-visible button that when clicked displays a simple HTML page saying "Blank" as a popup.

The bottom of the Getting Started page suggests going through the [Overview](https://developer.chrome.com/extensions/overview) as the next step.  So, we go through it and learn about page actions, the manifest file, the background page, and content scripts.
