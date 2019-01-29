import React from 'react';
import './Category.css';
import {CategoryImg} from '../category/CategoryImg';
import {CategoryMenu} from '../category/CategoryMenu';
import config from '../../../../config';
import axios from 'axios';

export class Category extends React.Component{
    state = {
        search: "",
        sort: "",
        category: "세탁세제",
        check: "",
        page:0,
        totalPages: null,
        result: [],
        scrolling: false,
        sort_focus: "",
        apiStatus: false
    }

    componentDidMount=()=>{
        this._mounted = true;
    }
    componentWillUnmount=()=>{
        this._mounted = false;
    }
    componentWillMount=()=>{
        this.scrollListener = window.addEventListener('scroll', (e) => {
            this.handleScroll(e)
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (window.location.pathname !== "/category") {
            this._input.focus();
        }
      }

    handleScroll = (e) => {
        const { scrolling, totalPages, page} = this.state
        if(!this._mounted || scrolling ||totalPages <= page) return
        var lastLi = document.querySelector('.loadedItem:last-child');
        var lastLiOffset = lastLi.offsetTop + lastLi.clientHeight
        var pageOffset = window.pageYOffset + window.innerHeight
        var bottomOffset = 150
        if (pageOffset > lastLiOffset - bottomOffset) {
            this.setState(prevState => ({
                page: prevState.page+1,
                scrolling: true,
              }), ()=>this.search(this.state.search, this.state.category, this.state.sort, this.state.check))
        }
    }

    onKeyBoardPress = e =>{
     this.state.search.length>0 && 
     e.keyCode===13 &&
     this.resetSearchResults(()=>this.search(this.state.search, this.state.category, this.state.sort, this.state.check))
    }

    onChange = e => {
        const searchText = e.target.value.trimLeft();
        this.setState({search: searchText});
    };

    
    onClick = e => {
        const category = e.target.innerHTML;
        const parent = e.target.parentElement;
        const allPills = document.querySelectorAll('.customPills .row .col-sm-4 li');

        console.log(category);

        for(let i=0;i<allPills.length;i++){
            allPills[i].classList.remove('activated');
        }
        parent.classList.add("activated");

        this.setState({category})
        this.resetSearchResults(()=>this.search(this.state.search, category, this.state.sort, this.state.check,true))
    }
    

    onSort = e => {
        const sort_focus = e.target.innerHTML;
        this.setState({sort_focus});
        console.log(this.state.sort_focus);

        const sort = e.target.name;
        this.setState({sort})
        this.resetSearchResults(()=>this.search(this.state.search, this.state.category, sort, this.state.check,true))
    }

    onCheck = e => {
        const check = e.target.name;
        check === this.state.check ? this.setState({check: null}) : this.setState({check});
        this.resetSearchResults(()=>this.search(this.searchText, this.state.category, this.state.sort, check,true))
    }

    resetSearchResults= cb =>this.setState({result:[],page:0,totalPages:null,},cb)

    search=async (searchText, category, sort, check,clearResults)=> {
        const params = new URLSearchParams();
        params.append('page',this.state.page);

        if (searchText) params.append("name", searchText);
        if (category) params.append("category", category);
        if (sort) params.append("sort", sort);
        if (check) params.append("checked", check);

        this.setState({
            apiStatus: false
        });
        let resp = await axios.post(`${config.CLIENT_SERVER}/chemical/items_limit.php`, params)
        this.setState({
            result: [...this.state.result,...resp.data[0]],
            scrolling: false,
            totalPages: resp.data[1].total, 
            apiStatus: true
        });
    }
    
    renderRenderSortSelector=()=>{
        return(
            <div className="tab-content prod-ctgy-tabs">
                <div id="other" className="tab-pane active">
                    <div className="sub-ctgy-div">
                        <h1>{this.state.category}</h1>
                        <ul className="nav nav-tabs ">
                            <li className={this.state.sort_focus==="별점순"?"focused":""}><a href="#tab_default_1" data-toggle="tab" name="star" onClick={this.onSort}>별점순</a></li>
                            <li className={this.state.sort_focus==="조회순"?"focused":""}><a href="#tab_default_2" data-toggle="tab" name="vote" onClick={this.onSort}>조회순</a></li>
                            <li className={this.state.sort_focus==="최신순"?"focused":""}><a href="#tab_default_3" data-toggle="tab" name="dateTime" onClick={this.onSort}>최신순</a></li> 
                        </ul>
                    </div>
                </div>
            </div>
        )
    }


    renderRenderChecboxSelector=()=>{
        return(
            <div className="checkbox-div">
                <div className="custom-control custom-checkbox custom-control-inline">
                    <input type="checkbox" className="custom-control-input" id="defaultInline1" />
                    <label htmlFor="defaultInline1" className="custom-control-label">성분 공개 제품</label>
                </div>
                <div className="custom-control custom-checkbox custom-control-inline">
                    <input type="checkbox" className="custom-control-input" id="defaultInline2"/>
                    <label htmlFor="defaultInline2" className="custom-control-label">주의 성분 제외</label>
                </div>
                <div className="custom-control custom-checkbox custom-control-inline">
                    <input type="checkbox" className="custom-control-input" id="defaultInline3"/>
                    <label htmlFor="defaultInline3" className="custom-control-label">유해 성분 제외</label>
                </div>
                <div className="custom-control custom-checkbox custom-control-inline">
                    <input type="checkbox" className="custom-control-input" id="defaultInline4"/>
                    <label htmlFor="defaultInline4" className="custom-control-label">높은 위험도 성분 제외</label>
                </div>
                <div className="custom-control custom-checkbox custom-control-inline">
                    <input type="checkbox" className="custom-control-input" id="defaultInline5"/>
                    <label htmlFor="defaultInline5" className="custom-control-label">친환경 인증 제품</label>
                </div>
            </div>
        )
    }

render(){
        var itemData = (<h1 style={{padding: '150px', textAlign: 'center', color: 'gray'}}>검색된 상품이 없습니다!</h1>);
    
        if (this.state.result && this.state.result.length>0) {
            itemData = this.state.result.map((item,i) => <CategoryImg name={item.name} key={(item.name+i)} data={{...item}} />)
        }

        if(this.state.apiStatus === false) {
            itemData = null;
        }
       
        return (
            <div className="category-container">
                <div className="category_page">
                    <div className="category-search">
                        <div className="category-search-heading">사용 중이신 브랜드명 혹은, 제품명을 검색하여 유해성분이 있는지 찾아보세요</div>
                        <div className="category-search-box">
                            <input 
                                type="text"
                                placeholder="총 400,000개의 제품..."
                                value={this.state.search}
                                onChange={this.onChange}
                                onKeyUp={this.onKeyBoardPress}
                                autoFocus={true}
                                ref={c => (this._input = c)}
                            />
                            <i className="fa fa-search" aria-hidden="true"></i>
                        </div>
                    </div>

                    <CategoryMenu onClick={this.onClick}/>

                    <div className="category-tabs-div">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="prod-ctgy-tabs">
                                    <div className="prod-ctgy-inr-div">
                                        {this.renderRenderSortSelector()}

                                        <div className="prod-highest-category">                                       
                                            <div className="high-prod-div">
                                                <div className="high-prod-inr-div">
                                                    <div className="high-prod-heading">
                                                        <div className="tab-content">
                                                            <div className="tab-pane active" id="tab_default_1">
                                                                {this.renderRenderChecboxSelector()}
                                                                {itemData}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}