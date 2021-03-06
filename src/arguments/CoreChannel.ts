import type { PieceContext } from '@sapphire/pieces';
import type { Channel } from 'discord.js';
import { Argument, ArgumentContext, ArgumentResult } from '../lib/structures/Argument';

export class CoreArgument extends Argument<Channel> {
	public constructor(context: PieceContext) {
		super(context, { name: 'channel' });
	}

	public run(parameter: `${bigint}`, context: ArgumentContext): ArgumentResult<Channel> {
		const channel = (context.message.guild ? context.message.guild.channels : this.container.client.channels).cache.get(parameter);
		return channel
			? this.ok(channel)
			: this.error({
					parameter,
					message: 'The argument did not resolve to a channel.',
					context: { ...context, channel }
			  });
	}
}
