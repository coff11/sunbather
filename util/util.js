
export const errToast = (txt) => {
  wx.showToast({
    title: txt,
    icon: "none",
    duration: 2000
  })
}
