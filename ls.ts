import * as fs from 'fs';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

interface Arguments {
  _: string[];
  a: boolean; // represents the -a flag (do not ignore entries starting with .)
  c: boolean; // list entries by columns
  d: boolean; // list the directories themselves, not their contents
  v: boolean; // list the version of the command
}


const currentDir = './';
const ls_version = '1.0.0.0';

let results: string[] = [];

const args = get_arguments_from_cmd();

// ✅ folder can be reassigned, so use let
let folder: string;

// ✅ args._ starts at index 0, not 1
if (args._[0]) {
  folder = args._[0];
} else {
  folder = currentDir;
}

// ✅ handle version and -d flags early
if (args.v) {
  console.log(`ls version ${ls_version}`);
  process.exit(0);
}

if (args.d) {
  console.log(folder);
  process.exit(0);
}

fs.readdir(folder, (err: NodeJS.ErrnoException | null, files: string[]) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  // Default behavior (no flags)
  if (!args.a && !args.c) {
    files.forEach((file: string) => {
      if (file.startsWith('.')) return;
      results.push(file);
    });
    console.log(results.join('  '));
  }
  // -a flag: include hidden files
  else if (args.a) {
    files.forEach((file: string) => {
      console.log(file);
    });
  }
  // -c flag placeholder
  else if (args.c) {
    console.log('List entries by columns (not yet implemented)');
  }
});

function get_arguments_from_cmd(): Arguments {
  const argv = yargs(hideBin(process.argv))
    .option('all', {
      alias: 'a',
      type: 'boolean',
      description: 'Represents the -a flag (do not ignore entries starting with .)',
      default: false,
    })
    .option('columns', {
      alias: 'c',
      type: 'boolean',
      description: 'List entries by columns',
      default: false,
    })
    .option('directories', {
      alias: 'd',
      type: 'boolean',
      description: 'List directories themselves, not their contents',
      default: false,
    })
    .option('ver', {
      alias: 'v',
      type: 'boolean',
      description: 'List the version of ls',
      default: false,
    })
    .parseSync() as unknown as {
      _: (string | number)[];
      a: boolean;
      c: boolean;
      d: boolean;
      v: boolean;
    };
   return {
    _: argv._.map(String),
    a: argv.a,
    c: argv.c,
    d: argv.d, // ✅ fixed typo (was argd.d)
    v: argv.v,
  }
}

