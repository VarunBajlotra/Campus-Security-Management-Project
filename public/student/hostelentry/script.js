(function() {

    var width = 320;
    var height = 0;

    var streaming = false;

    var video = null;
    var canvas = null;
    var photo = null;
    var startbutton = null;

    function startup() {
        video = document.getElementById('video');
        canvas = document.getElementById('canvas');
        photo = document.getElementById('photo');
        startbutton = document.getElementById('startbutton');

        navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false
            })
            .then(function(stream) {
                video.srcObject = stream;
                video.play();
            })
            .catch(function(err) {
                console.log("An error occurred: " + err);
            });

        video.addEventListener('canplay', function(ev) {
            if (!streaming) {
                height = video.videoHeight / (video.videoWidth / width);

                if (isNaN(height)) {
                    height = width / (4 / 3);
                }

                video.setAttribute('width', width);
                video.setAttribute('height', height);
                canvas.setAttribute('width', width);
                canvas.setAttribute('height', height);
                streaming = true;
            }
        }, false);

        startbutton.addEventListener('click', function(ev) {
            takepicture();
            ev.preventDefault();
        }, false);

        clearphoto();
    }


    function clearphoto() {
        var context = canvas.getContext('2d');
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, canvas.width, canvas.height);

        var data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
    }

    function takepicture() {
        var context = canvas.getContext('2d');
        if (width && height) {
            canvas.width = width;
            canvas.height = height;
            context.drawImage(video, 0, 0, width, height);

            var data = canvas.toDataURL('image/png');
            photo.setAttribute('src', data);
        } else {
            clearphoto();
        }
    }

    function downloadImage(url) {
        var xhr = new XMLHttpRequest()
        xhr.open('GET',url, true)
        xhr.responseType = 'blob'
        xhr.onload = function() {
          var urlCreator = window.URL || window.webkitURL
          var imageUrl = urlCreator.createObjectURL(this.response)
          var tag = document.createElement('a')
          tag.href = imageUrl
          tag.target = '_blank'
          tag.download = 'entryphoto.jpg'
          document.body.appendChild(tag)
          tag.click()
          document.body.removeChild(tag)
        }
        xhr.onerror = err => {
          alert('Failed to download picture');
        }
        xhr.send()
    }

    $('#submitphoto').click(()=>{
        console.log('Submit Clicked')
        downloadImage(photo.src)
        setTimeout(()=>{
            $.get('/student/verifyentry',(res)=>{
                console.log(res)
                if(res=='male'){
                    alert("You are identified as a male! You can't enter the girls' hostel!!")
                }
                else if(res=='female'){
                    alert("You are identified as a female. You can enter the girls' hostel.")
                    document.location.href='/student/hostelsuccess'
                }
            })
        },1000)
    })
    window.addEventListener('load', startup, false);
})();

