var port = 3002;

module.exports = {
    'port' : port,
    'facebookAuth' : {
        'clientID'      : '232856214115582',
        'clientSecret'  : 'edca63f6b029956369aae5d495222191',
        'callbackURL'   : 'https://localhost:' + port + '/auth/facebook/callback'
    },
    'googleAuth' : {
        'clientID'      : '1058685021114-0na9baq82q17hon6709ct8gine9vsk2s.apps.googleusercontent.com',
        'clientSecret'  : 'TydG-nOhZQrRht3CW-5H5xjq',
        'callbackURL'   : 'http://localhost:' + port + '/auth/google/callback'
    }
};
