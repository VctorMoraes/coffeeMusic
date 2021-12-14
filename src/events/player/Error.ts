import consola from 'consola';
import { RunPlayerFunction } from '../../contracts/Event';

export const run: RunPlayerFunction = async (player, error) => {
    consola.error(`Error: ${error} in ${player.getQueue.name}.`);
};

export const name = 'error';
