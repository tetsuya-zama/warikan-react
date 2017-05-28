import React from 'react';
import ReactDOM from 'react-dom';

/**
* 合計金額入力コンポーネント
*/
export default class AmountInput extends React.Component{
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
    * amountText:${合計金額テキストボックスの入力値 String}
    *}
    */
    this.state = {
      amountText : ""
    };
    /*
    *ES2015版のReactは以下のようにthisをbindしないと
    *メソッド内でpropsやstateが参照できない
    */
    this.onChangeAmountText = this.onChangeAmountText.bind(this);
    this.clearAmount = this.clearAmount.bind(this);
  }
  /**
  * 合計金額テキストボックスが変更された際のイベントハンドラ
  * @return {undefined}
  */
  onChangeAmountText(){
    //合計金額テキストボックスの入力値から数値のみ抜き出す
    const input = ReactDOM.findDOMNode(this.refs.amountText).value
      .replace(/[^0-9^\.]/g,"");

    if(input.length === 0){
      //数値が入っていない場合は、合計金額を初期化する
      this.clearAmount();
    }else{
      //入力値をintに変換する
      const amount = parseInt(input);
      if(amount > 0){
        //合計金額が0より大きい場合

        //このコンポーネントのstateのamountTextは
        //¥をつけて3桁カンマ区切りの文字列として更新する
        this.setState({amountText:"¥" + amount.toLocaleString()});
        if(this.props.onChangeAmount){
          //親コンポーネントからonChangeAmountというイベントハンドラが渡されている場合は、
          //int型のamountを引き渡す
          this.props.onChangeAmount(amount);
        }
      }else{
        //合計金額が0以下の場合は合計金額を初期化する
        this.clearAmount();
      }
    }
  }

  /**
  * 合計金額をクリアするメソッド
  * @return {undefined}
  */
  clearAmount(){
    //このコンポーネントのstateのamountTextは
    //空文字列として初期化する
    this.setState({amountText:""});
    if(this.props.onChangeAmount){
      //親コンポーネントからonChangeAmountというイベントハンドラが渡されている場合は、
      //0を引き渡す
      this.props.onChangeAmount(0);
    }
  }
  /**
  * 画面を描画する <br />
  * このメソッドはReact.Componentの必須メソッド
  * @return {Object} Virtual DOM
  */
  render(){
    return (
      <input
        type="text"
        ref="amountText"
        placeholder="合計金額"
        value={this.state.amountText}
        onChange={this.onChangeAmountText}
      />
    );
  }
}
