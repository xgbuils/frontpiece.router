var Router = require('../../')

// returning the user to the initial state
Router.navigate();
// adding routes
Router
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
Router.navigate('/products/12/edit/22');

document.getElementById('about').addEventListener('click', function () {
    Router.navigate('about')
})
document.getElementById('products').addEventListener('click', function () {
    Router.navigate('products/12/edit/2')
})