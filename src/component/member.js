import React from 'react';
import ReactDOM from 'react-dom';
/**
* メンバーの表示コンポーネント
*/
export default class Member extends React.Component{
  /**
  * コンストラクタ
  * @param {Object} props 上位コンポーネントから与えられたprops
  * @return {undefined}
  */
  constructor(props){
    super(props);
    /*
    *ES2015版のReactは以下のようにthisをbindしないと
    *メソッド内でpropsやstateが参照できない
    */
    this.onDeleteButtonClick = this.onDeleteButtonClick.bind(this);
  }
  /**
  * 削除ボタンがクリックされた際のイベントハンドラ
  * @return {undefined}
  */
  onDeleteButtonClick(){
    if(this.props.onDeleteMember){
      //親コンポーネントからonDeleteMemberというイベントハンドラが渡されている場合は
      //親コンポーネントから渡されたメンバーIDを引き渡す
      this.props.onDeleteMember(this.props.memberId);
    }
  }
  /**
  * 画面を描画する <br />
  * このメソッドはReact.Componentの必須メソッド
  * @return {Object} Virtual DOM
  */
  render(){
    return (
      <tr>
        <td>{this.props.memberName}</td>
        <td>¥{this.props.payment.toLocaleString()}</td>
        <td>
          <button
            ref="deleteButton"
            onClick={this.onDeleteButtonClick}>
          削除
          </button>
        </td>
      </tr>
    );
  }
}
