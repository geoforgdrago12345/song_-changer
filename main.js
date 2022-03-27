song = "";
song2 = "";
status = "";
status2 = "";
leftwristY = 0;
leftwristX =0
rightWristY =0;
rightWristX =0
score_leftwrist = 0;
score_rightwrist = 0;

function preload() {
    song = loadSound("music.mp3");
    song2 = loadSound("music2.mp3")
}
function setup() {
    canvas = createCanvas(450, 450);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);

}
function draw() {
    image(video, 0, 0, 450, 450);
    status = song.isPlaying();
    status2 = song2.isPlaying();
    if (score_leftwrist > 0.2) {
        fill("red");
        stroke("black");
        circle(leftwristX, leftwristY, 20);
        song.stop();
        if (status2 == false) {
            song2.play();
            song2.setVolume(1);
            document.getElementById("song").innerHTML = "song = slow trap";
        }
    }

    if (score_rightwrist > 0.2) {
        fill("black");
        stroke("red");
        circle(rightWristX, rightWristY, 20);
        song2.stop();
        if (status2 == false) {
            song.play();
            song.setVolume(1);
            document.getElementById("song").innerHTML = "song = harry poter";
        }
    }
        
       
}


function modelLoaded() {
    console.log("posenet is inshized");
}
function Play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function gotPoses(results) {
    console.log(results);
    if (results.length > 0) {
        console.log(results.length);
        leftwristX = results[0].pose.leftWrist.x;
        leftwristY = results[0].pose.leftWrist.y;
        console.log("leftWristX", +leftwristX);
        console.log("leftWristY", +leftwristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWist.Y", +rightWristY);
        console.log("rightWrist.X", +rightWristX);
        score_leftwrist = results[0].pose.keypoints[9].score;
        score_rightwrist = results[0].pose.keypoints[10].score;
        console.log("score leftWrist", +score_leftwrist);
    }
}