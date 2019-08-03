import React, { Component } from "react";
import '../css/home.css';
import hero from '../assets/hero.svg'

class Home extends Component{

    render( ){
        return (
            <div className="container" >
                <section>
                    <div className="hero">
                        <div className="heading">
                            <h1> Decentralized Paper Reputation Dapp  </h1>
                            <h2> Bringing decentralization to how we publish papers.</h2>
                        </div>
                        <div className="image">
                            <img src={hero} />
                        </div>
                    </div>
                </section>                 </div>
        )
    }
}

export default Home