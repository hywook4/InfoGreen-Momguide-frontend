import React from 'react';
import './ProdSpec.css';

export class IngredientRow extends React.Component{
    render=()=>{
        var props = this.props;
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
                    {(props.data.dsl!==null && props.data.dsl!==0) && <img className="caution-icon" src={ require('../../../../assets/images/product_spec_icons/caution_canada.png') } alt=""/>}
                    {(props.data.epa!==null && props.data.epa!=='G') && <img className="caution-icon" src={ require('../../../../assets/images/product_spec_icons/caution_usa.png') } alt=""/>}
                </td>
                <td className="harm-icon-cell">
                    {(props.data.national_harmful!==null && props.data.national_harmful!==0) && <img className="harm-icon" src={ require('../../../../assets/images/common_icons/warning.png') } alt=""/>}
                </td>
            </tr>
        )
    }
}