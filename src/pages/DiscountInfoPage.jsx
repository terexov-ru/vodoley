import React from 'react'
import { Header } from '../components/Header/Header';
import '../pageStyles/discountInfoPage.css'

export const DiscountInfoPage = () => {
    return (
        <>
            <Header title="Скидки" gobackto="/discounts"/>
            <h1 className='DisInfTitle'>Система лояльности</h1>
            <p className='DisInfArticle'>
                1. Общие положения. <br/>
                1.1. Настоящие Правила определяют условия и порядок участия в программе лояльности «X5 Клуб». С момента регистрации в Программе «X5 Клуб» Участник вступает во взаимоотношения с Оператором Программы, полностью и безоговорочно принимает настоящие Правила, обязуется их выполнять и имеет право на получение Привилегий в соответствии с настоящими Правилами. Правила размещаются на Сайте Программы, в Мобильном приложении, а также в других источниках по усмотрению Оператора. 1.2. Программа не регулирует приобретение товаров/работ/услуг и не является договором купли-продажи. Программа направлена на привлечение клиентов. 1.3. Программа действует на территории Российской Федерации в Магазинах, функционирующих под обозначением «Перекрёсток» и «Пятёрочка», а также на территории Российской Федерации в торгово-сервисных предприятиях Партнеров. Полный перечень адресов Магазинов, а также перечень Партнеров размещен на сайтах www.perekrestok.ru, www.5ka.ru. 1.4. Программа действует с момента запуска первой версии Программы (с любым иным наименованием) и до полной ее отмены по решению Оператора.
            </p>
        </>
    )
}
