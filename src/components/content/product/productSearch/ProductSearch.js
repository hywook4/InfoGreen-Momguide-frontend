import React from 'react';
import { Link } from 'react-router-dom';

export class ProductSearch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            categorySelect: "living", // living or cosmetics
            subCategory: "laundry"
        };
    }

    categorySelect = (category) => {
        this.setState({
            categorySelect: category
        });
    };

    subCategorySelect = (subCategory) => {
        this.setState({
            subCategory: subCategory
        })
        this.props.onCategoryClick(this.state.categorySelect, subCategory);
    }

    onClick 


    render() {
        const living = [
            {
                name:'세탁세제',
                category:'laundry'
            },
            {
                name:'섬유유연제',
                category:'fabric'
            },
            {
                name:'주방세제',
                category:'dishwashing'
            },
            {
                name:'탈취제',
                category:'odor'
            },
            {
                name:'기타세정제',
                category:'other'
            }
        ];
        const cosmetics = [
            {
                name:'워시',
                category:'soap'
            },
            {
                name:'로션',
                category:'lotion'
            },
            {
                name:'크림',
                category:'cream'
            },
            {
                name:'오일',
                category:'oil'
            },
            {
                name:'파우더',
                category:'powder'
            },
            {
                name:'헤어케어',
                category:'haircare'
            },
            {
                name:'선케어',
                category:'suncare'
            },
            {
                name:'물티슈',
                category:'tissue'
            },
            {
                name:'립케어',
                category:'lipcare'
            },
            {
                name:'기타화장품',
                category:'other'
            },
        ];

        return(
            <div className="product-top-div">
                <div className="product-menu">
                    <nav className="menu-button">
                        <a className="circle-button" href="/" onClick={(e) => {
                            e.preventDefault();
                            this.categorySelect("living");
                        }}>
                            <img
                                src={require(`../../../../assets/images/living_${this.state.categorySelect==='living'?'1':'0'}.png`)}
                                alt="가정용 화학제품"
                            />
                        </a>
                        <a className="circle-button" href="/" onClick={(e) => {
                            e.preventDefault();
                            this.categorySelect("cosmetic");
                        }}>
                            <img
                                src={require(`../../../../assets/images/cosmetic_${this.state.categorySelect==='living'?'0':'1'}.png`)}
                                alt="유아용 화장품"
                            />
                        </a>
                    </nav>
                    {
                        this.state.categorySelect === 'living' ?
                            (<ul className="product_category">
                                {living.map((d,i)=><li className={`prod_ctgy_type ${d.category === this.state.subCategory ? "type_focused" : "" }`} key={i}>
                                    <Link to={'/'} onClick={(e) => {
                                    e.preventDefault();
                                    this.subCategorySelect(d.category);
                                    }}>{d.name}</Link>
                                </li>)}
                            </ul>) :
                            (<ul className="product_category">
                                {cosmetics.map((d,i)=><li className={`prod_ctgy_type ${d.category === this.state.subCategory ? "type_focused" : "" }`} key={i}>
                                    <Link to={'/'} onClick={ (e) => {
                                    e.preventDefault();
                                    this.subCategorySelect(d.category);
                                    }}>{d.name}</Link>
                                </li>)}
                            </ul>)
                    }
                </div>
            </div>
        )

    }
}
