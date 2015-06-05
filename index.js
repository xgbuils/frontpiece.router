var objectAssign = require('object-assign')

var Router = {
    routes: [],
    options: {
        pushState: true,
        root: '/'
    },
    getFragment: function() {
        var options = this.options
        var fragment = ''
        if(options.pushState) {
            fragment = this.clearSlashes(decodeURI(location.pathname + location.search))
            fragment = fragment.replace(/\?(.*)$/, '')
            fragment = options.root !== '/' ? fragment.replace(options.root, '') : fragment
        } else {
            var match = window.location.href.match(/#!\/(.*)$/);
            fragment = match ? match[1] : ''
        }
        return this.clearSlashes(fragment)
    },
    clearSlashes: function(path) {
        return path.toString().replace(/\/$/, '').replace(/^\//, '')
    },
    add: function(re, handler) {
        if(typeof re == 'function') {
            handler = re;
            re = '';
        }
        this.routes.push({ re: re, handler: handler});
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
        this.routes = [];
        options.pushState = undefined;
        options.root = '/';
        return this;
    },
    check: function(f) {
        var fragment = f || this.getFragment();
        for(var i=0; i<this.routes.length; i++) {
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
        options.root = '/' + this.clearSlashes(options.root)
        this._onChangeFragment = function () {
            current = self.getFragment();
            self.check(current);
        }
        var eventName = options.pushState ? 'popstate' : 'hashchange'
        window.addEventListener(eventName, this._onChangeFragment)
        return this;
    },
    navigate: function(path, options) {
        options = objectAssign(this.options, options)
        path = path ? this.clearSlashes(path) : ''
        if(options.pushState) {
            var current = this.getFragment()
            if (current !== path) {
                var fragment = options.root + path
                history.pushState(null, null, fragment);
                this.check(fragment)
            }
        } else {
            window.location.href = window.location.href.replace(/#(.*)$/, '') + '#!/' + path;
        }
        return this;
    }
}

module.exports = Router