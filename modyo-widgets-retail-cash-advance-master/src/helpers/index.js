/* eslint-disable func-names */
/**
Get the params from an url
Usage:
If url is: http://somesite.com/seach?query=yyy&myParam=xxxx
to get the myParam value:
getURLParams("myParam")
For more power needs:
http://stackoverflow.com/a/19965480
https://github.com/sindresorhus/query-string
*/

// DEBOUNCE
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
export default function debounce(func, wait, immediate) {
  let timeout;
  return function (...args) {
    const context = this;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
