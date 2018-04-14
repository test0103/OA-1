Page({

  /**
   * 页面的初始数据
   */
  data: {
    year: null,
    resultList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var year = that.thisYear();
    that.setData({
      year: year
    })
    that.draw_calendar();
  },
  // 获取当前年份
  thisYear: function () {
    var date = new Date;
    var year = date.getFullYear();
    console.log(year);
    return year;
  },
  draw_calendar: function () {
    var that = this;
    var year = that.data.year;
    for (var i = 0; i < 12; i++) {
      var thisMonth=i+1;
      var thisList=that.draw_calendar_month(year,thisMonth);
      var listObj={};
      listObj.month = thisMonth;
      listObj.list = thisList;
      //console.log(listObj);
      that.data.resultList.push(listObj);
    }
    console.log(that.data.resultList);
  },
  draw_calendar_month: function (year,thisMonth) {
    var year = year;//年
    var month = thisMonth;//月
    var that = this;
    var list = [];
    var d = new Date(year, month - 1, 1, 1, 1, 1);//天数
    console.log(d);
    var firstDay = d.getDay();
    var allDate = new Date(d.getFullYear(), (d.getMonth() + 1), 0).getDate();
    var y, m, d, ymd;
    for (var i = 0; i < firstDay; i++) {
      list.push({
        ymd: "",
        date: "",
        love: false,
        danger: false,
        monthly: false,
        today: false,
      })
    }
    var j = 1;
    var k = i;
    for (i; i < allDate + k; i++) {
      var dd = new Date();
      y = dd.getFullYear();
      m = dd.getMonth() + 1;//获取当前月份的日期 ,因为js默认月份从0开始，所以要加一
      d = dd.getDate();
      ymd = year + "-" + month + "-" + j;
      if (year == y && month == m && d == j) {
        var today = true;
        that.setData({
          ymd: ymd
        })
      } else {
        var today = false;
      }

      var action = wx.getStorageSync(ymd);
      list.push({
        ymd: ymd,
        date: j,
        love: action == "love" ? true : false,
        danger: false,
        monthly: action == "monthly" ? true : false,
        today: today
      })
      j++;
    }
    var lastDay = new Date(year, month - 1, allDate, 1, 1, 1).getDay();
    console.log(lastDay);
    var k = i;
    for (i; i < (6 - lastDay + k); i++) {
      list.push({
        ymd: "",
        date: "",
        love: false,
        danger: false,
        monthly: false,
        today: 0,
      })
    }
    return list;
  }

})