class AppClass {
  clearCanvas() {
    let c = $('#myCanvas')[0];
    let ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
  }

  async renderImages() {
    let checkedSensors = this.getCheckedSensors();
    let imgArray = (await this.getDataFromServer(checkedSensors)).response;
    imgArray.forEach(element => this.drawImage(element));
  }

  getCheckedSensors() {
    return $('.choose-sensor:checkbox:checked').map(function () {
      return this.value;
    }).get();
  }

  async getDataFromServer(checkedSensors) {
    let postData = { sensors: checkedSensors };
    let result;
    try {
      result = await $.ajax({
        method: "POST",
        url: 'get-images',
        data: postData,
        dataType: "json"
      })
      return result;
    } catch (error) {
      console.log(error)
    }
  }

  drawImage(params) {
    let { ImgURL, X, Y, ClipX, ClipY, ClipW, ClipH } = params;
    let canvas = $('#myCanvas')[0];
    let ctx = canvas.getContext("2d");
    let imageObj = new Image();
    imageObj.onload = function () {
      ctx.drawImage(imageObj, ClipX, ClipY, ClipW, ClipH, X, Y, ClipW, ClipH);
    };
    imageObj.src = ImgURL;
  }

  changeBackgroundColor() {
    let color = $('#change-color').val();
    $("#myCanvas").css("background-color", color);
  }
}

let app = new AppClass();

//--------EVENTS
$(".choose-sensor").change(function () {
  app.clearCanvas();
  app.renderImages();
})

$( "#change-color" ).keyup(function() {
  app.changeBackgroundColor();
});