import React, { Component } from 'react';
import '../App.css';


class FooterComponent extends Component {
    constructor(props)
    {
        super(props)
        this.state={
            
        }
    }
    render() {
        return (
            <div >
                <header className='header' >
                   <nav>
                    <h5>Employee Management App</h5>
                    </nav> 
                </header>
            </div>
        );
    }
}

export default FooterComponent;