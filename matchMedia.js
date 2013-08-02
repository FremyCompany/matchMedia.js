/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas. Dual MIT/BSD license */

window.matchMedia = window.matchMedia || (function( doc, undefined ) {

  "use strict"; var element;
  return function(q){

    if(!element) {
        var head = doc.head || doc.documentElement.firstElementChild || doc.getElementsByTagName('head')[0],
        element = doc.createElement( "style" );
        element.id = "css-mq-test";
        element.innerHTML = "#css-mq-test { font-size:666px; }>";
        head.insertBefore(element,head.firstChild);
    }
    
    element.setAttribute('media', q);
    var result = (getComputedStyle ? getComputedStyle(element) : element.currentStyle).fontSize !== '666px';

    return {
      matches: result,
      media: q
    };

  };

}( document ));
