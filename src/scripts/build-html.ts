import fs from "fs";
import path from "path";
import { render } from "preact-render-to-string";
import { App } from "../App";

const html = "<!DOCTYPE html>\n" + render(App());
fs.writeFileSync(path.resolve("public/index.html"), html);
console.log("✅ HTML built");
