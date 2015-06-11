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
    on: function(re, handler) {
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
    trigger: function(fragment) {
        fragment || (fragment = this.getFragment())
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
            current = self.getFragment();
            self.trigger(current);
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
                this.trigger(path)
            }
        } else {
            this.setHash('/' + fragment)
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