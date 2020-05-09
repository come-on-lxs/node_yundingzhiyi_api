const base={
    url: '127.0.0.1',
    port: '8007'
}

const db={
    url:'127.0.0.1',
    port:'27017',
    username: 'outfood_root',
    password: '2416728360',
    name:'outfood'
}

const jwt= {
    secret: '2416728360',
    expressTime: 1000 * 60 * 60 * 24
}

module.exports={
    db,
    jwt,
    base
};