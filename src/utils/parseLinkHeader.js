function parseLinkHeader(header) {
    if (!header || !header.length) return null

    let parts = header.split(','),
        links = {}
    
    parts.forEach(part => {
        let section = part.split(';')
        if (section.length !== 2) return null

        const url = section[0].replace(/<(.*)>/, '$1').trim()
        const name = section[1].replace(/rel="(.*)"/, '$1').trim()
        links[name] = url
    })

    return links
}

export default parseLinkHeader