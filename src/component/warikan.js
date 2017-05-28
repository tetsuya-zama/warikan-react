import React from 'react';
import ReactDOM from 'react-dom';
import Members from './members';
import MemberInput from './memberinput';
import AmountInput from './amountinput';

/**
* Warikanのメインコンポーネント
*/
export default class Warikan extends React.Component{
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
    * amount:${合計金額 int}
    * members:${メンバーの配列 array<{id:${メンバーID},name:${名前}>}
    *}
    */
    this.state={
      amount:0,
      members:[]
    };

    /*
    *ES2015版のReactは以下のようにthisをbindしないと
    *メソッド内でpropsやstateが参照できない
    */
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.onAddMember = this.onAddMember.bind(this);
    this.onDeleteMember = this.onDeleteMember.bind(this);
  }

  /**
  * 合計金額が変更された際のイベントハンドラ
  * @param {int} amount 変更後の金額
  * @return {undefined}
  */
  onChangeAmount(amount){
    //通知された金額をそのままstateにsetするs
    this.setState({amount:amount});
  }

  /**
  * メンバーの追加が要求された際のイベントハンドラ
  * @param {String} name 新しいメンバーの名前
  * @return {undefined}
  */
  onAddMember(name){
    //今現在のメンバーIDの最大値+1を新メンバーのIDとする
    const newId = this.state.members.length === 0 ? 0
      : Math.max.apply(null,this.state.members.map(m => m.id)) + 1;
    //現在のメンバー配列に新しいメンバーを追加して
    const newMembers = this.state.members.concat([{id:newId,name:name}]);
    //stateにsetする
    this.setState({members:newMembers});
  }
  /**
  * メンバーの削除が要求された際のイベントハンドラ
  * @param {int} memberId 削除対象のメンバーID
  * @return {undefined}
  */
  onDeleteMember(memberId){
    //現在のメンバーリストからidがmemberIdと一致するデータを除外して
    const newMembers = this.state.members.filter(m=>m.id !== memberId);
    //stateにsetする
    this.setState({members:newMembers});
  }
  /**
  * 画面を描画する <br />
  * このメソッドはReact.Componentの必須メソッド
  * @return {Object} Virtual DOM
  */
  render(){
    /**
    * stateが更新されるたびにrenderメソッドが呼ばれるので
    * メンバーごとの支払い金額(payment)や端数(remainder)を再計算して
    * 下位のコンポーネントに引き渡す
    */
    //現在のメンバーの人数
    const memberCount = this.state.members.length;
    //端数を計算
    //0除算を回避するため、メンバーの人数が0であれば0
    const remainder = memberCount === 0 ? 0
      : this.state.amount % memberCount;
    //端数の覗いた一人当たりの支払い金額
    //0除算を回避するため、メンバーの人数が0であれば0
    const paymentPerMember = memberCount === 0 ? 0
      : (this.state.amount - remainder) / memberCount;

    //このコンポーネントのstateのmembars(idとname)に
    //一人当たりの支払い額(payment)を追加した配列を作成
    const membersWithPayment = this.state.members.map(m=>{
      return Object.assign({},m,{payment:paymentPerMember});
    });
    //端数を表示するVirtual DOMを作成
    //端数が0の場合は表示しない(null)
    const remainderDisplay = remainder === 0 ? null
      : <span>端数:¥{remainder.toLocaleString()}</span>

    return (
      <div>
        <h1>割り勘計算機</h1>
        <h2>合計金額</h2>
        <AmountInput onChangeAmount={this.onChangeAmount}/>
        <h2>メンバー</h2>
        <Members members={membersWithPayment} onDeleteMember={this.onDeleteMember} />
        <MemberInput onAddMember={this.onAddMember} />
        {remainderDisplay}
      </div>
    );
  }
}
