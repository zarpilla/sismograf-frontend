export default (context, inject) => {
    const hello = (msg) => console.log(`Hello ${msg}!`)

    const mean = (array) => {
        if (!array.length) return null
        const n = array.length
        const mean = array.reduce((a, b) => a + b) / n
        return mean
    }

    inject('mean', mean)
    // For Nuxt <= 2.12, also add 👇
    context.$mean = mean
  }