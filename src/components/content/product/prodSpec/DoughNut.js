// code picked up from 
// https://webdesign.tutsplus.com/tutorials/how-to-build-a-css-only-semi-circle-donut-chart--cms-26997

import React from 'react';
import {Doughnut as Dn} from 'react-chartjs-2';
import './ProdSpec.css';

export const DoughNut = (props)=>{
    var text = props.texts;
    const data = {
        labels: [text.x,text.a,text.b,text.c,text.d,text.f],
        datasets: [{
            data: [props.data.ewg_X, props.data.ewg_A, props.data.ewg_B,props.data.ewg_C,props.data.ewg_D,props.data.ewg_F],
            backgroundColor: [
            '#999999',
            '#72b4a2',
            '#c0d28b',
            '#edb246',
            '#d7ab5f',
            '#d96357'
            ],
        }]
    };

    return(
        <React.Fragment>
            <div className="doughnut-body">
                <Dn data={data} width={257} height={130} options={{maintainAspectRatio: false, responsive: true,circumference:Math.PI,rotation:-Math.PI,legend:{display:false}}}/>
            </div>
            <div className="chart-text-container">
                <div className="chart-text">좋음</div>
                <div className="chart-text">전체 13개</div>
                <div className="chart-text">나쁨</div>
            </div>

            <div className="chart-legend">
                <div className="chart-legend-icon">
                    <img style={{maxWidth: "15px", maxHeight: "15px"}} src={require('../../../../assets/images/icons/iconX.png')} alt=""/>
                    <span className="chart-legend-text">{text.x}</span>
                </div>
                <div className="chart-legend-icon">
                    <img style={{maxWidth: "15px", maxHeight: "15px"}} src={require('../../../../assets/images/icons/iconA.png')} alt=""/>
                    <span className="chart-legend-text">{text.a}</span>
                </div>
                <div className="chart-legend-icon">
                    <img style={{maxWidth: "15px", maxHeight: "15px"}} src={require('../../../../assets/images/icons/iconB.png')} alt=""/>
                    <span className="chart-legend-text">{text.b}</span>
                </div>
                <div className="chart-legend-icon">
                    <img style={{maxWidth: "15px", maxHeight: "15px"}} src={require('../../../../assets/images/icons/iconC.png')} alt=""/>
                    <span className="chart-legend-text">{text.c}</span>
                </div>
                <div className="chart-legend-icon">
                    <img style={{maxWidth: "15px", maxHeight: "15px"}} src={require('../../../../assets/images/icons/iconD.png')} alt=""/>
                    <span className="chart-legend-text">{text.d}</span>
                </div>
                <div className="chart-legend-icon">
                    <img style={{maxWidth: "15px", maxHeight: "15px"}} src={require('../../../../assets/images/icons/iconF.png')} alt=""/>
                    <span className="chart-legend-text"f>{text.f}</span>
                </div>
            </div>
        </React.Fragment>
        )
}