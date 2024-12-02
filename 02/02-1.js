const fs = require("fs").promises;

async function readFileAndProcess() {
  try {
    const data = await fs.readFile("private/input.txt", "utf8");
    const formattedData = data.split("\n").filter((line) => line.trim() !== ""); // Remove empty lines
    return formattedData;
  } catch (err) {
    console.error("Error reading file:", err);
    return [];
  }
}

function isValidSequence(arr) {
  // Determine if sequence is increasing or decreasing
  const isIncreasing = arr[0] < arr[arr.length - 1];

  // Check step differences
  for (let i = 1; i < arr.length; i++) {
    const diff = isIncreasing
      ? arr[i] - arr[i - 1] // For increasing sequence
      : arr[i - 1] - arr[i]; // For decreasing sequence

    // Ensure steps are between 1 and 3
    if (diff < 1 || diff > 3) return false;
  }

  return true;
}

(async () => {
  const formattedData = await readFileAndProcess();
  let safeReports = 0;

  for (const report of formattedData) {
    const reportArr = report.split(" ").map(Number); // Convert all elements to numbers

    if (isValidSequence(reportArr)) {
      safeReports++;
    }
  }

  console.log(safeReports);
})();
