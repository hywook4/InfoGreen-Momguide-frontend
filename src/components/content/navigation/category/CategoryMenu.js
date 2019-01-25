import React from 'react';
import './CategoryMenu.css';

export class CategoryMenu extends React.Component{
    constructor(props){
        super(props);
    }

    state = {
        categorySelect: "household", //household or cosmetic
    }

    selectCategory(category){
        this.setState({
            categorySelect: category,
        });
    }

    render() {
        const households = [
            {
                category: "세탁세제",
                href: "#laundary"
            },
            {
                category: "섬유유연제",
                href: "#fabric"
            },
            {
                category: "주방세제",
                href: "#dishwashing"
            },
            {
                category: "탈취제",
                href: "#odor"
            },
            {
                category: "기타세정제",
                href: "#otherhouseholds"
            }
        ]

        const cosmetics = [
            {
                category: "워시",
                href: "#soap"
            },
            {
                category: "로션",
                href: "#lotion"
            },
            {
                category: "크림",
                href: "#cream"
            },
            {
                category: "오일",
                href: "#oil"
            },
            {
                category: "파우더",
                href: "#powder"
            },
            {
                category: "헤어",
                href: "#hair"
            },
            {
                category: "선케어",
                href: "#suncare"
            },
            {
                category: "물티슈",
                href: "#babywipes"
            },
            {
                category: "손세정제",
                href: "#handsanitizer"
            },
            {
                category: "기타화장품",
                href: "#othercosmetics"
            }
        ]

        return (
            <div className="category-menu">
                <nav className="category-button">
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
                        <img src={require(`../../../../assets/images/cosmetic_${this.state.categorySelect==='household'?'0':'1'}.png`)} />
                    </a>
                </nav>

                {
                    this.state.categorySelect === 'household' ?
                        (<ul className="category-detail">
                            {households.map((d,i)=><li className="prod-type" key={i}><a href={d.href} key={i} onClick={this.props.onClick}>{d.category}</a></li>)}
                        </ul>) :
                        (<ul className="category-detail">
                            {cosmetics.map((d,i)=><li className="prod-type" key={i}><a href={d.href} key={i} onClick={this.props.onClick}>{d.category}</a></li>)}
                        </ul>)
                }
            </div>
            
        )
    }

}
