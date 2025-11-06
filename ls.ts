import * as fs from 'fs';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import * as utils from './utils.ts'

const currentDir = './';
const ls_version = '1.0.0.0';

const args = utils.get_arguments_from_cmd();

let folder: string;

if (args._[0]) {
  folder = args._[0];
} else {
  folder = currentDir;
}

if (args.v) {
  process.stdout.write(`ls version ${ls_version}\n`);
  process.exit(0);
}

if (args.d) {
  process.stdout.write(folder+"\n");
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
      process.stdout.write(file+" ");
    });
    process.stdout.write("\n")
  }
  else if(args.l){
    files.forEach((file:string) => {
      const stats = fs.statSync(file)
      process.stdout.write(`${stats.mode}  ${stats.nlink} ${stats.uid} ${stats.gid} ${utils.convertMs_to_Time(stats.mtimeMs)}\n`)
    })
  }
  else{
    files.forEach((file: string) => {
        process.stdout.write(file+" ");
     });
  }
});


