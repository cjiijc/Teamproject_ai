// scene
let currentScene = 'First'; // 확인용으로 튜토리얼은 스킵하고 진행

//Scene
let tutorial;

// game controller
let mainstage;
let gameScore;
let difficulty = 70000/3;

// immages
let tutAssets1 = [];
let tutAssets2 = [];
let dogAssets1 = [];
let foodAssets1 = [];
let dogAssets2 = [];
let foodAssets2 = [];
let dogAssets3 = [];
let foodAssets3 = [];
let baitAssets = [];
let playerAssets = [];
let lifeAssets = [];
let cardAssets = [];
let titleAssets = [];
let backgroundAssets = [];
let suddenAssets = [];
let ruleAssets = [];
let suddenPage = 0;
let rulePage = 0;


let otherAssets = {};

// font
let gamefont;

// song
let soundEffects = {};

// toons
let introToonImgs = [];
let endingAImgs = [];
let endingBImgs = [];
let endingCImgs = [];
let endingFImgs = [];
let rankImgs = [];
let introToon;
let endToon;

// gameplay time
let _TTime;

// scene transition
let blackOpacity = 0;
let inTransition = false;

//tutorial key 
let tutKeyOrders = [];
let tutKeyCount = 0;
let tutrepeatNum = 0;
let pastTutrepeatNum = 0;

//mainstage key
let keyOrders = [];
let keyCount = 0;
let repeatNum = 0;
let pasetRepeatNum;
let feedback = [];
let fKeyOrders = [];

//timer
let tutorTimer1;
let tutorTimer2;
let mainTimer1;
let mainTimer2;
let suddenTimer;
let feverTime = 3;

let tutorialScore = 0;
let suddenRep = 0;
let finalScore;


