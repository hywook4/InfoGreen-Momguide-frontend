
import React from 'react';
import './Faq.css';



export class FaqCard extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            index: props.data.index,
            title: props.data.title,
            content: props.data.content,
            imageUrl: props.data.imageUrl,
            contentUrl: props.data.contentUrl,
            open: false
        }

    }
    


    handleClick = () => {
        this.setState({
            open: !this.state.open
        })
    }

    render = () => {
        
        return (
            <div className="faq-card">
                <div className={(this.state.index)%2 === 1 ? "faq-card-title-odd" : "faq-card-title"}>
                    <span>{`${this.state.index}. ${this.state.title}`}</span>
                    <i className={`fas faq-title-button ${this.state.open ? "fa-chevron-up" : "fa-chevron-down"}`} onClick={this.handleClick}/>
                </div>
                <div className="faq-card-body" hidden={this.state.open ? "" : "hidden"}>
                    <div className="faq-card-content">
                        {this.state.content}
                    </div>
                </div>
            </div>

                               
        )
    }        
}
