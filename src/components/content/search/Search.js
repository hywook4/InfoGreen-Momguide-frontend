import React from 'react';
import './Search.css';
import { Link } from 'react-router-dom';
import history from '../../../history/history';

class Search extends React.Component {
    constructor() {
        super();
        this.state = {
            search: "",
        };

        this.onChange = this.onChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
    }

    onChange = e => {
        const searchText = e.target.value.trimLeft();

        this.setState({
            search: searchText
        });
    };

    onFocus = () => {
        if (window.location.pathname !== "/category") {
            window.location.replace("/category");
        }
    };

    onSearch = () => {
        history.push(`/category/${this.state.search}`);
    };

    onEnter = (e) => {
        if(e.key === 'Enter'){
            this.onSearch();
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
                            onKeyPress={this.onEnter}
                        />
                        <Link to='' onClick={this.onSearch}><i className="fa fa-search" aria-hidden="true"/></Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Search;
