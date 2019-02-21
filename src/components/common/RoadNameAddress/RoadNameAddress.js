import React from 'react';
import './RoadNameAddress.css';
import axios from 'axios';

function range(start, end) {
    const len = end-start+1;
    if(len < 0)
        return [];

    return [...Array(len).keys()].map((i) => i+start);
}

export class RoadNameAddress extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPage: null,
            totalPage: null,
            keyword: '',
            data: null,
            searchKeyword: ''
        };
    }

    handleInputKeywordSearch = (e) => {
        if(e.key === 'Enter') {
            this.handleKeywordSearch(this.state.keyword);
        }
    };

    handleChangeInputKeyword = (e) => {
        this.setState({
            keyword: e.target.value
        });
    };

    handleKeywordSearch = (keyword) => {
        const page = 1;
        const countPerPage = 5;

        axios.get(`${process.env.API_URL}/api/roadNameAddress?currentPage=${page}&countPerPage=${countPerPage}&keyword=${keyword}`)
            .then((res) => {
                const data = res.data.results;
                this.setState({
                    currentPage: Number(data.common.currentPage),
                    totalPage: Number(data.common.totalCount),
                    data: data.juso,
                    searchKeyword: keyword
                });
            });
    };

    handlePageMove = (page) => {
        const countPerPage = 5;
        const keyword = this.state.searchKeyword;

        axios.get(`${process.env.API_URL}/api/roadNameAddress?currentPage=${page}&countPerPage=${countPerPage}&keyword=${keyword}`)
            .then((res) => {
                const data = res.data.results;
                this.setState({
                    currentPage: Number(data.common.currentPage),
                    totalPage: Number(data.common.totalCount),
                    data: data.juso,
                    searchKeyword: keyword
                });
            });
    };

    render() {
        const addressDataContainer = (this.state.data === null) ?
            (<div className="road-name-address-data-container" />) :
            (<div className="road-name-address-data-container">
                <table>
                    <thead>
                        <tr>
                            <th colSpan={2}>검색결과</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map((data, i) => (
                            <tr key={i}>
                                <td>{data.zipNo}</td>
                                <td className="road-name-address-data"
                                    onClick={()=>{this.props.setAddress(data.zipNo, data.roadAddr)}}
                                >
                                    {data.roadAddr}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>);

        let start = 1;
        let end = 7;

        if(this.state.totalPage !== null) {
            if(this.state.totalPage >= 7) {
                if (this.state.currentPage <= 4) {
                    start = 1;
                    end = 7;
                } else if (this.state.totalPage - this.state.currentPage <= 4) {
                    start = this.state.totalPage - 6;
                    end = this.state.totalPage;
                } else {
                    start = this.state.currentPage - 3;
                    end = this.state.currentPage + 3;
                }
            } else {
                start = 1;
                end = this.state.totalPage;
            }
        }

        const pageContainer = (this.state.totalPage === null) ?
            (null) :
            (<div className="road-name-address-page-container">
                {range(start, end).map((num, i) => {
                    return i === 0 ? (<span key={i}><h6 className={num===this.state.currentPage?'selected':''} onClick={()=>this.handlePageMove(num)}>{num}</h6></span>)
                        : (<span key={i}> | <h6 className={num===this.state.currentPage?'selected':''} onClick={()=>this.handlePageMove(num)}>{num}</h6></span>);
                })}
            </div>);

        return (
            <div className="modal fade" id={this.props.modalID} tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">주소</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <input className="modal-search-keyword" value={this.state.keyword}
                                       onChange={(e) => this.handleChangeInputKeyword(e)}
                                       onKeyPress={this.handleInputKeywordSearch}
                                />
                                <i className="fas fa-search search-button" onClick={(e) => {this.handleKeywordSearch(this.state.keyword)}}/>
                            </div>
                            {addressDataContainer}
                            {pageContainer}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}