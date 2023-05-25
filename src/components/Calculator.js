import React from 'react'; 

function Calculator() {
  const buttons = ['⌦','AC', '()', '/', '7', '8', '9', 'x', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='];
  const [expression, setExpression] = React.useState('0');
  const [result, setResult] = React.useState('0');
  const pattern = /^[0-9+-/\*\.()⌦]*$/;
  const errorPattern = /[+-/\*\.⌦]{2}/;

  function onKeyDown(e) {
    if (e.key === "Enter") {
      addSymbol('=');
    }
    if (e.key === "Backspace") {
      addSymbol('⌦');
    }
    if (e.key === "Delete") {
      addSymbol('AC');
    }
  }

  function keyboardEvent(e) {
    addSymbol(e.nativeEvent.data);
  }

  function onClickButton(e) {
    addSymbol(e.target.textContent);
  }

  function addSymbol(newSymbol) {
    let newExpession = expression;
    const numberOfUnclosedBrackets = (newExpession.match(/\(/g) || []).length - (newExpession.match(/\)/g) || []).length;
    const lastSymbol = expression[expression.length-1];

    switch (newSymbol) {
      case '=':
        if (numberOfUnclosedBrackets > 0) {
          for (let i=0; i < numberOfUnclosedBrackets; i++) {
            newExpession += ')';
          }
          setResult(newExpession);
        }
        newExpession = eval(newExpession).toString();
        break;
      case 'AC':
        newExpession = '0';
        break;
      case '⌦': 
        newExpession = newExpession.slice(0, -1);
        if (newExpession.length === 0) {
          newExpession = '0';
        }
        break;
      case '()':
        if (isNaN(+lastSymbol) || lastSymbol === '0') {
          newExpession += '(';
          break;
        }
      case ')':
        if (numberOfUnclosedBrackets > 0) {
          newExpession += ')';
        }
        break;
      case 'x':
        newExpession += '*';
        break;
      default:
        newExpession += newSymbol;
    }

    if (newExpession.length === 2 && newExpession[1] !== '.') {
      newExpession = newExpession.replace(/^0/,'');
    }
    
    if (!errorPattern.test(newExpession) && pattern.test(newExpession)) {
      setExpression(newExpession);
      if (newSymbol !== '=') {
        setResult(newExpession);
      }
    }
  }

  return (
    <section className='calc'>
      <span className='calc__math-expression'>{result}</span>
      <input 
        className='calc__input' 
        type='text' 
        name='expression' 
        value={expression} 
        maxLength="50" 
        onChange={keyboardEvent}
        autoFocus
        onKeyDown={onKeyDown}
      />
      <div className="calc__buttons">
      {buttons.map((button) => (
        <button key={buttons.indexOf(button)} onClick={onClickButton} className={
          button === 'AC' || button === '()' || button === '⌦'? 'calc__button calc__button_white': 
          'x-+=/'.includes(button) ? 'calc__button calc__button_orange': 
          button === '0'? 'calc__button calc__button_black calc__button_black_0': 'calc__button calc__button_black'
        }>{button}</button>
      ))}
      </div>
    </section>
  );
}

export default Calculator;