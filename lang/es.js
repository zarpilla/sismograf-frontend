export default async (context, locale) => {
    const axios = require('axios').default

    return await new Promise((resolve) => {
        axios.get(context.env.API_URL + '/texts?pagination[pageSize]=9999')
            .then((response) => {
                const texts = response.data.data
                const messages = response.data.data.map(t => ({ key: t.attributes.key, value: t.attributes.text_es  }))
                let obj = messages.reduce((obj,item) => ({...obj,[item['key']]:item['value']}),{});
                resolve(obj)
            })
    })
}