#! /usr/bin/env node
import yargs from 'yargs'
import fs from 'fs'
import chalk from 'chalk';
import boxen from 'boxen';
import _cliProgress from 'cli-progress';
import util from 'util';
import { exec } from 'child_process';
const execute = util.promisify(exec);
import inquirer from 'inquirer';



// const progressBar = new _cliProgress.SingleBar({
//   format: '{bar} {percentage}% | ETA: {eta}s | {value}/{total}'
// }, _cliProgress.Presets.shades_classic);
const component_directory = './src/components/';
const pages_directory = './src/pages/';

const execCmd = async (cmd) => {
  try {

    const { stdout, stderr } = await execute(cmd);

    console.log('stdout:', stdout);
    console.error('stderr:', stderr);

  }
  catch (err) {
    console.error("\n" + boxen(chalk.red("\n Something went wrong while creating react app\n"
    ), { padding: 1, borderColor: 'red', dimBorder: true }) + "\n")
  }
}

async function createDir(dir) {
  try {
    await fs.promises.access(dir, fs.constants.F_OK);
  } catch (e) {
    await fs.promises.mkdir(dir);
  }
}
// const usage = chalk.hex('#83aaff')("Usage: $0 -c arrow-fn -n <name>");

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
  .option("p", {
    alias: "pages",
    describe: "create pages ",

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
  .epilog("copyright 2022")

  ;


if (argv.a) {

  let interval = 0
  let arrInd = 0
  let inc = 0;
  let usedArray = []


  let array = ["U can listen to some music while waiting ", "Orgasm improves sperm quality", "Sex protects against cancer",
    "Less sex, more work", "People in their 20s are most active", "70 percent of men watch porn…", " There is such a thing as being too horny", "Sex drive + increased years of life = not a sexy combo", "Practice makes frequent", "Working out makes workin’ it out better",
    "You can learn by sexperience", "You can climax your stress away", "The left testicle usually hangs lower than the right for right-handed men. ", "The left testicle usually hangs lower than the right for right-handed men. The opposite is true for lefties.",
    "When two people kiss, they exchange between 10 million and 1 billion bacteria."
  ]
  let array2 = ["The scientific term for brain freeze is “sphenopalatine ganglioneuralgia”", "Back when dinosaurs existed, there used to be volcanoes that were erupting on the moon.",
    "Back when dinosaurs existed, there used to be volcanoes that were erupting on the moon.",
    "In 2006, a Coca-Cola employee offered to sell Coca-Cola secrets to Pepsi. ",
    "A single strand of Spaghetti is called a “Spaghetto”.", "The first movie ever to put out a motion-picture soundtrack was Snow White and the Seven Dwarves."
  ];
  let array3 = ["American flags left on the moon will eventually get bleached white by the sun",
    "Gummy bears were originally called 'dancing bears'.", "New Zealand has more cats per person than any other country in the world", "The yo-yo was originally a weapon used in the Philippine jungle",
    "Victor Hugo’s novel Les Miserable contains a sentence that is 823 words long",
    "Alexander the Great was the first person to be pictured on a coin",
    "At an average of 15 breaths per minute, we take about 400 million breaths during a lifetime.", " This is equivalent to about 53 million gallons of air"
  ]


  console.log(boxen(chalk.red("\n this is a pre-release of react cli  \n v1.0.0 \n"
  ), { title: 'REACT-CLI', titleAlignment: 'center', borderColor: 'green', dimBorder: true }) + "\n");
  process.stdout.write(chalk.hex('#83aaff')("While waiting , get amused by these fun facts 😉! \n"));

  inquirer
    .prompt([
      {
        type: "list",
        name: "fact",
        message: "Select a type",
        choices: ["random", "fun", "+18"]
      }
    ])
    .then((answers) => {

      process.stdout.write(chalk.hex('#32cd32')("Have fun , we will take after your baby project !\n"));

      if (answers.fact === "+18") {
        arrInd = array.length
        usedArray = array
      }
      else if (answers.fact === "fun") {
        arrInd = array3.length
        usedArray = array3
      }
      else if (answers.fact === "random") {
        arrInd = array2.length
        usedArray = array2
      }
      interval = setInterval(() => {
        if (inc == arrInd) {
          inc = 0;
        }


        process.stdout.write(chalk.hex('#83aaff')(usedArray[inc++]));
        setTimeout(() => {
          process.stdout.clearLine();
          process.stdout.cursorTo(0);

        }, 4500)

      }, 5000);
      execCmd("npx create-react-app " + argv.a).then(() => {

        clearInterval(interval);
        console.log("\n" + boxen(chalk.green("\n  React project : " + argv.a + " is created successfully \n  Started at : http://localhost:3000/"
        ), { padding: 1, borderColor: 'green', dimBorder: true }) + "\n");

        execCmd("cd " + argv.a + " && npm start ").then(() => {
          process.exit(1);
        })

      })
    });


}
if (argv.component && argv.name) {
  try {
    if (!fs.existsSync(component_directory)) {
      fs.mkdirSync(component_directory);
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

      fs.writeFile(component_directory + argv.n + '.js', str, (err) => {
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

      fs.writeFile(component_directory + argv.n + '.js', str, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
    }

  }

  catch (e) {
    console.log("error")
  }
}
if (argv.p) {
  try {

    await createDir(pages_directory).then(() => {
      fs.writeFile(pages_directory + "home" + '.js', "import React from 'react';", (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
    })


  }
  catch (e) {
    console.error(e)
  }
}
else (argv.help)
{
  console.log('\n\n 😇 try react-cli -h to learn more')
}



