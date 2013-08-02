/*! matchMedia() polyfill addListener/removeListener extension. Author & copyright (c) 2012: Scott Jehl. Dual MIT/BSD license */
(function(){
	// monkeypatch unsupported addListener/removeListener with polling
	if( !window.matchMedia( "all" ).addListener ){
		
		var wMM = window.matchMedia;
		var oldMM = function(q) {
			return wMM.call(window,q);
		}
		
		window.matchMedia = function( q ){
			var ret = oldMM( q ),
				listeners = [],
				last = ret.matches,
				timer,
				check = function(){
					var list = oldMM( q );
                                                
                                        //fire callbacks only if transitioning to or from matched state
					if( last != list.matches ){
						last = list.matches;
						for( var i =0, il = listeners.length; i< il; i++ ){
							try { listeners[ i ].call( ret, list ); }
							catch(ex) { setTimeout(function() { throw ex; },0) }
						}
					}
				};
			
			ret.addListener = function( cb ){
				if( listeners.indexOf(cb) == -1 ) {
					listeners.push( cb );
				}
				if( !timer ){
					timer = setInterval( check, 1000 );
				}
			};

			ret.removeListener = function( cb ){
				for( var i =0, il = listeners.length; i< il; i++ ){
					if( listeners[ i ] === cb ){
						listeners.splice( i, 1 ); break;
					}
				}
				if( !listeners.length && timer ){
					clearInterval( timer ); timer=undefined;
				}
			};
			
			return ret;
		};
	}
}());
