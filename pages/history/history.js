// pages/history/history.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    show: true
  },
  del: function (e) {
    let that = this
    wx.showModal({
      title: "确认删除",
      content: "确定要删除此条记录吗？",
      success: function (res) {
        if (res.confirm) {
          wx.showLoading({
            title: "正在删除...",
          })
          var index = e.currentTarget.dataset.parentindex;
          that.data.list.splice(index, 1);
          var list = that.data.list;
          wx.setStorageSync("history", list)
          that.setData({
            list
          })
          wx.showToast({
            title: "删除成功！"
          })
          if (list.length == 0)
            that.setData({
              show: true
            })
        }
      }
    })
  },
  delall: function () {
    var that = this
    wx.showModal({
      title: "全部删除",
      content: "确定要删除全部记录吗？",
      success: function (res) {
        if (res.confirm) {
          wx.showLoading({
            title: "正在删除...",
          })
          wx.clearStorageSync();
          wx.hideLoading()
          wx.showToast({
            title: "删除成功！"
          })
          that.setData({
            list: [],
            show: true
          })
        }
      }
    })

  },
  //点击最外层列表展开收起
  listTap(e) {
    let Index = e.currentTarget.dataset.parentindex,//获取点击的下标值
      list = this.data.list;
    list[Index].show = !list[Index].show || false;//变换其打开、关闭的状态
    this.setData({
      list
    });
  },
  //点击里面的子列表展开收起
  listItemTap(e) {
    let parentindex = e.currentTarget.dataset.parentindex,//点击的内层所在的最外层列表下标
      Index = e.currentTarget.dataset.index,//点击的内层下标
      list = this.data.list;
    list[parentindex].answers[Index].show = !list[parentindex].answers[Index].show || false;//变换其打开、关闭的状态
    if (list[parentindex].answers[Index].show) {//如果是操作的打开状态，那么就让同级的其他列表变为关闭状态，保持始终只有一个打开
      for (let i = 0, len = list[parentindex].answers.length; i < len; i++) {
        if (i != Index) {
          list[parentindex].answers[i].show = false;
        }
      }
    }
    this.setData({ list });
  },
  //让所有的展开项，都变为收起
  packUp(data, index) {
    for (let i = 0, len = data.length; i < len; i++) {//其他最外层列表变为关闭状态
      if (index != i) {
        data[i].show = false;
        for (let j = 0; j < data[i].answers.length; j++) {//其他所有内层也为关闭状态
          data[i].answers[j].show = false;
        }
      }
    }
  },copy(e){
    wx.setClipboardData({
      data: e.currentTarget.dataset.item.answer,
      success: function (res) {
        wx.showToast({
          title: "答案已复制！",
          icon: "none"
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: "加载中",
    })
    var list = wx.getStorageSync("history");
    if (list.length != 0) {
      this.setData({
        list: list,
        show: false
      })
    }
    wx.hideLoading();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: "网课答案查询",
      path: "pages/index/index"
    }
  }
})