const canvas = document.getElementById('imageCnv'),
      fileForm = document.getElementById('file-form'),
      uploadBtn = document.getElementById('upload'),
      ctx = canvas.getContext("2d"),
      ranges = document.querySelectorAll('input[type=range]'),
      spans = document.querySelectorAll('.span'),
      cols = document.querySelectorAll('.col'),
      resetBtn = document.getElementById('reset-btn'),
      downloadBtn = document.getElementById('download-btn');

let img = new Image();
let fileName = '';
    
uploadBtn.addEventListener('change', (e) => {
    const file = document.getElementById('upload').files[0];

    const reader = new FileReader();
    if (file) {
        fileName = file.name;
        reader.readAsDataURL(file);
    }

    reader.addEventListener('load', () => {
        img = new Image();
        img.src = reader.result;
        img.onload = function () {
            canvas.width = img.width;   
            canvas.height = img.height;   
            ctx.drawImage(img, 0, 0, img.width, img.height);
            canvas.removeAttribute('data-caman-id');
        }
    }, false);
    uploadBtn.value = '';
    ranges.forEach(range => {
        range.value = 0;
    })
    spans.forEach(span => {
        span.innerHTML = 0;
    })
})

ranges.forEach(range => {
    
    range.addEventListener('change', (x) => {
        const noiseVal = document.getElementById('noise').value,
              brightnessValue = document.getElementById('brightness').value,
              saturationValue = document.getElementById('saturation').value,
              vibranceValue = document.getElementById('vibrance').value,
              hueValue = document.getElementById('hue').value,
              sepiaValue = document.getElementById('sepia').value;

        x.path[3].children[0].children[0].innerHTML = x.target.value;
              

        Caman('#imageCnv', img, function() {
            this.revert(false);
            this.noise(noiseVal).brightness(brightnessValue).saturation(saturationValue).vibrance(vibranceValue).hue(hueValue).sepia(sepiaValue).render();
            });
    });
})

cols.forEach(col => {
    col.addEventListener('click', (c) => {
        if (c.srcElement.id === 'love'){
            Caman('#imageCnv', img, function() {
                this.love().render();
              });
        } else if (c.srcElement.id === 'orange-peel') {
            Caman('#imageCnv', img, function() {
                this.orangePeel().render();
              });
        } else if (c.srcElement.id === 'old-paper') {
            Caman('#imageCnv', img, function() {
                this.pinhole();
                this.noise(10);
                this.orangePeel();
                this.render();
              });
        } else if (c.srcElement.id === 'lomo') {
            Caman('#imageCnv', img, function() {
                this.lomo().render();
              });
        } else if (c.srcElement.id === 'sun-rise') {
            Caman('#imageCnv', img, function() {
                this.sunrise().render();
              });
        } else if (c.srcElement.id === 'purple') {
            Caman('#imageCnv', img, function() {
                this.newLayer(function () {
                    return this.setBlendingMode('overlay').opacity(60).fillColor('#512da8').render();
                  });
              });
        }
    })
});

resetBtn.addEventListener('click', () => {
    ranges.forEach(range => {
        range.value = 0;
    })
    spans.forEach(span => {
        span.innerHTML = 0;
    })
    Caman('#imageCnv', img, function() {
        this.revert(false);
        this.render();
      });
})


downloadBtn.addEventListener("click", () => {
    const fileExtension = fileName.slice(-4);
  
    let newFilename;
  
    if (fileExtension === ".jpg" || fileExtension === ".png") {
      
        newFilename = fileName.substring(0, fileName.length - 4) + "-edited-image.jpg";   
    }
  
    download(canvas, newFilename);
  });
  
  function download(canvas, filename) {
    // Init event
    if(filename != undefined){

        let e;
        
        const link = document.createElement("a");
        
        
        link.download = filename;
        link.href = canvas.toDataURL("image/jpeg", 0.8);
        
        e = new MouseEvent("click");
        
        link.dispatchEvent(e);
    }
  }