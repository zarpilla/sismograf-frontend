export default function(ctx) {
    if(ctx.route.params && ctx.route.params.slug) {
      ctx.redirect(301, `/?org=${ctx.route.params.slug}`)
    }
}