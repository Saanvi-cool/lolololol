leftwrist_x = "";
rightWrist_x = "";
leftwrist_y = "";
rightWrist_y = "";
leftWrist_score = "";
rightWrist_score = "";

function preload() {
    song = loadSound(music.mp3);
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    webcam = createCapture(VIDEO);
    webcam.size(600, 500);
    webcam.hide();
    poseNet = ml5.poseNet(webcam);
    poseNet.on('pose', gotResults);
}

function draw() {
    image(webcam, 0, 0, 600, 500);
    stroke("red");
    fill("red");
    circle(leftwrist_x, leftwrist_y, 20);
    circle(rightWrist_x, rightWrist_y, 20);

    if (leftWrist_score >= 0.1) {
        leftWrist_y_number = Number(leftwrist_y);
        remove_value = floor(leftWrist_y_number);
        volume = (remove_value / 500).toFixed(1);
        song.setVolume(volume);

    }
    if (rightWrist_score >= 0.1) {
        if (rightWrist_y > 0 && rightWrist_y <= 100) {
            song.rate(0.5);
        } else if (rightWrist_y > 100 && rightWrist_y <= 200) {

            song.rate(1);
        } else if (rightWrist_y > 200 && rightWrist_y <= 300) {

            song.rate(1.5);
        } else if (rightWrist_y > 300 && rightWrist_y <= 400) {

            song.rate(2);
        } else if (rightWrist_y > 400 && rightWrist_y <= 500) {

            song.rate(2.5);
        }
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);

}

function gotResults(pose_array) {
    if (pose_array.length > 0) {
        console.log(pose_array);
        leftwrist_x = pose_array[0].pose.leftWrist.x;
        leftwrist_y = pose_array[0].pose.leftWrist.y;
        rightWrist_x = pose_array[0].pose.rightWrist.x;
        rightWrist_y = pose_array[0].pose.rightWrist.y;
        leftWrist_score = pose_array[0].pose.keypoints[9].score;
        rightWrist_score = pose_array[0].pose.keypoints[10].score;

    }

}