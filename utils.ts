import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

interface Arguments {
  _: string[];
  a: boolean; // represents the -a flag (do not ignore entries starting with .)
  l:boolean; //use long listing format
  d: boolean; // list the directories themselves, not their contents
  v: boolean; // list the version of the command
}

export function get_arguments_from_cmd(): Arguments {
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

export function convertMs_to_Time(time_in_ms:float): string{
  let date = new Date(time_in_ms);
  const month = date.getMonth();
  const day = date.getDay();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${month}  ${day} ${hours}:${minutes}` 
}

export function modeToPermissions(mode: number): string{
  let prefix:string;

  if ((mode & 0o40000) === 0o40000){
    prefix = 'd';
  }
  else if((mode & 0o1000000) === 0o1000000){
    prefix = 'f';
  }
  else{
    prefix = '-';
  }

  const symbols = ['r','w','x'];

  let perms='';
  
  //extract the lower 9 bits
  const permissions = mode & 0o777;

   for (let i = 2; i >= 0; i--) {
    const shift = i * 3;
    const part = (permissions >> shift) & 0o7; // isolate 3 bits per group
    for (let bit = 2; bit >= 0; bit--) {
      perms += (part & (1 << bit)) ? symbols[2 - bit] : '-';
    }
  }
  return prefix+perms;
}

