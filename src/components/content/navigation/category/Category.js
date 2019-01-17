import React from 'react';
import './Category.css';
import {CategoryImg} from '../category/CategoryImg';
import config from '../../../../config';
import axios from 'axios';

export class Category extends React.Component{
    
    state = {
        search: "",
        sort: "",
        category: "",
        check: "",
        page:0,
        totalPages: null,
        result: [],
        scrolling: false,
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
        for(let i=0;i<allPills.length;i++){
            allPills[i].classList.remove('activated');
        }
        parent.classList.add("activated");

        this.setState({category})
        this.resetSearchResults(()=>this.search(this.state.search, category, this.state.sort, this.state.check,true))
    }

    onSort = e => {
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

        let resp = await axios.post(`${config.CLIENT_SERVER}/chemical/items_limit.php`, params)
        this.setState({
            result: [...this.state.result,...resp.data[0]],
            scrolling: false,
            totalPages: resp.data[1].total
        });
    }

    
    renderRenderHousHoldSelector=()=>{
        return(
            <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="ctgy-chemical-div">
                    <h4>가정용 생활화학제품</h4>
                    <ul className="nav nav-pills customPills">
                    <div className="row">
                        <div className="col-sm-4">
                            <li>
                                <a data-toggle="pill" href="#laundary" onClick={this.onClick}>세탁세제</a>
                            </li>
                        </div>
                        <div className="col-sm-4">
                            <li><a data-toggle="pill" href="#fabric" onClick={this.onClick}>섬유유연제</a></li>
                        </div>
                        <div className="col-sm-4">
                            <li><a data-toggle="pill" href="#dishwashing" onClick={this.onClick}>주방세제</a></li>
                        </div>
                        <div className="col-sm-4">
                            <li><a data-toggle="pill" href="#odor" onClick={this.onClick}>탈취제</a></li>
                        </div>
                        <div className="col-sm-4">
                            <li><a data-toggle="pill" href="#other" onClick={this.onClick}>기타세정제</a></li>
                        </div>
                    </div>
                    </ul>
                </div>
            </div>
        )
    }


    renderRenderCosmeticSelector=()=>{
    return(
        <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="ctgy-cosmetics-div">
                {/* <div className="ctgy-chemical-div"> */}
                    <h4>유아용 화장품</h4>
                    <ul className="nav nav-pills customPills">
                        <div className="row">
                            <div className="col-sm-4">
                                <li><a data-toggle="pill" href="#soap" onClick={this.onClick}>워시</a></li>
                            </div>
                            <div className="col-sm-4">
                                <li><a data-toggle="pill" href="#lotion" onClick={this.onClick}>로션</a></li>
                            </div>
                            <div className="col-sm-4">
                                <li><a data-toggle="pill" href="#cream" onClick={this.onClick}>크림</a></li>
                            </div>
                            <div className="col-sm-4">
                                <li><a data-toggle="pill" href="#oil" onClick={this.onClick}>오일</a></li>
                            </div>
                            <div className="col-sm-4">
                                <li><a data-toggle="pill" href="#powder" onClick={this.onClick}>파우더</a></li>
                            </div>
                            <div className="col-sm-4">
                                <li><a data-toggle="pill" href="#hair" onClick={this.onClick}>헤어</a></li>
                            </div>
                            <div className="col-sm-4">
                                <li><a data-toggle="pill" href="#suncare" onClick={this.onClick}>선케어</a></li>
                            </div>
                            <div className="col-sm-4">
                                <li><a data-toggle="pill" href="#babywipes" onClick={this.onClick}>물티슈</a></li>
                            </div>
                            <div className="col-sm-4">
                                <li><a data-toggle="pill" href="#handsanitizer" onClick={this.onClick}>손세정제</a></li>
                            </div>
                            <div className="col-sm-4">
                                <li><a data-toggle="pill" href="#othercosmetics" onClick={this.onClick}>기타화장품</a></li>
                            </div>
                </div>
                    </ul>
                {/* </div> */}
            </div>
        </div>
    )
    }


