


const styleA = document.getElementById('styleA'); // The div contrianer that holds new style image A
const styleB = document.getElementById('styleB'); // The div contrianer that holds new style image B
var img;
var wave;
var transfer1,transfer2;
var style_1;
var style_2;
var undine;
var img2;
var drop;
var clear;

function preload(){
	img = createImg('style1.jpg').hide();
	wave = loadImage('img/wave.jpg')
	undine= loadImage('img/udnie.jpg')

}

function setup(){
var c = createCanvas(displayWidth,displayHeight*1.2);
background(255,10)

clear= createButton("clear");
clear.size(150,50);
clear.position(width*0.8,450);
clear.style('border-radius','20px')
clear.style('font-size','20px')
clear.style('color','rgb(217,179,16)')
clear.style('background-color','rgb(0,0,155)')
clear.style('border-color','rgb(217,179,15)')
clear.mousePressed(restart);
clear.mouseOver(highlight);
clear.mouseOut(leave);


c.dragOver(input_file);
c.dragLeave(output_file);
c.drop(gotFile,output_file);

style_1 = select('#styleA');
style_2 = select('#styleB');
style_1.position(50,100)
style_2.position(width/2-125,100)

}
function highlight(){
clear.style('border-width','3px');
}
function leave(){
clear.style('border-width','1px');
}

function restart(){
img2.remove();
// styleB.replace(transfer2,img2)
styleB.removeChild(transfer2);
 styleA.removeChild(transfer1);
	

}
function input_file(){console.log("file coming")}
function output_file(){console.log("canceled")}


function gotFile(file){

img2 = createImg(file.data);
img2.size(250,250);
img2.position(width*0.75,150);

ml5.styleTransfer('models/wave')
  .then(style1 => style1.transfer(img2))
  .then(result => {
     transfer1 = new Image(250, 250);
    transfer1.src = result.src;

    styleA.appendChild(transfer1);
  transfer1.position = (100,100);

  });
//
ml5.styleTransfer('models/udnie')
  .then(style2 => style2.transfer(img2))
  .then(result => {
     transfer2 = new Image(250, 250);
    transfer2.src = result.src;
    styleB.appendChild(transfer2);
  //  statusMsg.innerHTML = 'Done!';
  });


}

function draw(){
textSize(20);fill(217,179,216);noStroke();

image(wave,50,450,250,250);
image(undine,width/2-125,450,250,250)

text("The Great Wave off Kanagawa \n 1829 - Katsushika Hokusai",50,70);
text("Udnie (Young American Girl, The Dance)\n 1913 - Francis Picabia",width/2-125,70);
text(" drop an image\n to change style",width*0.79,270)
noFill();stroke(17,80,200);strokeWeight(2);
rect(width*0.75-10,135,270,270);
rect(width*0.5-135,135,270,270);
rect(40,135,270,270);
}
