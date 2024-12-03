// read the file and extract the data
const fs = require("fs").promises;

async function readFileAndProcess() {
  try {
    const data = await fs.readFile("private/input.txt", "utf8");
    const firstFilter = /(mul\(\d{1,3},\d{1,3}\)|do(?:n't)?)/g;
    const matches = data.match(firstFilter);
    const enabledMatches = processEnabled(matches);
    const secondFilter = /\d{1,3},\d{1,3}/g;
    const formattedData = enabledMatches ? enabledMatches.map((match) => match.match(secondFilter)[0]) : [];
    return formattedData;
  } catch (err) {
    console.error(err);
  }
}

(async () => {
  let formattedData = await readFileAndProcess();
  let result = 0;
  for (const pair of formattedData) {
    const numbers = pair.split(",");
    result = result + Number(numbers[0]) * Number(numbers[1]);
  }
  console.log(result);
})();

const processEnabled = (values) => {
  let isEnabled = true;
  let enabledValues = [];

  for (let i = 0; i < values.length; i++) {
    if (isEnabled) {
      if (values[i] === "don't") {
        isEnabled = false;
      } else if (values[i] !== "do") {
        enabledValues.push(values[i]);
      }
    } else {
      if (values[i] === "do") {
        isEnabled = true;
      }
    }
  }
  return enabledValues;
};