function preload(){
  // load images (이미지와 정답 keycode 함께 저장)
  for (let i = 0; i < 6; i++){
    tutAssets1.push([loadImage('./assets/tutor/dog/dog' + i + '.png'), 68])
  }
  for (let i = 0; i < 6; i++){
    tutAssets2.push([loadImage('./assets/tutor/bagel/bagel' + i + '.png'), 70])
  }
  //베이글
  for (let i = 0; i < 8; i++){
    dogAssets1.push([loadImage('./assets/bageldog/dog' + i + '.png'), 68])
  }
  for (let i = 0; i < 8; i++){
    foodAssets1.push([loadImage('./assets/dogbagel/bagel' + i + '.png'), 70])
  }
  //머핀
  for (let i = 0; i < 8; i++){
    dogAssets2.push([loadImage('./assets/muffindog/dog' + i + '.png'), 68])
  }
  for (let i = 0; i < 8; i++){
    foodAssets2.push([loadImage('./assets/dogmuffin/muffin' + i + '.png'), 70])
  }
  //뒤집어진 머핀 
  for (let i = 0; i < 8; i++){
    dogAssets3.push([loadImage('./assets/rev/revdog/dog' + i + '.png'), 68])
  }
  for (let i = 0; i < 8; i++){
    foodAssets3.push([loadImage('./assets/rev/revmuffin/muffin' + i + '.png'), 70])
  }
  // //미끼이미지
  for (let i = 0; i < 8; i++){
    baitAssets.push(loadImage('./assets/bait/bait' + i + '.png'))
  }
  // 
  for (let i = 0; i < 5; i++){
    suddenAssets.push(loadImage('./assets/sudden/sudden' + i + '.png'))
  }
  // // load font
  gamefont = loadFont('./assets/a으라차차.otf');
  // load title
  titleAssets.push(loadImage('./assets/ui/title0.png'));
  titleAssets.push(loadImage('./assets/ui/title1.png'));
  titleAssets.push(loadImage('./assets/ui/title2.png'));
  // playerAssets
  for (let i = 0; i < 6; i++){
    playerAssets.push(loadImage('./assets/ui/robot' + i + '.png'))
  }
  //life assets
  for (let i = 1; i < 5; i++){
    lifeAssets.push(loadImage('./assets/ui/battery' + i + '.png'))
  }
  //backgroundAssets 
  for (let i = 0; i < 5; i++){
    backgroundAssets.push(loadImage('./assets/background/bg' + i + '.png'))
  }

  // card 이미지 가리개
  for (let i = 0; i < 3; i++){
    cardAssets.push(loadImage('./assets/card/card' + i + '.png'))
  }

  // 룰 설명 이미지
  for (let i = 1; i < 4; i++){
    ruleAssets.push(loadImage('./assets/rule/rule' + i + '.png'))
  }

  // load audio
  let alarms = [];
  alarms.push(loadSound('./assets/sound/alarm.mp3'));
  alarms.push(loadSound('./assets/sound/bluescreen.mp3'));

  let keys = []; 
  for(let i = 0; i < 6; i++){
    keys.push(loadSound('./assets/sound/hit' + i + '.mp3'));
  }
  let fkeys = [];
  for(let i = 0; i < 6; i++){
    fkeys.push(loadSound('./assets/sound/fhit' + i + '.mp3'));
  }

  let judgeSound = [];
  judgeSound.push(loadSound('./assets/sound/result0.mp3')); //correct
  judgeSound.push(loadSound('./assets/sound/result1.mp3')); //wrong
  let feverJudge = [];
  feverJudge.push(loadSound('./assets/sound/fresult0.mp3')); //correct
  feverJudge.push(loadSound('./assets/sound/fresult1.mp3')); //wrong

  let otherKeys = [];
  otherKeys.push(loadSound('./assets/sound/click.mp3'));
  otherKeys.push(loadSound('./assets/sound/enter.mp3'));

  soundEffects['alarms'] = alarms;
  soundEffects['keys'] = keys;
  soundEffects['fkeys'] = fkeys;
  soundEffects['judgeSound'] = judgeSound;
  soundEffects['feverJudge'] = feverJudge;
  soundEffects['otherKeys'] = otherKeys;
  soundEffects['bgm'] = loadSound('./assets/sound/BGM.mp3');
  soundEffects['introBGM'] = loadSound('./assets/sound/introBGM.mp3');
  soundEffects['fail'] = loadSound('./assets/sound/Fail.mp3');


  //load toons
  for(let i = 1; i <= 7; i++){
    introToonImgs.push(loadImage('./assets/toon/intro/intro' + i + '.png'));
  }
//   for(let i = 1; i <= 8; i++){
//     endToonAImgs.push(loadImage('./assets/toon/A/a' + i + '.png'));
//   }
//   for(let i = 1; i <= 11; i++){
//     endToonBImgs.push(loadImage('./assets/toon/B/b' + i + '.png'));
//   }
//   for(let i = 1; i <= 7; i++){
//     endToonCImgs.push(loadImage('./assets/toon/C/c' + i + '.png'));
//   }
//   for(let i = 1; i <= 10; i++){
//     endToonFImgs.push(loadImage('./assets/toon/F/f' + i + '.png'));
//   }
//   for(let i = 1; i <= 4; i++){
//     rankImgs.push(loadImage('./assets/graphic/rank' + i + '.jpg'));
//   }
}

function setup() {
  createCanvas(640, 480);
  introToon = new Toon(gamefont, introToonImgs, soundEffects);
  mainstage = new MainStage(gamefont, dogAssets1, foodAssets1, dogAssets2, foodAssets2, dogAssets3, foodAssets3, baitAssets, playerAssets, lifeAssets, cardAssets, titleAssets, backgroundAssets, suddenAssets, soundEffects);
  mainstage.generateImage2();

  // introToon = new Toon(gamefont, rankImgs);
  // introToon.setToon(introToonImgs, rankImgs[0], -999, 'INTRO');
  // endToon = new Toon(gamefont, rankImgs);
}

