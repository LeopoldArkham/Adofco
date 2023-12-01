const stringToDigit = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const stringToDigitBackwards = {
  eno: 1,
  owt: 2,
  eerht: 3,
  ruof: 4,
  evif: 5,
  xis: 6,
  neves: 7,
  thgie: 8,
  enin: 9,
};

const spelledOutDigits = Object.keys(stringToDigit);
const spelledOutDigitsReversed = spelledOutDigits.map((s) =>
  s.split('').reverse().join('')
);

function toDigit(input: string): number {
  const maybeDigit = Number(input);

  if (!isNaN(maybeDigit)) return maybeDigit;
  else {
    if (input in stringToDigit)
      return stringToDigit[input as keyof typeof stringToDigit];
    else if (reverse(input) in stringToDigit)
      return stringToDigit[reverse(input) as keyof typeof stringToDigit];
    else {
      console.log(Object.keys(stringToDigitBackwards), input);
      throw new Error(`Could not convert ${input} to digit`);
    }
  }
}

function reverse(input: string): string {
  return input.split('').reverse().join('');
}

async function main() {
  const file = Bun.file('input.txt');
  const text = await file.text();
  const lines = text.split('\n');

  const firstAndLast = lines.map((line) => {
    const regexForwards = new RegExp(`${spelledOutDigits.join('|')}|\\d`, 'g');
    const regexBackwards = new RegExp(
      `${spelledOutDigitsReversed.join('|')}|\\d`,
      'g'
    );

    return [
      regexForwards.exec(line)?.[0],
      regexBackwards.exec(reverse(line))?.[0],
    ];
  });

  const castAsNumber = firstAndLast.map(([first, last]) => {
    const firstDigit = toDigit(first!);
    const lastDigit = toDigit(last!);
    return firstDigit * 10 + lastDigit;
  });

  const summed = castAsNumber.reduce((acc, curr) => acc + curr, 0);

  console.log(summed);
}

main();
