import React from 'react';
import '../about/About.css';

export class About extends React.Component{
    render(){
        return(
            <div className="about-container">
                <div className="about-content">
                    <iframe src="https://www.youtube.com/embed/-kqW1_5Hmpw" frameBorder="0" title="about-1"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                    className="about-youtube-1" allowFullScreen></iframe>

                    <iframe src="https://www.youtube.com/embed/-mM-cUb-BWE" frameBorder="0" title="about-2"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                    className="about-youtube-2" allowFullScreen></iframe>

                    <table className="about-naver-map" cellPadding="0" cellSpacing="0" width="550"><tbody><tr><td style={{border:"1px solid #cecece"}}><a href="https://map.naver.com/?searchCoord=232c32cf1f846a336b96c00355ccb2e37c69bb19dc8b502844b52d6fe0b77d49&query=7Jew7IS464yA7ZWZ6rWQIOqzte2VmeybkA%3D%3D&tab=1&lng=dc154c4d5c1add2af34c3e337506ada8&mapMode=0&mpx=318f4d24ed5ff700f242d8cf759b4a18813f22b73ee3cdf1b25281c189d3284807de7d4b45b5a052a19acdae7d2aca66fecc401dcef2894121a28933606212bf&lat=1e96f4a065b272291fc7be5693255c5f&dlevel=12&enc=b64&menu=location"><img src="http://prt.map.naver.com/mashupmap/print?key=p1551416803781_-162306709" width="550" height="340" alt="지도 크게 보기" title="지도 크게 보기" border="0" style={{verticalAlign:"top"}}/></a></td></tr><tr><td><table cellPadding="0" cellSpacing="0" width="100%"><tbody><tr><td height="30" bgcolor="#f9f9f9" align="left" style={{ paddingLeft:"9px", borderLeft:"1px solid #cecece", borderBottom:"1px solid #cecece" }}><span style={{fontFamily: "tahoma", fontSize: "11px", color:"#666"}}>2019.3.1</span>&nbsp;<span style={{fontSize: "11px", color:"#e5e5e5"}}>|</span>&nbsp;<a style={{fontFamily: "dotum sans-serif", fontSize: "11px", color:"#666", textDecoration: "none", letterSpacing: "-1px"}} href="https://map.naver.com/?searchCoord=232c32cf1f846a336b96c00355ccb2e37c69bb19dc8b502844b52d6fe0b77d49&query=7Jew7IS464yA7ZWZ6rWQIOqzte2VmeybkA%3D%3D&tab=1&lng=dc154c4d5c1add2af34c3e337506ada8&mapMode=0&mpx=318f4d24ed5ff700f242d8cf759b4a18813f22b73ee3cdf1b25281c189d3284807de7d4b45b5a052a19acdae7d2aca66fecc401dcef2894121a28933606212bf&lat=1e96f4a065b272291fc7be5693255c5f&dlevel=12&enc=b64&menu=location" >지도 크게 보기</a></td><td width="98" bgcolor="#f9f9f9" align="right" style={{textAlign:"right", paddingRight:"9px", borderRight:"1px solid #cecece", borderBottom:"1px solid #cecece"}}><span style={{float:"right"}}><span style={{fontSize:"9px", fontFamily:"Verdana, sans-serif", color:"#444"}}>&copy;&nbsp;</span>&nbsp;<a style={{fontFamily:"tahoma", fontSize:"9px", fontWeight:"bold", color:"#2db400", textDecoration:"none"}} href="http://www.nhncorp.com">NAVER Corp.</a></span></td></tr></tbody></table></td></tr></tbody></table>
                </div>
            </div>
                  
        )
    }
}