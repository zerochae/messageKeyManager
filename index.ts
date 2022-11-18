import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import chalk from "chalk";
import os from "os";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const username = os.userInfo().username;

// const originalFilePrefIx = `/Users/${username}/Documents/workspace/wb-front-web-next`;
const originalFilePrefIx = `/Users/${username}/$path`;

interface Country {
  key: string;
  code: string;
  flag: string;
}

const counties: Country[] = [
  {
    key: "English",
    code: "en",
    flag: "🇺🇸",
  },
  {
    key: "Filipino",
    code: "fil",
    flag: "🇵🇭",
  },
  {
    key: "Hindi",
    code: "in",
    flag: "🇮🇳",
  },
  {
    key: "Japanese",
    code: "ja",
    flag: "🇯🇵",
  },
  {
    key: "Korean",
    code: "ko",
    flag: "🇰🇷",
  },
  {
    key: "Malaysia",
    code: "ms",
    flag: "🇲🇾",
  },
  {
    key: "Nepali",
    code: "ms",
    flag: "🇳🇵",
  },
  {
    key: "Thai",
    code: "th",
    flag: "🇹🇭",
  },
  {
    key: "Vietnamese",
    code: "vi",
    flag: "🇻🇳",
  },
  {
    key: "Chinese",
    code: "zh",
    flag: "🇨🇳",
  },
  {
    key: "Chinese-traditional",
    code: "zh_hant",
    flag: "🇨🇳",
  },
];

const targetPath = (code: string, namespace: string) =>
  `locales/${code}/${namespace}.json`;

const backupPath = (code: string) => `backup/locales/${code}.json`;

const make = (key: string, namespace: string) => {
  console.log(chalk.bgBlue("\n::::: copy start ::::: \n"));

  counties.map(({ code, flag }) => {
    const backupData = JSON.parse(
      fs.readFileSync(`${__dirname}/${backupPath(code)}`, "utf-8")
    );

    const realData = JSON.parse(
      fs.readFileSync(
        `${originalFilePrefIx}/${targetPath(code, namespace)}`,
        "utf-8"
      )
    );

    realData[key] = backupData[key];

    console.log(
      `${chalk.yellow(` ${flag}   ${code}`)} -> { ${chalk.magenta(
        key
      )} : ${chalk.cyan(backupData[key])} }`
    );

    fs.writeFileSync(
      `${originalFilePrefIx}/locales/${code}/${namespace}.json`,
      JSON.stringify({ ...realData }, null, 2)
    );
  });

  console.log(chalk.bgBlue("\n::::: copy end :::::\n"));
};

const key = "";
const namespace = "";

make(key, namespace);
