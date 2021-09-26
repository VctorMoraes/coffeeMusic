import consola from 'consola';
import { RunPlayerFunction } from '../../contracts/Event';

export const run: RunPlayerFunction = async (player, queue, newSong) => {
    const { interaction, baseEmbed } = newSong.data;
    baseEmbed.setAuthor('Now playing');
    interaction.channel?.send({ embeds: [baseEmbed] });
    consola.success(`${newSong} is now playing.`);
};

export const name = 'songChanged';
