import React from 'react';
import ReactDOM from 'react-dom';
import Member from './member';

/**
* メンバー配列の表示コンポーネント
*/
export default class Members extends React.Component{
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
    this.onDeleteMember = this.onDeleteMember.bind(this);
  }
  /**
  * メンバー削除が要求された際のイベントハンドラ
  * @param {int} 削除対象のメンバーID
  * @return {undefined}
  */
  onDeleteMember(memberId){
    if(this.props.onDeleteMember){
      //親コンポーネントからonDeleteMemberというイベントハンドラが渡されている場合は
      //メンバーIDを引き渡す
      this.props.onDeleteMember(memberId);
    }
  }
  /**
  * 画面を描画する <br />
  * このメソッドはReact.Componentの必須メソッド
  * @return {Object} Virtual DOM
  */
  render(){
    if(this.props.members.length === 0){
      //親コンポーネントから渡されたメンバーリストが空の場合は、
      //何も表示しない
      return null;
    }else{
      //親コンポーネントから渡されたメンバーリストを
      //Memberコンポーネントの配列に変換する
      const memberRows = this.props.members.map(m=><Member
        key={m.id}
        memberId={m.id}
        memberName={m.name}
        payment={m.payment}
        onDeleteMember={this.onDeleteMember}
        />
      );

      return (
        <table>
          <tbody>
            {memberRows}
          </tbody>
        </table>
      );
    }
  }
}