function keyPressed() {
  mainstage.stopAllSounds();

  switch(currentScene){
    case 'First':
      onTransition();
      break;
    case 'Rule':
        if (rulePage < 1) {
          rulePage ++;
        } else if (rulePage == 1){
          changeScene();
        }
        break;
    case 'START_game':
      if(keyCode == 80){
        onTransition();
      } else if (keyCode == 77){
        currentScene = 'End_tut';
      }
      break;
    case 'TUTORIAL2':
      if (keyCode != 27){
      tutKeyCount += 1;
        if (tutKeyOrders.length < 4){tutorial.makeFeedback(keyCode)}
      tutKeyOrders.push(keyCode);
      tutorial.flipCard(tutKeyOrders.length);
        if (tutKeyOrders.length % 4 == 0) {
        tutorial.judgeInput(tutKeyOrders.join(''), repeatNum); 
        tutorial.displayEnter();
        } else if ((tutKeyOrders.length > 2) && (tutKeyOrders.length % 2 >= 1) && (keyCode == 13)){
        pastTutrepeatNum = tutrepeatNum;
        tutrepeatNum += 1;
        tutKeyOrders = [];
        tutorial.resetCard();
        if (tutrepeatNum == 2) {
          tutrepeatNum = 0;
          currentScene = 'End_tut';
          tutorial.clearFeedback();
          tutorial.resetJudgeText();
        } else { // 같은 레벨 안에서 반복
          currentScene = 'START_T';
          tutorial.clearFeedback();
          tutorial.resetJudgeText();
        }
        tutorial.displayEnter();
        break; 
      }
    }
    case 'End_tut':
      onTransition();
      break;
  }


 
  // // 튜토리얼
  // if((currentScene == 'TUTORIAL2') && (keyCode != 27)){
  //   tutKeyCount += 1;
  //   tutorial.makeFeedback(keyCode);
  //   tutKeyOrders.push(keyCode);
  //   tutorial.flipCard(tutKeyOrders.length);
  //   if (tutKeyOrders.length % 4 == 0) {
  //     tutorial.judgeInput(tutKeyOrders.join(''), repeatNum); 
  //     tutorial.displayEnter();
  //   }
  //   else if ((tutKeyOrders.length > 2) && (tutKeyOrders.length % 2 >= 1) && (keyCode == 13)){
  //     pastTutrepeatNum = tutrepeatNum;
  //     tutrepeatNum += 1;
  //     tutKeyOrders = [];
  //     tutorial.resetCard();
  //     if (tutrepeatNum == tutorial.getImageRepeat()) {
  //         tutrepeatNum = 0;
  //         currentScene = 'End_tut';
  //         tutorial.clearFeedback();
  //         tutorial.resetJudgeText();
  //       }
  //     } else { // 같은 레벨 안에서 반복
  //       currentScene = 'START_T';
  //       tutorial.clearFeedback();
  //       tutorial.resetJudgeText();
  //     }
  //     tutorial.displayEnter();
  //   } 

  
  //메인 스테이지
  if ((currentScene == 'Main2') && ((mainstage.getLevel() < 7)) && (keyCode != 27)){
    keyCount += 1;
    keyOrders.push(keyCode);
    mainstage.keySound((keyOrders.length-1)%(mainstage.getImageNum()));
    mainstage.makeFeedback(keyCode);
    mainstage.flipCard(keyOrders.length);
       //keycode 값 검사하기
      if (keyOrders.length == mainstage.getImageNum()){
      mainstage.judgeInput(keyOrders.join(''), repeatNum);
      mainstage.displayEnter(); // 엔터키 입력 안내
      }
       // 답 다 입력한 이후, 아무 키 눌러서 다음으로 진행
      else if ((keyOrders.length > mainstage.getImageNum()) && (keyOrders.length % mainstage.getImageNum() >= 1) && (keyCode == 13)){ 
      mainstage.enterSound();
      loopStage();
      mainstage.displayEnter();
    }
  } else if ((currentScene == 'Main2') && ((mainstage.getLevel() >= 7)) && (keyCode != 27)) { //fever 상황
    if (fKeyOrders.length > 6){
      fKeyOrders = [];
    }
    mainstage.feverSuccess();
    fKeyOrders.push(0);
    mainstage.keySound(fKeyOrders.length-1);
  }

  if (keyCode == 27){
    escReset();
  }
}
  


