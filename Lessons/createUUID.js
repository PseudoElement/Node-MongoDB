function getUUID() {
  let UUID = "";
  const symbols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "a", "b", "c", "d", "e", "f"];
  for (let i = 1; i <= 16; i++) {
    if (i % 4 == 0) {
      if (i == 16) {
        return (UUID += symbols[(Math.random() * 15).toFixed()]);
      }
      UUID += symbols[(Math.random() * 15).toFixed()] + "-";
    } else {
      UUID += symbols[(Math.random() * 15).toFixed()];
    }
  }
  return UUID;
}
// console.log(getUUID());
function getUUID2() {
  let UUID = "";
  const symbols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "a", "b", "c", "d", "e", "f"];
  for (let i = 1; i <= 16; i++) {
    UUID += symbols[(Math.random() * 15).toFixed()];
  }
  return UUID;
}
console.log(getUUID2());
