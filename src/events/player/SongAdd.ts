import consola from 'consola';
import { RunPlayerFunction } from '../../contracts/Event';

export const run: RunPlayerFunction = async (player, queue, song) => {
    consola.success(`${song.name} added to queue.`);
};

export const name = 'songAdd';
