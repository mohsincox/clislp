export const playerSpecification = (player) => {
    let p = JSON.parse(player.specification);
    let specification = [];
    for (const key in p) {
        if(p[key] === true) specification.push(key);
    }
    return specification.length ? <small>{specification.join(", ")}</small> : <small>Not Specified</small>;
}

export const footballPlayerSpecification = (player) => {
    let p = JSON.parse(player.specification);
    let specification = [];
    for (const key in p) {
        if(p[key] === true) specification.push(key);
    }
    return specification.length ? specification[0] : null;
}
