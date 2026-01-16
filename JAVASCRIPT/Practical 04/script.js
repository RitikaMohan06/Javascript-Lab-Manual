
function reverseNumber(n) {
  
  const sign = n < 0 ? -1 : 1;
  const s = Math.abs(n).toString().split('').reverse().join('');
  
  return sign * Number(s);
}


const isPalindrome = function (n) {
  
  const reason = (n < 0) ? 'Negative numbers are not palindromes by our rule' : null;
  if (reason) {
   
    return { result: false, reason };
  }
 
  return { result: Number(n) === reverseNumber(Number(n)), reason: null };
};


const formatMessage = (num, ok) => ok ? `${num} is a palindrome ✅` : `${num} is NOT a palindrome ❌`;


function createCustomizedChecker(prefix) {
 
  return function (num) {
    const check = isPalindrome(num);
    const text = formatMessage(num, check.result);
    
    return `${prefix} ${text}${check.reason ? ' — ' + check.reason : ''}`;
  };
}


const myChecker = createCustomizedChecker('Checker says:');


document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('numberInput');
  const checkBtn = document.getElementById('checkBtn');
  const demoBtn = document.getElementById('demoBtn');
  const resultBox = document.getElementById('result');

  
  function showResult(text, ok) {
    resultBox.classList.remove('success', 'fail');
    resultBox.textContent = text;
    if (ok === true) resultBox.classList.add('success');
    else if (ok === false) resultBox.classList.add('fail');
  }

  
  checkBtn.addEventListener('click', () => {
    const raw = input.value.trim();
    if (raw === '') {
      showResult('Please enter a number!', false);
      return;
    }
    
    const num = Number(raw);

    
    const reversed = reverseNumber(num); 
    
    const check = isPalindrome(num);

   
    const finalMessage = myChecker(num);

    
    const displayText = `${finalMessage}\nReversed value: ${reversed}`;
    showResult(displayText, check.result);
  });

  
  demoBtn.addEventListener('click', () => {
    const demoNums = [121, 12321, -121, 45054, 10];
    let demoText = 'Demo examples:\n';
    demoNums.forEach(n => {
      const rev = reverseNumber(n);
      const pal = isPalindrome(n);
      demoText += `${n} → reversed: ${rev} → ${pal.result ? 'palindrome' : 'not palindrome'}`;
      if (pal.reason) demoText += ` (${pal.reason})`;
      demoText += '\n';
    });
    showResult(demoText, null); 
  });
});
