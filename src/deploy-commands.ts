import 'dotenv/config';
import { glob } from 'glob';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { promisify } from 'util';
import { Command, CommandJSON } from './contracts/Command';

const globPromise = promisify(glob);

const loadCommands = async (): Promise<unknown> => {
    const commandFiles = await globPromise(
        `${__dirname}/commands/**/*{.ts,.js}`,
    );

    return Promise.all(
        commandFiles.map(async (filepath: string): Promise<CommandJSON> => {
            const command: Command = await import(filepath);
            return command.data.toJSON();
        }),
    );
};

(async () => {
    const rest = new REST({ version: '9' }).setToken(
        process.env.APP_TOKEN || '',
    );

    rest.put(Routes.applicationCommands(process.env.APP_CLIENT_ID || ''), {
        body: await loadCommands(),
    })
        .then(() =>
            console.log('Successfully registered application commands.'),
        )
        .catch(console.error);
})();
