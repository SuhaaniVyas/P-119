answer_holder= "";
drawn_sketch = "";
score = 0;
timer = 0;
timer_check= "";
draw= ['pencil', 'bed', 'dog'];
random_no = Math.floor((Math.random()*draw.length)+1);
console.log(draw[random_no]);
sketch = draw[random_no]; 
document.getElementById("drawing").innerHTML= "What is to be drawn: " + sketch;

function update_canvas() {
    background("white");
random_no = Math.floor((Math.random()*draw.length)+1);
console.log(draw[random_no]);
sketch = draw[random_no]; 
document.getElementById("drawing").innerHTML= "What is to be drawn: " + sketch;
}
function preload() {
    classifier = ml5.imageClassifier('DoodleNet');
}

function setup() {
    canvas = createCanvas(280, 280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
}
function draw() {
    strokeWeight(13);
    stroke(0);
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
    check_sketch()
    if (drawn_sketch == sketch) {
        answer_holder = "set" ;
        score++;
        document.getElementById("score").innerHTML= "Score: " + score ;
    
    }
    
}

function classifyCanvas() {
    classifier.classify(canvas, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results);
    drawn_sketch = results[0].label;
    document.getElementById('label').innerHTML= 'Label: ' + drawn_sketch;
    document.getElementById('confidence').innerHTML = 'Confidence: ' + Math.round(results[0].confidence *100) + '%';
}
function check_sketch() {
    timer++;
    document.getElementById("timer").innerHTML = "Timer: " + timer;
    console.log(timer);
    if (timer < 400) {
        timer = 0;
        timer_check = "completed";
    }
    if (timer == "completed" || answer_holder == "set") {
    timer_check = "";
    answer_holder= "";
    update_canvas();
    }
}
function clearCanvas() {
    background("white");
}

