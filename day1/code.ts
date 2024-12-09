// I used Deno instead of Node for solving the problem. So there's Deno.readTextFileSync() instead of importing fs from node.

function main(): void {
  const lines: string[] = Deno.readTextFileSync("input.txt").split("\n");
  const answer = getAnswer(lines);
  console.log(answer);
}

function getAnswer(lines: string[]): number {
  const linesCount: number = lines.length;

  const col1: number[] = [];
  const col2: number[] = [];
  let ANSWER: number = 0;

  for (const line of lines) {
    const [first, second] = line
      .trim()
      .split(/\s+/)
      .map((x) => parseInt(x));
    col1.push(first);
    col2.push(second);
  }

  col1.sort((a, b) => a - b);
  col2.sort((a, b) => a - b);

  for (let i = 0; i < linesCount; i++) {
    ANSWER += Math.abs(col1[i] - col2[i]);
  }
  return ANSWER;
}

main();
