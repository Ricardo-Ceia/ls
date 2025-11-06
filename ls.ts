import * as fs from 'fs';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

interface Arguments {
  _: string[];
  a: boolean; // represents the -a flag (do not ignore entries starting with .)
  l:boolean; //use long listing format
  d: boolean; // list the directories themselves, not their contents
  v: boolean; // list the version of the command
}


const currentDir = './';
const ls_version = '1.0.0.0';

let results: string[] = [];

const args = get_arguments_from_cmd();

let folder: string;

if (args._[0]) {
  folder = args._[0];
} else {
  folder = currentDir;
}

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

  if (!args.a && !args.l) {
    files.forEach((file: string) => {
      if (file.startsWith('.')) return;
      console.log(file)
    });
  }
  else if(args.l){
    files.forEach((file:string) => {
      const stats = fs.statSync(file)
      console.log(`${stats.mode}  ${stats.nlink} ${stats.uid} ${stats.gid} ${convertMs_to_Time(stats.mtimeMs)}`)
    })
  }
  else{
    files.forEach((file: string) => {
        console.log(file);
     });
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
    .option('long', {
      alias: 'l',
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
    l: argv.l,
    d: argv.d, 
    v: argv.v,
  }
}

function convertMs_to_Time(time_in_ms:float): string{
  let date = new Date(time_in_ms);
  const month = date.getMonth();
  const day = date.getDay();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${month}  ${day} ${hours}:${minutes}` 
}

