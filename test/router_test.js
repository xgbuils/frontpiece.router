var Router = require('../')
require('chai').should()
var url = require('url')
var objectAssign = require('object-assign')

describe('Router', function () {
	describe('location "http://sample.com/" and pushState false', function () {
        beforeEach(function () {
            this.location = LocationShim('http://sample.com/')
            this.router = new Router({
                location: this.location
            })
            this.router.start({
                pushState: false,
            })
        })
        describe('.getFragment', function () {
            it('returns correct path', function () {
                console.log(this.router.getFragment())
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
                this.location.href.should.be.equal('http://sample.com/#!/about')
            })
            it('getFragment() returns "about?foo=bar" when navigate to "about?foo=bar"', function () {
                this.router.navigate('about?foo=bar')
                this.router.getFragment().should.be.equal('about?foo=bar')
            })
            it('location is "http://sample.com/about?foo=bar" when navigate to "about?foo=bar"', function () {
                this.router.navigate('about?foo=bar')
                this.location.href.should.be.equal('http://sample.com/#!/about?foo=bar')
            })
            it('getFragment() returns "about/?foo=bar" when navigate to "about/?foo=bar"', function () {
                this.router.navigate('about/?foo=bar')
                this.router.getFragment().should.be.equal('about/?foo=bar')
            })
            it('location is "http://sample.com/about/?foo=bar" when navigate to "about/?foo=bar"', function () {
                this.router.navigate('about/?foo=bar')
                this.location.href.should.be.equal('http://sample.com/#!/about/?foo=bar')
            })
        })
    })
    describe('location "http://sample.com/index.html" and pushState false', function () {
        beforeEach(function () {
            this.location = LocationShim('http://sample.com/index.html')
            this.router = new Router({
                location: this.location
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
                this.location.href.should.be.equal('http://sample.com/index.html#!/about')
            })
            it('getFragment() returns "about?foo=bar" when navigate to "about?foo=bar"', function () {
                this.router.navigate('about?foo=bar')
                this.router.getFragment().should.be.equal('about?foo=bar')
            })
            it('location is "http://sample.com/index.html#!/about?foo=bar" when navigate to "about?foo=bar"', function () {
                this.router.navigate('about?foo=bar')
                this.location.href.should.be.equal('http://sample.com/index.html#!/about?foo=bar')
            })
            it('getFragment() returns "about/?foo=bar" when navigate to "about/?foo=bar"', function () {
                this.router.navigate('about/?foo=bar')
                this.router.getFragment().should.be.equal('about/?foo=bar')
            })
            it('location is "http://sample.com/index.html#!/about/?foo=bar" when navigate to "about/?foo=bar"', function () {
                this.router.navigate('about/?foo=bar')
                this.location.href.should.be.equal('http://sample.com/index.html#!/about/?foo=bar')
            })
        })
    })
    describe('location "http://sample.com/index.html" and pushState false', function () {
        beforeEach(function () {
            this.location = LocationShim('http://sample.com/section/')
            this.router = new Router({
                location: this.location
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
                this.location.href.should.be.equal('http://sample.com/section/#!/about')
            })
            it('getFragment() returns "about?foo=bar" when navigate to "about?foo=bar"', function () {
                this.router.navigate('about?foo=bar')
                this.router.getFragment().should.be.equal('about?foo=bar')
            })
            it('location is "http://sample.com/section/#!/about?foo=bar" when navigate to "about?foo=bar"', function () {
                this.router.navigate('about?foo=bar')
                this.location.href.should.be.equal('http://sample.com/section/#!/about?foo=bar')
            })
            it('getFragment() returns "about/?foo=bar" when navigate to "about/?foo=bar"', function () {
                this.router.navigate('about/?foo=bar')
                this.router.getFragment().should.be.equal('about/?foo=bar')
            })
            it('location is "http://sample.com/about/?foo=bar" when navigate to "about/?foo=bar"', function () {
                this.router.navigate('about/?foo=bar')
                this.location.href.should.be.equal('http://sample.com/section/#!/about/?foo=bar')
            })
        })
    })
});

function LocationShim(uri) {
    return  {
        href: uri
    }
}