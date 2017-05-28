import React from 'react';
import ReactDOM from 'react-dom';
/**
* メンバー追加コンポーネント
*/
export default class MemberInput extends React.Component{
  /**
  * コンストラクタ
  * @param {Object} props 上位コンポーネントから与えられたprops
  * @return {undefined}
  */
  constructor(props){
    super(props);
    /*
    *このコンポーネントのstate
    *{
    * newName:${名前テキストボックスの入力値 String}
    *}
    */
    this.state={
      newName:""
    };
    /*
    *ES2015版のReactは以下のようにthisをbindしないと
    *メソッド内でpropsやstateが参照できない
    */
    this.onChangeNewName = this.onChangeNewName.bind(this);
    this.onAddClick = this.onAddClick.bind(this);
  }
  /**
  * 名前テキストボックスが更新された際のイベントハンドラ
  * @return {undefined}
  */
  onChangeNewName(){
    //名前テキストボックスの入力値を取得して
    const input = ReactDOM.findDOMNode(this.refs.newName).value;
    //stateにsetする
    this.setState({newName:input});
  }
  /**
  * 追加ボタンがクリックされた際のイベントハンドラ
  * @return {undefined}
  */
  onAddClick(){
    if(this.props.onAddMember && this.state.newName.length > 0){
      this.props.onAddMember(this.state.newName);
    }

    this.setState({newName:""});
  }
  /**
  * 画面を描画する <br />
  * このメソッドはReact.Componentの必須メソッド
  * @return {Object} Virtual DOM
  */
  render(){
    return (
      <div>
        名前：<input
          type="text"
          ref="newName"
          value={this.state.newName}
          onChange={this.onChangeNewName}
          />
        <button ref="addButton" onClick={this.onAddClick}>追加</button>
      </div>
    );
  }
}
