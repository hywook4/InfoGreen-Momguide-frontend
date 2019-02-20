import React from 'react';
import { Link } from 'react-router-dom';
import './Tips.css';

export class Tips extends React.Component {
    constructor(props) {
        super(props);

        // TODO
        this.state = {
            tips: [{
                image: 'https://i.ytimg.com/vi/HBVuKR1MgFE/maxresdefault.jpg',
                title: '뿌요뿌요',
                contents: 'e스포츠',
                date: '2018-10-12',
                end: false
            },{
                image: 'https://i.ytimg.com/vi/HBVuKR1MgFE/maxresdefault.jpg',
                title: '뿌요뿌요',
                contents: 'e스포츠',
                date: '2018-10-12',
                end: false
            },{
                image: 'https://i.ytimg.com/vi/HBVuKR1MgFE/maxresdefault.jpg',
                title: '뿌요뿌요',
                contents: 'e스포츠',
                date: '2018-10-12',
                end: false
            },{
                image: 'https://i.ytimg.com/vi/HBVuKR1MgFE/maxresdefault.jpg',
                title: '뿌요뿌요',
                contents: 'e스포츠',
                date: '2018-10-12',
                end: false
            },{
                image: 'https://i.ytimg.com/vi/HBVuKR1MgFE/maxresdefault.jpg',
                title: '뿌요뿌요',
                contents: 'e스포츠',
                date: '2018-10-12',
                end: false
            },{
                image: 'https://i.ytimg.com/vi/HBVuKR1MgFE/maxresdefault.jpg',
                title: '뿌요뿌요',
                contents: 'e스포츠',
                date: '2018-10-12',
                end: true
            },{
                image: 'https://i.ytimg.com/vi/HBVuKR1MgFE/maxresdefault.jpg',
                title: '뿌요뿌요',
                contents: 'e스포츠',
                date: '2018-10-12',
                end: true
            },{
                image: 'https://i.ytimg.com/vi/HBVuKR1MgFE/maxresdefault.jpg',
                title: '뿌요뿌요',
                contents: 'e스포츠',
                date: '2018-10-12',
                end: true
            },{
                image: 'https://i.ytimg.com/vi/HBVuKR1MgFE/maxresdefault.jpg',
                title: '뿌요뿌요',
                contents: 'e스포츠',
                date: '2018-10-12',
                end: true
            },{
                image: 'https://i.ytimg.com/vi/HBVuKR1MgFE/maxresdefault.jpg',
                title: '뿌요뿌요',
                contents: 'e스포츠',
                date: '2018-10-12',
                end: true
            },{
                image: 'https://i.ytimg.com/vi/HBVuKR1MgFE/maxresdefault.jpg',
                title: '뿌요뿌요',
                contents: 'e스포츠',
                date: '2018-10-12',
                end: true
            },{
                image: 'https://i.ytimg.com/vi/HBVuKR1MgFE/maxresdefault.jpg',
                title: '뿌요뿌요',
                contents: 'e스포츠',
                date: '2018-10-12',
                end: true
            }],
            currentPage: 1,
            totalPage: 2
        };
    }

    // TODO
    loadNextPage = () => {
        this.setState({
            currentPage: this.state.currentPage + 1
        })
    };
    
    render() {
        const moreButton = (
            <button className="tips-more-button" onClick={() => {this.loadNextPage()}}>
                더보기
            </button>
        );

        return (
            <div className="tips-container">
                <div className="tips-header">
                    <div className="tips-bottom-left">
                        꿀팁
                    </div>
                </div>
                <div className="tips-card-container">
                    {this.state.tips.map((item, i) => {
                        return (
                            <Link to="/tips/123">
                                <div className="tips-card-item" key={i}>
                                    {item.end ? null : <div className="tips-top-right">D-Day</div>}
                                    <div className="tips-card-item-image-container">
                                        {item.end ? <div className="tips-end">종료된 이벤트 입니다.</div> : null}
                                        <img src={item.image} alt="tips" />
                                    </div>
                                    <div>
                                        <h5>{item.title}</h5>
                                        <h6>{item.contents}</h6>
                                    </div>
                                    <div className="tips-bottom-right">
                                        {item.date}
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
                {this.state.currentPage < this.state.totalPage ? moreButton : null}
            </div>
        )
    }
}