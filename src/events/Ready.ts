import consola from 'consola';
import { RunFunction } from '../contracts/Event';

export const run: RunFunction = async () => {
    consola.success('Lets brew some coffee!');
};

export const name = 'ready';
