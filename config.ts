export const CURRENT_DIR = '.';

export const LS_VERSION = '1.0.1.0';

export const HELP_CMD_STRING = `
Usage: ls [OPTION]... [FILE]...
List information about the FILEs (the current directory by default).

Options:
  -a,                   do not ignore entries starting with .
  -d,                   list directories themselves, not their contents
  -l                    use a long listing format
  -v,                   output version information and exit
  -h                    display this help and exit

Examples:
  ls                   list files in the current directory
  ls -a                list all entries including hidden files
  ls -l                use a detailed listing format
  ls -d dir1           list directory names instead of their contents
  ls -v                show the version of this ls implementation
`; 

