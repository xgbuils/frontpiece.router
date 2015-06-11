(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Router = require('../../')

var router = new Router()
// returning the user to the initial state
router.navigate();
// adding routes
router
.add(/about/, function() {
    console.log('about');
})
.add(/products\/(.*)\/edit\/(.*)/, function() {
    console.log('products', arguments);
})
.add(function() {
    console.log('default');
})
.start(/*{pushState: false}*/);
// forwarding
router.navigate('/products/12/edit/22');

document.getElementById('about').addEventListener('click', function () {
    router.navigate('about')
})
document.getElementById('products').addEventListener('click', function () {
    router.navigate('products/12/edit/2')
})
},{"../../":2}],2:[function(require,module,exports){
var objectAssign = require('object-assign')

var Router = function (options) {
    options || (options = {})
    this.routes  = []
    this.options = {
        pushState: true,
    }
    var location = options.location || window.location
    this.setHash = function (hash) {
        defaultSetHash(hash, location)
    }
    this.getHash = function () {
        return defaultGetHash(location)
    }
}

objectAssign(Router.prototype, {
    constructor: Router,
    getFragment: function() {
        var options  = this.options
        var fragment = ''
        if(options.pushState) {
            fragment = decodeURI(location.pathname + location.search + this.getHash())
        } else {
            fragment = this.getHash()
            fragment = /^!\//.test(fragment) ? fragment.substring(2) : ''
        }
        return this.clearSlashes(fragment)
    },
    clearSlashes: function(path) {
        return path.toString().replace(/\/$/, '').replace(/^\//, '')
    },
    addSlashes: function (path) {
        return (path ? '/': '') + path + '/'
    },
    add: function(re, handler) {
        if (typeof re === 'function') {
            handler = re
            re = ''
        }
        this.routes.push({ re: re, handler: handler})
        return this;
    },
    remove: function(param) {
        for(var i=0, r; i<this.routes.length, r = this.routes[i]; i++) {
            if(r.handler === param || r.re.toString() === param.toString()) {
                this.routes.splice(i, 1); 
                return this;
            }
        }
        return this;
    },
    stop: function() {
        var options   = this.options
        var eventName = options.pushState ? 'popstate' : 'hashchange'
        window.removeEventListener(eventName, this._onChangeFragment)
        this.routes = []
        options.pushState = undefined
        return this
    },
    check: function(f) {
        var fragment = f || this.getFragment();
        for(var i = 0; i < this.routes.length; i++) {
            var match = fragment.match(this.routes[i].re);
            if(match) {
                match.shift();
                this.routes[i].handler.apply({}, match);
                return this;
            }
        }
        return this;
    },
    start: function(options) {
        var self = this
        options  = objectAssign(this.options, options)
        options.pushState && (options.pushState = 'onpopstate' in window && typeof history.pushState === 'function')
        this._onChangeFragment = function () {
            console.log('holaaaaaa')
            current = self.getFragment();
            self.check(current);
        }
        var eventName = options.pushState ? 'popstate' : 'hashchange'
        window.addEventListener(eventName, this._onChangeFragment)

        
        return this
    },
    navigate: function(path, options) {
        options = objectAssign(this.options, options)
        path = path ? this.clearSlashes(path) : ''
        var fragment = this.clearSlashes(path)
        if(options.pushState) {
            var current = this.getFragment()
            if (current !== path) {
                history.pushState(null, null, '/' + fragment);
                this.check(path)
            }
        } else {
            this.setHash(fragment)
        }
        return this
    }
})

function defaultSetHash(hash, location) {
    location.href = location.href.replace(/#(.*)$/, '') + '#!' + hash
}

function defaultGetHash(location) {
    var match = location.href.match(/#(.*)$/)
    return match ? match[1] : ''
}

module.exports = Router
},{"object-assign":3}],3:[function(require,module,exports){
'use strict';

function ToObject(val) {
	if (val == null) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

module.exports = Object.assign || function (target, source) {
	var from;
	var keys;
	var to = ToObject(target);

	for (var s = 1; s < arguments.length; s++) {
		from = arguments[s];
		keys = Object.keys(Object(from));

		for (var i = 0; i < keys.length; i++) {
			to[keys[i]] = from[keys[i]];
		}
	}

	return to;
};

},{}]},{},[1]);
