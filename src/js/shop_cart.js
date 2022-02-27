Vue.component('shopping-cart-goods-box', {
  data() {
    return {
      price: 200,
      count: 0,
    };
  },
  computed: {
    total() {
      return this.price * this.count;
    }
  },
  methods: {
    plusCount() {
      this.count++;
      this.sendPrice(this.price);
    },
    minusCount() {
      if (this.count > 0) {
        this.count--;
        this.sendPrice(-this.price);
      }
    },
    sendPrice(x) {
      this.$emit('send', x);
    },
  },
  template: `
  <div class="shopping_cart_goods_box">
    <div class="shopping_cart_goods_item_box">
      <!-- 商品照 -->
      <div class="img_box">
        <img src="https://picsum.photos/300/300/?random=10">
      </div>
      <!-- 商品資訊 -->
      <div class="product_txt_box">
        <p> 推薦 | 玫瑰花束 </p> 
      </div> 
      <div class="information_item_box">
        <!-- 單價 -->
        <div class="txt_box">
          <p> 單價 $ <span> {{this.price}} </span></p>
        </div> 
        <!-- 數量 -->
        <div class="item_box">
          <p> 數量 <img @click="this.minusCount" src="assets/images/icon/article_left.png"><input type = "number" min="0" v-model="this.count"><img @click="this.plusCount" src="assets/images/icon/article_right.png">
          </p> 
        </div> 
        <!-- 商品小計 -->
        <div class="txt_box">
          <p> 小計 $ <span> {{this.total}} </span></p>
        </div> 
      </div> 
    </div> 
  </div>
              `,
});

Vue.component("shopping-car", {
  data() {
    return {
      price_total: 0,
    }
  },
  methods: {
    countTotalPrice(x) {
      this.price_total += x;
    },
  },
  template: `
  <div class="shopping_car_box">
    <!-- 商品項目 -->
    <section class="shopping_cart_goods">
      <shopping-cart-goods-box @send="countTotalPrice"></shopping-cart-goods-box>
      <shopping-cart-goods-box @send="countTotalPrice"></shopping-cart-goods-box>
      <shopping-cart-goods-box @send="countTotalPrice"></shopping-cart-goods-box>
    </section>


    <!-- 計算總額 -->
    <div class="total_box">
      <div class="total_num_box">
        <p>訂單總額: <span class="total_num">\${{this.price_total}}</span></p>
      </div>
      <button class="btn-primary">結帳</button>
    </div>

  </div>
  `,
})


new Vue({
  el: '#app',
  data: {
    count: 0,
    price_total: 0,
  },
  methods: {
    countTotalPrice(x) {
      this.price_total += x;
    },
  },
});
Vue.config.devtools = true;