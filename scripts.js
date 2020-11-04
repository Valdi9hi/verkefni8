/**
 * Verkefni 8 – Caesar dulmál með vefviðmóti
 *
 * Verður að passa _nákvæmlega_ við gefið HTML, mun annars brotna.
 * Þ.e.a.s., ekki þarf að skrifa meðhöndlun á HTML elementum sem vantar
 */

/**
 * Kóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal kóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @param {string} alphabet Stafróf sem afkóða á út frá
 * @returns {string} Upprunalegi strengurinn hliðraður um n til hægri
 */
function encode(str, n, alphabet = '') {
  const LETTERS = alphabet;
  const Caesar = LETTERS.slice(n, LETTERS.length) + LETTERS.slice(0, n);
  let code = '';
  for (let i = 0; i < str.length; i += 1) {
    code += Caesar[LETTERS.indexOf(str[i])];
  }
  return code;
}

/**
 * Afkóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal afkóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @param {string} alphabet Stafróf sem afkóða á út frá
 * @returns {string} Upprunalegi strengurinn hliðraður um n til vinstri
 */
function decode(str, n, alphabet = '') {
  const LETTERS = alphabet;
  const Caesar = LETTERS.slice(n, LETTERS.length) + LETTERS.slice(0, n);
  let code = '';
  for (let i = 0; i < str.length; i += 1) {
    code += LETTERS[Caesar.indexOf(str[i])];
  }
  return code;
}

function decript(type, str, n, alphabet) {
  if (type === 'encode') {
    return encode(str, n, alphabet);
  }
  return decode(str, n, alphabet);
}

const Caesar = (() => {
  // Default stafróf, uppfært þegar slegið inn í "alphabet"
  let alphabet = 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ';
  // Default type, uppfært af radio input
  let type = 'encode';
  // Default hliðrun, uppfært af "shift"
  let str = '';
  const shift = document.querySelector('.shiftValue');
  const result = document.querySelector('.result');
  const alpha = document.querySelector('#alphabet');
  const code = document.querySelector('input[value = encode]');
  const afcode = document.querySelector('input[value = decode]');
  const range = document.querySelector('#shift');
  const input = document.querySelector('#input');
  let n = parseInt(shift.textContent, 10);

  function init() {
    // Alphabet
    alpha.addEventListener('input', (e) => {
      alphabet = e.target.value;
      range.max = alphabet.length;
      result.textContent = decript(type, str.toLocaleUpperCase(), n, alphabet);
    });

    // Radio
    // Encode
    code.addEventListener('click', () => {
      type = 'encode';
      result.textContent = decript(type, str.toLocaleUpperCase(), n, alphabet);
    });

    // Decode
    afcode.addEventListener('click', () => {
      type = 'decode';
      result.textContent = decript(type, str.toLocaleUpperCase(), n, alphabet);
    });

    // Range
    range.addEventListener('input', (e) => {
      shift.textContent = e.target.value;
      n = Number.parseInt(shift.textContent, 10);
      result.textContent = decript(type, str.toLocaleUpperCase(), n, alphabet);
    });

    // Input
    input.addEventListener('input', (e) => {
      str = e.target.value;
      result.textContent = decript(type, str.toLocaleUpperCase(), n, alphabet);
    });
  }
  return {
    init,
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  Caesar.init();
});
