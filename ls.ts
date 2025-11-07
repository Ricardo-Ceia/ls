import * as fs from 'fs';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import * as utils from './utils.ts'
import {LS_VERSION,CURRENT_DIR,HELP_CMD_STRING} from './config.ts'


const args = utils.get_arguments_from_cmd();

let folder: string;

if (args._[0]) {
  folder = args._[0];
} else {
  folder = CURRENT_DIR;
}

if (args.v) {
  process.stdout.write(`ls version ${LS_VERSION}\n`);
  process.exit(0);
}

if (args.d) {
  process.stdout.write(folder+"\n");
  process.exit(0);
}

if (args.h){
  process.stdout.write(HELP_CMD_STRING+"\n");
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
      if (file.startsWith('.')) return;
      const stats = fs.statSync(file)
      const {username,groupname} = utils.convert_id_into_name(stats.uid,stats.gid)
      process.stdout.write(`${utils.modeToPermissions(stats.mode)}  ${stats.nlink} ${username} ${groupname} ${utils.convertMs_to_Time(stats.mtimeMs)} ${file}\n`)
    })
  }

  else{
    files.forEach((file: string) => {
        process.stdout.write(file+" ");
     });
    process.stdout.write("\n")
  }
});


