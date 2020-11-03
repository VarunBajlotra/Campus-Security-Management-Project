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
    $('#submitphoto').click(()=>{
        console.log('Submit Clicked')
        const XHR = new XMLHttpRequest();
        FD  = new FormData();


        XHR.addEventListener( 'load', function(event) {
            // alert( 'Yeah! Data sent and response loaded.' );
        });
        
        XHR.addEventListener( 'error', function(event) {
            alert( 'Oops! Something went wrong.' );
        });
        
        XHR.open( 'POST', '/student/enterhostel' );
        XHR.responseType = 'blob'
        
        XHR.setRequestHeader( 'Content-Type', 'multipart/form-data' );

        var context = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;
        context.drawImage(photo, 0, 0, width, height);
        var blob = new Blob(['abc123'], {type: 'text/plain'});
        // canvas.toBlob((blob)=>{
        //     console.log(blob)
        //     // temp=blob
        //     $.post('/student/enterhostel',{
        //         msg:"helooooooooo",
        //         blob:blob
        //     })
        //     // FD.append('msg','Message')
        //     // XHR.send(FD)
        //     // XHR.send(blob)
        //     // XHR.send({
        //     //     msg:"Message",
        //     //     blob:blob
        //     // })
        // })
        // console.log(blob)
        // XHR.send(blob)
        // console.log('Hello')
        // console.log(temp)
        // console.log(photo.src)
        $.post('/student/enterhostel',{
            url:photo.src,
            msg:'Message'
        },(res)=>{
            console.log(res)
            if(res=='male'){
                alert("You are identified as a male! You can't enter the girls' hostel!!")
            }
            else if(res=='female'){
                $.get('/student/hostelsuccess',(res)=>{
                    console.log(res)
                })
                // alert("You are identified as a female. You can enter the girls' hostel.")
            }
        })
    })
    window.addEventListener('load', startup, false);
})();

