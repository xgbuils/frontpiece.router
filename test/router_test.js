var Router = require('../')
require('chai').should()
var url = require('url')
var objectAssign = require('object-assign')

describe('Router', function () {
    describe('location "http://sample.com/" and pushState false', function () {
        beforeEach(function () {
            this.window = WindowShim('http://sample.com/')
            this.router = new Router({
                mock: {
                    window: this.window
                }
            })
            this.router.start({
                pushState: false,
            })
        })
        describe('.getFragment', function () {
            it('returns correct path', function () {
                this.router.getFragment().should.be.equal('')
            })
        })
        describe('.navigate', function () {
            it('getFragment() returns "about" when navigate to "about"', function () {
                this.router.navigate('about')
                this.router.getFragment().should.be.equal('about')
            })
            it('location is "http://sample.com/about" when navigate to about', function () {
                this.router.navigate('about')
                this.window.location.href.should.be.equal('http://sample.com/#!/about')
            })
            it('getFragment() returns "about?foo=bar" when navigate to "about?foo=bar"', function () {
                this.router.navigate('about?foo=bar')
                this.router.getFragment().should.be.equal('about?foo=bar')
            })
            it('location is "http://sample.com/about?foo=bar" when navigate to "about?foo=bar"', function () {
                this.router.navigate('about?foo=bar')
                this.window.location.href.should.be.equal('http://sample.com/#!/about?foo=bar')
            })
            it('getFragment() returns "about/?foo=bar" when navigate to "about/?foo=bar"', function () {
                this.router.navigate('about/?foo=bar')
                this.router.getFragment().should.be.equal('about/?foo=bar')
            })
            it('location is "http://sample.com/about/?foo=bar" when navigate to "about/?foo=bar"', function () {
                this.router.navigate('about/?foo=bar')
                this.window.location.href.should.be.equal('http://sample.com/#!/about/?foo=bar')
            })
        })
    })
    describe('location "http://sample.com/index.html" and pushState false', function () {
        beforeEach(function () {
            this.window = WindowShim('http://sample.com/index.html')
            this.router = new Router({
                mock: {
                    window: this.window
                }
            })
            this.router.start({
                pushState: false,
            })
        })
        describe('.getFragment', function () {
            it('returns correct path', function () {
                this.router.getFragment().should.be.equal('')
            })
        })
        describe('.navigate', function () {
            it('getFragment() returns "about" when navigate to "about"', function () {
                this.router.navigate('about')
                this.router.getFragment().should.be.equal('about')
            })
            it('location is "http://sample.com/index.html#!/about" when navigate to about', function () {
                this.router.navigate('about')
                this.window.location.href.should.be.equal('http://sample.com/index.html#!/about')
            })
            it('getFragment() returns "about?foo=bar" when navigate to "about?foo=bar"', function () {
                this.router.navigate('about?foo=bar')
                this.router.getFragment().should.be.equal('about?foo=bar')
            })
            it('location is "http://sample.com/index.html#!/about?foo=bar" when navigate to "about?foo=bar"', function () {
                this.router.navigate('about?foo=bar')
                this.window.location.href.should.be.equal('http://sample.com/index.html#!/about?foo=bar')
            })
            it('getFragment() returns "about/?foo=bar" when navigate to "about/?foo=bar"', function () {
                this.router.navigate('about/?foo=bar')
                this.router.getFragment().should.be.equal('about/?foo=bar')
            })
            it('location is "http://sample.com/index.html#!/about/?foo=bar" when navigate to "about/?foo=bar"', function () {
                this.router.navigate('about/?foo=bar')
                this.window.location.href.should.be.equal('http://sample.com/index.html#!/about/?foo=bar')
            })
        })
    })
    describe('location "http://sample.com/index.html" and pushState false', function () {
        beforeEach(function () {
            this.window = WindowShim('http://sample.com/section/')
            this.router = new Router({
                mock: {
                    window: this.window
                }
            })
            this.router.start({
                pushState: false,
            })
        })
        describe('.getFragment', function () {
            it('returns correct path', function () {
                this.router.getFragment().should.be.equal('')
            })
        })
        describe('.navigate', function () {
            it('getFragment() returns "about" when navigate to "about"', function () {
                this.router.navigate('about')
                this.router.getFragment().should.be.equal('about')
            })
            it('location is "http://sample.com/section/#!/about" when navigate to about', function () {
                this.router.navigate('about')
                this.window.location.href.should.be.equal('http://sample.com/section/#!/about')
            })
            it('getFragment() returns "about?foo=bar" when navigate to "about?foo=bar"', function () {
                this.router.navigate('about?foo=bar')
                this.router.getFragment().should.be.equal('about?foo=bar')
            })
            it('location is "http://sample.com/section/#!/about?foo=bar" when navigate to "about?foo=bar"', function () {
                this.router.navigate('about?foo=bar')
                this.window.location.href.should.be.equal('http://sample.com/section/#!/about?foo=bar')
            })
            it('getFragment() returns "about/?foo=bar" when navigate to "about/?foo=bar"', function () {
                this.router.navigate('about/?foo=bar')
                this.router.getFragment().should.be.equal('about/?foo=bar')
            })
            it('location is "http://sample.com/about/?foo=bar" when navigate to "about/?foo=bar"', function () {
                this.router.navigate('about/?foo=bar')
                this.window.location.href.should.be.equal('http://sample.com/section/#!/about/?foo=bar')
            })
        })
    })
    describe('pushState true', function () {
        beforeEach(function () {
            this.start = function (location) {
                this.window = WindowShim(location)
                this.router = new Router({
                    mock: {
                        window: this.window
                    }
                })
                this.router.start({
                    pushState: true,
                })
            }
            
        })
        describe('.getFragment', function () {
            it('returns correct path', function () {
                this.start('http://sample.com/')
                this.router.getFragment().should.be.equal('')
            })
        })
        describe('.navigate', function () {
            it('getFragment() returns "about" when navigate to "about"', function () {
                this.start('http://sample.com/index.html')
                this.router.navigate('about')
                this.router.getFragment().should.be.equal('about')
            })
            it('location is "http://sample.com/about" when navigate to "/about"', function () {
                this.start('http://sample.com/')
                this.router.navigate('/about')
                if (this.router.options.pushState) {
                    this.window.location.href.should.be.equal('http://sample.com/about')
                } else {
                    this.window.location.href.should.be.equal('http://sample.com/#!/about')
                }
            })
            it('getFragment() returns "about?foo=bar" when navigate to "about?foo=bar"', function () {
                this.start('http://sample.com/section/index.php')
                this.router.navigate('about?foo=bar')
                this.router.getFragment().should.be.equal('about?foo=bar')
            })
            it('location is "http://sample.com/section/about?foo=bar" when navigate to "/section/about?foo=bar"', function () {
                this.start('http://sample.com/')
                this.router.navigate('/section/about/?foo=bar')
                if (this.router.options.pushState) {
                    this.window.location.href.should.be.equal('http://sample.com/section/about/?foo=bar')
                } else {
                    this.window.location.href.should.be.equal('http://sample.com/#!/section/about/?foo=bar')
                }
            })
            it('getFragment() returns "about/?foo=bar" when navigate to "about/?foo=bar"', function () {
                this.start('http://sample.com')
                this.router.navigate('about/me/')
                this.router.getFragment().should.be.equal('about/me')
            })
            it('location is "http://sample.com/about/?foo=bar" when navigate to "about/?foo=bar"', function () {
                this.start('http://sample.com')
                this.router.navigate('/about/me')
                if (this.router.options.pushState) {
                    this.window.location.href.should.be.equal('http://sample.com/about/me')
                } else {
                    this.window.location.href.should.be.equal('http://sample.com/#!/about/me')
                }
            })
        })
    })
});

function parseUrl (uri) {
    var location = url.parse(uri)
    Object.keys(location).forEach(function (e) {
        location[e] || (location[e] = '')
    })
    return location
}

function WindowShim (uri) {
    var _window = {
        location: parseUrl(uri)
    }
    _window.history = {
        pushState: function (state, title, path) {
            var uri = url.resolve(_window.location.href, path)
            _window.location = parseUrl(uri)
        }
    }
    return _window
}
