$(document).ready(function () {
  $("#change-color").change(function () {
    changeBackgroundColor();
  });

  $(".choose-sensor").change(function () { 
    let checkedSensors = getCheckedSensors();
    clearCanvas();
    renderImages(checkedSensors);
  })
});

function getCheckedSensors() {
  return $('.choose-sensor:checkbox:checked').map(function () {
    return this.value;
  }).get();
}

function clearCanvas() {
  var c = $('#myCanvas')[0];
  var ctx = c.getContext("2d");
  ctx.clearRect(0, 0, c.width, c.height);
}

function drawImage(params) {
  let { ImgURL, X, Y, ClipX, ClipY, ClipW, ClipH } = params
  let canvas = $('#myCanvas')[0];
  let ctx = canvas.getContext("2d");
  let imageObj = new Image();
  imageObj.onload = function () {
    ctx.drawImage(imageObj, ClipX, ClipY, ClipW, ClipH, X, Y, ClipW, ClipH);
  };
  imageObj.src = ImgURL;
}

async function renderImages(checkedSensors) {
  let imgArray = (await getDataFromServer(checkedSensors)).response;
  imgArray.forEach(element => drawImage(element))
}

async function getDataFromServer(checkedSensors) {
  let postData = { sensors: checkedSensors }
  let result;
  try {
    result = await $.ajax({
      method: "POST",
      url: 'get-images',
      data: postData,
      dataType: "json"
    })
    return result
  } catch (error) {
    console.log(error)
  }
}

function changeBackgroundColor() {
  let color = $('#change-color').val();
  $("#myCanvas").css("background-color", color);
}