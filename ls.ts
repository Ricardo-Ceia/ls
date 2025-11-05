import * as fs from 'fs';
import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';


interface Arguments{
  _: string[];
  
  a:boolean;//represents the -a flag (do not ignore entries starting with .)
  c:boolean;//list entries by colums
  d:boolean;//list the directories themselves, not their contents
  version:boolean//list the version of the command

  directories: string[];
}

const testFolder = '../'




let results:string [] = []; 

fs.readdir(testFolder, (err: NodeJS.ErrnoException | null,files:string []) => {
  if (err){
    console.error("Error reading directory:",err);
    return;
  }

  files.forEach((file: string) => {
    if (file.startsWith(".")){
      return
    }
    results.push(file)
  })
})
