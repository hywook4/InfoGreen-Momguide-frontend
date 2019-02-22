import React from 'react';
import { Link } from 'react-router-dom';
import './Events.css';

export class Events extends React.Component {
    constructor(props) {
        super(props);

        // TODO
        this.state = {
            events: [{
                image: 'https://i.ytimg.com/vi/HBVuKR1MgFE/maxresdefault.jpg',
                title: '뿌요뿌요',
                contents: 'e스포츠',
                startDate: '2018-09-11',
                endDate: '2018-10-12',
                end: false
            },{
                image: 'https://i.ytimg.com/vi/HBVuKR1MgFE/maxresdefault.jpg',
                title: '뿌요뿌요',
                contents: 'e스포츠',
                startDate: '2018-09-11',
                endDate: '2018-10-12',
                end: false
            },{
                image: 'https://i.ytimg.com/vi/HBVuKR1MgFE/maxresdefault.jpg',
                title: '뿌요뿌요',
                contents: 'e스포츠',
                startDate: '2018-09-11',
                endDate: '2018-10-12',
                end: false
            },{
                image: 'https://i.ytimg.com/vi/HBVuKR1MgFE/maxresdefault.jpg',
                title: '뿌요뿌요',
                contents: 'e스포츠',
                startDate: '2018-09-11',
                endDate: '2018-10-12',
                end: false
            },{
                image: 'https://i.ytimg.com/vi/HBVuKR1MgFE/maxresdefault.jpg',
                title: '뿌요뿌요',
                contents: 'e스포츠',
                startDate: '2018-09-11',
                endDate: '2018-10-12',
                end: false
            },{
                image: 'https://i.ytimg.com/vi/HBVuKR1MgFE/maxresdefault.jpg',
                title: '뿌요뿌요',
                contents: 'e스포츠',
                startDate: '2018-09-11',
                endDate: '2018-10-12',
                end: true
            },{
                image: 'https://i.ytimg.com/vi/HBVuKR1MgFE/maxresdefault.jpg',
                title: '뿌요뿌요',
                contents: 'e스포츠',
                startDate: '2018-09-11',
                endDate: '2018-10-12',
                end: true
            },{
                image: 'https://i.ytimg.com/vi/HBVuKR1MgFE/maxresdefault.jpg',
                title: '뿌요뿌요',
                contents: 'e스포츠',
                startDate: '2018-09-11',
                endDate: '2018-10-12',
                end: true
            },{
                image: 'https://i.ytimg.com/vi/HBVuKR1MgFE/maxresdefault.jpg',
                title: '뿌요뿌요',
                contents: 'e스포츠',
                startDate: '2018-09-11',
                endDate: '2018-10-12',
                end: true
            },{
                image: 'https://i.ytimg.com/vi/HBVuKR1MgFE/maxresdefault.jpg',
                title: '뿌요뿌요',
                contents: 'e스포츠',
                startDate: '2018-09-11',
                endDate: '2018-10-12',
                end: true
            },{
                image: 'https://i.ytimg.com/vi/HBVuKR1MgFE/maxresdefault.jpg',
                title: '뿌요뿌요',
                contents: 'e스포츠',
                startDate: '2018-09-11',
                endDate: '2018-10-12',
                end: true
            },{
                image: 'https://i.ytimg.com/vi/HBVuKR1MgFE/maxresdefault.jpg',
                title: '뿌요뿌요',
                contents: 'e스포츠',
                startDate: '2018-09-11',
                endDate: '2018-10-12',
                end: true
            }],
            currentPage: 1,
            totalPage: 2,
            currentTab: "events", // events or winners
            eventCategory: "전체 이벤트"
        };
    }

    changeTab = (tab) => {
        // TODO : 해당하는 탭에 불러서 리스트에 넣어주기 
        this.setState({
            currentTab: tab,
            currentPage: 1
        })
    }

    changeCategory = (e) => {
        console.log(e.target.value);
        this.setState({
            eventCategory: e.target.value,
            currentPage: 1
        })
        // TODO : 해당하는 이벤트들 불러서 리스트에 넣어주기 
        switch(e.target.value){
            case "전체 이벤트":
                break;
            
            case "진행중인 이벤트":
                break;

            case "지난 이벤트":
                break;
        }

    }

    // TODO
    loadNextPage = () => {
        this.setState({
            currentPage: this.state.currentPage + 1
        })
        //TODO : 기존 리스트에 새로받은 값들 추가해주기
    };
    
    render() {
        const moreButton = (
            <button className="events-more-button" onClick={() => {this.loadNextPage()}}>
                더보기
            </button>
        );

        const eventCards = (
            this.state.events.map((item, i) => {
                return (
                    <Link to="/events/123">
                        <div className="events-card-item" key={i}>
                            {item.end ? null : <div className="events-top-right">D-Day</div> /* TODO : 날짜 계산하기 */}
                            <div className="events-card-item-image-container">
                                {item.end ? <div className="events-end">종료된 이벤트 입니다.</div> : null}
                                <img src={item.image} alt="events" />
                            </div>
                            <div className="events-bottom-left">
                                <h5>{item.title}</h5>
                                <h6>{item.contents}</h6>
                            </div>
                            <div className="events-bottom-right">
                                {item.startDate + " ~ " + item.endDate}
                            </div>
                        </div>
                    </Link>
                );
            })
        )

        const winnerCards = (
            this.state.events.map((item, i) => {
                return (
                    <Link to="/events/123">
                        <div className="events-card-item" key={i}>
                            <div className="events-card-item-image-container">
                                <img src={item.image} alt="events" />
                            </div>
                            <div className="events-bottom-left">
                                <h5>{item.title}</h5>
                                <h6>{item.contents}</h6>
                            </div>
                            <div className="events-bottom-right">
                                {item.startDate + " ~ " + item.endDate}
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
                    <div className={`events-navigation-button ${this.state.currentTab==="events" ? "events-navigation-selected" : ""}`} 
                    onClick={(e)=>{this.changeTab("events");}}>
                        <select className="events-category" onChange={this.changeCategory}>
                            <option selected value="전체 이벤트">전체 이벤트</option>
                            <option value="진행중인 이벤트">진행중인 이벤트</option>
                            <option value="지난 이벤트">지난 이벤트</option>
                        </select>
                    </div>
                    <div className={`events-navigation-button ${this.state.currentTab==="events" ? "" : "events-navigation-selected"}`} 
                    onClick={(e)=>{this.changeTab("winners");}}>
                        <div>당첨자 발표</div>
                    </div>
                </div> 
                <div className="events-card-container">

                    {
                        this.state.currentTab === "events" ? 
                        eventCards : winnerCards
                    }
                        
                </div>
                {this.state.currentPage < this.state.totalPage ? moreButton : null}
            </div>
        )
    }
}