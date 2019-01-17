import React from 'react';

export class IngredientRow extends React.Component{
    render=()=>{
        var props = this.props;
        const letter = props.letter ? props.letter : 'X';
        return(
            <tr data-toggle="modal" data-target="#exampleModalCenter" onClick={()=>props.handleClick({...props.data})} style={{cursor:'pointer'}}>
                <td>
                    <img className="img-responsive icon_img" src={require(`../../../../assets/images/icons/icon${letter}.png`)} alt=""/>
                </td>
                <td>
                    <p className="prod_ingr_desp">{props.korName}</p>
                    <p>{props.engName}</p>
                </td>
                <td style={{textAlign:'center'}}>
                {(props.data.dsl!==null && props.data.dsl!==0) && <img className="img-responsive icon_img" src={ require('../../../../assets/images/dsl.png') } alt=""/>}
                {(props.data.epa!==null && props.data.epa!=='G') && <img className="img-responsive icon_img" src={ require('../../../../assets/images/epa.png') } alt=""/>}
                </td>
                <td style={{textAlign:'center'}}>
                {(props.data.national_harmful!==null && props.data.national_harmful!==0) && <img className="img-responsive icon_img" src={ require('../../../../assets/images/warning.png') } alt=""/>}
                </td>
            </tr>
        )
    }
}