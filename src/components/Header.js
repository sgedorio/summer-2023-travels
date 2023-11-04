import React from 'react';

export default function Header() {
    return (
        <header>
            <div className="flower--header--text">
                <img className="flower--icon" src={process.env.PUBLIC_URL + '/img/flower.svg'} alt="flower"/>
                <div className="header--text">
                    <h1>Summer <span className="number">2023</span></h1>
                    <h3>Whimsical adventures in a period of uncertainty</h3>
                </div>
            </div>
        </header>
    );
}