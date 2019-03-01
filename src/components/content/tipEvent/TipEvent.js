import React from 'react';
import './TipEvent.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

export class TipEvent extends React.Component {
    state = {
        tips: [],
        events: []
    };

    async componentDidMount() {
        const res = await axios({
            method: 'get',
            url: `${process.env.API_URL}/api/main/tipEvent`,
        });

        this.setState({
            tips: res.data.Tips,
            events: res.data.events
        });
    }

    render() {
        return (
            <div className="tipEvent_container">
                <div className="tips">
                    <div className="tip_container_inner">
                        <div className="event_tip">
                            <div className="tip-heading">
                                <h4>꿀팁</h4>
                                <Link to="/tips">
                                    <div className="tip-event-button">+ 더보기</div>
                                </Link>
                            </div>
                            <div className="tip-img-wrap-box">
                                <div className="tip-img-box-left">
                                    {
                                        this.state.tips.length > 0 ?
                                        (<div className="tip-img">
                                            <Link to={`/tips/${this.state.tips[0].index}`} onClick={() => {
                                                document.body.scrollTop = document.documentElement.scrollTop = 0;
                                            }}>
                                                <img src={this.state.tips[0].titleImageUrl}
                                                     className="img-responsive adjust" alt=""/>
                                            </Link>
                                        </div>) : null
                                    }
                                    {
                                        this.state.tips.length > 1 ?
                                        (<div className="tip-img">
                                            <Link to={`/tips/${this.state.tips[1].index}`} onClick={() => {
                                                document.body.scrollTop = document.documentElement.scrollTop = 0;
                                            }}>
                                                <img src={this.state.tips[1].titleImageUrl}
                                                     className="img-responsive adjust" alt=""/>
                                            </Link>
                                        </div>) : null
                                    }
                                </div>
                                <div className="tip-img-box-right">
                                    {
                                        this.state.tips.length > 2 ?
                                        (<div className="tip-img-rotate">
                                            <Link to={`/tips/${this.state.tips[2].index}`} onClick={() => {
                                                document.body.scrollTop = document.documentElement.scrollTop = 0;
                                            }}>
                                                <img src={this.state.tips[2].titleImageUrl}
                                                     className="img-responsive adjust" alt=""/>
                                            </Link>
                                        </div>) : null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="events">
                    <div className="tip_container_inner">
                        <div className="event_tip">
                            <div className="tip-heading">
                                {/*<i className="fa fa-heart" aria-hidden="true"></i>*/}
                                <h4>이벤트</h4>
                                <Link to="/events">
                                    <div className="tip-event-button">+ 더보기</div>
                                </Link>
                            </div>
                            <div className="event-img-box">
                                {
                                    this.state.events.length > 0 ?
                                        (<div className="event-img1">
                                            <Link to={`/events/${this.state.events[0].index}`} onClick={() => {
                                                document.body.scrollTop = document.documentElement.scrollTop = 0;
                                            }}>
                                                <img src={this.state.events[0].titleImageUrl}
                                                     className="img-responsive adjust" alt=""/>
                                            </Link>
                                        </div>) : null
                                }
                                {
                                    this.state.events.length > 1 ?
                                        (<div className="event-img2">
                                            <Link to={`/events/${this.state.events[1].index}`} onClick={() => {
                                                document.body.scrollTop = document.documentElement.scrollTop = 0;
                                            }}>
                                                <img src={this.state.events[1].titleImageUrl}
                                                     className="img-responsive adjust" alt=""/>
                                            </Link>
                                        </div>) : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}