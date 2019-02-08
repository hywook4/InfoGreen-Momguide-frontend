import React from 'react';
import './ProdSpec.css';

/**
 * @param hideSubHeading Boolean default true
 * @param selected Integer default 0
 * @param removePadding Boolean default true
 * @param border Boolean default false meaning 0px
 * @param text String must have hideSubHeading `false`
 * @param color Boolean default #60b3a2
 * @param trailingText String : Text that appears after the stars - default blank
 * @param size : size of stars in pixel
 * @param alignStart : start stars from the starting
 */

export const RatingRow = (props)=>{
    const config = props.config;
    return(
        <div className="rating-stars">
            <div>
                <i className={`fa fa-star${(config.selected>=1?'':'-o')}`} style={{color:(config.selected>=1?(config.color||'#60b3a2'):'grey'),fontSize:config.size||'20px'}} aria-hidden="true"></i>
                <i className={`fa fa-star${(config.selected>=2?'':'-o')}`} style={{color:(config.selected>=2?(config.color||'#60b3a2'):'grey'),fontSize:config.size||'20px'}} aria-hidden="true"></i>
                <i className={`fa fa-star${(config.selected>=3?'':'-o')}`} style={{color:(config.selected>=3?(config.color||'#60b3a2'):'grey'),fontSize:config.size||'20px'}} aria-hidden="true"></i>
                <i className={`fa fa-star${(config.selected>=4?'':'-o')}`} style={{color:(config.selected>=4?(config.color||'#60b3a2'):'grey'),fontSize:config.size||'20px'}} aria-hidden="true"></i>
                <i className={`fa fa-star${(config.selected>=5?'':'-o')}`} style={{color:(config.selected>=5?(config.color||'#60b3a2'):'grey'),fontSize:config.size||'20px'}} aria-hidden="true"></i>
                <span style={{color:'#ababab',fontWeight:'bold'}}>{config.trailingText}</span>
            </div>
            <div className="rating-participants">
                <span style={{color: '#32b8a4', fontWeight: '300'}}>{config.count}명</span> 참여
            </div>
        </div>    
    )
}