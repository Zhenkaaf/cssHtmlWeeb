import { useEffect, useLayoutEffect, useState } from "react";
import "./App.css";
import heroImg from "./assets/Desktop.svg";
import comp1 from "./assets/comp1.svg";
import comp2 from "./assets/comp2.svg";
import comp3 from "./assets/comp3.svg";
import comp4 from "./assets/comp4.svg";
import comp5 from "./assets/comp5.svg";
import discover from "./assets/discover.svg";
import arrow from "./assets/arrow-right.svg";
import arrowPurple from "./assets/arrow-purple.svg";
import speed from "./assets/speed.svg";
import testimon from "./assets/testimon.svg";
import ava from "./assets/ava.png";
import event1 from "./assets/event1.png";
import event2 from "./assets/event2.png";
import event3 from "./assets/event3.png";
import foo1 from "./assets/foo1.svg";
import foo2 from "./assets/foo2.svg";
import foo3 from "./assets/foo3.svg";
import foo4 from "./assets/foo4.svg";
import foo5 from "./assets/foo5.svg";

function Actions() {
    return (
        <div className="header__actions actions">
            <a href="#" className="actions__link">
                Log In
            </a>
            <a href="#" className="actions__link">
                Join Now
            </a>
        </div>
    );
}

function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileScreen, setIsMobileScreen] = useState(false);
    console.log(isMobileScreen);
    const [test, setTest] = useState("test");
    console.log(test);
    /* useState выполняется синхронно → React возвращает [false, setIsMobileScreen].
JSX формируется на основе текущего стейта (false).
Консоль логирует "test".
➡ На этом этапе useLayoutEffect ещё не выполнялся, потому что React только готовит виртуальный DOM.
2️⃣ Монтирование DOM
React вставляет виртуальный DOM в реальный DOM браузера.
Пользователь ещё ничего не видит, браузер только готовит кадр.
3️⃣ useLayoutEffect
После того как DOM готов к отображению, но ещё не показан пользователю, React вызывает useLayoutEffect. 
React видит, что стейт изменился → запускает синхронный повторный рендер до того, как браузер отрисует экран.
Важно: вторая отрисовка происходит внутри React, но ещё до того, как пользователь что-то увидит.
Вторая отрисовка
Теперь isMobileScreen = true.
React снова выполняет функцию App(), поэтому лог "test" снова выводится.*/
    useLayoutEffect(() => {
        /* React вызывает этот эффект после того как DOM готов, но ещё до того как браузер нарисовал страницу. */
        const mq = window.matchMedia("(max-width: 767.98px)");
        const updateIsMobileScreen = (e) => {
            setIsMobileScreen(e.matches);
        };
        console.log(mq.matches);
        setIsMobileScreen(mq.matches); // первичная инициализация
        mq.addEventListener("change", updateIsMobileScreen); // Этот обработчик вызовется только тогда, когда matches изменится (true → false или false → true). Браузер сам следит за шириной окна и знает, выполняется медиазапрос или нет.У объекта mq есть текущее состояние: mq.matches = true/false.Когда ширина окна пересекает границу условия (767.98px), браузер генерирует событие "change".На это событие ты подписал функцию updateIsMobileScreen.В момент события браузер передаёт в неё объект MediaQueryListEvent, в котором лежит новое значение e.matches.
        return () => mq.removeEventListener("change", updateIsMobileScreen);
    }, []);

    /* Когда React вызывает функцию компонента:
Выполняется весь код внутри функции компонента синхронно — это включает:
объявления переменных вызовы useState, useReducer
любые console.log прямо в теле функции
JSX (который пока ещё виртуальный, React создаёт виртуальный DOM)
React формирует виртуальный DOM на основе этого кода.
После подготовки виртуального DOM React монтирует реальный DOM в браузере.
Только после монтирования DOM вызываются эффекты:
useLayoutEffect (сразу после монтирования, до отрисовки на экране)
useEffect (асинхронно, после отрисовки на экране)
💡 Значит: весь код внутри функции компонента выполняется до того, как браузер нарисует страницу.
Поэтому твой console.log("hello") внутри JSX срабатывает до useLayoutEffect и до того, как пользователь увидит UI. */

    useEffect(() => {
        document.body.classList.toggle("_lock", isMenuOpen);
        return () => {
            document.body.classList.remove("_lock");
        };
    }, [isMenuOpen]);
    return (
        <div className="wrapper">
            <header className="header">
                {console.log("hello")}
                <div className="container container--small">
                    <div className="header__body">
                        <a
                            href="#"
                            className="header__link-logo"
                            onClick={() => setIsMenuOpen((prev) => !prev)}
                        >
                            weeb
                        </a>
                        <nav
                            className={`header__menu menu ${
                                isMenuOpen ? "active" : ""
                            }`}
                        >
                            <ul className="menu__list">
                                <li className="menu__item">
                                    <a
                                        href="#"
                                        className="menu__link"
                                        onClick={() =>
                                            setIsMenuOpen((prev) => !prev)
                                        }
                                    >
                                        About Us
                                    </a>
                                </li>
                                <li className="menu__item">
                                    <a
                                        href="#"
                                        className="menu__link"
                                        onClick={() =>
                                            setIsMenuOpen((prev) => !prev)
                                        }
                                    >
                                        Solutions
                                    </a>
                                </li>
                                <li className="menu__item">
                                    <a
                                        href="#"
                                        className="menu__link"
                                        onClick={() =>
                                            setIsMenuOpen((prev) => !prev)
                                        }
                                    >
                                        Pricing
                                    </a>
                                </li>
                                <li className="menu__item">
                                    <a
                                        href="#"
                                        className="menu__link"
                                        onClick={() =>
                                            setIsMenuOpen((prev) => !prev)
                                        }
                                    >
                                        Resources
                                    </a>
                                </li>
                            </ul>
                            {isMobileScreen && <Actions />}
                        </nav>
                        {!isMobileScreen && <Actions />}
                        <button
                            className={`header__burger ${
                                isMenuOpen ? "active" : ""
                            }`}
                            onClick={() => setIsMenuOpen((prev) => !prev)}
                        >
                            <span></span>
                        </button>
                    </div>
                </div>
            </header>
            <main className="page">
                <section className="page__hero hero">
                    <div className="container">
                        <div className="hero__body">
                            <div className="hero__content">
                                <h1 className="hero__title">
                                    Design{" "}
                                    <span className="hero__title-first">
                                        Faster
                                        <span className="hero__title-first-line"></span>{" "}
                                    </span>
                                    <span className="purple__color">&</span>{" "}
                                    <span className="hero__title-second">
                                        {" "}
                                        Better
                                        <span className="hero__title-second-line"></span>
                                    </span>
                                </h1>
                                <div className="hero__text">
                                    <p>
                                        Sit elit feugiat turpis sed integer
                                        integer accumsan turpis. Sed suspendisse
                                        nec lorem mauris. Pharetra, eu imperdiet
                                        ipsum ultrices amet, dui sit
                                        suspendisse.
                                    </p>
                                </div>
                                <div className="hero__actions">
                                    <button className="hero__btn">
                                        Join Now
                                    </button>
                                    <button className="hero__btn">
                                        View Demo
                                    </button>
                                </div>
                            </div>

                            <img src={heroImg} alt="" className="hero__img" />
                        </div>
                    </div>
                </section>

                <section className="page__companies companies">
                    <div className="container">
                        <div className="companies__body">
                            <h2 className="companies__title title">
                                Join Leading Companies
                            </h2>
                            <div className="companies__items">
                                <img
                                    src={comp1}
                                    alt=""
                                    className="companies__item"
                                />
                                <img
                                    src={comp2}
                                    alt=""
                                    className="companies__item"
                                />
                                <img
                                    src={comp3}
                                    alt=""
                                    className="companies__item"
                                />
                                <img
                                    src={comp4}
                                    alt=""
                                    className="companies__item"
                                />
                                <img
                                    src={comp5}
                                    alt=""
                                    className="companies__item"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="discover__page discover">
                    <div className="container">
                        <div className="discover__body">
                            <div className="discover__content">
                                <div className="discover__head">
                                    <label className="discover__label">
                                        Discover
                                    </label>
                                    <h2 className="discover__title title">
                                        <span className="purple__color">
                                            Unlimited{" "}
                                        </span>
                                        <span className="discover__title-border">
                                            ideas
                                        </span>{" "}
                                        for your next great projects
                                    </h2>
                                </div>
                                <div className="discover__text">
                                    <p>
                                        Scelerisque auctor dolor diam tortor,
                                        fames faucibus non interdum nunc.{" "}
                                    </p>
                                    <p>
                                        {" "}
                                        Ultrices nibh sapien elit gravida ac,
                                        rutrum molestie adipiscing lacinia.
                                    </p>
                                </div>
                                <a href="#" className="discover__link">
                                    <span>Discover Ideas</span>{" "}
                                    <img
                                        className="discover__link-arrow"
                                        src={arrow}
                                        alt=""
                                    />
                                </a>
                            </div>
                            <div className="discover__img-container">
                                <img src={discover} alt="" />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="speed__page discover">
                    <div className="container">
                        <div className="speed__body">
                            <div className="speed__content">
                                <div className="speed__head">
                                    <label className="speed__label">
                                        Speed
                                    </label>
                                    <h2 className="speed__title title">
                                        Work fast, w/o interruptions
                                    </h2>
                                </div>
                                <div className="speed__text">
                                    <p>
                                        Scelerisque auctor dolor diam tortor,
                                        fames faucibus non interdum nunc.
                                        Ultrices nibh sapien elit gravida ac,
                                        rutrum molestie adipiscing lacinia.
                                    </p>
                                </div>
                            </div>
                            <div className="speed__img-container">
                                <img src={speed} alt="" />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="testimonials">
                    <div className="container">
                        <div className="testimonials__body">
                            <div className="testimonials__head">
                                <label className="testimonials__label">
                                    Testimonials
                                </label>
                                <h2 className="testimonials__title title">
                                    Bigapp got to the next level
                                </h2>
                                <a href="#" className="testimonials__link">
                                    <span>View Case Study</span>{" "}
                                    <img
                                        className="testimonials__link-arrow"
                                        src={arrow}
                                        alt=""
                                    />
                                </a>
                            </div>

                            <div className="testimonials__img-container">
                                <img
                                    className="testimonials__img"
                                    src={testimon}
                                    alt=""
                                />
                            </div>

                            <div className="testimonials__info info">
                                <div className="info__text">
                                    <p>
                                        “Viverra viverra nibh enim et aliquam,
                                        enim. Tempor, sit mus viverra orci dui
                                        consequat turpis scelerisque faucibus.”
                                    </p>
                                </div>
                                <div className="info__profile profile">
                                    <img
                                        src={ava}
                                        alt=""
                                        className="profile__avatar"
                                    />
                                    <div className="profile__info">
                                        <p className="profile__name">
                                            Rwanda Melflor
                                        </p>
                                        <p className="profile__position">
                                            Co-founder Bigapp
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="events">
                    <div className="container">
                        <div className="events__body">
                            <div className="events__header">
                                <h2 className="events__title title">
                                    Design events near your
                                </h2>

                                <a
                                    href="#"
                                    className="events__header-link testimonials__link"
                                >
                                    <span>Explore Events</span>{" "}
                                    <img
                                        className="events__header-link-arrow testimonials__link-arrow"
                                        src={arrowPurple}
                                        alt=""
                                    />
                                </a>
                            </div>
                            <div className="events__items">
                                <article className="events__item item-event">
                                    <a href="#" className="item-event__link">
                                        <img
                                            src={event1}
                                            alt=""
                                            className="item-event__img"
                                        />
                                        <span className="item-event__text">
                                            Design Thinking
                                        </span>
                                    </a>

                                    <label
                                        htmlFor=""
                                        className="item-event__category"
                                    >
                                        Design Thinking
                                    </label>
                                    <h4 className="item-event__title">
                                        Wild Horse Event
                                    </h4>
                                    <a
                                        href=""
                                        className="item-event__tickets-link testimonials__link"
                                    >
                                        <span>Buy Tickets</span>{" "}
                                        <img
                                            className="item-event__tickets-link-arrow testimonials__link-arrow"
                                            src={arrowPurple}
                                            alt=""
                                        />
                                    </a>
                                </article>
                                <article className="events__item item-event">
                                    <a href="#" className="item-event__link">
                                        <img
                                            src={event2}
                                            alt=""
                                            className="item-event__img"
                                        />
                                        <span className="item-event__text">
                                            Festival
                                        </span>
                                    </a>

                                    <label
                                        htmlFor=""
                                        className="item-event__category"
                                    >
                                        Festival
                                    </label>
                                    <h4 className="item-event__title">
                                        Music & Colors
                                    </h4>
                                    <a
                                        href=""
                                        className="item-event__tickets-link testimonials__link"
                                    >
                                        <span>Buy Tickets</span>{" "}
                                        <img
                                            className="item-event__tickets-link-arrow testimonials__link-arrow"
                                            src={arrowPurple}
                                            alt=""
                                        />
                                    </a>
                                </article>
                                <article className="events__item item-event">
                                    <a href="#" className="item-event__link">
                                        <img
                                            src={event3}
                                            alt=""
                                            className="item-event__img"
                                        />
                                        <span className="item-event__text">
                                            Bootcamp
                                        </span>
                                    </a>

                                    <label
                                        htmlFor=""
                                        className="item-event__category"
                                    >
                                        Bootcamp
                                    </label>
                                    <h4 className="item-event__title">
                                        Happy Father’s Day
                                    </h4>
                                    <a
                                        href=""
                                        className="item-event__tickets-link testimonials__link"
                                    >
                                        <span>Buy Tickets</span>{" "}
                                        <img
                                            className="item-event__tickets-link-arrow testimonials__link-arrow"
                                            src={arrowPurple}
                                            alt=""
                                        />
                                    </a>
                                </article>
                                <article className="events__item item-event">
                                    <a href="#" className="item-event__link">
                                        <img
                                            src={event3}
                                            alt=""
                                            className="item-event__img"
                                        />
                                        <span className="item-event__text">
                                            Bootcamp
                                        </span>
                                    </a>

                                    <label
                                        htmlFor=""
                                        className="item-event__category"
                                    >
                                        Bootcamp
                                    </label>
                                    <h4 className="item-event__title">
                                        Happy Father’s Day
                                    </h4>
                                    <a
                                        href=""
                                        className="item-event__tickets-link testimonials__link"
                                    >
                                        <span>Buy Tickets</span>{" "}
                                        <img
                                            className="item-event__tickets-link-arrow testimonials__link-arrow"
                                            src={arrowPurple}
                                            alt=""
                                        />
                                    </a>
                                </article>
                                <article className="events__item item-event">
                                    <a href="#" className="item-event__link">
                                        <img
                                            src={event3}
                                            alt=""
                                            className="item-event__img"
                                        />
                                        <span className="item-event__text">
                                            Bootcamp
                                        </span>
                                    </a>

                                    <label
                                        htmlFor=""
                                        className="item-event__category"
                                    >
                                        Bootcamp
                                    </label>
                                    <h4 className="item-event__title">
                                        Happy Father’s Day
                                    </h4>
                                    <a
                                        href=""
                                        className="item-event__tickets-link testimonials__link"
                                    >
                                        <span>Buy Tickets</span>{" "}
                                        <img
                                            className="item-event__tickets-link-arrow testimonials__link-arrow"
                                            src={arrowPurple}
                                            alt=""
                                        />
                                    </a>
                                </article>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="footer">
                <div className="container">
                    <div className="footer__body">
                        <div className="footer__top">
                            <a href="#" className="footer__logo-link">
                                weeb
                            </a>
                            <div className="footer__column">
                                <h4 className="footer__column-title">
                                    PRODUCT
                                </h4>
                                <ul className="footer__list">
                                    <li className="footer__item">
                                        <a
                                            href="#"
                                            className="footer__item-link"
                                        >
                                            Pricing
                                        </a>
                                    </li>
                                    <li className="footer__item">
                                        <a
                                            href="#"
                                            className="footer__item-link"
                                        >
                                            Overview
                                        </a>
                                    </li>
                                    <li className="footer__item">
                                        <a
                                            href="#"
                                            className="footer__item-link"
                                        >
                                            Browse
                                        </a>
                                    </li>
                                    <li className="footer__item">
                                        <a
                                            href="#"
                                            className="footer__item-link"
                                        >
                                            Accessibility
                                        </a>
                                    </li>
                                    <li className="footer__item">
                                        <a
                                            href="#"
                                            className="footer__item-link"
                                        >
                                            Five
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="footer__column">
                                <h4 className="footer__column-title">
                                    Solutions
                                </h4>
                                <ul className="footer__list">
                                    <li className="footer__item">
                                        <a
                                            href="#"
                                            className="footer__item-link"
                                        >
                                            Brainstorming
                                        </a>
                                    </li>
                                    <li className="footer__item">
                                        <a
                                            href="#"
                                            className="footer__item-link"
                                        >
                                            Ideation
                                        </a>
                                    </li>
                                    <li className="footer__item">
                                        <a
                                            href="#"
                                            className="footer__item-link"
                                        >
                                            Wireframing
                                        </a>
                                    </li>
                                    <li className="footer__item">
                                        <a
                                            href="#"
                                            className="footer__item-link"
                                        >
                                            Research
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="footer__column">
                                <h4 className="footer__column-title">
                                    Resources
                                </h4>
                                <ul className="footer__list">
                                    <li className="footer__item">
                                        <a
                                            href="#"
                                            className="footer__item-link"
                                        >
                                            Help Center
                                        </a>
                                    </li>
                                    <li className="footer__item">
                                        <a
                                            href="#"
                                            className="footer__item-link"
                                        >
                                            Blog
                                        </a>
                                    </li>
                                    <li className="footer__item">
                                        <a
                                            href="#"
                                            className="footer__item-link"
                                        >
                                            Tutorials
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="footer__column">
                                <h4 className="footer__column-title">
                                    Company
                                </h4>
                                <ul className="footer__list">
                                    <li className="footer__item">
                                        <a
                                            href="#"
                                            className="footer__item-link"
                                        >
                                            About
                                        </a>
                                    </li>
                                    <li className="footer__item">
                                        <a
                                            href="#"
                                            className="footer__item-link"
                                        >
                                            Press
                                        </a>
                                    </li>
                                    <li className="footer__item">
                                        <a
                                            href="#"
                                            className="footer__item-link"
                                        >
                                            Events
                                        </a>
                                    </li>
                                    <li className="footer__item">
                                        <a
                                            href="#"
                                            className="footer__item-link"
                                        >
                                            Careers
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="footer__bottom">
                            <div className="footer__copyright">
                                @ 2025 Weeb, Inc. All rights reserved.
                            </div>
                            <div className="footer__socials">
                                <img src={foo1} alt="" />
                                <img src={foo2} alt="" />
                                <img src={foo3} alt="" />
                                <img src={foo4} alt="" />
                                <img src={foo5} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;
