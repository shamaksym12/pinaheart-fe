const routes = module.exports = require('next-routes')();

routes.add('promo', '/promo', '/')

routes.add('google', '/google', '/');
routes.add('facebook', '/facebook', '/');

// routes.add('success-stories', '/success-stories');
routes.add('success-stories/story', '/success-stories/:slug');

routes.add('blogs', '/blogs');
routes.add('blogs/blog', '/blogs/:slug');

routes.add('recommend', '/recommend', '/recommend')

routes.add('cart', '/shop/cart', 'shop/cart')

routes.add('index', '/activate/:hash')
routes.add('recovery', '/recovery/:hash', '/recovery')
routes.add('paypal', '/redirect/:paypal', '/')
routes.add('login', '/login/:loginHash', '/')

routes.add('girls', '/girls', '/')
routes.add('men', '/men', '/')

routes.add('videocall', '/videocall', '/videocall')

routes.add('contacts', '/contacts/:slug')

routes.add('member', '/member/:id')
routes.add('memberLogin', '/member/:id/:loginHash', 'member')

routes.add('dialog', '/messages/dialog/:id', '/messages/dialog')

// routes.add('mail/draft', '/mail/draft/:id')
// routes.add('mail', '/mail/:slug')


routes.add('profile', '/profile/:slug')

routes.add('settings', '/settings/profile', '/settings')
routes.add('settingsBilling', '/settings/billing', '/settings/billing')
routes.add('settingsNotifications', '/settings/notifications', '/settings/notifications')


// routes.add('edit', '/edit/:slug')

// PROFILE ROUTES
routes.add('gallery', '/edit/gallery', '/edit/gallery')
routes.add('editProfile', '/edit/profile', '/edit/profile')
routes.add('editMatch', '/edit/match', '/edit/match')
routes.add('editInterest', '/edit/interest', '/edit/interest')
routes.add('editPersonality', '/edit/personality', '/edit/personality')

routes.add('search', '/search', '/search')

routes.add('results', '/results/:searchId', '/results')
routes.add('saved', '/search/saved', '/search/saved')
routes.add('searchEdit', '/search/saved/:searchId', '/search')
routes.add('by_id', '/search/by_id', '/search/by_id')

routes.add('aboutus', '/service/aboutus', '/service/aboutus')
routes.add('contactus', '/service/contactus', '/service/contactus')
routes.add('term', '/service/term', '/service/term')
routes.add('privacy', '/service/privacy', '/service/privacy')
routes.add('safety', '/service/safety', '/service/safety')