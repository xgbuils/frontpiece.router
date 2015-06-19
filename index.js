var objectAssign = require('object-assign')

var defaults = {
    setHash: function (window, hash) {
        var location = window.location
        location.href = location.href.replace(/#(.*)$/, '') + '#!' + hash
    },
    getHash: function (window) {
        var match = window.location.href.match(/#(.*)$/)
        return match ? match[1] : ''
    },
    pushState: function (window, url) {
        window.history.pushState(null, null, url)
    },
    getState: function (window) {
        var location = window.location
        return decodeURI(location.pathname + location.search + this.getHash())
    }
}

var Router = function (options) {
    options || (options = {})
    this.routes  = []
    this.options = {
        pushState: true,
    }
    var mock = options.mock || {}
    var _window = mock.window || window
    var self = this
    ;['setHash', 'getHash', 'pushState', 'getState'].forEach(function (method) {
        self[method] = function () {
            var args = [].slice.call(arguments)
            return defaults[method].apply(self, [_window].concat(args))
        }
    })
}

objectAssign(Router.prototype, {
    constructor: Router,
    getFragment: function() {
        var options  = this.options
        var fragment = ''
        if(options.pushState) {
            fragment = this.getState()
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
        return this
    },
    remove: function(param) {
        for(var i = 0, r; i < this.routes.length, r = this.routes[i]; ++i) {
            if(r.handler === param || r.re.toString() === param.toString()) {
                this.routes.splice(i, 1)
                return this
            }
        }
        return this
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
        if (this._trigger) {
            fragment || (fragment = this.getFragment())
            for(var i = 0; i < this.routes.length; i++) {
                var match = fragment.match(this.routes[i].re)
                if(match) {
                    match.shift()
                    this.routes[i].handler.apply(this, match)
                    return this
                }
            }
        }
        return this
    },
    start: function(options) {
        var self = this
        options  = objectAssign(this.options, options)
        options.pushState && (options.pushState = 'onpopstate' in window && typeof history.pushState === 'function')
        this._onChangeFragment = function () {
            current = self.getFragment()
            self.trigger(current)
        }
        var eventName = options.pushState ? 'popstate' : 'hashchange'
        window.addEventListener(eventName, this._onChangeFragment)
        
        return this
    },
    navigate: function(path, options) {
        options = objectAssign(this.options, options)
        path = path ? this.clearSlashes(path) : ''
        if(options.pushState) {
            var current = this.getFragment()
            if (current !== path) {
                this.pushState('/' + path)
                this._trigger = options.trigger
                this.trigger(path)
            }
        } else {
            this.setHash('/' + path)
        }
        return this
    }
})

module.exports = Router