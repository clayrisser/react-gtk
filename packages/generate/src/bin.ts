import { handle } from '@oclif/errors';
import { run } from '@oclif/command';

(async () => {
  try {
    await run();
  } catch (err) {
    handle(err);
  }
})();
