import React from 'react';
import './Header.css';
import MOMGUIDE_LOGO_WHITE from '../../../assets/images/MOMGUIDE_LOGO_WHITE.png';
 
import { Link } from "react-router-dom";
import { Redirect } from 'react-router-dom'

export class Header extends React.Component{

    state = {
        search: "",
        submitted: false
    };

    onEnter = (e) => {
        if(e.key === 'Enter'){
            this.onSearch();
        }
    }

    onSearch = () => {
        
        this.setState({
            submitted: true
        });
    }

    onChange = e => {
        console.log(e.keyCode);

        const searchText = e.target.value.trimLeft();
        console.log(searchText);

        this.setState({
            search: searchText
        });
    };

    render() {
        if (this.state.submitted) {
            this.setState({
                submitted: false
            })
            return (
              <Redirect to={`/category/${this.state.search}`} />
            )
        }

        return(
            <div className="navbar header">
                <div className="navbar_container">
                    <div className="navbar-inner">
                        <Link to="/">
                            <img src={MOMGUIDE_LOGO_WHITE} alt=""/>
                        </Link>
                    </div>
                    <div className="navbar_router">
                        <ul className="navbar_left">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">홈</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/category" className="nav-link">카테고리</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/tips" className="nav-link">꿀팁</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/events" className="nav-link">이벤트</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/request/loggedin" className="nav-link">문의하기</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/about" className="nav-link">서비스소개</Link>
                            </li>
                            
                        </ul>
                        <ul className="navbar_right">
                            <li className="navbar_search">
                                <input type="text" 
                                placeholder="검색하기"
                                value={this.state.search}
                                onChange={this.onChange}
                                onKeyPress={this.onEnter}/>
                                <Link to='' onClick={this.onSearch}><i className="fa fa-search" aria-hidden="true"></i></Link>
                            </li>
                            <li className="nav-item active">
                                <Link to="/signup" className="nav-link">가입하기</Link>
                            </li>
                            <li className="nav-item active">
                                <Link to="/request" className="nav-link">로그인</Link>
                            </li>
                        </ul>
                    </div>
                </div>
    
            </div>
        )
    }
};


export default Header;