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

const common = [
  "locales/en/common.json",
  "locales/fil/common.json",
  "locales/in/common.json",
  "locales/ja/common.json",
  "locales/ko/common.json",
  "locales/ms/common.json",
  "locales/ne/common.json",
  "locales/th/common.json",
  "locales/vi/common.json",
  "locales/zh/common.json",
  "locales/zh_hant/common.json",
];

const meta = [
  "locales/en/meta.json",
  "locales/fil/meta.json",
  "locales/in/meta.json",
  "locales/ja/meta.json",
  "locales/ko/meta.json",
  "locales/ms/meta.json",
  "locales/ne/meta.json",
  "locales/th/meta.json",
  "locales/vi/meta.json",
  "locales/zh/meta.json",
  "locales/zh_hant/meta.json",
];

const backup = [
  "backup/locales/en.json",
  "backup/locales/fil.json",
  "backup/locales/in.json",
  "backup/locales/ja.json",
  "backup/locales/ko.json",
  "backup/locales/ms.json",
  "backup/locales/ne.json",
  "backup/locales/th.json",
  "backup/locales/vi.json",
  "backup/locales/zh.json",
  "backup/locales/zh_hant.json",
];

const make = (key: string, target: string[]) => {
  console.log(chalk.bgBlue("\n::::: copy start ::::: \n"));

  backup.map((locale, index) => {
    const backupData = JSON.parse(
      fs.readFileSync(`${__dirname}/${locale}`, "utf-8")
    );

    const language = locale.split(".")[0].split("/")[2];

    const realData = JSON.parse(
      fs.readFileSync(`${originalFilePrefIx}/${target[index]}`, "utf-8")
    );

    realData[key] = backupData[key];

    console.log(
      `${chalk.yellow(language)} -> { ${chalk.magenta(key)} : ${chalk.cyan(
        backupData[key]
      )} }`
    );

    fs.writeFileSync(
      `${originalFilePrefIx}/locales/${language}/meta.json`,
      JSON.stringify({ ...realData }, null, 2)
    );
  });

  console.log(chalk.bgBlue("\n::::: copy end :::::\n"));
};

const key = "label_coupon";
const namespace: string[] = meta;

make(key, namespace);
