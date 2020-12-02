const backward = (word) => {
  return word.split('')
    .map((val, ind, arr) => arr[(arr.length - 1) - ind])
    .join('');
};

const ninetyDeg = (letters) => { // turn word search 90 degree
  let length = Math.max(letters.length, letters[0].length); // get length of longer
  let result = [];
  for (let i = 0; i < length; i++) {
    result.push([]); // push a empty array, so it does not return error
    for (let o = length - 1; o !== 0; o--) {
      if (letters[o][i]) { // if not empty push
        result[i].push(letters[o][i]);
      }
    }
  }
  return result;
};

const diagonally = (letters) => {
  let result = [];
  let flip = ninetyDeg(letters); // get a 90 deg array
  let length = Math.max(letters.length, letters[0].length); // to get the longer side of the word search
  for (let o = 0; o < length; o++) {
    result.push([]); // same as 90 deg
    result.push([]);
    result.push([]);
    result.push([]);
    for (let i = 0; i < length; i++) {
      if (letters[i + o] && letters[i + o][i]) {
        result[o * 4].push(letters[i + o][i]);
      }
      if (letters[i] && letters[i][i + o]) {
        result[(o * 4) + 1].push(letters[i][i + o]);
      }
      if (flip[i + o] && flip[i + o][i]) {
        result[(o * 4) + 2].push(flip[i + o][i]);
      }
      if (flip[i] && flip[i][i + o]) {
        result[(o * 4) + 3].push(flip[i][i + o]);
      }
    }
  }
  return result;
};

const wordSearch = (letters, word) => {
  const wordBackward = backward(word);
  const diagona = diagonally(letters).map(ls => ls.join(''));
  const verticalJoin = ninetyDeg(letters).map(ls => ls.join(''));
  const horizontalJoin = letters.map(ls => ls.join(''));
  for (const l of horizontalJoin) {
    if (l.includes(word) || l.includes(wordBackward)) return true;
  }
  for (const l of verticalJoin) {
    if (l.includes(word) || l.includes(wordBackward)) return true;
  }
  for (const l of diagona) {
    if (l.includes(word) || l.includes(wordBackward)) return true;
  }
  return false;
};

module.exports = wordSearch;
