const bus = new Vue(); // 建立 event bus

Vue.component("shopping-cart-title", {
  methods: {
    // 切換購物收藏組件
    switchShoppingCar() {
      this.componentId = 'shopping-car';
      this.sendComponentId(this.componentId)
    },
    switchLoveList() {
      this.componentId = 'love-list';
      this.sendComponentId(this.componentId)
    },
    sendComponentId(x) {
      bus.$emit('sendId', x); // 自訂事件
    },
    disNone() {
      document.querySelector(".shopping_cart_light_box").style.display = "none"
    }
  },
  template: `
<section class="shopping_cart_title">
  <!-- 箭頭 -->
  <i @click="this.disNone" class="bi bi-arrow-left-circle"></i>
  <!-- 文字 -->
  <div class="txt_box">
    <p @click="this.switchShoppingCar">購物車</p>
    <p @click="this.switchLoveList">收藏清單</p>
  </div>
</section>
`,
})


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
    },
    imgrandom() {
      let r = Math.floor(Math.random() * 10)
      return `https://picsum.photos/300/300/?random=${r}`;
    },
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
      bus.$emit('send', x); // 自訂事件
    },
    rmProduct(e) {
      // 尋找刪除鍵所在的商品欄
      let par = e.target.parentNode.parentNode.parentNode.parentNode;
      // 刪除商品欄
      par.remove()
      this.sendPrice(-(this.price * this.count));

      // 計算剩餘商品欄數量
      let countP = document.querySelectorAll(".shopping_cart_goods_box")
      // 出現吉祥物
      if (countP.length == 0) {
        document.querySelector(".nothing_goods_box").style.display = "block"
        document.querySelector(".total_box").style.display = "none"
      }
    },
  },
  template: `
<div class="shopping_cart_goods_box">
  <div class="shopping_cart_goods_item_box">

    <div class="information_box">
      <!-- 商品照 -->
      <div class="img_box">
        <img :src="imgrandom">
      </div>
    </div>

    <!-- 價格數量計算 -->
    <div class="information_item_box">
      <!-- 商品資訊 -->
      <div class="product_txt_box">
        <p>推薦|玫瑰花</p>
      </div>

      <div class="counter_box">
        <!-- 單價 -->
        <div class="txt_box">
          <p>單價<span class="num_box">$ {{this.price}}</span></p>
        </div>
        <!-- 數量 -->
        <div class="item_box">
          <p>數量
            <span class="count">
              <img @click="minusCount" src="assets/images/icon/article_left.png">
              <input min="0" type="number" v-model="this.count">
              <img @click="plusCount" src="assets/images/icon/article_right.png">
            </span>
          </p>
        </div>
        <!-- 商品小計 -->
        <div class="txt_box">
          <p>小計<span class="num_box">$ {{this.total}}</span></p>
        </div>
      </div>
    </div>

    <!-- 操作 -->
    <div class="txt_box dosometing_box">
      <!-- <p>操作</p> -->
      <div class="move_box">
        <p @click="this.rmProduct" class="rm_product">移除商品</p>
        <p @click="" class="love_it">加入收藏</p>
      </div>
    </div>
  </div>
</div>
              `,
});


Vue.component("total-box", {
  data() {
    return {
      price_total: 0,
    }
  },
  mounted() {
    bus.$on('send', (x) => {
      this.price_total += x;
    })
  },
  template: `
  <div class="total_box">
    <div class="total_num_box">
      <p>訂單總額: <span class="total_num">\${{this.price_total}}</span></p>
    </div>
    <button class="btn-primary">結帳</button>
  </div>
  `,
})


Vue.component("shopping-car", {
  template: `
  <div class="shopping_car_box">
    <!-- 商品項目 -->
    <section class="shopping_cart_goods">
      <shopping-cart-goods-box></shopping-cart-goods-box>
      <shopping-cart-goods-box></shopping-cart-goods-box>
      <shopping-cart-goods-box></shopping-cart-goods-box>
    </section>

    <!-- 計算總額 -->
    <total-box></total-box>
  </div>
  `,
})


Vue.component('love-list-box', {
  data() {
    return {
      price: 200,
      count: 0,
    };
  },
  computed: {
    imgrandom() {
      let r = Math.floor(Math.random() * 10)
      return `https://picsum.photos/300/300/?random=${r}`;
    },
  },
  template: `
<div class="shopping_cart_goods_box love_list_txt_box">
  <div class="shopping_cart_goods_item_box">

    <div class="information_box">
      <!-- 商品照 -->
      <div class="img_box">
        <img :src="imgrandom">
      </div>
    </div>

    <!-- 價格數量計算 -->
    <div class="information_item_box">
      <!-- 商品資訊 -->
      <div class="product_txt_box">
        <p>推薦|玫瑰花</p>
      </div>

      <div class="counter_box">
        <!-- 單價 -->
        <div class="txt_box love_list_txt_box">
          <p>單價<span class="num_box">$ {{this.price}}</span></p>
        </div>        
      </div>
    </div>

    <!-- 操作 -->
    <div class="txt_box dosometing_box">
      <!-- <p>操作</p> -->
      <div class="move_box">
        <p class="rm_product">移除商品</p>
        <p class="love_it">加入購物車</p>
      </div>
    </div>
  </div>
</div>
              `,
});

Vue.component("love-list", {
  template: `
  <div class="shopping_car_box">
    <!-- 商品項目 -->
    <section class="shopping_cart_goods">
      <love-list-box></love-list-box>
      <love-list-box></love-list-box>
    </section>
  </div>
  `,
})

Vue.component("nothing-goods-box", {
  methods: {
    gotoShopping() {
      location.href = 'product.html'
    },
  },
  template: `
<div class="nothing_goods_box">
  <div class="img_box">
    <img src="assets/images/index_ball.svg" alt="">
  </div>
  <p>尚未有商品</p>
  <p>快去逛逛好物商城 </p>
  <p>發現更便利的生活方式</p>
  <button @click="gotoShopping" class="btn-primary">立即前往</button>
</div>
  `,
})

Vue.component("shopping-cart", {
  data() {
    return {
      componentId: "shopping-car",
    }
  },
  mounted() {
    bus.$on('sendId', (x) => {
      this.componentId = x;
    })
  },
  template: `
  <section class="shopping_cart">

    <!-- 購物車最上面的title header -->
    <shopping-cart-title></shopping-cart-title>
    
    <keep-alive>
      <component :is="this.componentId"></component>
    </keep-alive>

    <!-- 吉祥物 -->
    <nothing-goods-box/>
  </section>
  `,
})


new Vue({
  el: '#shoppingApp',
  data: {
    count: 0,
    price_total: 0,
    componentId: "shopping-car",
  },
  methods: {
    // 切換購物收藏組件
    switchShoppingCar() {
      this.componentId = 'shopping-car';
    },
    switchLoveList() {
      this.componentId = 'love-list';
    },
  },
  mounted() {
    window.addEventListener("load", () => {})
  },
});
Vue.config.devtools = true;


let shopCar = document.querySelector(".member_bar li:nth-child(2)");

function disBlock() {
  document.querySelector(".shopping_cart_light_box").style.display = "block"
}

shopCar.addEventListener("click", disBlock)