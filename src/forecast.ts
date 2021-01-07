import { ForecastError, ForecastObject } from './types/forecast.d';

const fetch = require('node-fetch');

export function getForecast(location: string): Promise<ForecastError | ForecastObject> {
    const errorMessage: ForecastError = {error: 'API request has failed.'}

    if (!location) {
        return Promise.resolve(errorMessage);
    }

    const url = `http://api.weatherstack.com/current?access_key=e64cd630d96d952107ecd3d2609d3b78&query=${location}`;

    try {
        return fetch(url).then((response: any) => response.json())
            .then((data: any) => {
                const error = data.error;
                if (error && error.code === 615) {
                    return {
                        error: 'API request has failed.'
                    }
                }
                const current = data.current;
                
                return {
                    forecast: `${current.weather_descriptions[0]}. It is curently ${current.temperature} 
                        degress out. It feels like ${current.feelslike} degress out.`
                }
            });
        
    } catch (e) {
        console.error(e);
        return Promise.resolve(errorMessage);
    }
    
}

export function isForecastError(data: ForecastError | ForecastObject): data is ForecastError {
    return (data as ForecastError).error !== undefined;
}
