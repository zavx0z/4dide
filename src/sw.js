/* eslint-disable no-undef,no-restricted-globals */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js');
const {precacheAndRoute} = workbox.precaching
const {registerRoute} = workbox.routing;
const {CacheFirst, StaleWhileRevalidate} = workbox.strategies;
const {CacheableResponsePlugin} = workbox.cacheableResponse;
const {RangeRequestsPlugin} = workbox.rangeRequests;
const {BroadcastUpdatePlugin} = workbox.broadcastUpdate;
const {ExpirationPlugin} = workbox.expiration;

addEventListener('message', async (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        skipWaiting();
    }
});
// registerRoute(
//     /\.(?:png|gif|jpg|jpeg|webp|svg)$/,
//     new CacheFirst({
//         cacheName: 'images',
//         plugins: [
//             new ExpirationPlugin({
//                 maxEntries: 60,
//                 maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
//             }),
//         ],
//     })
// );
registerRoute(
    /\.(?:js)$/,
    new StaleWhileRevalidate({
        plugins: [
            new BroadcastUpdatePlugin(),
        ],
    })
);
registerRoute(
    // /\.(?:mp4|mpeg4|webm)$/,
    /.*\.webm/,
    new CacheFirst({
        cacheName: 'video',
        plugins: [
            new CacheableResponsePlugin({statuses: [200]}),
            new RangeRequestsPlugin(),
        ],
    }),
)

precacheAndRoute(self.__WB_MANIFEST)
