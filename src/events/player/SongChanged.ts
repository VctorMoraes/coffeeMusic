import consola from 'consola';
import { RunPlayerFunction } from '../../contracts/Event';

export const run: RunPlayerFunction = async (player, queue, newSong) => {
    const { interaction } = newSong.data;
    interaction.channel?.send(`${newSong} is now playing.`);
    consola.success(`${newSong} is now playing.`);
};

export const name = 'songChanged';
