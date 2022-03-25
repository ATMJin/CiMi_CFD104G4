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
      count: 0,
    };
  },
  props: ["good"],
  computed: {
    total() {
      return this.price * this.count;
    },
    goods_no() {
      return this.good.goods_no
    },
    goods_pic() {
      return this.good.goods_pic1
    },
    price() {
      return this.good.goods_price
    },
    goods_name() {
      return this.good.goods_name
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
    addLoveGoods() {
      let mem_no = sessionStorage.getItem('mem_no')
      if (!mem_no) {
        alert("您還未登入")
      } else {
        fetch(
          `./phps/shoping_cart.php?case=addLoveGoods&mem_no=${mem_no}&goods_no=${this.goods_no}`
        ).catch(err => console.log(err));
        // FIXME 反註解
        // alert("加入商品收藏成功")
      }
    },
    rmProduct(e) {
      // 尋找刪除鍵所在的商品欄
      let par = e.target.parentNode.parentNode.parentNode.parentNode;
      // 刪除商品欄
      par.remove()
      this.sendPrice(-(this.price * this.count));

      // 清除sessionStorage
      let goods = sessionStorage.getItem("ShoppingCart_goods_no").split(",")
      let index = goods.indexOf(this.goods_no.toString())
      goods.splice(index, 1)
      sessionStorage.setItem("ShoppingCart_goods_no", goods)

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
        <img :src="goods_pic">
      </div>
    </div>

    <!-- 價格數量計算 -->
    <div class="information_item_box">
      <!-- 商品資訊 -->
      <div class="product_txt_box">
        <p>{{goods_name}}</p>
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
        <p @click="this.addLoveGoods" class="love_it">加入收藏</p>
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
      x = parseInt(x)
      this.price_total = parseInt(this.price_total)
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
  data() {
    return {
      goods: [],
    }
  },
  methods: {
    getGoodsInfo() {
      let goods_no = sessionStorage.getItem("ShoppingCart_goods_no")
      fetch(
          `./phps/shoping_cart.php?case=getGoodsInfo&goods_no=${goods_no}`
        )
        // .then(res => console.log(res))
        .then(res => res.json())
        .then(res => {
          // console.log(res);
          this.goods = res;
        })
        .catch(error =>
          console.log(error.message));
    },
    goShopping() {
      if (!sessionStorage.getItem("ShoppingCart_goods_no")) {
        document.querySelector(".nothing_goods_box").style.display = "block"
      } else {
        document.querySelector(".nothing_goods_box").style.display = "none"
      }
    }
  },
  created() {
    this.getGoodsInfo()
    // FIXME 繞過有商品還出現球球
    setInterval(this.getGoodsInfo, 3000)
    this.goShopping()
    setInterval(this.goShopping, 3000)
  },
  mounted() {},
  template: `
  <div class="shopping_car_box">
    <!-- 商品項目 -->
    <section class="shopping_cart_goods">
      <shopping-cart-goods-box v-for="good in goods" :key="good.goods_no" :good="good"></shopping-cart-goods-box>
    </section>

    <!-- 計算總額 -->
    <total-box></total-box>
  </div>
  `,
})


Vue.component('love-list-box', {
  data() {
    return {
      count: 0,
    };
  },
  props: ["good"],
  computed: {
    imgrandom() {
      let r = Math.floor(Math.random() * 10)
      return `https://picsum.photos/300/300/?random=${r}`;
    },
    goods_no() {
      return this.good.goods_no
    },
    goods_pic() {
      return this.good.goods_pic1
    },
    price() {
      return this.good.goods_price
    },
    goods_name() {
      return this.good.goods_name
    },
  },
  methods: {
    rmProduct(e) {
      // 尋找刪除鍵所在的商品欄
      let par = e.target.parentNode.parentNode.parentNode.parentNode;
      // 刪除商品欄
      par.remove()

      // 移除會員收藏
      fetch(`phps/product_heart_num_delete.php?mem_no=${sessionStorage.getItem("mem_no")}&goods_no=${this.goods_no}`)
        .catch(err => console.log(err))

      // 計算剩餘商品欄數量
      let countP = document.querySelectorAll(".shopping_cart_goods_box")
      // 出現吉祥物
      if (countP.length == 0) {
        document.querySelector(".nothing_goods_box").style.display = "block"
        // document.querySelector(".total_box").style.display = "none"
      }
    },
    addShoppingCart() {
      let goods_no = sessionStorage.getItem("ShoppingCart_goods_no")
      if (!goods_no) {
        sessionStorage.setItem("ShoppingCart_goods_no", this.goods_no)
        // console.log(sessionStorage.getItem("ShoppingCart_goods_no"));
      } else {
        if (!(goods_no.split(",").includes(`${this.goods_no}`))) {
          goods_no += `,${this.goods_no}`
          sessionStorage.setItem("ShoppingCart_goods_no", goods_no)
        }
        // console.log(sessionStorage.getItem("ShoppingCart_goods_no"));
      }
      // FIXME 反註解
      // alert("成功加入購物車")
    },
  },
  template: `
<div class="shopping_cart_goods_box love_list_txt_box">
  <div class="shopping_cart_goods_item_box">

    <div class="information_box">
      <!-- 商品照 -->
      <div class="img_box">
        <img :src="goods_pic">
      </div>
    </div>

    <!-- 價格數量計算 -->
    <div class="information_item_box">
      <!-- 商品資訊 -->
      <div class="product_txt_box">
        <p>{{goods_name}}</p>
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
        <p class="rm_product" @click="this.rmProduct">移除商品</p>
        <p class="love_it" @click="this.addShoppingCart">加入購物車</p>
      </div>
    </div>
  </div>
</div>
              `,
});

Vue.component("love-list", {
  data() {
    return {
      goods: [],
    }
  },
  methods: {
    getLoveGoods() {
      let mem_no = sessionStorage.getItem('mem_no')
      fetch(
          `./phps/shoping_cart.php?case=getLoveGoods&mem_no=${mem_no}`
        )
        // .then(res => console.log(res))
        .then(res => res.json())
        .then(res => {
          // console.log(res);
          this.goods = res;
        })
        .catch(error =>
          console.log(error.message));
    },
    goShopping() {
      if (!this.goods[0]) {
        document.querySelector(".nothing_goods_box").style.display = "block"
      } else {
        document.querySelector(".nothing_goods_box").style.display = "none"
      }
    }
  },
  created() {
    // FIXME 繞過有商品還出現球球
    this.getLoveGoods()
    setInterval(this.getLoveGoods, 4000)
    this.goShopping()
    setInterval(this.goShopping, 4000)
  },
  mounted() {},
  template: `
  <div class="shopping_car_box">
    <!-- 商品項目 -->
    <section class="shopping_cart_goods">
      <love-list-box v-for="good in goods" :key="good.goods_no" :good="good"></love-list-box>
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
    <img src="assets/images/homepage_ball.svg" alt="">
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
    
      <component :is="this.componentId"></component>

    <!-- 吉祥物 -->
    <nothing-goods-box/>
  </section>
  `,
})


new Vue({
  el: '#shoppingApp',
  data: {
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
});
Vue.config.devtools = true;


let shopCar = document.querySelector(".member_bar li:nth-child(2)");

function disBlock() {
  document.querySelector(".shopping_cart_light_box").style.display = "block"
}

shopCar.addEventListener("click", disBlock)