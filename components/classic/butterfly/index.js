
Component({
  
  // 组件的属性列表
  properties: {
    
  },
  
  attached: function () {
    
    // 当组件进入页面节点树时让蝴蝶显示
    this.setData({
      show: true
    })
  },

  // 组件的初始数据
  data: {
    show: false
  }
  
})
