// //index.js
// //获取应用实例
// const app = getApp()

// var animation = wx.createAnimation({})
// var i = 1;  

// Page({
//   data: {
//     motto: 'Hello World',
//     userInfo: {},
//     hasUserInfo: false,
//     canIUse: wx.canIUse('button.open-type.getUserInfo'),
//     arr: [],
//     donghua: true,
//     left1: Math.floor(Math.random() * 305 + 1),
//     left2: Math.floor(Math.random() * 305 + 1),
//     left3: Math.floor(Math.random() * 305 + 1),
//     left4: Math.floor(Math.random() * 305 + 1),
//     left5: Math.floor(Math.random() * 305 + 1),
//     left6: Math.floor(Math.random() * 305 + 1),

//   },
//   //事件处理函数
//   bindViewTap: function() {
//     wx.navigateTo({
//       url: '../logs/logs'
//     })
//   },
//   onLoad: function () {
//     if (app.globalData.userInfo) {
//       this.setData({
//         userInfo: app.globalData.userInfo,
//         hasUserInfo: true
//       })
//     } else if (this.data.canIUse){
//       // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
//       // 所以此处加入 callback 以防止这种情况
//       app.userInfoReadyCallback = res => {
//         this.setData({
//           userInfo: res.userInfo,
//           hasUserInfo: true
//         })
//       }
//     } else {
//       // 在没有 open-type=getUserInfo 版本的兼容处理
//       wx.getUserInfo({
//         success: res => {
//           app.globalData.userInfo = res.userInfo
//           this.setData({
//             userInfo: res.userInfo,
//             hasUserInfo: true
//           })
//         }
//       })
//     }

//     var arr = ["1", "2", "1", "2", "1", "2", "1", "2", "1", "2", "1", "2", "1", "2", "1", "2", "1", "2", "1", "2", "1", "2", "1", "2", "1", "2", "1", "2", "1", "2", "1", "2", "1", "2", "1", "2", "1", "2", "1", "2", "1", "2", "1", "2", "1", "2", "1", "2"]

//     this.setData({
//       arr: arr
//     })
    

    

    


//   },

//   donghua: function () {
//     setTimeout(function () {
//       animation.translateY(604).step({ duration: 4000 })
//       this.setData({
//         ["animationData" + i]: animation.export()
//       })
//       i++;
//     }.bind(this), 500)
//     if (i < 7) {
//       setTimeout(function () {
//         this.donghua()
//       }.bind(this), 500)
//     } else {
//       console.log(22)
//       setTimeout(function () {
//         this.setData({
//           donghua: false
//         })
//       }.bind(this), 4500)
//     }
//   },

//   onShow: function() {
//     this.donghua();
//   },


//   luckytap: function () {
//     var a = 1;
//     var num = setInterval(() => {
//       this.setData({
//         img: '../images/' + a + '.jpg'
//       })
//       a++;
//       if(a == 11) {
//         a = 1;
//       }
//     }, 100);

//     setTimeout(() => {
//       this.setData({
//         img: '../images/10.jpg'
//       })
//       clearInterval(num)
      
//     }, 3000);

//     setTimeout(() => {
//       wx.showToast({
//         title: '恭喜您中奖啦，获得照片一张。',
//         icon: 'none',
//         image: '',
//         duration: 1500,
//         mask: false,
//         success: (result)=>{
          
//         },
//         fail: ()=>{},
//         complete: ()=>{}
//       });
//     }, 4000);


//   },

//   getUserInfo: function(e) {
//     console.log(e)
//     app.globalData.userInfo = e.detail.userInfo
//     this.setData({
//       userInfo: e.detail.userInfo,
//       hasUserInfo: true
//     })
//   },

//    /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {

//   }
  
// })

//获取应用实例
const app = getApp()
// 存储所有的星星
const stars = []
// 下落的加速度
const G = 0.01
const stime = 60

// 速度上限，避免速度过快
const SPEED_LIMIT_X = 1
const SPEED_LIMIT_Y = 1

const W = wx.getSystemInfoSync().windowWidth
const H = wx.getSystemInfoSync().windowHeight
var starImage = '../images/star.jpg' //星星素材
// wx.getImageInfo({
//   src: 'https://qiniu-image.qtshe.com/WechatIMG470.png',
//   success: (res) => {
//     starImage = res.path
//   }
// })

Page({
  onLoad() {
    this.setAudioPlay()
    this.createStar()
  },
  onShow() {
  },
  createStar() {
    let starCount = 550 //星星总的数量
    let starNum = 0 //当前生成星星数
    let deltaTime = 0
    let ctx = wx.createCanvasContext('myCanvas')
    let requestAnimationFrame = (() => {
      return (callback) => {
        setTimeout(callback, 1000 / stime)
      }
    })()
    starLoop()

    function starLoop() {
      requestAnimationFrame(starLoop)
      ctx.clearRect(0, 0, W, H)
      deltaTime = 20 //每次增加的星星数量
      starNum += deltaTime
      if (starNum > starCount) {
        stars.push(
          new Star(Math.random() * W, 0, Math.random() * 5 + 5)
        );
        starNum %= starCount
      }
      stars.map((s, i) => { //重复绘制
        s.update()
        s.draw()
        if (s.y >= H) { //大于屏幕高度的就从数组里去掉
          stars.splice(i, 1)
        }
      })
      ctx.draw()
    }

    function Star(x, y, radius) {
      this.x = x
      this.y = y
      this.sx = 0
      this.sy = 0
      this.deg = 0
      this.radius = radius
      this.ax = Math.random() < 0.5 ? 0.005 : -0.005
    }

    Star.prototype.update = function () {
      const deltaDeg = Math.random() * 0.6 + 0.2

      this.sx += this.ax
      if (this.sx >= SPEED_LIMIT_X || this.sx <= -SPEED_LIMIT_X) {
        this.ax *= -1
      }

      if (this.sy < SPEED_LIMIT_Y) {
        this.sy += G
      }

      this.deg += deltaDeg
      this.x += this.sx
      this.y += this.sy
    }

    Star.prototype.draw = function () {
      const radius = this.radius
      ctx.save()
      ctx.translate(this.x, this.y)
      ctx.rotate(this.deg * Math.PI / 180)
      ctx.drawImage(starImage, -radius, -radius * 1.8, radius * 2, radius * 2)
      ctx.restore()
    }
  },
  setAudioPlay() {
    let adctx = wx.createInnerAudioContext()
    adctx.autoplay = true
    adctx.loop = true
    adctx.src = 'https://wxxcx.dcblink.com/upload/loveyou.mp3'
    adctx.onPlay(() => {
      console.log('开始播放')
      adctx.play()
    })
  }
})
