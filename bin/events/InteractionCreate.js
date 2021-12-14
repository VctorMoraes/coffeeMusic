"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.name = exports.run = void 0;
const run = async (client, interaction) => {
    if (!interaction.isCommand())
        return;
    const command = client.commands.get(interaction.commandName);
    if (!command)
        return;
    try {
        await command.execute(interaction);
    }
    catch (error) {
        console.error(error);
        await interaction.reply({
            content: 'There was an error while executing this command!',
            ephemeral: true,
        });
    }
};
exports.run = run;
exports.name = 'interactionCreate';
