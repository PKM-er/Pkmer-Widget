export default eventHandler(async (context) => {
    context.res.setHeader('Cache-Control', 'public, max-age=604800'); //设置一周缓存
    context.res.setHeader('Expires', new Date(Date.now() + 604800000).toUTCString());
})