import React, { Component } from "react";
import '../css/list.css'
class PaperList extends Component{
    
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div className="container">
        <div className="list-container" >
            <div className="list-item" >
                <div className="address">
                    <div className="actions" > 
                        <div>Adress : 0x5EAsdf4adfADSFaf </div>
                        <div>Votes : 134 PPT </div>
                    </div>
                </div>
                <div className="details"> 
                    <div className="title" >
                        Name Of the Paper
                    </div>
                    <div className="subtitle" >
                        subtitle a description about the paper that any author has published
                    </div>
                </div>
                <div className="actions">
                    <div className="btn" >
                        Vote
                    </div>
                    <div className="btn" >
                        Tippy
                    </div>
                </div>
            </div>
        </div>
        </div>
        )
    }

}
export default PaperList