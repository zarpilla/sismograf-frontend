export default function(ctx) {
    console.log('ctx.route', ctx.route)
    console.log('lang', process.env.LANG)
    
    if(ctx.route.path === '/' && process.env.LANG !== 'ca') {
      ctx.redirect(301, `/${process.env.LANG}`)
    }
}