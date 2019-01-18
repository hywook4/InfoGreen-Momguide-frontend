import React from 'react';
import { Link } from 'react-router-dom';

export class ProductSearch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            categorySelect: "household" // household or cosmetics
        };
    }

    categorySelect = (category) => {
        this.setState({
            categorySelect: category
        });
    };

    render() {
        const houseHold = [
            {
                path:'/',
                name:'세탁세제',
                category:'세탁세제'
            },
            {
                path:'/fabric',
                name:'섬유유연제',
                category:'섬유유연제'
            },
            {
                path:'/dishwashing',
                name:'주방세제',
                category:'주방세제'
            },
            {
                path:'/odor',
                name:'탈취제',
                category:'탈취제'
            },
            {
                path:'/other',
                name:'기타세정제',
                category:'기타세정제'
            }
        ];
        const cosmetics = [
            {
                path:'/soap',
                name:'워시',
                category:'워시'
            },
            {
                path:'/lotion',
                name:'로션',
                category:'로션'
            },
            {
                path:'/cream',
                name:'크림',
                category:'크림'
            },
            {
                path:'/oil',
                name:'오일',
                category:'오일'
            },
            {
                path:'/powder',
                name:'파우더',
                category:'파우더'
            },
            {
                path:'/hair',
                name:'헤어케어',
                category:'헤어케어'
            },
            {
                path:'/suncare',
                name:'선케어',
                category:'선케어'
            },
            {
                path:'/babywipes',
                name:'물티슈',
                category:'물티슈'
            },
            {
                path:'/handsanitizer',
                name:'손세정제',
                category:'손세정제'
            },
            {
                path:'/othercosmetics',
                name:'기타화장품',
                category:'기타화장품'
            },
        ];

        return(
            <div className="product-top-div">
                <div className="product-menu">
                    <nav className="menu-button">
                        <a className="circle-button" href="/" onClick={(e) => {
                            e.preventDefault();
                            this.categorySelect("household");
                        }}>
                            <img src={require(`../../../../assets/images/living_${this.state.categorySelect==='household'?'1':'0'}.png`)} />
                        </a>
                        <a className="circle-button" href="/" onClick={(e) => {
                            e.preventDefault();
                            this.categorySelect("cosmetic");
                        }}>
                            <img src={require(`../../../../assets/images/cosmetic_${this.state.categorySelect==='household'?'0':'1'}.png`)} />
                        </a>
                    </nav>
                    {
                        this.state.categorySelect === 'household' ?
                            (<ul className="product_category">
                                {houseHold.map((d,i)=><li className="prod_ctgy_type" key={i}><Link to={d.path}>{d.name}</Link></li>)}
                            </ul>) :
                            (<ul className="product_category">
                                {cosmetics.map((d,i)=><li className="prod_ctgy_type" key={i}><Link to={d.path}>{d.name}</Link></li>)}
                            </ul>)
                    }
                </div>
            </div>
        )

    }
}
