REACT PWA SCREEN MANAGER
========================

Almost each time I make a progressive web app, it has to look'n'feel as a "native app".

One of the main feature that make your (web)app feels like "native" is the screen change transition : each screen change should completely reload the page and re-render everything ? or the old screen should smoothly go away from the viewport in a nice translation animation while the next one is coming from the other side ?

This repository brings a set of React component in order to help you manage those screens transitions

Note : And because, we are on the web, each page change should be associated with a change in the page url, so be aware that this component set is shipped with "react router" (built-in).

To build examples, run 
```shell
WEBPACK_TARGET='examples' webpack
```