import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

let calibrationTotal = 0;
const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const digitLines = input.replace(/[a-zA-Z]+/g, "").split("\n");
  digitLines.forEach(digit => calibrationTotal += parseInt(digit[0] + digit.at(-1)));
  return calibrationTotal;
};

let calibrationTotal2 = 0;
const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const lines = input.split("\n");

  const digitMap = new Map<string, string>([
    ["one", "1"],
    ["two", "2"],
    ["three", "3"],
    ["four", "4"],
    ["five", "5"],
    ["six", "6"],
    ["seven", "7"],
    ["eight", "8"],
    ["nine", "9"]
  ]);

  lines.forEach(
    line => {
      const digitWordPresent = Array.from(digitMap.keys()).filter(str => line.includes(str));

      if (digitWordPresent.length) {
        const firstWordIndices = digitWordPresent
          .map((digitWord): [number, string] => [line.indexOf(digitWord), digitWord])
          .sort((prevItem, nextItem) => prevItem[0] - nextItem[0])[0];

        const lastWordIndices = digitWordPresent
          .map((digitWord): [number, string] => [line.lastIndexOf(digitWord), digitWord])
          .sort((prevItem, nextItem) => prevItem[0] - nextItem[0]).at(-1);

        const [firstIndex, firstDigitWord] = firstWordIndices;
        const [lastIndex, lastDigitWord] = lastWordIndices!;

        line = line.slice(0, firstIndex) + digitMap.get(firstDigitWord) +
          line.slice(firstIndex, lastIndex) + digitMap.get(lastDigitWord) +
          line.slice(lastIndex, line.length);
      }
      const digits = line.replace(/[a-zA-Z]+/g, "");
      calibrationTotal2 += parseInt(digits[0] + digits.at(-1));
    }
  )
  return calibrationTotal2;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
