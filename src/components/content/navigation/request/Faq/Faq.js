
import React from 'react';
import './Faq.css';
import {FaqCard} from './FaqCard';
import axios from 'axios';


export class Faq extends React.Component{
    state = {
       faqs: []
    };

    componentDidMount = () => {
        axios.get(`${process.env.API_URL}/api/ask/Faq`)
        .then((res) => {
            this.setState({
                faqs: res.data
            })
        });
    }

    render = () => {
        
        return (
            <div className="faq-container">
                <div className="faq-header">
                    <div className="faq-header-title">
                        FAQ
                    </div>
                </div>
                <div className="faq-body">
                    <div className="faq-head">
                        자주 묻는 문의사항입니다.
                    </div>

                    {
                        this.state.faqs.map((d, i) => {
                            return(
                                <FaqCard data={d} key={i}/>
                            )
                        })
                    }

                </div>
            </div>
        )
    }        
}
