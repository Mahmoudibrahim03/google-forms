// Generate Random ID ...

// No need to this function for now JSON_SERVER will generate the ID for us ...
export function generateRnadomId(length: number): string {
  const alphabet: string[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  let GeneratedId: string = "";

  for (let i = 0; i <= length; i++) {
    const numbers = Math.floor(Math.random() * 10) + 1;
    const letters = alphabet[Math.floor(Math.random() * alphabet.length)];
    GeneratedId += Math.random() > 0.5 ? numbers : letters;
  }
  return GeneratedId;
}
