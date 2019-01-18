import React from 'react';
import './TipEvent.css';

export const TipEvent = ()=>{
    return(
        <div className="tipEvent_container">
            <div className="tips">
                <div className="tip_container_inner">
                    <div className="event_tip">
                        <div className="tip-heading">
                            <h4>꿀팁</h4>
                            <a href="/tips"><div className="tip-event-button">+ 더보기</div></a>
                        </div>
                        <div className="tip-img-wrap-box">
                            <div className="tip-img-box-left">
                                <div className="tip-img">
                                    <a href="/tips">
                                        <img src={"http://13.125.89.0/chemical/event_tip_thumbnail/tip1_1.png"} className="img-responsive adjust" alt=""/>
                                    </a>
                                </div>
                                <div className="tip-img">
                                    <a href="/tips">
                                        <img src={"http://13.125.89.0/chemical/event_tip_thumbnail/tip1_1.png"} className="img-responsive adjust" alt=""/>
                                    </a>
                                </div>
                            </div>
                            <div className="tip-img-box-right">
                                <div className="tip-img-rotate">
                                    <a href="/tips">
                                        <img src={"http://13.125.89.0/chemical/event_tip_thumbnail/tip1_1.png"} className="img-responsive adjust" alt=""/>
                                    </a>
                                </div>
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
                            <a href="/events"><div className="tip-event-button">+ 더보기</div></a>
                        </div>
                        <div className="event-img-box">
                            <div className="event-img1">
                                <a href="/tips">
                                    <img href={"/events"} src={"http://13.125.89.0/chemical/event_tip_thumbnail/event95_3.png"} className="img-responsive adjust" alt=""/>
                                </a>
                            </div>
                            <div className="event-img2">
                                <a href="/tips">
                                    <img href={"/events"} src={"http://13.125.89.0/chemical/event_tip_thumbnail/event95_3.png"} className="img-responsive adjust" alt=""/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}