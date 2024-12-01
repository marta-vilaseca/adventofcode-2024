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

  // NEW - now we need to collect the similarity rate of both lists on a new SimilarityRate array
  const SimilarityRate = [];

  for (let i = 0; i < List1.length; i++) {
    let count = 0;
    for (let j = 0; j < List2.length; j++) {
      if (List1[i] === List2[j]) count++;
    }
    SimilarityRate.push(List1[i] * count);
  }

  // the result is the sum of all elements in SimilarityRate
  let result = SimilarityRate.reduce((x, y) => x + y, 0);

  console.log(result);
})();
