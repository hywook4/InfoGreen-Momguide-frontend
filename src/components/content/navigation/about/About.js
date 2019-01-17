import React from 'react';
import '../about/About.css';
import QandA from '../qanda/QandA'

export class About extends React.Component{
    render(){
        return(
           
            <div className="about-container">
                    <nav>
                        <div className="nav nav-tabs nav-fill nav-user-fill" id="nav-tab" role="tablist">
                            <a className="nav-item nav-link nav-user-tabs active" id="nav-about-tab" data-toggle="tab" href="#nav-about" role="tab" aria-controls="nav-about" aria-selected="true">서비스 소개</a>
                            <a className="nav-item nav-link nav-user-tabs" id="nav-faq-tab" data-toggle="tab" href="#nav-faq" role="tab" aria-controls="nav-faq" aria-selected="false">Q&amp;A</a>
                            <a className="nav-item nav-link nav-user-tabs" id="nav-notices-tab" data-toggle="tab" href="#nav-notices" role="tab" aria-controls="nav-notices" aria-selected="false">공지사항</a>
                        </div>
                    </nav>
                    <div className="tab-content py-3 px-3 px-sm-0 " id="nav-tabContent">
                        <div className="tab-pane about fade show active" id="nav-about" role="tabpanel" aria-labelledby="nav-about-tab">
                            <img className="img-fluid" src={require('../../../../assets/images/tab1_about.svg')} alt="About"/>
                        </div>
                        <div className="tab-pane fade show" id="nav-faq" role="tabpanel" aria-labelledby="nav-notices-tab">
                            {/* <img className="img-fluid" src={require('../../../../assets/images/tab2_faq.svg')} alt="FAQ"/> */}
                            <QandA/>
                        </div>
                        <div className="tab-pane fade show" id="nav-notices" role="tabpanel" aria-labelledby="nav-notices-tab">
                            <img className="img-fluid" src={require('../../../../assets/images/tab3_notices.svg')} alt="Notices"/>
                        </div>
                    </div>
            </div>
                  
        )
    }
}