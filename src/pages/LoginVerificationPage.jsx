import React, {useEffect, useRef, useState} from 'react'
import '../pageStyles/LoginVerificationPage.css'
import { Header } from '../components/Header/Header';

export const LoginVerificationPage = ( {length, onSubmit} ) => {

  const [inputValues, setInputValues] = useState(Array(length).fill(''));
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  const handleInputChange = (index, value) => {
    setInputValues(prevValues => {
      const newInputValues = [...prevValues];
      newInputValues[index] = value.slice(-1);

      if (index < length - 1 && value !== '') {
        inputRefs.current[index + 1].focus();
      } else if (index === length - 1 && value !== '') {
        onSubmit(newInputValues.join(''));
      }

      return newInputValues;
    });
  };
  const handleBackspace = (index, event) => {
    if (event.key === 'Backspace' && index > 0 && inputValues[index] === '') {
      inputRefs.current[index - 1].focus();
    }
  };

  const [seconds, setSeconds] = useState(60)
  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000)
    } else {
      let disactiveButton = document.getElementById('VerifyButton')
      disactiveButton.classList.remove("disactive")
      let disactiveButtonDiv = document.getElementById("VerifyButtonDiv")
      disactiveButtonDiv.classList.add('disactive')
    }
  })

  return (
      <>
        <Header title="Профиль" gobackto="/login"/>
        <h1 className='VerifyTitle'>Введите код из сообщения</h1>
        <h2 className='VerifyHelp'>Новый код сможем отправить через {seconds} сек.</h2>
        <from>
          <div className='buttonset'>
            {inputValues.map((value, index) => (
                <input
                    key={index}
                    ref={el => inputRefs.current[index] = el}
                    value={value}
                    onInput={e => handleInputChange(index, e.target.value)}
                    onKeyDown={(event) => handleBackspace(index, event)}
                    maxLength={1}
                    type="number"
                    className="VerifyInput"
                />
            ))}
            {/*<input type="number" required maxLength={1} min="0" max="9" className='VerifyInput' id='1' placeholder='' />*/}
            {/*<input type="number" required maxLength={1} min="0" max="9" className='VerifyInput' id='2' placeholder='' />*/}
            {/*<input type="number" required maxLength={1} min="0" max="9" className='VerifyInput' id='3' placeholder='' />*/}
            {/*<input type="number" required maxLength={1} min="0" max="9" className='VerifyInput' id='4' placeholder='' />*/}
          </div>
          <div>
            <div id='VerifyButtonDiv'>Прислать новый код</div>
            <button id='VerifyButton' className='disactive'>Прислать новый код</button>
          </div>
        </from>
      </>
  )
}

