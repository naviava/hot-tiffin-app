export function generateEmployeeId() {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  
    const randomNumberString = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");
  
    let randomString = "";
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      randomString += alphabet[randomIndex];
    }
  
    const generatedEmployeeId = `EMP-${randomNumberString}-${randomString}`;
  
    return generatedEmployeeId;
  }
  