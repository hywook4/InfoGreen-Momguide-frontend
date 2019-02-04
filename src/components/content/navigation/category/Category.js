import React from 'react';
import './Category.css';
import {CategoryImg} from '../category/CategoryImg';
import {CategoryMenu} from '../category/CategoryMenu';
import axios from 'axios';

export class Category extends React.Component{

    state = {
        search: "",
        sort: "",
        mainCategory: "",
        subCategory: "",
        careCheck: false,
        harmCheck: false,
        highDangerCheck: false,
        ecoCheck: false,
        ingredientCheck: false,
        middleDangerCheck: false,
        page:0,
        totalPages: null,
        result: [],
        scrolling: false,
        sortFocus: "",
        apiStatus: false,
        type: ""
    };

    changeType = (productType) => {
        this.setState({
            type: productType
        });
    };

    componentDidMount=()=>{
        this._mounted = true;
    };
    componentWillUnmount=()=>{
        this._mounted = false;
    };
    componentWillMount=()=>{
        this.scrollListener = window.addEventListener('scroll', (e) => {
            this.handleScroll(e)
        });
    };

    componentDidUpdate(prevProps, prevState) {
        if (window.location.pathname !== "/category") {
            this._input.focus();
        }
    }

    handleScroll = (e) => {
        const { scrolling, totalPages, page} = this.state;
        if(!this._mounted || scrolling ||totalPages <= page) return;
        var lastLi = document.querySelector('.loadedItem:last-child');
        var lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
        var pageOffset = window.pageYOffset + window.innerHeight;
        var bottomOffset = 150;
        if (pageOffset > lastLiOffset - bottomOffset) {
            this.setState(prevState => ({
                page: prevState.page+1,
                scrolling: true,
            }), ()=>this.searchProduct(this.state.searchText, this.state.mainCategory, this.state.subCategory, this.state.sort, 
                this.state.careCheck,
                this.state.harmCheck,
                this.state.highDangerCheck,
                this.state.ecoCheck,
                this.state.ingredientCheck,
                this.state.middleDangerCheck,
                this.state.page));
        }

    };

    onKeyBoardPress = e =>{
        this.state.search.length>0 &&
        e.keyCode===13 &&
        this.resetSearchResults(()=>this.searchProduct(this.state.searchText, this.state.mainCategory, this.state.subCategory, this.state.sort, 
            this.state.careCheck,
            this.state.harmCheck,
            this.state.highDangerCheck,
            this.state.ecoCheck,
            this.state.ingredientCheck,
            this.state.middleDangerCheck,
            this.state.page));
    };

    onChange = e => {
        const searchText = e.target.value.trimLeft();
        this.setState({search: searchText});
    };


    onCategoryClick = (mainCategory, subCategory) => {

        this.setState({
            mainCategory: mainCategory,
            subCategory: subCategory});
        this.resetSearchResults(()=>this.searchProduct(this.state.searchText, this.state.mainCategory, this.state.subCategory, this.state.sort, 
            this.state.careCheck,
            this.state.harmCheck,
            this.state.highDangerCheck,
            this.state.ecoCheck,
            this.state.ingredientCheck,
            this.state.middleDangerCheck,
            this.state.page));
    };


    onSort = e => {
        const sortFocus = e.target.innerHTML;
        this.setState({sortFocus});

        let sort = e.target.name;

        if (sort === "star") sort = "rate";
        if (sort === "vote") sort = "view";
        if (sort === "dateTime") sort = "recent";

        this.setState({sort: sort});
        this.resetSearchResults(()=>this.searchProduct(this.state.searchText, this.state.mainCategory, this.state.subCategory, this.state.sort, 
            this.state.careCheck,
            this.state.harmCheck,
            this.state.highDangerCheck,
            this.state.ecoCheck,
            this.state.ingredientCheck,
            this.state.middleDangerCheck,
            this.state.page));
    };

    onCheck = e => {
        const check = e.target.name;
        check === this.state.check ? this.setState({check: null}) : this.setState({check});
        this.resetSearchResults(()=>this.searchProduct(this.state.searchText, this.state.mainCategory, this.state.subCategory, this.state.sort, 
            this.state.careCheck,
            this.state.harmCheck,
            this.state.highDangerCheck,
            this.state.ecoCheck,
            this.state.ingredientCheck,
            this.state.middleDangerCheck,
            this.state.page));
    };

    resetSearchResults= cb =>this.setState({result:[],page:1,totalPages:null,},cb);

    objectToQuery = (obj) => {
        var str = [];
        for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
        return str.join("&");
    }

    searchProduct = async (searchText, mainCategory, subCategory, sort, 
        careCheck,
        harmCheck,
        highDangerCheck,
        ecoCheck,
        ingredientCheck,
        middleDangerCheck,
        page)=> {
        
        const queryObject = {};

        if (searchText) queryObject.search = searchText;
        if (mainCategory) {
            queryObject.mainCategory = mainCategory;
            if (mainCategory === "cosmetic") {
                if (careCheck) queryObject.careExclude = true;
                if (highDangerCheck) queryObject.highDangerExclude = true;
                if (middleDangerCheck) queryObject.middleDangerExclude = true;
            } else {
                if (careCheck) queryObject.careExclude = true;
                if (harmCheck) queryObject.harmExclude = true;
                if (highDangerCheck) queryObject.highDangerExclude = true;
                if (ecoCheck) queryObject.eco = true;
                if (ingredientCheck) queryObject.ingredient = true;
            }
        }

        if (subCategory) queryObject.subCategory = subCategory;
        if (sort) queryObject.sort = sort;
        if (page) queryObject.page = page;

        let query = `${process.env.API_URL}/api/category?${this.objectToQuery(queryObject)}`
        
        if(this.state.page === 0) {
            this.setState({
                apiStatus: false
            });
        }
        let resp = await axios.get(query);

        this.setState({
            result: [...this.state.result,...resp.data.data], // 기존의 result에 새로운 data들을 추가 ... 전개연산자 
            scrolling: false,
            totalPages: resp.data.totalPages,
            apiStatus: true
        });
    };

