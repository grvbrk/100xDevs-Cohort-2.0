/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  str1 = str1.toLowerCase();
  str2 = str2.toLowerCase();
  let count = 0;
  for (let char of str1) {
    if (str2.includes(char)) count++;
  }
  if (count === str2.length && count === str1.length) return true;
  return false;
}

module.exports = isAnagram;
