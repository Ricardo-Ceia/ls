## Overview

This project is a TypeScript implementation of the Unix `ls` command. It lists files and directories with various formatting options. The tool mimics the behavior of the standard Unix `ls` utility while being written entirely in TypeScript.

## Installation

To set up this project, ensure you have Node.js installed, then run:

```
npm install
```

This will install the required dependencies: `yargs` for command-line argument parsing and `userid` for converting user and group IDs to names.

## Usage

Run the command with the following syntax:

```
ts-node ls.ts [OPTION]... [FILE]...
```

If no file is specified, the command lists contents of the current directory.

## Options

- `-a` or `--all` - Show all entries, including hidden files that start with a dot (.)
- `-d` or `--directories` - List directories themselves rather than their contents
- `-l` or `--long` - Display detailed information in long format, including permissions, owner, group, modification time, and file size
- `-v` or `--ver` - Display the version information
- `-h` or `--help` - Display the help message

## Examples

List files in the current directory:
```
ts-node ls.ts
```

List all entries including hidden files:
```
ts-node ls.ts -a
```

Show detailed information in long format:
```
ts-node ls.ts -l
```

List a specific directory without showing its contents:
```
ts-node ls.ts -d /path/to/directory
```

Display version information:
```
ts-node ls.ts -v
```

## Project Structure

- `ls.ts` - Main entry point that processes arguments and outputs file listings
- `utils.ts` - Helper functions for argument parsing, file permission formatting, and user/group name conversion
- `config.ts` - Configuration constants including version information and help text
- `package.json` - Project metadata and dependencies

## Requirements

- Node.js version 12 or higher
- npm for package management

