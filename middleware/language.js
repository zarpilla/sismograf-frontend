export default function(ctx) {
    if(ctx.route.path === '/' && process.env.LANG !== 'ca') {
      ctx.redirect(301, `/${process.env.LANG}`)
    }
}