import {hook, Logger} from 'named-logs';
import consola from 'consola';

type G = Record<string, unknown> & {
  console: Console;
  location: Location;
};

const W: G = (typeof window !== 'undefined' ? window : globalThis) as unknown as G;
const CONSOLE = W.console;

const loggers: {[namespace: string]: Logger} = {};

function write(msg: string) {
  process.stdout.write(msg);
}

export const logs: (namespace: string) => Logger = (namespace: string): Logger => {
  let logger = loggers[namespace];

  if (logger) {
    return logger;
  }

  const consolaInstance = consola.withTag(namespace);

  return (logger = loggers[namespace] =
    {
      get assert() {
        return CONSOLE.assert.bind(CONSOLE);
      },
      get error() {
        return consolaInstance.error.bind(consolaInstance);
      },
      get warn() {
        return consolaInstance.warn.bind(consolaInstance);
      },
      get info() {
        return consolaInstance.info.bind(consolaInstance);
      },
      get write() {
        if (typeof process !== 'undefined') {
          return write.bind(CONSOLE);
        } else {
          return consolaInstance.info.bind(consolaInstance);
        }
      },
      get log() {
        return consolaInstance.log.bind(consolaInstance);
      },
      get debug() {
        return consolaInstance.debug.bind(consolaInstance);
      },
      get trace() {
        return consolaInstance.trace.bind(consolaInstance);
      },
      get dir() {
        return CONSOLE.dir.bind(CONSOLE);
      },
      get table() {
        return CONSOLE.table.bind(CONSOLE);
      },
    });
};

export function hookup(): void {
  hook(logs);
}

if (typeof window !== 'undefined') {
  (window as any)._logFactory = logs;
} else if (typeof global !== 'undefined') {
  (global as any)._logFactory = logs;
}
