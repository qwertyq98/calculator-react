import React from 'react'; 

function Calculator() {
  const buttons = ['AC', '()', '%', '/', '7', '8', '9', 'x', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='];
  const [expression, setExpression] = React.useState('0');
  const [result, setResult] = React.useState('0');
  const pattern = /^[0-9+-/\*\.()%]*$/;
  const pattern2 = /^-$/;

  function onClickButton(e) {
    let newExpression;
    const lastSymbol = expression[expression.length-1];

    switch (e.target.textContent) {
      case '=':
        newExpression = eval(expression);
        break;
      case 'AC':
        newExpression = '0';
        setResult(newExpression);
        break;
      case '()':
        if(isNaN(+lastSymbol)) {
          newExpression = expression + '(';
        } else {
          newExpression = expression + ')';
        }
        setResult(newExpression);
        break;
      case 'x':
        newExpression = expression + '*';
        setResult(newExpression);
        break;
      default:
        newExpression = expression + e.target.textContent;
        setResult(newExpression);
    }

    if (newExpression.length === 2 && newExpression[1] !== ',') {
      newExpression = newExpression.replace(/^0/,'');
    }
  
    setExpression(newExpression);
  }

  return (
    <section className='calc'>
      <span className='calc__math-expression'>{result}</span>
      <input className='calc__input' type='text' name='expression' value={expression} maxLength="50" autoFocus></input>
      <div className="calc__buttons">
      {buttons.map((button) => (
        <button key={buttons.indexOf(button)} onClick={onClickButton} className={
          button === 'AC' || button === '()' || button === '%'? 'calc__button calc__button_white':
          button === '%' || button === 'x' || button === '-' || button === '+' || button === '=' || button === '/'? 'calc__button calc__button_orange': 
          button === '0'? 'calc__button calc__button_black calc__button_black_0': 'calc__button calc__button_black'
        }>{button}</button>
      ))}
      </div>
    </section>
  );
}

export default Calculator;