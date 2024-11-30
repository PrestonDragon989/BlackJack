var GHPATH = '/BlackJack';
var APP_PREFIX = 'bj_';
var VERSION = 'version_00';
var URLS = [    
  `${GHPATH}/`,
  `${GHPATH}/index.html`,
  `${GHPATH}/styles.css`,
  
  `${GHPATH}/pixel_font.ttf`,
  
  `${GHPATH}/blackjack.js`,
  
  `${GHPATH}/scripts/deck.mjs`,
  `${GHPATH}/scripts/logic.mjs`,
  `${GHPATH}/scripts/players.mjs`,

  `${GHPATH}/scripts/input/base.mjs`,
  `${GHPATH}/scripts/input/game.mjs`,
  `${GHPATH}/scripts/input/start.mjs`,

  `${GHPATH}/scripts/graphics/shapes.mjs`,
  `${GHPATH}/scripts/graphics/menu.mjs`,
  `${GHPATH}/scripts/graphics/gameplay.mjs`,

  `${GHPATH}/card-images/blank.png`,
  `${GHPATH}/card-images/club-card.png`,
  `${GHPATH}/card-images/diamond-cards.png`,
  `${GHPATH}/card-images/heart-cards.png`,
  `${GHPATH}/card-images/spade-cards.png`,
  `${GHPATH}/card-images/favicon.png`
]

var CACHE_NAME = APP_PREFIX + VERSION
self.addEventListener('fetch', function (e) {
  console.log('Fetch request : ' + e.request.url);
  e.respondWith(
    caches.match(e.request).then(function (request) {
      if (request) { 
        console.log('Responding with cache : ' + e.request.url);
        return request
      } else {       
        console.log('File is not cached, fetching : ' + e.request.url);
        return fetch(e.request)
      }
    })
  )
})

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('Installing cache : ' + CACHE_NAME);
      return cache.addAll(URLS)
    })
  )
})

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      var cacheWhitelist = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX)
      })
      cacheWhitelist.push(CACHE_NAME);
      return Promise.all(keyList.map(function (key, i) {
        if (cacheWhitelist.indexOf(key) === -1) {
          console.log('Deleting cache : ' + keyList[i] );
          return caches.delete(keyList[i])
        }
      }))
    })
  )
})
