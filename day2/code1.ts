class Report {
  report: number[];
  diffs: number[];

  constructor(report: number[]) {
    this.report = report;
    this.diffs = this.report.slice(1).map((num, idx) => num - this.report[idx]); // Using slice(1) to exclude the first element of this.report
  }

  isInOrder(): boolean {
    const firstDiffPositive = this.diffs[0] > 0 ? true : false;
    for (const diff of this.diffs) {
      if (firstDiffPositive && diff <= 0) return false; // check if ascending order
      if (!firstDiffPositive && diff >= 0) return false; // check if descending order
    }
    // refactored code to be more readable as above
    // if (firstDiffPositive) {
    //   for (const diff of this.diffs) if (diff <= 0) return false;
    // } else {
    //   for (const diff of this.diffs) if (diff >= 0) return false;
    // }
    return true; // return true if there's no problem
  }

  hasSafeDiffs(): boolean {
    for (const diff of this.diffs)
      if (Math.abs(diff) < 1 || Math.abs(diff) > 3) return false;
    return true;
  }
}

function main(): void {
  let safeReports: number = 0;
  const lines: string[] = Deno.readTextFileSync("input.txt").split("\n");

  for (const line of lines) {
    const report: Report = new Report(line.split(" ").map((x) => parseInt(x)));
    if (report.isInOrder() && report.hasSafeDiffs()) safeReports++;
  }
  console.log(safeReports);
}

main();

// 379
