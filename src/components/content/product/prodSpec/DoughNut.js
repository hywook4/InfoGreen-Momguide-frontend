// code picked up from 
// https://webdesign.tutsplus.com/tutorials/how-to-build-a-css-only-semi-circle-donut-chart--cms-26997

import React from 'react';
import {Doughnut as Dn} from 'react-chartjs-2';

export const DoughNut = (props)=>{
    var text = props.texts;
    const data = {
        labels:[text.x,text.a,text.b,text.c,text.d,text.f],
        datasets: [{
            data: [props.data.ewg_X, props.data.ewg_A, props.data.ewg_B,props.data.ewg_C,props.data.ewg_D,props.data.ewg_F],
            backgroundColor: [
            '#999999',
            '#72b4a2',
            '#c0d28b',
            '#edb246',
            '#d7ab5f',
            '#d96357'
            ]
        }]
    };
    return(
        <React.Fragment>
            <div>
                <Dn data={data} options={{responsive: true,circumference:Math.PI,rotation:-Math.PI,legend:{display:false}}}/>
            </div>

            <div className="col-md-12 row" style={{margin:'auto',marginTop:'20px'}}>
                <div className="alpha-icon-info col-md-4" style={{textAlign:'center'}}>
                    <img src={require('../../../../assets/images/icons/iconX.png')} alt=""/>
                    <p style={{fontSize:10}}>{text.x}</p>

                </div>
                <div className="alpha-icon-info col-md-4" style={{textAlign:'center'}}>
                    <img src={require('../../../../assets/images/icons/iconA.png')} alt=""/>
                    <p style={{fontSize:10}}>{text.a}</p>
                </div>
                <div className="alpha-icon-info col-md-4" style={{textAlign:'center'}}>
                    <img src={require('../../../../assets/images/icons/iconB.png')} alt=""/>
                    <br/>
                    <p style={{fontSize:10}}>{text.b}</p>
                </div>
                <div className="alpha-icon-info col-md-4" style={{textAlign:'center'}}>
                    <img src={require('../../../../assets/images/icons/iconC.png')} alt=""/>
                    <br/>
                    <p style={{fontSize:10}}>{text.c}</p>
                </div>
                <div className="alpha-icon-info col-md-4" style={{textAlign:'center'}}>
                    <img src={require('../../../../assets/images/icons/iconD.png')} alt=""/>
                    <br/>
                    <p style={{fontSize:10}}>{text.d}</p>
                </div>
                <div className="alpha-icon-info col-md-4" style={{textAlign:'center'}}>
                    <img src={require('../../../../assets/images/icons/iconF.png')} alt=""/>
                    <br/>
                    <p style={{fontSize:10}}>{text.f}</p>
                </div>
            </div>
        </React.Fragment>
        )
}