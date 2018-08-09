// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isLike: {
      type: Boolean,
      value: false
    },
    countLike: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    likeSrc: 'images/like.png',
    dislikeSrc: 'images/dislike.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleLikeTap () {
      const isLikeBool = this.properties.isLike
      const countLikeNum = this.properties.countLike
      this.setData({
        isLike: !isLikeBool,
        countLike: isLikeBool ? countLikeNum-1 : countLikeNum+1
      })
    }
  }
})
