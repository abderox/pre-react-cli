#! /usr/bin/env node
import yargs from 'yargs'
import fs from 'fs'
import { exec } from "child_process";
import chalk from 'chalk';

import boxen from 'boxen';

// const usage = chalk.hex('#83aaff')("Usage: $0 -c arrow-fn -n <name>");
const target_directory = './components/';
const { argv } = yargs(process.argv).scriptName("react-cli")
  .usage("Usage: $0 -c arrow-fn -n <name>")
  .example(
    "$0 -c arrow-fn -n <name>"

  )
  .option("c", {
    alias: "component",
    describe: "create a functional component  <fn : function> , <arrow-fn : arrow function>",

  })
  .option("a", {
    alias: "react-app",
    describe: "create react app ",

  })
  .option("n", {
    alias: "name",
    describe: "choose file name",
  })

  .option("h", {
    alias: "help",
  })
  .describe("help", "Show help.")
  .describe("version", "Show version number.")
  .epilog("copyright 2022");


if (argv.a) {

  console.log("\n" + boxen(chalk.blue("\n Just keep waiting  \n Trying my best , don't push me harder \n"
  ), { padding: 1, borderColor: 'green', dimBorder: true }) + "\n");

  exec("npx create-react-app " + argv.a, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });

}
if (argv.component && argv.name) {
  try {
    if (!fs.existsSync(target_directory)) {
      fs.mkdirSync(target_directory);
    }

    if (argv.component === "arrow-fn") {
      console.log("Creating arrow functional component...")
      const str = `import React from 'react'

    export const `+ argv.n + ` = () => {
      return (
        <div>test</div>
      )
    }
    `

      fs.writeFile(target_directory + argv.n + '.js', str, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
    }
    else if (argv.component === "fn") {
      console.log("Creating  functional component...")
      const str = `import React from 'react'

      export default function `+ argv.n + `() {
        return (
          <div>test</div>
        )
      }
      
    `

      fs.writeFile(target_directory + argv.n + '.js', str, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
    }

  }

  catch (e) {
    console.log("error")
  }
}
else (argv.help)
{
  console.log('try react-cli -h to see the documentation')
}