function mousePressed() {
  if (currentScene == 'End_tut'){
    // onTransition();
  } else if ((currentScene == 'Main_sudden')){
    switch (suddenPage){
      case 0:
        suddenTimer.reset();
        mainstage.resetTimer();
        suddenPage = int(random(1, 3));
        suddenRep++;
        break;
      case 1:
        suddenTimer.reset();
        mainstage.fail();
        mainstage.resetTimer();
        suddenLoop();
        break;
      case 2:
        suddenTimer.reset();
        mainstage.fail();
        mainstage.resetTimer();
        suddenLoop();
        break;
      case 3:
        suddenTimer.reset();
        mainstage.fail();
        mainstage.resetTimer();
        suddenLoop();
        break;
      case 4:
        suddenTimer.reset();
        mainstage.suddenSuccss();
        mainstage.resetTimer();
        suddenLoop();
        break;
    }
  }
}


function changeScene(){
  switch(currentScene){
    case 'First' : 
      // currentScene = 'Rule';
      currentScene = "START_TOON";
      introToon.startToon(); 
      break;
    case "START_TOON":
      currentScene = 'Rule';
      break;
    case 'Rule' :
      currentScene = 'START_game';
      break;
    case 'START_game':
      currentScene = 'START_T';
      tutorial = new Tutorial(gamefont, tutAssets1, tutAssets2, cardAssets, playerAssets, backgroundAssets);
      // tutorial.makeImagegene();
      tutorial.generateImage2();
      break;
    case 'START_T' :
      currentScene = 'TUTORIAL1'; 
      tutorTimer1 = new Timer(3000, true);
      break;
    case 'TUTORIAL1' :
      currentScene = 'TUTORIAL2';
      // clearTimeout();
      break;
    case 'TUTORIAL2' :
      currentScene = 'End_tut';
      // tutorTimer2 = new Timer(1500, true);
      break;
    // case 'TUTORIAL3' :
    //   currentScene = 'End_tut';
    //   break;
    case 'End_tut':
      currentScene = 'START_Main';
      mainstage.bgmPlay();
      break;

    // 여기서부터 메인스테이지
    case 'START_Main' :
      currentScene = 'Main1'
      makeTimer();
      break;
    case 'Main1' :
      currentScene = 'Main2'
      mainTimer2.reset();
      break;
    case 'Main2' :
      currentScene = 'Main3'
      break;
    case 'Main_sudden':
      break;
    case 'END_TOON' :
    //   gameController.initClassVar();
    //   startTime[0] = minute();
    //   startTime[1] = second();
    //   currentScene = 'GAME';
      break;
  }
}

function onTransition(){
  inTransition = true;
}
function offTransition(){
  inTransition = false;
}

