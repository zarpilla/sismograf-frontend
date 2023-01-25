export default function(ctx) {
    console.log('ctx.route', ctx.route)
    if(ctx.route.params && ctx.route.params.slug)
      ctx.redirect(301, `/?org=${ctx.route.params.slug}`)
}