import path from 'path';
import express from 'express';
import hbs from 'hbs';  
// local modules
import { getForecast, isForecastError } from './forecast';
import { RECOURCES } from './resources.enum';
import {ForecastError, ForecastObject} from './types/forecast';

import { Request, Response } from 'express';

const server = express();

console.log('Start ...');
const publicDir = path.join(path.dirname(__dirname), RECOURCES.PUBLIC);
const templatesPath = path.join(path.dirname(__dirname), RECOURCES.TEMPLATES);
const partialsPath = path.join(path.dirname(__dirname), RECOURCES.PARTIALS);

server.set('view engine', 'hbs');
server.set('views', templatesPath);
hbs.registerPartials(partialsPath);
server.use(express.static(publicDir));

server.get('', (req: Request, res: Response) => {
    res.render('index', {
        title: 'Home page',
        name: 'hbs'
    });
})

server.get('/about', (req: Request, res: Response) => {
    res.render('about', {
        title: 'about page',
        name: 'hbs'
    })
})

server.get('/help', (req: Request, res: Response) => {
    res.render('help', {
        title: 'help page',
        name: 'hbs'
    })
})

server.get('/weather', (req: Request, res: Response) => {
    if (!req.query.address) {
        res.render('weather', {
            title: 'Weather page',
            error: 'Error'
        });

        return;
    }

    try {
        getForecast(<string>req.query.address).then(forecastData => {
            if (!forecastData || isForecastError(forecastData)) {
                res.send(forecastData);
        
                return;
            }
        
            // res.send(forecastData)
        
            res.render('weather', {
                title: 'Weather page',
                forecast: forecastData.forecast,
                location: req.query.address
            })
        })
        
    } catch (e) {
        console.error(e);
    }
})

server.get('/products', (req: Request, res: Response) => {
    console.log(req.query);
    if (!req.query.search) {
        res.send({
            error: 'Please provide a search query'
        });

        return;
    }
    res.send({
        products: []
    })
})

server.get('/help/*', (req: Request, res: Response) => {
    res.render('404', {
        errorMessage: 'Help article not found'
    })
})

server.get('*', (req: Request, res: Response) => {
    res.render('404', {
        errorMessage: 'Page not found'
    })
})


// server.com
// server.com/help
// server.com/about

server.listen(3001, () => {
    console.log('Server is up on port 3001.');
})