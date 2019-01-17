import React from 'react';
import './TipEvent.css';

export const TipEvent = ()=>{
    return(
        <div className="tipEvent_container">
            <div className="tip_container_inner">
                <div className="event_tip">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12 tip-event-inner">
                            <div className="tip-heading">
                            <i className="fa fa-heart" aria-hidden="true"></i>
                            <h4>꿀팁</h4>
                            </div>
                            <div className="tip-img">
                                <a href="/tips">
                                    <img src={"http://13.125.89.0/chemical/event_tip_thumbnail/tip1_1.png"} className="img-responsive adjust" alt=""/>
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 tip-event-inner">
                        <div className="tip-heading">
                            <i className="fa fa-heart" aria-hidden="true"></i>
                            <h4>이벤트</h4>
                            </div>
                            <div className="tip-img">
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