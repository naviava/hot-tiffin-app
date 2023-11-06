export function generateOrderNo() {
  let firstDigit = Math.floor(Math.random() * 9) + 1; // Generate a random number between 1 and 9
  let randomNumber = firstDigit.toString();

  for (let i = 0; i < 9; i++) {
    randomNumber += Math.floor(Math.random() * 10); // Generate a random number between 0 and 9
  }

  return randomNumber;
}
