import axios from 'axios';
import { get as getNullSafe } from 'lodash';
import { Figure } from './Figure';

const SWAPI_URL = 'https://swapi.dev/api/';

export class FigureService {

    static async getFigure(figureName: string): Promise<Figure> {
        const response = await axios.get(SWAPI_URL + 'people/?search=' + encodeURI(figureName));
        console.log(response);
        return getNullSafe(response, 'data.results[0]');
    }
}