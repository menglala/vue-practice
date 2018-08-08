<template>
  <div>
    <storehead :flag="true">列表</storehead>
    <div class="content">
      <ul>
        <router-link :to="{name:'detail',params:{bid:book.bookId}}" v-for="(book,index) in books" :key="index" tag="li">
          <img :src="book.bookCover">
          <div class="list-data">
            <h4>{{book.bookName}}</h4>
            <span>{{book.bookInfo}}</span><br>
            <strong>{{book.bookPrice|toFixed(2)}}</strong><br>
            <i class="iconfont icon-shanchu" @click.stop="remove(book.bookId)"></i>
            <i class="iconfont icon-shoucang" @click.stop="add(book)"></i>
          </div>
        </router-link>
      </ul>
    </div>
  </div>
</template>


<script>
import storehead from "../base/storehead";
import {getBooks,removeBook,} from '../api'
import vuex from 'vuex'
import {mapMutations} from 'vuex'
import * as Types from '../store/mutation-types.js'

export default {
  name: "list",
  components: {
    storehead
  },
  data(){
    return {books:[],}
  },
  created() {
    this.getData();
  },
  methods:{
    async getData(){
      this.books=await getBooks()
    },
    remove(id){
      removeBook(id);
      this.books=this.books.filter((item)=>item.bookId!==id)
    },  
    ...mapMutations(
        [Types.ADD_CART]
      ),
    add(book){
     this[Types.ADD_CART](book)
    }
  },
  filters:{
    toFixed(price,param){
      return '￥'+price.toFixed(param)
    }
  },
  watch:{
    $route(){
      this.getData();
    }
  },
};
</script>

<style lang="less" scoped>
ul {
    h3 {
        color: #908888;
        padding: 10px;
    }
}
ul li {
    padding: 10px;
    img {
        width: 120px;
        height: 130px;
    }
    .list-data {
        display: inline-block;
        vertical-align: top;
        width: calc(100% - 130px);
        span {
            font-size: 14px;
            color: #827171;
            margin: 10px 0;
            display: inline-block;
        }
        strong {
            font-size: 14px;
            color: red;
        }
        i {
            float: right;
            margin: 8px;
        }
    }
}
</style>
