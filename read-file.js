import { readFile } from "fs";

readFile("views/Test.vue", "utf-8", (err, data) => {
  if (err) {
    console.error("error reading file:", err);
    return;
  }
  console.log("file data", data);
});
