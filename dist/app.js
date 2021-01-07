"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var hbs_1 = __importDefault(require("hbs"));
var forecast_1 = require("./forecast");
var resources_enum_1 = require("./resources.enum");
var server = express_1.default();
var port = process.env.PORT || 3001;
console.log('Start ...');
var publicDir = path_1.default.join(path_1.default.dirname(__dirname), resources_enum_1.RECOURCES.PUBLIC);
var templatesPath = path_1.default.join(path_1.default.dirname(__dirname), resources_enum_1.RECOURCES.TEMPLATES);
var partialsPath = path_1.default.join(path_1.default.dirname(__dirname), resources_enum_1.RECOURCES.PARTIALS);
server.set('view engine', 'hbs');
server.set('views', templatesPath);
hbs_1.default.registerPartials(partialsPath);
server.use(express_1.default.static(publicDir));
server.get('', function (req, res) {
    res.render('index', {
        title: 'Home page',
        name: 'hbs'
    });
});
server.get('/about', function (req, res) {
    res.render('about', {
        title: 'about page',
        name: 'hbs'
    });
});
server.get('/help', function (req, res) {
    res.render('help', {
        title: 'help page',
        name: 'hbs'
    });
});
server.get('/weather', function (req, res) {
    if (!req.query.address) {
        res.send({
            forecast: 'None',
            location: 'None'
        });
        return;
    }
    try {
        forecast_1.getForecast(req.query.address).then(function (forecastData) {
            if (!forecastData || forecast_1.isForecastError(forecastData)) {
                res.send(forecastData);
                return;
            }
            res.send({
                forecast: forecastData.forecast,
                location: req.query.address
            });
        });
    }
    catch (e) {
        console.error(e);
    }
});
server.get('/help/*', function (req, res) {
    res.render('404', {
        errorMessage: 'Help article not found'
    });
});
server.get('*', function (req, res) {
    res.render('404', {
        errorMessage: 'Page not found'
    });
});
server.listen(port, function () {
    console.log("Server is up on port " + port + ".");
});
//# sourceMappingURL=app.js.map