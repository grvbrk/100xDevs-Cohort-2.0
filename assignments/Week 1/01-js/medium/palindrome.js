/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrome as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  str = str.toLowerCase();
  let start = 0;
  let end = str.length - 1;
  let punctuations = '?,!-_.'
  while (start <= end) {
    if (str[start] === " " || punctuations.includes(str[start])) {
      start++;
    } else if (str[end] === " " || punctuations.includes(str[end])) {
      end--;
    } else if (!(str[start] === str[end])) {
      return false;
    } else {
      start++;
      end--;
    }
  }
  return true;
}

// const string = "Red Tape"
// function find(string){
//   for(let i =0; i<string.length; i++){
//     console.log(string[i] === ' ')
//   }
// }
// find(string)

module.exports = isPalindrome;