    checkChange = (checkName) => {
        let flag = this.state[checkName];
        const newObj = {};
        newObj[checkName] = !flag;
        this.resetSearchResults(() => {
            this.setState(newObj, () => {
                this.searchProduct(this.state.searchText, this.state.mainCategory, this.state.subCategory, this.state.sort, 
                    this.state.careCheck,
                    this.state.harmCheck,
                    this.state.highDangerCheck,
                    this.state.ecoCheck,
                    this.state.ingredientCheck,
                    this.state.middleDangerCheck,
                    this.state.page)
            });
        });
    }

    renderRenderSortSelector=()=>{
        return(
            <div className="tab-content prod-ctgy-tabs">
                <div id="other" className="tab-pane active">
                    <div className="sub-ctgy-div">
                        <h1>{this.state.category}</h1>
                        <ul className="nav nav-tabs ">
                            <li className={this.state.sortFocus==="별점순"?"focused":""}><a href="#tab_default_1" data-toggle="tab" name="star" onClick={this.onSort}>별점순</a></li>
                            <li className={this.state.sortFocus==="조회순"?"focused":""}><a href="#tab_default_2" data-toggle="tab" name="vote" onClick={this.onSort}>조회순</a></li>
                            <li className={this.state.sortFocus==="최신순"?"focused":""}><a href="#tab_default_3" data-toggle="tab" name="dateTime" onClick={this.onSort}>최신순</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    };


    renderRenderChecboxSelector=()=>{
        const checkLiving = (
            <React.Fragment>
                <div className="custom-control custom-checkbox custom-control-inline">
                    <input type="checkbox" className="custom-control-input" id="defaultInline1" onClick={(e)=>this.checkChange("careCheck")}/>
                    <label htmlFor="defaultInline1" className="custom-control-label">주의 성분 제외</label>
                </div>
                <div className="custom-control custom-checkbox custom-control-inline">
                    <input type="checkbox" className="custom-control-input" id="defaultInline2" onClick={(e)=>this.checkChange("harmCheck")}/>
                    <label htmlFor="defaultInline2" className="custom-control-label">유해 성분 제외</label>
                </div>
                <div className="custom-control custom-checkbox custom-control-inline">
                    <input type="checkbox" className="custom-control-input" id="defaultInline3" onClick={(e)=>this.checkChange("highDangerCheck")}/>
                    <label htmlFor="defaultInline3" className="custom-control-label">높은 위험도 성분 제외</label>
                </div>
                <div className="custom-control custom-checkbox custom-control-inline">
                    <input type="checkbox" className="custom-control-input" id="defaultInline4" onClick={(e)=>this.checkChange("ecoCheck")}/>
                    <label htmlFor="defaultInline4" className="custom-control-label">친환경 인증 제품</label>
                </div>
                <div className="custom-control custom-checkbox custom-control-inline">
                    <input type="checkbox" className="custom-control-input" id="defaultInline5" onClick={(e)=>this.checkChange("ingredientCheck")}/>
                    <label htmlFor="defaultInline5" className="custom-control-label">성분 공개 제품</label>
                </div>
            </React.Fragment>
        );

        const checkCosmetic = (
            <React.Fragment>
                <div className="custom-control custom-checkbox custom-control-inline">
                    <input type="checkbox" className="custom-control-input" id="defaultInline1" onClick={(e)=>this.checkChange("careCheck")}/>
                    <label htmlFor="defaultInline1" className="custom-control-label">주의 성분 제외</label>
                </div>
                <div className="custom-control custom-checkbox custom-control-inline">
                    <input type="checkbox" className="custom-control-input" id="defaultInline2" onClick={(e)=>this.checkChange("highDangerCheck")}/>
                    <label htmlFor="defaultInline2" className="custom-control-label">높은 위험도 성분 제외</label>
                </div>
                <div className="custom-control custom-checkbox custom-control-inline">
                    <input type="checkbox" className="custom-control-input" id="defaultInline3" onClick={(e)=>this.checkChange("middleDangerCheck")}/>
                    <label htmlFor="defaultInline3" className="custom-control-label">중간 위험도 성분 제외</label>
                </div>
            </React.Fragment>
        );


        return(
            <div className="checkbox-div">
                {
                    this.state.type === "" ? "" : (this.state.type === "living" ? checkLiving : checkCosmetic)
                }
            </div>
        );
    };

    render(){

        let itemData = (<h1 style={{padding: '150px', textAlign: 'center', color: 'gray'}}>검색된 상품이 없습니다!</h1>);

        if (this.state.result && this.state.result.length>0) {
            itemData = this.state.result.map((item,i) => {
                return (<CategoryImg name={item.name} key={(item.name+i)} mainCategory={this.state.mainCategory} subCategory={this.state.subCategory} data={{...item}} />)
            });
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
                            <i className="fa fa-search" aria-hidden="true" />
                        </div>
                    </div>

                    <CategoryMenu onCategoryClick={this.onCategoryClick} changeType={this.changeType}/>

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
                                                            <div className="checkbox-block">
                                                                {this.renderRenderChecboxSelector()}

                                                            </div>
                                                            <div className="product-card-block">
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
        );
    }
}