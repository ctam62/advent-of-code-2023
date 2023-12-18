import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const lines = input.split("\n");
  const config = new Map<string, number>([
    ["red", 12],
    ["green", 13],
    ["blue", 14],
  ]);

  let gamesPossibleSum = 0;

  for (let line of lines) {
    const games = line.split(":");
    const cubeSets = games[1].split(";");

    const validCubes = [];

    for (let set of cubeSets) {
      const cubes = set.split(",").map((cube): string[] => cube.replace(/^\s/, "").split(" "));

      for (let cube of cubes) {
        const numCubes = config.get(cube[1]);

        if (parseInt(cube[0]) > numCubes!) {
          validCubes.push(false);
        } else {
          validCubes.push(true);
        }
      };
    };

    if (validCubes.every(Boolean)) {
      gamesPossibleSum += parseInt(games[0].replace(/\D/g, ""));
    }
  }

  return gamesPossibleSum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const lines = input.split("\n");

  let gamePowerSum = 0;

  for (let line of lines) {
    const games = line.split(":");
    const gameCubes = games[1].replace(/\s+(?=\d)/g, "").replace(/[;]/g, ",").split(",");

    const cubeObj: Object = gameCubes.reduce((color, cubeString) => {
      const [value, cubeColor] = cubeString.split(" ");

      const groupKey: number[] = (
        color[cubeColor as keyof typeof color] ||
        (color[cubeColor as keyof typeof color] = [] as never)
      );

      groupKey.push(Number(value));

      return color;
    }, {});

    let cubePower = 1;

    for (let cube of Object.keys(cubeObj)) {
      const cubeNumArray = Object.values({ ...cubeObj[cube as keyof Object] });
      const maxNum: number = Math.max(...cubeNumArray);
      cubePower *= maxNum;
    }
    gamePowerSum += cubePower;
  }

  return gamePowerSum;
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
