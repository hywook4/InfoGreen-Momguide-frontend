import React from 'react';
import './Search.css';

class Search extends React.Component {
    constructor() {
        super();
        this.state = {
            search: ""
        };

        this.onChange = this.onChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
    }

    onChange = e => {
        console.log(e.keyCode);

        const searchText = e.target.value.trimLeft();

        this.setState({
            search: searchText
        });
        this.props.searchAction(searchText);
        this.props.setItemsAction(0, this.props.category, searchText);
    };

    onFocus = () => {
        
        if (window.location.pathname !== "/category") {
            window.location.replace("/category");
        }
    };

    render() {

        return(
            <div className="search-div">
                <div className="search_container">
                    <div className="search_heading">사용 중이신 브랜드명 혹은, 제품명을 검색하여 유해성분이 있는지 찾아보세요</div>
                    <div className="search_box">
                        <input 
                            type="text"
                            placeholder="총 400,000개의 제품..."
                            value={this.state.search}
                            onChange={this.onChange}
                        />
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </div>
                </div>
            </div>
        )
    }
}

export default Search;
