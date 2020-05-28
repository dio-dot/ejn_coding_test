const solution = (pikachu: number, candy: number): number => {
  let exp: number = 0;
  let evolution: number = 0;
  while (pikachu + candy > 12) {
    if (candy >= 12) {
      evolution = Math.floor(candy / 12);
      candy -= evolution * 12;
      if (pikachu < evolution) {
        exp += 500 * pikachu;
        break;
      } else {
        exp += 500 * evolution;
        pikachu -= evolution;
        candy += evolution;
      }
    } else {
      pikachu = pikachu - (12 - candy);
      exp += 500;
      pikachu--;
      candy = 1;
      while (pikachu > 12 && candy < 12) {
        pikachu -= 12;
        exp += 500;
        pikachu--;
        candy++;
      }
    }
  }
  return exp;
};

console.log(solution(100, 100));

export default solution;
