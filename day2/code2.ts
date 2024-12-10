class Report {
  report: number[];
  length: number;

  constructor(report: number[]) {
    this.report = report;
    this.length = report.length;
  }

  #isInOrder(diffs: number[]): boolean {
    const firstDiffPositive = diffs[0] > 0 ? true : false;
    for (const diff of diffs) {
      if (firstDiffPositive && diff <= 0) return false; // check if ascending order
      if (!firstDiffPositive && diff >= 0) return false; // check if desceding order
    }
    return true; // return true if there's no problem
  }

  #hasSafeDiffs(diffs: number[]): boolean {
    for (const diff of diffs)
      if (Math.abs(diff) < 1 || Math.abs(diff) > 3) return false;
    return true;
  }

  isSafe(): boolean {
    const report: number[] = [...this.report];
    // check all cases
    for (let i = 0; i < this.length; i++) {
      const removed: number[] = report.splice(i, 1); // remove element from `report` array
      const diffs: number[] = report
        .slice(1)
        .map((num, idx) => num - report[idx]);
      if (this.#isInOrder(diffs) && this.#hasSafeDiffs(diffs)) return true; // return true if it's safe
      report.splice(i, 0, removed[0]); // add the removed element back to the `report` array
    }
    return false; // return false if there was no safe case
  }
}

function main() {
  let safeReports: number = 0;
  const lines: string[] = Deno.readTextFileSync("input.txt").split("\n");
  for (const line of lines) {
    const report: Report = new Report(line.split(" ").map((x) => parseInt(x)));
    if (report.isSafe()) safeReports++;
  }
  console.log(safeReports);
}

main();
// 430
