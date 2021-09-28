import consola from 'consola';
import { RunPlayerFunction } from '../../contracts/Event';

export const run: RunPlayerFunction = async (player, error, queue) => {
    consola.error(`Error: ${error} in ${queue.guild.name}.`);
};

export const name = 'error';
