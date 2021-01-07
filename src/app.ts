import path from 'path';
import express from 'express';
import hbs from 'hbs';  
import { getForecast, isForecastError } from './forecast';
import { RECOURCES } from './resources.enum';

import { Request, Response } from 'express';

const server = express();
const port = process.env.PORT || 3001;

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
        res.send({
            forecast: 'None',
            location: 'None'
        });

        return;
    }

    try {
        getForecast(<string>req.query.address).then(forecastData => {
            if (!forecastData || isForecastError(forecastData)) {
                res.send(forecastData);
        
                return;
            }
        
            res.send({
                forecast: forecastData.forecast,
                location: req.query.address
            })
        })
        
    } catch (e) {
        console.error(e);
    }
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

server.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
})