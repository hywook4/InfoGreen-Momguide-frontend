import React from 'react';
import './ProdSpec.css';

export const LivingIngredientRow = (props) => {
    const letter = props.letter ? props.letter : 'X';
    return(
        <tr data-toggle="modal" data-target="#exampleModalCenter" onClick={()=>props.handleClick({...props.data})} style={{cursor:'pointer', height: '48px', borderBottom: '1px solid rgba(100, 100, 100, 0.2)'}}>
            <td className="letter-icon-cell">
                <img className="letter-icon" src={require(`../../../../assets/images/product_spec_icons/living_grade_${letter}.png`)} alt=""/>
            </td>
            <td className="ingred-name-cell">
                <div className="ingred-name-kor">{props.korName}</div>
                <div className="ingred-name-eng">{props.engName}</div>
            </td>
            <td className="caution-icon-cell">
                {(props.data.dsl===true)?(<img className="caution-icon" src={ require('../../../../assets/images/product_spec_icons/caution_canada.png') } alt=""/>):null}
                {(props.data.epa==='Y')?(<img className="caution-icon" src={ require('../../../../assets/images/product_spec_icons/caution_usa.png') } alt=""/>):null}
            </td>
            <td className="harm-icon-cell">
                {(props.data.harmness)?(<img className="harm-icon" src={ require('../../../../assets/images/common_icons/warning.png') } alt=""/>):null}
            </td>
        </tr>
    );
};

export const CosmeticIngredientRow = (props) => {
    const letter = props.data.ewgCode ? props.data.ewgCode : 'X';
    let imgSrc = 'cosmetic_gray.png';
    if(letter === 'AA')
        imgSrc = 'cosmetic_green_3.png';
    else if(letter === 'AB')
        imgSrc = 'cosmetic_green_2.png';
    else if(letter === 'AC')
        imgSrc = 'cosmetic_green_1.png';
    else if(letter === 'BA')
        imgSrc = 'cosmetic_yellow_3.png';
    else if(letter === 'BB')
        imgSrc = 'cosmetic_yellow_2.png';
    else if(letter === 'BC')
        imgSrc = 'cosmetic_yellow_1.png';
    else if(letter === 'CA')
        imgSrc = 'cosmetic_red_3.png';
    else if(letter === 'CB')
        imgSrc = 'cosmetic_red_2.png';
    else if(letter === 'CC')
        imgSrc = 'cosmetic_red_1.png';

    let harmIcon = null;
    if(props.data.allergic === 'R')
        harmIcon = (<img className="harm-icon" src={ require('../../../../assets/images/Asset 144.png') } alt=""/>);
    else if(props.data.allergic === 'S')
        harmIcon = (<img className="harm-icon" src={ require('../../../../assets/images/Asset 143.png') } alt=""/>);
    return(
        <tr data-toggle="modal" data-target="#exampleModalCenter" onClick={()=>props.handleClick({...props.data})} style={{cursor:'pointer', height: '48px', borderBottom: '1px solid rgba(100, 100, 100, 0.2)'}}>
            <td className="letter-icon-cell">
                <img className="letter-icon" src={require(`../../../../assets/images/product_spec_icons/${imgSrc}`)} alt=""/>
            </td>
            <td className="ingred-name-cell">
                <div className="ingred-name-kor">{props.korName}</div>
                <div className="ingred-name-eng">{props.engName}</div>
            </td>
            <td className="harm-icon-cell">
                {harmIcon}
            </td>
        </tr>
    );
};
