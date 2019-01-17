import React from 'react';
import '../qanda/qanda.css';


export default class QandA extends React.Component {
    render() {
        return (
            <div class="container">
                <div class="qa-form-section">
                    <div class="form-section">
                    <div class="form-lbl form-lbl-top">
                                <label>Frequently asked questions</label>
                            </div>
                        <form>
                            <textarea rows="4" cols="50" name="comment" form="usrform" />
                            <span><img src="assets/images/chat.png" alt="" /></span>
                            <input type="text" name="usrname" />
                            <div class="form-lbl">
                                <label>제목</label>
                                <label>제목</label>
                                <label>제목</label>
                                <label>제목</label>
                                <label>제목</label>
                                <label>제목</label>
                                <label>제목</label>
                                <label>제목</label>
                                <label>제목</label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        )
    }
}