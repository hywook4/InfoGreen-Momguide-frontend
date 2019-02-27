import React from 'react';
import { Link } from 'react-router-dom';
import './Tips.css';
import dateFormat from 'dateformat';
import axios from 'axios';

export class Tips extends React.Component {
    constructor(props) {
        super(props);

        let firstPage = 1;
        
        // TODO
        this.state = {
            tips: [],
            currentPage: firstPage,
            totalPages: 0,
            nextPageNum: 0,
            order: "latest"
        };
    }

    componentDidMount = async () => {
        let tips = await axios.get(`${process.env.API_URL}/api/tip/postList?order=${this.state.order}&page=${this.state.currentPage}`);
        
        this.setState({
            tips: tips.data.Data,
            totalPages: tips.data.totalPages,
            nextPageNum: tips.data.nextNum
        })
    }

    // TODO
    loadNextPage = async () => {
        let nextPage = this.state.currentPage + 1;

        let nextData = await axios.get(`${process.env.API_URL}/api/tip/postList?order=${this.state.order}&page=${nextPage}`)

        let tips = this.state.tips;

        tips = tips.concat(nextData.data.Data);

        this.setState({
            currentPage: nextPage,
            tips: tips,
            totalPages: nextData.data.totalPages,
            nextPageNum: nextData.data.nextNum
        })
    };

    getDate = (d) => {
        let date = new Date(d);
        return (dateFormat(date, "yyyy-mm-dd"))
    }
    
    render() {
        const moreButton = (
            <button className="tips-more-button" onClick={() => {this.loadNextPage()}}>
                +{this.state.nextPageNum}&nbsp;&nbsp;더보기
            </button>
        );

        return (
            <div className="tips-container">
                <div className="events-header">
                    <div className="events-header-title">
                        꿀팁
                    </div>
                </div>
                <div className="tips-card-container">
                    {this.state.tips.map((item, i) => {
                        return (
                            <Link to={`/tips/${item.index}`} key={i}>
                                <div className="tips-card-item">
                                    <div className="tips-card-item-image-container">
                                        <img src={item.titleImageUrl} alt="tips" />
                                    </div>
                                    <div className="tips-bottom-left">
                                        <h5>{item.title}</h5>
                                        <h6>{item.subtitle}</h6>
                                    </div>
                                    <div className="tips-bottom-right">
                                        {this.getDate(item.created_at)}
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
                {this.state.currentPage < this.state.totalPages ? moreButton : null}
            </div>
        )
    }
}