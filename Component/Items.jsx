import React from 'react';
import i from './Item.module.css';

const Items = (props) => {
    return(
        <div className={i.container}>
          <form onSubmit={props.buttonStartData}>
            <div className={i.totalPrice}>
              <div>Корзина {props.length} - <b>{props.totalState ? props.totalState : props.total} руб.</b></div>
            </div>

            <div className={i.items}>
              {props.items.map( item => 
                <div className={i.item} key={item.choices.fieldMultichoice.value + item.guid} id={item.choices.fieldMultichoice.value + item.guid}>
                  <div className={i.img}>
                    <img src={item.image} alt={item.title} />
                  </div> 
                  
                  <div className={i.title}>{item.title}</div> 
                  <div className={i.size}>
                    <span>Размер: {item.choices.fieldMultichoice.value}</span>
                  </div>            
                    <div>
                      <div className={i.quin_block}>
                        <div className={i.delete} onClick={() => props.clickFreshTotalPriceMin({
                            index: item.choices.fieldMultichoice.value + item.guid,
                            guid: item.guid,
                            count: props.countItem === item.quantity ? props.count - 1 : item.quantity - (1 - 1) ,
                            countItem: item.quantity,
                            price: item.discountPrice * props.count,
                            discountPrice: (item.price * props.count) - item.price,
                            total: props.total - ( item.discountPrice- item.discountPrice )})
                        }>-</div>
                        
                        <div className={i.quin}>
                          {item.choices.fieldMultichoice.value + item.guid === props.index ? props.count : item.quantity}
                        </div> 

                        <div className={i.plus} onClick={() => props.clickFreshTotalPricePlus({
                            index: item.choices.fieldMultichoice.value + item.guid,
                            guid: item.guid,
                            count: props.countItem === item.quantity ? props.count + 1 : item.quantity + 1 ,
                            countItem: item.quantity,
                            price: item.discountPrice * props.count,
                            discountPrice: item.price * props.count,
                            total: props.total + item.discountPrice
                          })}>
                          <span>+</span>
                        </div>
                      </div>

                      <div className={i.flex__price}>
                        <div>
                          {item.choices.fieldMultichoice.value + item.guid === props.index ? 
                            <div>
                              {item.discountPrice <= 0 ?
                                <div>
                                  <div className={i.discountPrice}> 
                                    {props.price ? props.discountPrice : item.price * props.count} руб.
                                  </div>
                                </div>
                                : 
                                <div className={i.flex__price}>
                                  <div className={i.discountPrice}>
                                    {props.price ? props.discountPrice : item.discountPrice * props.count} руб.
                                  </div> 
                                  
                                  <div className={i.price}>
                                    {item.price ? item.price * props.count : null} руб.
                                  </div>
                                </div>
                              }
                            </div>
                          : 
                            <div>
                              {item.discountPrice <= 0 ?
                                <div>
                                  <div className={i.discountPrice}> {item.price * item.quantity} руб.</div>
                                </div>
                                : 
                                <div className={i.flex__price}>
                                    <div className={i.discountPrice}>{item.discountPrice * item.quantity} руб. </div> 
                                    <div className={i.price}> {item.price * item.quantity} руб.</div>
                                  </div>
                              }
                            </div>
                          }
                        </div>
                      </div>
                    </div>
                </div>
              )}
            </div>
          </form>
          <div>
            <button className={i.cs_bt} onClick={() =>props.buttonStartData(props.items)}>Оформить заказ</button>
          </div>
        </div>
    )
}

export default Items;