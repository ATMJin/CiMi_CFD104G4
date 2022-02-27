const bus = new Vue(); // 建立 event bus

Vue.component("shopping-cart-title", {
  template: `
<section class="shopping_cart_title">
  <!-- 箭頭 -->
  <i class="bi bi-arrow-left-circle"></i>
  <!-- 文字 -->
  <div class="txt_box">
    <p>購物車</p>
    <p>收藏清單</p>
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
      bus.$emit('send', x); // 自訂事件
    },
  },
  template: `
<div class="shopping_cart_goods_box">
  <div class="shopping_cart_goods_item_box">

    <div class="information_box">
      <p>商品</p>
      <!-- 商品照 -->
      <div class="img_box">
        <img src="https://picsum.photos/300/300/?random=10">
      </div>
      <!-- 商品資訊 -->
      <div class="product_txt_box">
        <p>推薦|玫瑰花</p>
      </div>
    </div>

    <!-- 價格數量計算 -->
    <div class="information_item_box">
      <!-- 單價 -->
      <div class="txt_box">
        <p>單價 </p>
        <p class="num_box"><span>$ {{this.price}}</span></p>
      </div>

      <!-- 數量 -->
      <div class="item_box">
        <p>數量</p>
        <div class="count">
          <img @click="this.minusCount" src="assets/images/icon/article_left.png">
          <input min="0" type="number" v-model="this.count">
          <img @click="this.plusCount" src="assets/images/icon/article_right.png">
        </div>
      </div>

      <!-- 商品小計 -->
      <div class="txt_box">
        <p>小計 </p>
        <p class="num_box"><span>$ {{this.total}}</span></p>
      </div>

      <!-- 操作 -->
      <div class="txt_box dosometing_box">
        <p>操作</p>
        <div class="move_box">
          <p class="rm_product">移除商品</p>
          <p class="love_it">加入收藏</p>
        </div>
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
  template: `
<div class="shopping_cart_goods_box love_list_txt_box">
  <div class="shopping_cart_goods_item_box">

    <div class="information_box">
      <p>商品</p>
      <!-- 商品照 -->
      <div class="img_box">
        <img src="https://picsum.photos/300/300/?random=10">
      </div>
      <!-- 商品資訊 -->
      <div class="product_txt_box">
        <p>推薦|玫瑰花</p>
      </div>
    </div>

    <!-- 價格數量計算 -->
    <div class="information_item_box">
      <!-- 單價 -->
      <div class="txt_box">
        <p>單價 </p>
        <p class="num_box love_list_txt_box"><span>$ {{this.price}}</span></p>
      </div>
      
      <!-- 操作 -->
      <div class="txt_box dosometing_box">
        <p>操作</p>
        <div class="move_box">
          <p class="rm_product">移除商品</p>
          <p class="love_it">加入購物車</p>
        </div>
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


new Vue({
  el: '#app',
  data: {
    count: 0,
    price_total: 0,
    componentId: "shopping-car",
  },
  methods: {
    // 切換購物收藏組件
    switchShoppingCar() {
      this.componentId = 'shopping-car';
      this.txt_middle();
    },
    switchLoveList() {
      this.componentId = 'love-list';
      this.txt_middle();
    },
    // 垂直置中
    txt_middle() {
      if (window.innerWidth >= 768) {
        let hei = window.getComputedStyle(document.querySelector(".information_box")).height;

        let txt = document.querySelectorAll(".information_item_box>.txt_box");
        txt.forEach(element => {
          element.style.height = hei;
        });
        let item_b = document.querySelectorAll(".information_item_box>.item_box");
        item_b.forEach(element => {
          element.style.height = hei;
        });
      }
    },
  },
  mounted() {

    window.addEventListener("load", () => {
      this.txt_middle();

    })

  },
});
Vue.config.devtools = true;