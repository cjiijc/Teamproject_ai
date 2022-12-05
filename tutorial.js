// dogAssets2, foodAssets2, dogAssets3, foodAssets3, baitAssets, otherAssets, gameLevel

class Tutorial{
  constructor(gamefont, tutAssets1, tutAssets2, cardAssets, playerAssets, backgroundAssets){
		// size factor
		this.size = 0.75;
		// stage
		this.stage = 0;
		// font
		this.gamefont = gamefont;

		// image generator, answer
		this.imageGene; // [이미지, 정답 keyCode] 같이 저장
		this.shuffleImage; // array 섞기 
		this.onlyImage = []; // 이미지만 저장한 array
		this.imageGroup = []; // 한 화면에 보여주는 단위로 끊어서 저장 (이미지)
		this.answerOrder = []; // 정답만 전체 순서대로 저장
	    this.answerGroup = []; // 한 화면에 보여주는 단위로 끊어서 저장 (정답)
	    this.judgeText = []; 
		this.judgeCount = 0;

		// how many image 
		this.imageNum = 4; // (* gameLevel) // 한 화면에 보이는 이미지 개수
		this.imageRepeat = 2; // 몇 번 반복할 것인가
		this.imageMany = this.imageNum * this.imageRepeat; // 총 이미지 개수

		// image pos
		this.imageXpos = [];
		this.imageYpos = height/2;

		// graphic assets (번호순서대로 빵, 머핀, 치킨, 미끼, 나머지 이미지)
		this.tut1 = tutAssets1;
		this.tut2 = tutAssets2;
		// this.baitImage = baitAssets;
		// this.otherImage = otherAssets;
		    //TODO 콘솔창 일러스트 
        //board(key input값 나타나는 콘솔창), 콘솔 일러스트로 할거면 asset 추가해야함
        this.boardWidth = 410; //콘솔창의 가로길이

        //timer
        this.timer = this.boardWidth;   //timer 값은 로딩바의 길이와 같아야하고, 로딩바의 길이가 board의 가로길이와 동일해야함
        this.timeover = false;

        //font
        this.gamefont = gamefont;

        //title   dog or food? title image가 들어있는 array, [0]=정상, [1]=방해요소 때 나오는 뒤집어진 title
        this.title=titleAssets;
        this.background = backgroundAssets;

        //character image
        this.player = new Player(playerAssets); //playerAssets=player+개발자의 image가 담긴 array
        this.player.playerBasic();

        //TODO 카드 asset..키 하나씩 입력할때마다 바꿔주는거 구현해야
        //card image, cardAssets(list) [0]:normal mode(초록)카드, [1]: 키 눌렸을때 카드, [2]:fevermode 카드
        this.cards = cardAssets;
        this.cardsize = 80;
        this.cardX4 = width/6+50;   //어차피 image x,y 좌표와도 동일, 카드 4개 나올때 첫카드의 위치
        this.cardY4 = height/2-90;
        this.cardX6 = 80;     //image  6개일때 y좌표는 4개일때와 동일

		// this.cards = cardAssets;
        // this.cardsize = 80;
        // this.cardX4 = width/6+50;   //어차피 image x,y 좌표와도 동일, 카드 4개 나올때 첫카드의 위치
        // this.cardY4 = height/2-90;
        // this.cardX6 = 80;  

        this.cardIndex = [0, 0, 0, 0, 0, 0];

		this.score = 0;
		this.feedback = [];
		this.isEnter = false;
	}

	initClassVar() {
		// image generator, answer
		this.imageGene; // [이미지, 정답 keyCode] 같이 저장
		this.shuffleImage; // array 섞기 
		this.onlyImage = []; // 이미지만 저장한 array
		this.imageGroup = []; // 한 화면에 보여주는 단위로 끊어서 저장 (이미지)
		this.answerOrder = []; // 정답만 전체 순서대로 저장
	    this.answerGroup = []; // 한 화면에 보여주는 단위로 끊어서 저장 (정답)
	    this.judgeText = []; 
		this.judgeCount = 0;
    }

	getImageNum(){
		return this.imageNum;
	}

	getStage(){
		return this.stage;
	}

	getEnd(){
		return this.end;
	}

	getScore(){
		return this.score;
	}


	getAnswerGroup(repeatNum){
		return this.answerGroup[repeatNum];
	}
	
	getJudgetext(repeatNum){
		return this.judgeText[repeatNum];
	}

	resetJudgeText(){
		this.judgeText = [];
	}



	generateImage2(){
		this.imageGene = this.tut1.concat(this.tut2);
		this.shuffleImage = shuffle(this.imageGene);

		for (let i = 0; i < this.imageMany; i++){
			this.onlyImage.push(this.shuffleImage[i][0]);
			this.answerOrder.push(this.shuffleImage[i][1]);
		}

		//generateImageGroup
		for(let i=0; i<this.onlyImage.length; i+=this.imageNum) this.imageGroup.push(this.onlyImage.slice(i, i+this.imageNum))

		//generateAnswerGroup
		for(let i=0; i<this.answerOrder.length; i+=this.imageNum) this.answerGroup.push(this.answerOrder.slice(i, i+this.imageNum))
	}




