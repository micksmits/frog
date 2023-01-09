const Discord = require('discord.js');

module.exports = class
{
  constructor (client)
  {
    this.client = client
    this.name = 'guildMemberAdd'
  }

  async run (member) {
    let channel = await this.client.db.channel.findOne({where: {guild_id: member.guild.id, type: 'logs'}})
    if (channel) {
      member.guild.channels.get(channel.id).send(`${member.user.tag} has joined the server`, {code:""})
    }

    let role = await this.client.db.role.findOne({where: {guild_id: member.guild.id, type: 'welcome'}})
    if (role) {
      member.addRole(role.id)
    }
  }
}