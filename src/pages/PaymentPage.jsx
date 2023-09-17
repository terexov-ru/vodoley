import React, {useEffect, useState} from 'react'
import '../pageStyles/PaymentPage.css'
import Redirect from "./Redirect";

export const PaymentPage = () => {
    const [redirectToMain, setRedirectToMain] = useState(false);

    useEffect(() => {
        // Устанавливаем таймер на 5 секунд для перехода на страницу /main
        const timer = setTimeout(() => {
            setRedirectToMain(true);
        }, 3000);

        // Очищаем таймер, если компонент размонтируется (например, при переходе на другую страницу)
        return () => clearTimeout(timer);
    }, []);

    if (redirectToMain) {
        return <Redirect to="/main" />;
    }
    return (
        <div className='paymentComplited'>
            <a>Оплата прошла успешно</a>
        </div>
    )
}
