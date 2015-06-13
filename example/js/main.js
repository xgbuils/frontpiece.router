var Router = require('../../')

var router = new Router()
// returning the user to the initial state
router.navigate();
// adding routes
router
.on(/about/, function() {
    console.log('about');
})
.on(/products\/(.*)\/edit\/(.*)/, function() {
    console.log('products', arguments);
})
.on(function() {
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