import { Command, flags } from '@oclif/command';

export default class Start extends Command {
  static description = 'start platform';

  static examples = ['$ reactant start ios'];

  static strict = false;

  static flags: flags.Input<any> = {
    config: flags.string({ char: 'c', required: false }),
    debug: flags.boolean({ char: 'd', required: false }),
  };

  static args = [];

  async run() {
    console.log('generating');
  }
}
