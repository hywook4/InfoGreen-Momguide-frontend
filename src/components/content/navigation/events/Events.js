import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import dateFormat from 'dateformat';
import './Events.css';
import moment from 'moment';


export class Events extends React.Component {
    constructor(props) {
        super(props);

        let firstPage = 1;
        
        this.state = {
            events: [],
            currentPage: firstPage,
            totalPages: 1,
            currentTab: "event", // events or winners
            eventCategory: "total",
            nextPageNum: 0,
            order: "latest"
        };
    }

    componentDidMount = async () => {
        let data = await axios.get(`${process.env.API_URL}/api/${this.state.currentTab}/postList?state=${this.state.eventCategory}&order=${this.state.order}&page=${this.state.currentPage}`);

        this.setState({
            events: data.data.Data,
            totalPages: data.data.totalPages,
            nextPageNum: data.data.nextNum
        })

       
    }

    changeTab = async (tab) => {
        // TODO : 해당하는 탭에 불러서 리스트에 넣어주기 
        if(this.state.currentTab === tab){

        } else{
            let data;
            if(tab === "event"){
                data = await axios.get(`${process.env.API_URL}/api/event/postList?state=${this.state.eventCategory}&order=${this.state.order}&page=1`);
            } else{
                data = await axios.get(`${process.env.API_URL}/api/event/postList?state=${tab}&order=${this.state.order}&page=1`);
            }

            this.setState({
                currentTab: tab,
                currentPage: 1,
                events: data.data.Data,
                totalPages: data.data.totalPages,
                nextPageNum: data.data.nextNum
            })
        }
    }

    changeCategory = async (e) => {
        let eventCategory = e.target.value;
        let currentPage = 1;
        
        let nextData = await axios.get(`${process.env.API_URL}/api/event/postList?state=${eventCategory}&order=${this.state.order}&page=${currentPage}`);
    
        this.setState({
            events: nextData.data.Data,
            eventCategory: eventCategory,
            currentPage: currentPage,
            nextPageNum: nextData.data.nextNum,
            totalPages: nextData.data.totalPages
        })
    }



    // TODO
    loadNextPage = async () => {
        let nextPage = this.state.currentPage + 1;

        let nextData = await axios.get(`${process.env.API_URL}/api/${this.state.currentTab}/postList?state=${this.state.eventCategory}&order=${this.state.order}&page=${nextPage}`);
        let events = this.state.events;

        events = events.concat(nextData.data.Data);

        this.setState({
            currentPage: nextPage,
            events: events,
            totalPages: nextData.data.totalPages,
            nextPageNum: nextData.data.nextNum
        })
    };

    getDate = (d) => {
        let date = new Date(d);
        return (dateFormat(date, "yyyy-mm-dd"))
    }

    getDDay = (d) => {
        let date = new Date(d);
        let today = new Date();

        today.setHours(0, 0, 0, 0);

        return moment(date).diff(today, 'days');
    }
    
    render() {
        const moreButton = (
            <button className="events-more-button" onClick={() => {this.loadNextPage()}}>
                +{this.state.nextPageNum}&nbsp;&nbsp;더보기
            </button>
        );

        const eventCards = (
            this.state.events.map((item, i) => {

                const dDay = this.getDDay(item.expirationDate);
                
                return (
                    <Link to={`/events/${item.index}`} key={i}>
                        <div className="events-card-item" >
                            {
                                dDay < 0 ? null : (
                                    dDay === 0 ? <div className="events-top-right">D-Day</div> :
                                    <div className="events-top-right">{dDay}-Day</div> 
                                )
                            }
                            <div className="events-card-item-image-container">
                                { dDay < 0 ? <div className="events-end">종료된 이벤트 입니다.</div> : null }
                                <img src={item.titleImageUrl} alt="events" />
                            </div>
                            <div className="events-bottom-left">
                                <h5>{item.title}</h5>
                                <h6>{item.subtitle}</h6>
                            </div>
                            <div className="events-bottom-right">
                                {this.getDate(item.created_at) + " ~ " + this.getDate(item.expirationDate)}
                            </div>
                        </div>
                    </Link>
                )
            })
        )

        const winnerCards = (
            this.state.events.map((item, i) => {
                return (
                    <Link to={`/events/${item.index}`} key={i}>
                        <div className="events-card-item" >
                            <div className="events-card-item-image-container">
                                <img src={item.titleImageUrl} alt="events" />
                            </div>
                            <div className="events-bottom-left">
                                <h5>{item.title}</h5>
                                <h6>{item.subtitle}</h6>
                            </div>
                            <div className="events-bottom-right">
                                {this.getDate(item.created_at)}
                            </div>
                        </div>
                    </Link>
                );
            })
        )

        return (
            <div className="events-container">
                <div className="events-header">
                    <div className="events-header-title">
                        이벤트
                    </div>
                </div>
                <div className="events-navigation-container">
                    <div className={`events-navigation-button ${this.state.currentTab==="event" ? "events-navigation-selected" : ""}`} 
                    onClick={(e)=>{this.changeTab("event");}}>
                        <select className="events-category" onChange={this.changeCategory} defaultValue="total">
                            <option value="total">전체 이벤트</option>
                            <option value="progress">진행중인 이벤트</option>
                            <option value="finished">지난 이벤트</option>
                        </select>
                    </div>
                    <div className={`events-navigation-button ${this.state.currentTab==="event" ? "" : "events-navigation-selected"}`} 
                    onClick={(e)=>{this.changeTab("winner");}}>
                        <div>당첨자 발표</div>
                    </div>
                </div> 
                <div className="events-card-container">

                    {
                        this.state.currentTab === "event" ? 
                        eventCards : winnerCards
                    }
                        
                </div>
                {this.state.currentPage < this.state.totalPages ? moreButton : null}
            </div>
        )
    }
}