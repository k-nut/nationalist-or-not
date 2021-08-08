// When running `parcel serve`, parcel will by default set the new
// Cross-Origin-Embedder-Policy header. This header forbids us from
// loading thumbnails from wikipedia. We disable it here as it also
// won't be enabled when the app is deployed.
module.exports = function (app) {
    app.use((req, res, next) => {
        res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none')
        next()
    })
}
