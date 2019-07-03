let state = 0;
let mouseClicks = 7;
let grams = [];
let marginGram = 16;

let timer = 0;
let interval = 100;

let lowerTri = 0;
let upperTri = 0;

let trigrams = ["Heaven", "Earth", "Thunder", "Water", "Mountain", "Wind", "Flame", "Lake"];
let hexagrams = [
					[1, 11, 34, 5, 26, 9, 14, 43],
					[12, 2, 16, 8, 23, 20, 35, 45], 
					[25, 24, 51, 3, 27, 42, 21, 17], 
					[6, 7, 40, 29, 4, 59, 64, 47], 
					[33, 15, 62, 39, 52, 53, 56, 31], 
					[44, 46, 32, 48, 18, 57, 50, 28], 
					[13, 36, 55, 63, 22, 37, 30, 49], 
					[10, 19, 54, 60, 41, 61, 38, 58] 
				];

let hexaNames = [
	"Force", "Field", "Sprouting", "Enveloping", "Attending", "Arguing", "Leading", "Grouping",
	"Small Harvest", "Treading", "Pervading", "Obstruction", "Concording People", "Great Possessing", "Humbling", "Providing-For",
	"Following", "Correcting", "Nearing", "Viewing", "Gnawing Bite", "Adorning", "Stripping", "Returning",
	"Innocence", "Great Accumulating", "Swallowing", "Great Exceeding", "Gorge", "Radiance", "Conjoining", "Perservering",
	"Retiring", "Great Invigorating", "Prospering", "Intelligence Hidden", "Dwelling People", "Polarising", "Limping", "Deliverance",
	"Diminishing", "Augmenting", "Displacement", "Coupling", "Clustering", "Ascending", "Confining", "Welling",
	"Skinning", "Holding", "Shake", "Bound", "Infiltrating", "Converting the Maiden", "Abounding", "Sojourning",
	"Ground", "Open", "Dispersing", "Articulating", "Inner Truth", "Small Exceeding", "Already Fording", "Before Completion"
	];

let silhouette;
let eyes;


function setup() {
	createCanvas(960, 520);
	let index = 0;
	grams[index++] = new Gram(index, 0, 0);
	grams[index++] = new Gram(index, 0, height/12*1);
	grams[index++] = new Gram(index, 0, height/12*2);
	grams[index++] = new Gram(index, 0, height/12*3);
	grams[index++] = new Gram(index, 0, height/12*4);
	grams[index++] = new Gram(index, 0, height/12*5);

	textSize(20);

}
/*
7	light line
8	dark line
6	dark trans
9	light trans
*/
function draw() {
	background(255);

	strokeWeight(1);
	line( (width/3)*1, 0, (width/3)*1, height);
	line( (width/3)*2, 0, (width/3)*2, height);

	switch(state) {
		case 0:
			if(mouseIsPressed && millis() - timer > interval && mouseClicks >= 0) {
				timer = millis();
		 		console.log(mouseClicks);
		 		mouseClicks--;
		 	}
			for (let i = 0; i < 6; i++) {
				grams[i].update();
				grams[i].draw();
			}
			if(mouseClicks == 0) {
				state = 1;
				if(		grams[0].darkLine == false 	&& grams[1].darkLine == false 	&& grams[2].darkLine == false) upperTri = 0;
				else if(grams[0].darkLine == true 	&& grams[1].darkLine == true 	&& grams[2].darkLine == true) upperTri = 1;
				else if(grams[0].darkLine == true 	&& grams[1].darkLine == true 	&& grams[2].darkLine == false) upperTri = 2;
				else if(grams[0].darkLine == true 	&& grams[1].darkLine == false 	&& grams[2].darkLine == true) upperTri = 3;
				else if(grams[0].darkLine == false 	&& grams[1].darkLine == true 	&& grams[2].darkLine == true) upperTri = 4;
				else if(grams[0].darkLine == false 	&& grams[1].darkLine == false 	&& grams[2].darkLine == true) upperTri = 5;
				else if(grams[0].darkLine == false 	&& grams[1].darkLine == true 	&& grams[2].darkLine == false) upperTri = 6;
				else if(grams[0].darkLine == true 	&& grams[1].darkLine == false 	&& grams[2].darkLine == false) upperTri = 7;

				if(		grams[3].darkLine == false 	&& grams[4].darkLine == false 	&& grams[5].darkLine == false) lowerTri = 0;
				else if(grams[3].darkLine == true 	&& grams[4].darkLine == true 	&& grams[5].darkLine == true) lowerTri = 1;
				else if(grams[3].darkLine == true 	&& grams[4].darkLine == true 	&& grams[5].darkLine == false) lowerTri = 2;
				else if(grams[3].darkLine == true 	&& grams[4].darkLine == false 	&& grams[5].darkLine == true) lowerTri = 3;
				else if(grams[3].darkLine == false 	&& grams[4].darkLine == true 	&& grams[5].darkLine == true) lowerTri = 4;
				else if(grams[3].darkLine == false 	&& grams[4].darkLine == false 	&& grams[5].darkLine == true) lowerTri = 5;
				else if(grams[3].darkLine == false 	&& grams[4].darkLine == true 	&& grams[5].darkLine == false) lowerTri = 6;
				else if(grams[3].darkLine == true 	&& grams[4].darkLine == false 	&& grams[5].darkLine == false) lowerTri = 7;
				silhouette = loadImage("assets/silhouette/"+ lowerTri +".jpeg");
				eyes = loadImage("assets/eyes/0.jpg");
			
			}
			
		break;

		case 1:
			for (let i = 0; i < 6; i++) {
				grams[i].draw();
			}
			text("Hexagram = " + hexagrams[lowerTri][upperTri] , 10, height-60);
			text("Lower Trigram = " + trigrams[lowerTri] +" ("+ lowerTri +")", 10, height-20);
			text("Upper Trigram = " + trigrams[upperTri] +" ("+ upperTri +")", 10, height-40);

			text(hexaNames[ (hexagrams[lowerTri][upperTri] -1)] , width/12*4+20, 40);
			textSize(10);
			text(hexaMeanings[ (hexagrams[lowerTri][upperTri] -1)] , width/12*4+20, 60, width/3-40, height);
			textSize(20);

			image(silhouette, width/3*2, 0, width/3, height);
			push();
			blendMode(MULTIPLY);

			image(eyes, width/3*2, this.random()*height);
			pop();
		break;
	}
	push();
	strokeWeight(2);
	noFill();
	rect(0,0,width,height);
	pop();
}

class Gram {
	constructor(id, posX, posY) {
		this.id = id;
		this.posX = posX;
		this.posY = posY;
		this.shuffled = false;
		this.random = 0;
		this.darkLine = false;
	}

	update() {
		if(mouseClicks == this.id && this.shuffled == false) {
			this.shuffled = true;
			this.random = Math.random(1)*10;
			if(this.random > 5) this.darkLine = true;
		}
		
	}

	draw() {
		push();
		noStroke();
		if(this.shuffled) {
			fill(0);
		} else fill(255);
		
		rect(this.posX+marginGram, this.posY+marginGram+(marginGram/1.5*this.id), (width/3)-(marginGram*2), (height/12));
		if(this.darkLine == true) {
			push();
			fill(255);
			
			rect( (width/12)*1.7 , this.posY+marginGram+(marginGram/1.5*this.id), (width/12)*0.5, (height/12));
			pop();
		}
		pop();
	}
}