    renderRenderSortSelector=()=>{
        return(
            <div className="tab-content prod-ctgy-tabs">
                <div id="other" className="tab-pane active">
                    <div className="sub-ctgy-div">
                    <h1>{this.state.category}</h1>
                            <ul className="nav nav-tabs ">
                                <li className="active">
                                    <a href="#tab_default_1" data-toggle="tab" name="star" onClick={this.onSort}>
                                    별점순  </a>
                                </li>
                                <li>
                                    <a href="#tab_default_2" data-toggle="tab" name="vote" onClick={this.onSort}>
                                    조회순</a>
                                </li>
                                <li>
                                    <a href="#tab_default_3" data-toggle="tab" name="dateTime" onClick={this.onSort}>
                                    최신순 </a>
                                </li>
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
                    <input type="checkbox" className="custom-control-input" id="defaultInline1" name="1" onClick={this.onCheck}/>
                    <label htmlFor="defaultInline1" className="custom-control-label">성분 공개 제품</label>
                </div>
                <div className="custom-control custom-checkbox custom-control-inline">
                    <input type="checkbox" className="custom-control-input" id="defaultInline2"name="3" onClick={this.onCheck}/>
                    <label htmlFor="defaultInline2" className="custom-control-label">주의 성분 제외</label>
                </div>
                <div className="custom-control custom-checkbox custom-control-inline">
                    <input type="checkbox" className="custom-control-input" id="defaultInline3" name="2" onClick={this.onCheck}/>
                    <label htmlFor="defaultInline3" className="custom-control-label">유해 성분 제외</label>
                </div>
                <div className="custom-control custom-checkbox custom-control-inline">
                    <input type="checkbox" className="custom-control-input" id="defaultInline4" name="4" onClick={this.onCheck}/>
                    <label htmlFor="defaultInline4" className="custom-control-label">높은 위험도 성분 제외</label>
                </div>
                <div className="custom-control custom-checkbox custom-control-inline">
                    <input type="checkbox" className="custom-control-input" id="defaultInline5" name="5" onClick={this.onCheck}/>
                    <label htmlFor="defaultInline5" className="custom-control-label">친환경 인증 제품</label>
                </div>
            </div>
        )
    }

render(){
        var itemData = (<div style={{padding: '150px', textAlign: 'center'}}>검색된 상품이 없습니다</div>);
        if (this.state.result && this.state.result.length>0) {
            itemData = this.state.result.map((item,i) => <CategoryImg name={item.name} key={(item.name+i)} data={{...item}} />)
        }
        return (
            <div className="container">
                <div className="category_page">
                    <div className="search-div">
                        <div className="container">
                        <div className="search_heading">사용 중이신 브랜드명 혹은, 제품명을 검색하여 유해성분이 있는지 찾아보세요</div>
                            <div className="search_box">
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
                    </div>

                    <div className="category-tabs-div">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                            {/* ctgy heading */}
                                <div className="ctgy-heading">
                                    <h4>카테고리</h4>
                                    <i className="fa fa-chevron-up"></i>
                                </div>
                                {/* finish ctgy heading */}
                                <div className="ctgy-tabs">
                                    <div className="row">
                                    {/* household chemical product */}
                                        {this.renderRenderHousHoldSelector()}
                                    {/* finish household chemical product  */}
                                    {/* cosmetics product */}
                                        {this.renderRenderCosmeticSelector()}
                                    {/* finish cosmetics product*/}
                                        
                                    </div>
                                    
                                </div>
                                {/* tabs */}

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
                                {/* <div className="tab-content">
                                    <div id="laundary" className="tab-pane fade in active">
                                        <h3>HOME</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                    </div>
                                    <div id="fabric" className="tab-pane fade">
                                        <h3>Menu 1</h3>
                                        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                    </div>
                                    <div id="dishwashing" className="tab-pane fade">
                                        <h3>Menu 2</h3>
                                        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>
                                    </div>
                                    <div id="odor" className="tab-pane fade">
                                        <h3>Menu 3</h3>
                                        <p>Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}