function draw() {
  // draw scene
  switch(currentScene){
    case "First":
      background(backgroundAssets[2]);
      break;
    case "START_TOON":
      // background(0);
      // textSize(15);
      // textFont(gamefont);
      // fill(255);
      // text("press any key >>", width-150, height-20);
      introToon.drawToon();
      if (introToon.getIntroEnd()){
        introToon.endToon();
        onTransition();
        noTint();
      }
      break;
    case "Rule":
      background(ruleAssets[rulePage]);
      break;
    case 'START_game':
      background(ruleAssets[2]);
      break;
    case 'START_T' :
      background(0);
      onTransition();
      break;
    case 'TUTORIAL1' :
      background(tutorial.background[0]);
      textSize(25);
      // textAlign(CENTER);
      textFont(tutorial.gamefont);
      fill('#2EA7E0');
      text("알맞은 이미지 순서를 기억하세요", 380, height-70);
      fill(255);
      textSize(40);
      text('Practice', width/2, 80);
      tutorial.displayImage(tutrepeatNum);
      tutorial.displayPlayer();
      tutorial.displayTimer();
      tutorial.displayFeedback();
      if(tutorTimer1.expired()) {
        changeScene();
        // tutorTimer1.start();
        // tutorial.playTimer();
        }
      break;
    case 'TUTORIAL2' :
      background(tutorial.background[0]);
      tutorial.displayPlayer();
      tutorial.displayCard();
      tutorial.displayFeedback();
      tutorial.displayResult(pastTutrepeatNum);
      break;
    // case 'TUTORIAL3' :
    //   background(tutorial.background[0]);
    //   tutorial.displayFeedback();
    //   tutorial.displayPlayer();
    //   tutorial.displayResult(pastTutrepeatNum);

    //   if (tutorTimer2.expired()) {
    //     if (tutrepeatNum == 2){
    //       onTransition();
    //       tutorTimer2.start();
    //       tutorial.playTimer();
    //     } else {
    //       currentScene = 'TUTORIAL1'
    //       tutorTimer1.start();
    //       tutorial.playTimer();
    //     }
    //   } 
    //   break;
    case 'End_tut' :
      background(backgroundAssets[4]);
      // tutorial.displayEndTut();
      break;

    case 'START_Main' :
      background(0);
      onTransition();
      // mainstage.playTimer();
      break;
    // 이미지 보여주는 단계
    case 'Main1' :
      background(backgroundAssets[0]);
      mainstage.displayScore();
      mainstage.displayInfo();
      mainstage.displayImage(repeatNum);
      mainstage.displayTimer();
      mainstage.displayTitle();
      mainstage.displayBattery();
      mainstage.displayPlayer();

      if(mainTimer1.expired()) {
        // onTransition(); 
        changeScene();
        mainTimer1.start();
        }
      break;
    // 키 입력 단계
    case 'Main2' :
      // mainstage.displayTimer(); 키입력에서도 timer 보여줄것인가? + 키입력에서도 시간제한을 둘 것인가? (아래 mainTimer2.expired())
      // mainstage.playTimer(); // fever 제한시간용 
      if (mainstage.getGameover()){
        mainstage.failPlay();
        currentScene = 'END_TOON'
      }
     
      if (mainstage.getLevel() >= 7) { //fever mode
        background(backgroundAssets[1]);
        mainstage.displayScore();
        mainstage.displayTimer();
        mainstage.displayInfo();
        mainstage.displayTitle();
        mainstage.displayPlayer();
        mainstage.displayBattery();
        mainstage.displayCard();
        mainstage.displayFeedback();
        if (mainstage.getFeverTimer()){
          mainstage.endFever();
          currentScene = 'Main1';
        };
        //feverTime - 피버 제한시간 
        // if (frameCount % 60 == 0 && feverTime > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
        //   feverTime -=1;
        // }
        // if (feverTime == 0){
        //   mainstage.endFever();
        //   currentScene = 'Main1';
        //   feverTime = 3;
        // }
        
      } else { 
        background(backgroundAssets[0]);
        mainstage.displayScore();
        mainstage.displayInfo();
        mainstage.displayTitle();
        mainstage.displayBattery();
        mainstage.displayPlayer();
        mainstage.displayCard();
        mainstage.displayFeedback();
        //제한 시간안에 답 입력 못하면 실패처리하고 넘어감
        // if (mainTimer2.expired()) {
        //   mainstage.fail();
        //   loopStage();
        // }
      }
      break;
    case 'Main_sudden':
      if (mainstage.getGameover()){
        mainstage.failPlay();
        currentScene = 'END_TOON'
      }
      background(backgroundAssets[0]);
      // mainstage.displayTimer();
      mainstage.displayScore();
      mainstage.displayInfo();
      mainstage.displayTitle();
      mainstage.displayBattery();
      mainstage.displayPlayer();
      mainstage.displaySudden(suddenPage);
      if ((dist(mouseX, mouseY, 175, 195) < 25) && (suddenPage !=0)&& (suddenPage !=3)&& (suddenPage !=4)){
        suddenPage = suddenPage + 2;
      } else if ((dist(mouseX, mouseY, 175, 195) > 25)){
        if(suddenPage == 3){suddenPage = 1}
        if(suddenPage == 4){suddenPage = 2}
      }
      if (suddenTimer.expired()){
        if (suddenPage == 1 || suddenPage == 3){
          mainstage.suddenSuccss();
          suddenLoop();
        } else if (suddenPage == 2 || suddenPage == 4){
          mainstage.fail();
          suddenLoop();
        }
      }
      break;
  
    case 'END_TOON' :
      background(0);
      fill(255);
      textSize(30);
      textFont(gamefont);
      text('Score: '+ finalScore, width/2, height/2);
      text('mistake: '+mainstage.getFailCount(), width/2, height/2+50);
      // endToon.display();
      break;
  }
  // transition : go black and when black change the scene.
  if(inTransition){
    blackOpacity += 10;
    if(blackOpacity > 300){
      offTransition();
      changeScene();
      mainstage.resetTimer(); // 타이머 시작지점 잡아주기
    }
  }else{
    if(blackOpacity > 0){
      blackOpacity -= 10;
    }
  }
  fill(0, 0, 0, blackOpacity);
  rect(0, 0, width, height);
}


