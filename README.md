2048bot
=======

An example Chrome extension that plays 2048 by continuously pressing left and down.  Its purpose is not to be a good AI for 2048 - that would require minimax or some similar algorithm - it is meant to demonstrate a non-trivial example of a Chrome extension, as well as how one would go about building it.

The latest version is the only one that has full functionality.  The earlier versions are meant to show how progress was made during development of the extension, and so has very little functionality, with many important pieces of code replaced by stubs.

Installation
============

Open Chrome, and go to the Extensions page, either by typing chrome://extensions in the address bar, or by selecting Menu -> More Tools -> Extensions.  Check the "Developer mode" checkbox, and then click "Load unpacked extension".  Navigate to the folder which you would like to install (for example, `2048bot/v1`).  If you already have 2048 open, you will have to refresh the page in order for the extension to have an effect.

Development Process
===================

This section describes how a good programmer might approach this problem, assuming that said programmer had never written a Chrome extension before.  The idea is to help teach both how to write a Chrome extension *and* how to get started using some technology you haven't seen before.  (Spoiler:  You *don't* need someone to teach you - often, Google suffices.)

Google "chrome extension development".  Find the [Getting Started](https://developer.chrome.com/extensions/getstarted) page for Chrome Extensions.  By following the instructions there, we create a browser action with a simple popup html page.  We don't bother with the `popup.js` and `popup.html` pages that are used there - we're only going to use this as a starting point for our extension, so we'll get rid of `popup.js` and we'll have a very simple `popup.html` that just says "Blank" for now.  Instead of using the provided icon, we go to the 2048 game, and look at the source html in order to find their icon, which we then download and use as our own icon.

At this point, the extension should look like the one in `2048bot/v1`.  We have an always-visible button that when clicked displays a simple HTML page saying "Blank" as a popup.

The bottom of the Getting Started page suggests going through the [Overview](https://developer.chrome.com/extensions/overview) as the next step.  So, we go through it and learn about page actions, the manifest file, the background page, and content scripts.  There is a link to the [developer guide](https://developer.chrome.com/extensions/devguide), which we keep open permanently.

At this point we realize that what we want is a page action, not a browser action, because we only want our extension to affect 2048.  From the development guide, we look up [page actions](https://developer.chrome.com/extensions/pageAction).  The description is not particularly helpful - we already knew most of the material by reading the previous page.  Rather than try to parse through the documentation, we go to the [examples section](http://src.chromium.org/viewvc/chrome/trunk/src/chrome/common/extensions/docs/examples/api/pageAction/) from that page.  Since we want to make a Chrome extension that only appears for 2048, we want the [page action by url](http://src.chromium.org/viewvc/chrome/trunk/src/chrome/common/extensions/docs/examples/api/pageAction/pageaction_by_url/) example.

In this example, looking at `background.js` and `manifest.json` and comparing against the ones in `v1`, we figure out the changes that we need to make.  If we just copy the code directly, we would match any URL with a 'g', instead of just 2048.  Using Google allows us to figure out that we should be using `hostEquals` instead of `urlContains` in our `conditions` in `background.js`.  By now we also realize that our extension doesn't really need a popup html page (what would we put on it?) and so we delete `popup.html`.

Now our extension looks like the one in `2048bot/v2`.  For just the 2048 tab, we display an icon (which currently does nothing, even when it is clicked).

The next step is to get the extension to actually do something when we click on the icon.  To get started, we look for a simple example that we can copy from on the [Samples](https://developer.chrome.com/extensions/samples) page, and the Page Redder example is intriguing - it's one of the simplest things you could think of doing with an extension (which is great - that means it will be easier to understand).  Looking at the `background.js`, we copy over the code that makes the page red.  We notice that this is code for a *browser* action, whereas we have a *page* action, and so we change `browser` to `page` in the code so that it works for page actions instead.  When we actually try to run this code, nothing happens.  So, we open the debugging tool for the background page (under the Extensions page, click on "Inspect views: background page").  On this page, we notice that whenever we click the page action icon, an error message shows up:

    Unchecked runtime.lastError while running tabs.executeScript: Cannot access contents of url "http://gabrielecirulli.github.io/2048/". Extension manifest must request permission to access this host.
        at chrome-extension://bcdlmfcoojdclpgglklbcopfiibfpkld/background.js:25:15`

The error message is quite clear - we are missing some sort of permission.  And in fact, if we look at the `manifest.json` for the Page Redder example, we notice that they do request the `activeTab` permission.  Once we add this permission, it works as expected.  Now, the extensionlooks like the one in `2048bot/v3`.  It turns the background of the 2048 game red.
