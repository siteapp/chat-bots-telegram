import React from 'react';
import './App.css';

import Items from './Component/Items';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      postId: null,
      items: [],
      itemClone: [],
      guid: '',
      count: '0',
      countItem: '0',
      price: '',
      discountPrice: '',
      index: '',
      totalState: '',
    };
  }

  componentDidMount() {
    const requestOptions = {
      method: 'GET',
      headers: { 
        'Accept': 'application/json; camelcase=1, */*',
        'bot-key': 'c7736d90-a435-4f22-920a-1f5d9ce77fb3'
      },
    };
    
    fetch('https://designer.fstrk.io/api/partners/chats/fd77fa7d-f00e-4ee8-acb9-a25d1c010b05/variables/', requestOptions)
    .then(response => response.json())
    .then(responseJson => {
        this.setState({
          items: responseJson,
        });
        const arrItems = this.state.items["cart-8f23fa09-c277-424a-9604-f5dd1c859bea"];
        this.setState({
          itemClone: arrItems.products
        });  
    })
    .catch(error => {
        console.error(error);
    });   
  }

  buttonStartData = e => {
    const arrPushItems = [];
    const arrNewItems = {"cart-8f23fa09-c277-424a-9604-f5dd1c859bea": {products : arrPushItems}};
    
    this.state.itemClone.map( a =>      
      arrPushItems.push({
        code: null,
        guid: a.guid,
        image: a.image,
        price: a.price,
        title: a.title,
        choices:{field_multichoice: {
          key: "fieldMultichoice",
          title: "Размер",
          type: 'multichoice',
          value: a.choices.fieldMultichoice.value
        }},
        quantity: a.quantity !== this.state.count ? this.state.count : a.quantity,
        discount_price: a.discountPrice,
        productType: a.productType,
      })
    )

    const requestOptions = {
      method: 'POST',
      headers: { 
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'bot-key': 'c7736d90-a435-4f22-920a-1f5d9ce77fb3',
      },
      body: JSON.stringify(arrNewItems)
    };

    const requestOptionsPush = {
      method: 'POST',
      headers: { 
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'bot-key': 'c7736d90-a435-4f22-920a-1f5d9ce77fb3',
      },
      body: JSON.stringify(
      
        {"node":"48955", "is_async":false, get_params: {
          'bot_key': "c7736d90-a435-4f22-920a-1f5d9ce77fb3",
          'chat_uuid': "fd77fa7d-f00e-4ee8-acb9-a25d1c010b05"
        }}
      )
    };
    fetch('https://designer.fstrk.io/api/partners/chats/fd77fa7d-f00e-4ee8-acb9-a25d1c010b05/variables/', requestOptions)
      .then(response => response.json())
      .then();

      fetch('https://designer.fstrk.io/api/partners/chats/fd77fa7d-f00e-4ee8-acb9-a25d1c010b05/push/', requestOptionsPush)
      .then(response => response.json())
      .then(response => {
        window.location.href = "https://refer.id/?bot=demo_webview_bot&platform=telegram&verbose_name=Бот для собеседований&is_close_url=1";
      });
  }

  clickFreshTotalPriceMin = e => {
    
    this.setState(() =>{
      return {
        guid: e.guid, 
        count: e.count,
        price: e.price,
        discountPrice: e.discountPrice,
        totalState: e.total,
        index: e.index,
        countItem: e.countItem
      }
    });
    
    localStorage.setItem('totals', e.total);
  }

  clickFreshTotalPricePlus = e => {
    this.setState(() => {
      return ({
        guid: e.guid, 
        count: e.count,
        price: e.price,
        discountPrice: e.discountPrice,
        totalState: e.total,
        index: e.index
      })
    })

    localStorage.setItem('totals', e.total);
  }
  
  render() {
    const {itemClone} = this.state;
    const {guid} = this.state;
    const {count} = this.state;
    const {countItem} = this.state;
    const {price} = this.state;
    const {discountPrice} = this.state;
    const {index} = this.state;
    const {totalState} = this.state;

    const length = itemClone.length;
   
    const totalPriceCart = itemClone.map( 
      p => p.discountPrice * p.quantity
    );

    const totalPriceCartPrice = itemClone.map( 
      p => p.discountPrice === null ?  p.price * p.quantity : null 
    );
    
    const titalViewDiscountPrice = totalPriceCart.reduce(function(sum, arg) {
      return sum + (parseInt(arg) || 0);
    }, 0)

    const titalViewPrice = totalPriceCartPrice.reduce(function(sum, arg) {
      return sum + (parseInt(arg) || 0);
    }, 0)

    const total = titalViewDiscountPrice + titalViewPrice;
    
    return(
      <Items 
        total={total} 
        items = {itemClone} 
        length = {length} 
        guid = {guid} 
        count = {count} 
        countItem = {countItem} 
        price = {price} 
        discountPrice = {discountPrice} 
        index = {index} 
        totalState = {totalState} 
        buttonStartData={this.buttonStartData}
        clickFreshTotalPriceMin={this.clickFreshTotalPriceMin}
        clickFreshTotalPricePlus={this.clickFreshTotalPricePlus}
      />
    )
  }
}

export default App;
