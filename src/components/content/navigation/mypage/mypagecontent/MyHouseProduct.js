import React from 'react';
import './MyHouseProduct.css';

import { MyProductCard } from './MyProductCard'

export class MyHouseProduct extends React.Component{

    state = ({
        mainCategory: "living",
        deleteList: []
    })


    componentDidMount=()=>{
        
    };

    changeType = (e) => {
        this.setState({
            mainCategory: e.target.value
        })

        // 다시 api 요청을 보내서 값을 받고 리렌더링 
    }

   
    render(){

        const dummyData = [
            {
                index: 38,
                name: '무첨가EM가루비누',
                brand: '강청',
                madeBy: '(주)강청',
                category: '세탁세제',
                ingredient: 'O',
                testNum: '',
                permit: '',
                eco: 'df',
                foreignCertificate: '',
                viewNum: 46,
                rateCount: 56,
                rateSum: 200,
                includeDanger: false,
                includeToxic: true,
                includeCare: true,
            },
            {
                index: 33,
                name: '강청 산소계 표백제',
                brand: '강청',
                madeBy: '(주)강청',
                category: '세탁세제',
                ingredient: 'O',
                testNum: 'F-A03B-O001001-A160',
                permit: '',
                eco: '',
                foreignCertificate: '',
                viewNum: 24,
                rateCount: 34,
                rateSum: 130,
                includeDanger: false,
                includeToxic: false,
                includeCare: false,
            },
            {
                index: 34,
                name: '강청 순천연 가루비누',
                brand: '강청',
                madeBy: '(주)강청',
                category: '세탁세제',
                ingredient: 'O',
                testNum: '',
                permit: '',
                eco: '',
                foreignCertificate: '',
                viewNum: 28,
                rateCount: 5,
                rateSum: 20,
                includeDanger: false,
                includeToxic: false,
                includeCare: false,
            }
        ]


        return(
            <div className="myproduct-container">
                <div className="myproduct-header">
                    <div className="header-checkbox">
                        <input type="checkbox"/>
                    </div>
                    <div className="header-type">
                        <select onChange={this.changeType}>
                            <option value="living">가정용 화학제품</option>
                            <option value="cosmetic">유아용 화장품</option>
                        </select>
                    </div>   
                    <div className="header-name">제품명</div>
                    <div className="header-info">주요 정보</div>
                    <div className="header-delete">관리</div>
                </div>

                <div className="myproduct-card-box">
                    {
                        dummyData.map((d, i)=> <MyProductCard mainCategory={this.state.mainCategory} data={d} key={i}/>)
                    }

                </div>
            
            </div>
        )
    }
}