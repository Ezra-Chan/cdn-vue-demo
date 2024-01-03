#!/usr/bin/env node
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import fse from "fs-extra";
import * as cheerio from "cheerio";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const htmlContent = fs.readFileSync(
  path.resolve(__dirname, "../dist/index.html"),
  "utf8"
);
const $ = cheerio.load(htmlContent);

fse.removeSync(path.resolve(__dirname, "../pluginTemp/js"));

// copy js
let mainFileName = ""; // 主入口文件
fs.mkdirSync(path.resolve(__dirname, "../pluginTemp/js"));
fs.readdirSync(path.resolve(__dirname, "../dist/assets")).forEach(file => {
  if (path.extname(file) === ".js") {
    fs.copyFileSync(
      path.resolve(__dirname, `../dist/assets/${file}`),
      path.resolve(__dirname, `../pluginTemp/js/${file}`)
    );
  }
  if (/app.*.js/.test(file)) {
    mainFileName = file;
  }
});

if (!mainFileName) {
  throw new Error("未写入main字段");
}
$("script").attr("src", `./js/${mainFileName}`);
const modifiedHtml = $.html();
fs.writeFileSync(
  path.resolve(__dirname, "../pluginTemp/index.html"),
  modifiedHtml,
  "utf8"
);

console.log("copy success!");