//  키입력 후 아무키나 누르거나 , 시간제한 지나면 실행
function loopStage() {
  pastRepeatNum = repeatNum;
  repeatNum += 1;
  keyOrders = [];
  mainstage.resetCard();
  mainstage.resetTimer();
  if (repeatNum == mainstage.getImageRepeat()) {
    if (mainstage.getLevel() == 6) { //마지막 level일 경우 엔딩으로 이동. 현재는 임시로 2스테이지까지만 확인
     finalScore = mainstage.getFinalScore();
     currentScene = 'END_TOON';
     mainstage.clearFeedback();
    } else if (mainstage.getLevel() == 2){
     mainstage.nextLevel();
     repeatNum = 0;
     suddenTimer = new Timer(1700, false);
     currentScene = 'Main_sudden';
     mainstage.clearFeedback();
    }
    else { // 레벨 올리기
      mainstage.nextLevel();
      repeatNum = 0;
      currentScene = 'START_Main';
      mainstage.clearFeedback();
    }
  }
  else { // 같은 레벨 안에서 반복
    currentScene = 'START_Main';
    mainstage.clearFeedback();
  }

}

function makeTimer(){
    // level에 따른 다른 제한시간 설정 (1, 5 - 3초 / 2, 3 - 2초 / 4, 6 - 5초)
    switch (mainstage.getLevel()){
      case 1:
          mainTimer1 = new Timer(3000, true);
          mainTimer2 = new Timer(3000, true);
          break;
      case 2:
          mainTimer1 = new Timer(2000, true);
          mainTimer2 = new Timer(2000, true);
          break;
      case 4:
          mainTimer1 = new Timer(5000, true);
          mainTimer2 = new Timer(5000, true);
          break;
      case 5:
          mainTimer1 = new Timer(3000, true);
          mainTimer2 = new Timer(3000, true);
          break;
      case 6:
          mainTimer1 = new Timer(5000, true);
          mainTimer2 = new Timer(5000, true);
          break;
  }
}

function escReset() {
  introToon.resetIntro();
  rulePage = 0;
  mainstage.initClassVar();
  currentScene = 'First';
}

function suddenLoop(){
  if (suddenRep > 4){
    mainstage.nextLevel();
    currentScene = 'START_Main'
    suddenRep = 0;
  } else {
    suddenTimer.reset();
    mainstage.resetTimer();
    suddenPage = int(random(1, 3))
    suddenRep++;
  }
}

function displayRule(rulePage){
  background(ruleAssets[rulePage]);
}

