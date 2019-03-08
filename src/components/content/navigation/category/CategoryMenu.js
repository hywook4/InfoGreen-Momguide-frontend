import React from 'react';
import './CategoryMenu.css';

export class CategoryMenu extends React.Component{
    constructor(props) {
        super(props);


        this.state = {
            categorySelect: props.mainCategory, //living or cosmetic
            categoryDetail: props.subCategory,
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.mainCategory !== prevState.categorySelect || nextProps.subCategory !== prevState.categoryDetail){
            return {
                categorySelect: nextProps.mainCategory,
                categoryDetail: nextProps.subCategory
            }
        } else{
            return null;
        }
    }



    selectCategory(category){
        if(this.state.categorySelect === category){
            this.setState({
                categorySelect: '',
                categoryDetail: ''
            });
            this.props.onCategoryClick('', '');
            
        }
        else{
            this.setState({
                categorySelect: category,
                categoryDetail: ''
            });
            this.props.onCategoryClick(category, '');
        
        }
    }

    selectDetail(detail){
        if(this.state.categoryDetail === detail){
            this.setState({
                categoryDetail: ''
            });
            this.props.onCategoryClick(this.state.categorySelect, '');
        }
        else{
            this.setState({
                categoryDetail: detail
            });
            this.props.onCategoryClick(this.state.categorySelect, detail);
        }
    }

    render() {
        const livings = [
            {
                category: "세탁세제",
                detail: "laundry"
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
                detail: "other"
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
                category: "헤어케어",
                detail: "haircare"
            },
            {
                category: "선케어",
                detail: "suncare"
            },
            {
                category: "물티슈",
                detail: "tissue"
            },
            {
                category: "립케어",
                detail: "lipcare"
            },
            {
                category: "기타화장품",
                detail: "other"
            }
        ]

        return (
            <div className="category-menu">
                <nav className="category-button">
                    <div className="category-button-back"></div>
                    <a className="circle-button" href="/" onClick={(e) => {
                        e.preventDefault();
                        this.selectCategory("living");
                    }}>
                        <img
                            src={require(`../../../../assets/images/living_${this.state.categorySelect==='living'?'1':'0'}.png`)}
                            alt="가정용 화학제품"
                        />
                    </a>
                    <a className="circle-button" href ="/" onClick={(e) => {
                        e.preventDefault();
                        this.selectCategory("cosmetic");
                    }}>
                        <img
                            src={require(`../../../../assets/images/cosmetic_${this.state.categorySelect==='cosmetic'?'1':'0'}.png`)}
                            alt="유야용 화장품"
                        />
                    </a>
                </nav>
                {
                    this.state.categorySelect === '' ?
                        (<ul className="category-detail">
                            <li></li>
                        </ul>) : ""
                        
                }
                {
                    this.state.categorySelect === 'living' ?
                        (<ul className="category-detail">
                            {livings.map((d,i)=><li className="prod-type" key={i}>
                                <a href={d.detail} className={this.state.categoryDetail===d.detail?'menu_focused':'menu_not_focused'} key={i} onClick={(e) => {
                                    e.preventDefault();
                                    this.selectDetail(d.detail);
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
                                }}>{d.category}</a>
                            </li>)}
                        </ul>) : ""
                }
            </div>
            
        )
    }

}
