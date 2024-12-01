// read the file and extract the data
const fs = require("fs").promises;

async function readFileAndProcess() {
  try {
    const data = await fs.readFile("input.txt", "utf8");
    const formattedData = data.split("\n");
    return formattedData;
  } catch (err) {
    console.error(err);
  }
}

(async () => {
  let formattedData = await readFileAndProcess();
  let List1 = [];
  let List2 = [];

  // data should be split into two arrays, first column and second column
  for (const pair of formattedData) {
    const [num1, num2] = pair.split("   ");
    List1.push(+num1);
    List2.push(+num2);
  }

  // once we have this, we can sort the arrays in ascending order
  List1 = List1.sort((x, y) => x - y);
  List2 = List2.sort((x, y) => x - y);

  // and collect the difference between Array1[i] - Array2[i] on a new array Diff
  const Diff = [];

  for (let i = 0; i < List1.length; i++) {
    Diff.push(Math.abs(List1[i] - List2[i]));
  }

  // the result is the sum of all elements in Diff
  let result = Diff.reduce((x, y) => x + y, 0);

  console.log(result);
})();
