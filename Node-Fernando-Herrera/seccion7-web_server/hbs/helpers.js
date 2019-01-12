const hbs = require('hbs');

//Los helpers son funciones que puedo reusar en las views hbs
hbs.registerHelper('getFooter', () => {
    return 'Brayan '+new Date().getFullYear();
});