	// judge user input
	judgeInput(keyOrders, repeatNum){
	
		// correct
		if (this.answerGroup[repeatNum].join('') == keyOrders){
			this.judgeText.push('correct');
		}
		// wrong
		else { 
			this.judgeText.push('wrong');
		}
		}

	nextStage(){
		this.stage ++;
	}
	
	loopStage(){
		this.stage = 0;
	}

	endStage(){
		this.stage = 3;
	}

	endTutorial(){
		this.end = true;
	}


	//display
	displayImage(repeatNum){
		// image(this.imageGroup[repeatNum][0], width/6+50, height/2-40, 80, 80);
		// image(this.imageGroup[repeatNum][1], width/6+80+50, height/2-40, 80, 80);
		// image(this.imageGroup[repeatNum][2], width/6+160+50, height/2-40, 80, 80);
		// image(this.imageGroup[repeatNum][3], width/6+240+50, height/2-40, 80, 80);

		image(this.imageGroup[repeatNum][0], this.cardX4, this.cardY4, this.cardsize, this.cardsize);
        image(this.imageGroup[repeatNum][1], this.cardX4 + this.cardsize, this.cardY4, this.cardsize, this.cardsize);
        image(this.imageGroup[repeatNum][2], this.cardX4 + this.cardsize * 2, this.cardY4, this.cardsize, this.cardsize);
        image(this.imageGroup[repeatNum][3], this.cardX4 + this.cardsize * 3, this.cardY4, this.cardsize, this.cardsize);

	}

	displayCard(){
        image(this.cards[this.cardIndex[0]], this.cardX4, this.cardY4, this.cardsize, this.cardsize);
        image(this.cards[this.cardIndex[1]], this.cardX4 + this.cardsize, this.cardY4, this.cardsize, this.cardsize);
        image(this.cards[this.cardIndex[2]], this.cardX4 + this.cardsize * 2, this.cardY4, this.cardsize, this.cardsize);
        image(this.cards[this.cardIndex[3]], this.cardX4 + this.cardsize * 3, this.cardY4, this.cardsize, this.cardsize);
        }

	flipCard(keyOrdersLength){
		this.cardIndex[keyOrdersLength-1] = 1;
		}
	clearFeedback(){
		this.feedback = [];
		}
		
	resetCard(){
		this.cardIndex = [0, 0, 0, 0, 0, 0];
		}

	// displayKey(){
	// 	fill(125, 100);
	// 	rect(width/6+50, height/2-40, 80, 80);
	// 	rect(width/6+80+50, height/2-40, 80, 80);
	// 	rect(width/6+160+50, height/2-40, 80, 80);
	// 	rect(width/6+240+50, height/2-40, 80, 80);
	// }


	makeFeedback(keyCode){
            if (keyCode == 68){this.feedback.push('DOG')}
            else if (keyCode == 70){this.feedback.push('FOOD')}
            else if (keyCode == 32){this.feedback.push('SKIP')}
            else {this.feedback.push('Error')}
    }

    displayFeedback(){
        if (this.isEnter){ // enter키 입력받기
            textSize(20);
            // textAlign(CENTER);
            textFont(this.gamefont);
            fill('#2EA7E0');
            text('ENTER TO SUBMIT', width/2 + 65, height - 40);
            }
            
        let strFeed = this.feedback.join(', ')
        if (this.feedback.length != 0) {
            textSize(20);
            textAlign(CENTER);
        	textFont(this.gamefont);
            fill(0);
            text(strFeed, width/2 + 65, height - 70);
            }
       
    }

    clearFeedback(){
        this.feedback = [];
    }

	displayPlayer() {
        this.player.display();
    }

	displayResult(pastRepeatNum){
      	fill('#E61673');
      	textSize(30);
      	text(this.judgeText[pastRepeatNum], width/2, height/2+80);
		// text(this.score, width/2, height-50);
		// if (repeatNum == this.imageRepeat) {
		// 	repeatNum = 0;
		// 	this.endStage();
		// } 
	}

    //spd = 1.4 -> 5초 spd=1.8->4초, spd=2.8->3초, spd=3.4->2초
    //spd 커질수록 초는 작아짐
    //lev1=3sec, lev2=2sec, lev3=2sec, lev4=4sec, lev5=3sec, lev6=3sec
    playTimer() {
        let timerspd = 2.3
        this.timer -= timerspd;
        if (this.timer < 0) { //입력 다 못해서 timeover 된 경우+이미지 보여주면서 시간 초과될 때
            this.timer = 410;
        }
    }


	displayTimer() {
            textSize(10);
            textAlign(CENTER);
            textFont(tutorial.gamefont);
            fill(255);
            text('LOADING', width/2, height - 230);
            fill(255);
            stroke(255);
            fill(255, 10);
            rectMode(CORNER);
            rect(110, height - 220, this.boardWidth, 3, 10);  //fixed bg bar
            fill(255);
            rect(110, height - 220, this.boardWidth - this.timer, 3, 10);  // timer 속도만큼 move할텐데 속도 한번 봐야함
            this.playTimer();
        }

	displayEnter(){ // enter 텍스트 보여줄지 말지 결정
		this.isEnter = !this.isEnter;
		}

	displayEndTut(){
		background(0);
		textFont(this.gamefont);
		fill(255);
		// textAlign(CENTER);
		textSize(30);
		text('PRESS MOUSE TO START', width/2, height/2);
	}

}