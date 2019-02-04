import React from 'react';
import './CategoryMenu.css';

export class CategoryMenu extends React.Component{
    constructor(props){
        super(props);
    }

    state = {
        categorySelect: "", //household or cosmetic
        categoryDetail: "",
    }

    selectCategory(category){
        if(this.state.categorySelect == category){
            this.setState({
                categorySelect: ''
            });

            this.props.changeType('');
        }
        else{
            this.setState({
                categorySelect: category,
            });

            this.props.changeType(category);
        }
    }

    selectDetail(detail){
        if(this.state.categoryDetail == detail){
            this.setState({
                categoryDetail: ''
            });
        }
        else{
            this.setState({
                categoryDetail: detail
            });
        }
    }

    render() {
        const households = [
            {
                category: "세탁세제",
                detail: "laundary"
            },
            {
                category: "섬유유연제",
                detail: "fabric"
            },
            {
                category: "주방세제",
                detail: "dishwashing"
            },
            {
                category: "탈취제",
                detail: "odor"
            },
            {
                category: "기타세정제",
                detail: "otherhouseholds"
            }
        ]

        const cosmetics = [
            {
                category: "워시",
                detail: "soap"
            },
            {
                category: "로션",
                detail: "lotion"
            },
            {
                category: "크림",
                detail: "cream"
            },
            {
                category: "오일",
                detail: "oil"
            },
            {
                category: "파우더",
                detail: "powder"
            },
            {
                category: "헤어",
                detail: "hair"
            },
            {
                category: "선케어",
                detail: "suncare"
            },
            {
                category: "물티슈",
                detail: "babywipes"
            },
            {
                category: "립케어",
                detail: "lipcare"
            },
            {
                category: "기타화장품",
                detail: "othercosmetics"
            }
        ]

        return (
            <div className="category-menu">
                <nav className="category-button">
                    <div className="category-button-back"></div>
                    <a className="circle-button" href="/" onClick={(e) => {
                        e.preventDefault();
                        this.selectCategory("household");
                    }}>
                        <img src={require(`../../../../assets/images/living_${this.state.categorySelect==='household'?'1':'0'}.png`)} />
                    </a>
                    <a className="circle-button" href ="/" onClick={(e) => {
                        e.preventDefault();
                        this.selectCategory("cosmetic");
                    }}>
                        <img src={require(`../../../../assets/images/cosmetic_${this.state.categorySelect==='cosmetic'?'1':'0'}.png`)} />
                    </a>
                </nav>
                {
                    this.state.categorySelect === '' ?
                        (<ul className="category-detail">
                            <li></li>
                        </ul>) : ""
                        
                }
                {
                    this.state.categorySelect === 'household' ?
                        (<ul className="category-detail">
                            {households.map((d,i)=><li className="prod-type" key={i}>
                                <a href={d.detail} className={this.state.categoryDetail===d.detail?'menu_focused':'menu_not_focused'} key={i} onClick={(e) => {
                                    e.preventDefault();
                                    this.selectDetail(d.detail);
                                    this.props.onClick(e);
                                }}>{d.category}</a>
                            </li>)}
                        </ul>) : ""
                        
                }
                {
                    this.state.categorySelect === "cosmetic" ?
                        (<ul className="category-detail">
                            {cosmetics.map((d,i)=><li className="prod-type" key={i}>
                                <a href={d.detail} className={this.state.categoryDetail===d.detail?'menu_focused':'menu_not_focused'} key={i} onClick={(e) => {
                                    e.preventDefault();
                                    this.selectDetail(d.detail);
                                    this.props.onClick(e);
                                }}>{d.category}</a>
                            </li>)}
                        </ul>) : ""
                }
            </div>
            
        )
    }

}
