class MainStage {
    constructor(gamefont, dogAssets1, foodAssets1, dogAssets2, foodAssets2, dogAssets3, foodAssets3, baitAssets, playerAssets, lifeAssets, cardAssets, titleAssets, backgroundAssets, suddenAssets, soundEffects) { //card image를 걍 변수로 추가
        //score,phase
        this.score = 0;
        this.combo = 0;
        this.failCount = 0; // perfect 계산용
        this.level = 4; // lev1=4개 베이글, lev2=4개 머핀, lev3=돌발과제, lev4=6개 베이글, lev5=방해요소, lev6=6개 머핀, level7= FEVER(4칸짜리), level8 = FEVER(6칸짜리)
        this.returnLevel; // fever에서 돌아오도록

        this.actionEnd = false;  //키보드 입력 싹다 끝나면 true로 toggle 시켜줌
        this.keyInput=false;  //키를 입력하는 페이지면 true
        this.gameover = false;  //gameover면 true

        //battery(생명)
        this.life = 4;
        this.batteryImages = lifeAssets; // lifeAssets=battery image가 담긴 array, images[4]=꽉찬 배터리,[3]=3칸,[2]=2칸,[1]=1칸,[0]=빈거(없어도됨,검은색 이미지)

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

        this.cardIndex = [0, 0, 0, 0, 0, 0];
       

        //image generator, answer list
        this.imageGene = []; // [이미지, 정답 keyCode] 같이 저장
        this.shuffleImage; // array 섞기 
        this.onlyImage = []; // 이미지만 저장한 array
        this.imageGroup = []; // 한 화면에 보여주는 단위로 끊어서 저장 (이미지)
        this.answerOrder = []; // 정답만 전체 순서대로 저장
        this.answerGroup = []; // 한 화면에 보여주는 단위로 끊어서 저장 (정답)

        // how many image 
        //이 imageNum, Repeat 값이  6개짜리 level 에서는 바뀌어야 하는데 차라리 changeImageVar 함수 만들어서 해당 level 들어가기 전에 sketch.js에서 change 먼저 실행시키고 generateimage() 돌리는게 나을듯함
        this.imageNum = 4; //  한 화면에 보이는 이미지 개수
        this.imageRepeat = 3; // 몇 번 반복할 것인가
        this.imageMany = this.imageNum * this.imageRepeat; // 총 이미지 개수

        // image assets (번호순서대로 빵, 머핀, 치킨, 미끼, 나머지 이미지)
        this.dog1 = dogAssets1;  //베이글 닮은 개
        this.food1 = foodAssets1; //베이글
        this.dog2 = dogAssets2; //머핀 닮은 개
        this.food2 = foodAssets2; //머핀
        this.bait = baitAssets; //미끼 이미지 총 8개
        this.dog3 = dogAssets3;  //뒤집어진 머핀 닮은개
        this.food3 = foodAssets3; //뒤집어진 머핀
        this.sudden = suddenAssets; //돌발과제
        // this.ruleImage = ruleAssets; // 룰 설명 이미지

        //나중에 식빵닮은개 stage로 하나 바꾸기 (아직안바꿈)
        //this.dog4= dogAssets4; // 식빵 닮은 개 (level 4)
        //this.food4=foodAssets4; //식빵

        this.feedback = [];
        this.feedbackY = [];

        this.isEnter = false;

        // bgm
        this.bgm = soundEffects['bgm'];
        this.bgmVolume = 0.08;

        this.failSound = soundEffects['fail'];
        //sound Assets
        this.alarms = soundEffects['alarms'];
        this.keys = soundEffects['keys'];
        this.fkeys = soundEffects['fkeys'];
        this.judgeSound = soundEffects['judgeSound'];
        this.feverJudge = soundEffects['feverJudge'];
        this.otherKeys = soundEffects['otherKeys'];
        this.initVolume();
        // this.bgm.play();

        this.setImageN();
        this.generateImage2();

        this.feverTimer;
    
    }

    //TODO reset all class var for replay, sketch.js에서 마지막 페이지 일때만 실행해주면 됨(line 213)
    initClassVar() {
         //score,phase
         this.score = 0;
         this.combo = 0;
         this.failCount = 0;
         this.level = 1; // lev1=4개 베이글, lev2=4개 머핀, lev3=돌발과제, lev4=6개 베이글, lev5=방해요소, lev6=6개 머핀, level7= FEVER(4칸짜리), level8 = FEVER(6칸짜리)
         this.returnLevel; // fever에서 돌아오도록
 
         this.actionEnd = false;  //키보드 입력 싹다 끝나면 true로 toggle 시켜줌
         this.keyInput=false;  //키를 입력하는 페이지면 true
         this.gameover = false;  //gameover면 true
         //battery(생명)
         this.life = 4;
         this.batteryImages = lifeAssets;
         //timer
        this.timer = this.boardWidth;   //timer 값은 로딩바의 길이와 같아야하고, 로딩바의 길이가 board의 가로길이와 동일해야함
        this.timeover = false;
        //title   dog or food? title image가 들어있는 array, [0]=정상, [1]=방해요소 때 나오는 뒤집어진 title
        this.title=titleAssets;
        this.background = backgroundAssets;
        // this.ruleImage = ruleAssets; // 룰 설명 이미지

  
          //character image
        this.player = new Player(playerAssets); //playerAssets=player+개발자의 image가 담긴 array
        this.player.playerBasic();

        this.cards = cardAssets;
        this.cardsize = 80;
        this.cardX4 = width/6+50;   //어차피 image x,y 좌표와도 동일, 카드 4개 나올때 첫카드의 위치
        this.cardY4 = height/2-90;
        this.cardX6 = 80;     //image  6개일때 y좌표는 4개일때와 동일
        this.cardIndex = [0, 0, 0, 0, 0, 0];
        this.imageGene = []; // [이미지, 정답 keyCode] 같이 저장
        this.shuffleImage; // array 섞기 
        this.onlyImage = []; // 이미지만 저장한 array
        this.imageGroup = []; // 한 화면에 보여주는 단위로 끊어서 저장 (이미지)
        this.answerOrder = []; // 정답만 전체 순서대로 저장
        this.answerGroup = []; // 한 화면에 보여주는 단위로 끊어서 저장 (정답)
        // how many image 
        //이 imageNum, Repeat 값이  6개짜리 level 에서는 바뀌어야 하는데 차라리 changeImageVar 함수 만들어서 해당 level 들어가기 전에 sketch.js에서 change 먼저 실행시키고 generateimage() 돌리는게 나을듯함
        this.imageNum = 4; //  한 화면에 보이는 이미지 개수
        this.imageRepeat = 3; // 몇 번 반복할 것인가
        this.imageMany = this.imageNum * this.imageRepeat; // 총 이미지 개수
        this.feedback = [];
        this.isEnter = false;
        this.setImageN();
        this.generateImage2();
        this.bgmVolume = 0.08;        
        this.initVolume();
        // play bgm
        this.bgm.stop();
    }

     // Audio Mixing
     initVolume(){
        this.bgm.setVolume(this.bgmVolume);
        this.failSound.setVolume(0.2);
        for(let i = 0; i < this.alarms.length; i++){
            this.alarms[i].setVolume(0.3);
        }
        for(let i = 0; i < this.keys.length; i++){
            this.keys[i].setVolume(0.2);
        }
        for(let i = 0; i < this.fkeys.length; i++){
            this.fkeys[i].setVolume(0.2);
        }
        for(let i = 0; i < this.judgeSound.length; i++){
            this.judgeSound[i].setVolume(0.3);
        }
        for(let i = 0; i < this.feverJudge.length; i++){
            this.feverJudge[i].setVolume(0.2);
        }
        for(let i = 0; i < this.otherKeys.length; i++){
            this.otherKeys[i].setVolume(0.2);
        }
    }

    setImageN(){
        switch (this.level){
            case 1:
                this.imageNum = 4;
                this.imageRepeat = 3;
                break;
            case 2:
                this.imageNum = 4;
                this.imageRepeat = 3;
                break;
            case 4:
                this.imageNum = 6;
                this.imageRepeat = 2;
                break;
            case 5:
                this.imageNum = 4;
                this.imageRepeat = 2;
                break;
            case 6:
                this.imageNum = 6;
                this.imageRepeat = 2;
                break;
            
        }
    }
    


    // Stop all prev sounds
    stopAllSounds(){
        for(let i = 0; i < this.keys.length; i++){
            this.keys[i].stop();
        }
        for(let i = 0; i < this.fkeys.length; i++){
            this.fkeys[i].stop();
        }
        for(let i = 0; i < this.otherKeys.length; i++){
            this.otherKeys[i].stop();
        }
    }

    keySound(i){
        if ((currentScene == 'Main2') && ((mainstage.getLevel() < 7)) && (keyCode != 27)){
            this.keys[i].play();
        } else if  ((currentScene == 'Main2') && ((mainstage.getLevel() >= 7)) && (keyCode != 27)) {
            this.judgeSound[0].play();
        }
        }   
    enterSound(){
        this.otherKeys[1].play();
    }
    bgmPlay(){
        this.bgm.play();
    }
    failPlay(){
        this.failSound.play();
    }

    getFailCount(){
        return this.failCount;
    }
    

    //key입력하는 stage면 이함수 써서 keyinput=true로 만들어줄 수 있는데.. 일단 keyInput값 바꿔주는걸  displayCard, displayImage 함수 안에 넣어놨는데 작동 안하면 이 함수로 sketch.js에서 scene 바꿀때 toggle 시켜줘야할듯 
    inputStage() {  
        this.keyInput=true;
    }
    noInput() {
        this.keyInput=false;
    }
    
    UpImageVar() {  //6개짜리 image 등장하는 level4,6에서는 imageNum과 imageRepeat 값을 바꿔줘야함
        this.imageNum = 6;
        this.imageRepeat = 2;
    }
    DownImageVar() {  //6개 하다가 방해요소 level5 가면 다시 이미지 개수 4개로 줄기 때문에 variable 값 다시 내려줌
        this.imageNum= 4;
        this.imageRepeat= 2;
    }

    //tutorial과 loop stage 제외 다 동일
    getImageNum() {
        return this.imageNum;
    }
    getImageRepeat(){
        return this.imageRepeat;
    }


    //이 함수는 image 보여주는 단계->key입력으로 넘어갈 때 제한시간이 다 지나면 timeover=true가 되고, 그럼 sketch.js draw()에서 이 함수를 불러서 timeover=true면 onTransition()해서 다음 scene으로 넘겨주면 됨
    getTimeover() {
        return this.timeover;
    }

    getGameover() {  //이게 true면 게임이 끝났다는거, sketch.js에서 아마 화면 전환시켜야 할듯
        return this.gameover;
    }

    //level 값에 따라 다른 이미지를 넣어서 imagearray를 만들거임, 결국 sketch.js에서 level 바뀔때마다 이함수 한번씩 돌려줘야함
    //lev1=4개 베이글, lev2=4개 머핀, lev3=돌발과제, lev4=6개 베이글(+미끼), lev5=4개 방해요소(머핀,글자 뒤집어지고 이미지 뒤집어지는 거임..), lev6=6개 머핀(+미끼),
    //lev4,6의 6개짜리에는 이미지 사이에 미끼이미지 추가, 미끼 이미지의 answer(key값)=13
    generateImage2() {
        if (this.level==1 || this.level==4 || this.level == 3) { //베이글
            this.imageGene = this.dog1.concat(this.food1);
        }
        if(this.level==2 || this.level==6 ) { //머핀
            this.imageGene = this.dog2.concat(this.food2);
        }
        if (this.level==5) {   //뒤집어진 
            this.imageGene=this.dog3.concat(this.food3);
        }
        this.shuffleImage = shuffle(this.imageGene); 

        //각 Lev 쓰이는 전체 이미지&정답을 쭉 다 저 리스트들에 넣어줄거임 (6개짜리일때 imagemany 값 업데이트는 changeImageVar함수로)
        for (let i = 0; i < this.imageMany; i++) {
            this.onlyImage.push(this.shuffleImage[i][0]);
            this.answerOrder.push(this.shuffleImage[i][1]);
        }
        if  (this.level==4 || this.level==6) {  //미끼이미지 들어가는 단계에서는  중간에 미끼 이미지를 심어줄건데, 2개씩 심겠음
            let k1=int(random(1,7)); //바꿔들어갈 자리
            let k2=int(random(1,7));
            let b1=int(random(8)); // bait index
            let b2=int(random(8));
            this.onlyImage[k1]=this.bait[b1];
            this.onlyImage[k2]=this.bait[b2];
            this.answerOrder[k1]=32; //spacebar
            this.answerOrder[k2]=32;
        }

        //generateImageGroup 이중 array로 group 별로 index 1개씩 차지, 어차피 필요로하는 전체 카드수(20개) 다 들어가있고,  4개씩 하나의 group으로 쪼개져서 들어감
        for (let i = 0; i < this.onlyImage.length; i += this.imageNum) this.imageGroup.push(this.onlyImage.slice(i, i + this.imageNum))

        //generateAnswerGroup
        for (let i = 0; i < this.answerOrder.length; i += this.imageNum) this.answerGroup.push(this.answerOrder.slice(i, i + this.imageNum))
    }

    //sketch.js 에서 change()에서 게임 level 바꿔줄때마다 nextLevel() 실행시켜서 this.level 값을 올려줘야함
    nextLevel() {
        this.level++;
        this.imageGene = [];
        this.shuffleImage = [];
        this.onlyImage = [];
        this.answerOrder = [];
        this.imageGroup = [];
        this.answerGroup = [];
        this.setImageN();
        this.generateImage2();
    }
    getLevel() {
        return this.level;
    }

    upScore() {
        this.score += 10* this.level;
    }
    downScore() {
        this.score -= 10;
    }

    getAnswerGroup(repeatNum) {
        return this.answerGroup[repeatNum];
    }
    getJudgetext(repeatNum) {
        return this.judgeText[repeatNum];
    }

    getFinalScore() {
        return this.score;
    }


    //repeatNum은 지금 같은 레벨 안에서 몇번째 횟차인지를 알려줌
    //tutorial 파일에서는  이 함수 실행 안시키고 그냥 key pressed에 기능을 구현했는데, 그러려면 succeed,  fail 함수를 만드는게 나을듯
    //TODO combo 점수를 최종 score에 반영해줘야 함
    judgeInput(keyOrders, repeatNum) {
        // correct
        if (this.answerGroup[repeatNum].join('') == keyOrders) {this.success();}
        // wrong
        else { this.fail() }
    }

    success() {
        this.score += 10 * this.level; //lev1에서는 10점씩, lev2에서는 20점씩 기타 등등
        this.combo += 1;
        // this.player.playerCorrect();
        
        this.judgeSound[0].play();
        //go fever 
        if ((this.combo == 3)&&(this.level != 3)) {
            this.goFever();
            this.combo = 0;
        }
    }
    suddenSuccss(){
        this.score += 10 * this.level;
        this.judgeSound[0].play();
    }

    feverSuccess(){
        this.score += 5;
        // this.player.playerCorrect();
    }

    //다음 level로 넘겨주는건 repeatNUM full로 차면 sketch.js에서 넘길거임
    fail() {  //life 다쓰거나, 이게 마지막 판이었으면 game end되어야함
        if (this.score > 0) {
            this.score -= 10;
        }
        this.combo = 0;
        this.failCount ++;
        this.judgeSound[1].play();
        this.timer = 410;
        if (this.life > 0){this.life = this.life - 1};
        this.player.playerLife(this.life);
        //life 다 쓰면 게임 오버로 연결되는부분
        if (this.life == 0) { //직전에 남은 life 1개였는데, 이번에 틀려서 life=0이 되면
            this.gameover = true;   //gameover 값을 true로
            this.bgm.stop();
        }
    }

    inputEnd() { //sketch.js에서 keyboard 입력끝났다고 여겨질때 함수 실행시키면 actionEnd=true로 toggle
        this.actionEnd = true;
    }
    inputBegin() { //다시 새로 input값들  입력할 때 실행 (동일 level 안에서), 어쩌면 안필요할수도..
        this.actionEnd=false;
    }

    resetTimer(){
        this.timer = 410;
        this.playTimer();
    }


    //spd = 1.4 -> 5초 spd=1.8->4초, spd=2.8->3초, spd=3.4->2초
    //spd 커질수록 초는 작아짐
    //lev1=3sec, lev2=2sec, lev3=2sec, lev4=4sec, lev5=3sec, lev6=3sec
    playTimer() {
        let timerspd;
       
        if (this.level== 1 || this.level==5 || this.level == 7 || this.level == 8) { //runtime 3sec
            timerspd=2.4;
        }
        else if (this.level==2) { //runtime 2sec
            timerspd=3.5;
        }
        else if (this.level==3){ //runtime 1.5sec
            timerspd=4.2;
        }
        else if (this.level==4 || this.level==6) { //runtime 5sec
            timerspd=1.45;
        }
        // if (this.level == 7 || this.level == 8){ //fever, runtime 4sec
        //     timerspd=1.8;
        // }
        this.timeover=false;  //timeover값 초기화

        //if action end(입력이 끝나면) just stop timer. 그니까 keypressed에서 정해진 input개수 다 들어오면 inputEnd()함수 실행시켜서 true로 해야함
        if (this.actionEnd) {
            timerspd = 0;
        }

        this.timer -= timerspd;
        if (this.timer < 0) { //입력 다 못해서 timeover 된 경우+이미지 보여주면서 시간 초과될 때
            this.timer = 410;
            
            // this.timeover = true;
            //input입력을 하는 페이지 에서만, fail함수가 작동해야함!  (=input입력 없이 시간초과 시 fail 뜨게 하기)
            // if (this.keyInput==true) { //input 값  입력하는 페이지에서만 fail 시키기
            //     this.fail();
            // }
            // if (this.level >= 7) {
            //     this.endFever();
            // }
        }
    }

    //lev1=4개 베이글, lev2=4개 머핀, lev3=돌발과제, lev4=6개 베이글, lev5=4개 방해요소, lev6=6개 머핀,
    displayImage(repeatNum) {
        if (this.level<=2|| this.level==5 || this.level == 7) {  //4 images
            image(this.imageGroup[repeatNum][0], this.cardX4, this.cardY4, this.cardsize, this.cardsize);
            image(this.imageGroup[repeatNum][1], this.cardX4 + this.cardsize, this.cardY4, this.cardsize, this.cardsize);
            image(this.imageGroup[repeatNum][2], this.cardX4 + this.cardsize * 2, this.cardY4, this.cardsize, this.cardsize);
            image(this.imageGroup[repeatNum][3], this.cardX4 + this.cardsize * 3, this.cardY4, this.cardsize, this.cardsize);
        }
        if (this.level==4 || this.level==6 || this.level == 8) { //6 images
            image(this.imageGroup[repeatNum][0], this.cardX6, this.cardY4, this.cardsize, this.cardsize);
            image(this.imageGroup[repeatNum][1], this.cardX6 + this.cardsize, this.cardY4, this.cardsize, this.cardsize);
            image(this.imageGroup[repeatNum][2], this.cardX6 + this.cardsize * 2, this.cardY4, this.cardsize, this.cardsize);
            image(this.imageGroup[repeatNum][3], this.cardX6 + this.cardsize * 3, this.cardY4, this.cardsize, this.cardsize);
            image(this.imageGroup[repeatNum][4], this.cardX6 + this.cardsize * 4, this.cardY4, this.cardsize, this.cardsize);
            image(this.imageGroup[repeatNum][5], this.cardX6 + this.cardsize * 5, this.cardY4, this.cardsize, this.cardsize);
        }
        this.keyInput=false;
    }
    
    displayCard(){
        if (this.level<=2|| this.level==5 || this.level == 7) { //아직 아무것도 입력 안했음
            if (this.level == 7){this.flipCardFever()} // fever
            image(this.cards[this.cardIndex[0]], this.cardX4, this.cardY4, this.cardsize, this.cardsize);
            image(this.cards[this.cardIndex[1]], this.cardX4 + this.cardsize, this.cardY4, this.cardsize, this.cardsize);
            image(this.cards[this.cardIndex[2]], this.cardX4 + this.cardsize * 2, this.cardY4, this.cardsize, this.cardsize);
            image(this.cards[this.cardIndex[3]], this.cardX4 + this.cardsize * 3, this.cardY4, this.cardsize, this.cardsize);
        }
        if (this.level==4 || this.level==6 || this.level == 8) { //아직 아무것도 입력 안했음
            if (this.level == 8){this.flipCardFever()} // fever
            image(this.cards[this.cardIndex[0]], this.cardX6, this.cardY4, this.cardsize, this.cardsize);
            image(this.cards[this.cardIndex[1]], this.cardX6 + this.cardsize, this.cardY4, this.cardsize, this.cardsize);
            image(this.cards[this.cardIndex[2]], this.cardX6 + this.cardsize * 2, this.cardY4, this.cardsize, this.cardsize);
            image(this.cards[this.cardIndex[3]], this.cardX6 + this.cardsize * 3, this.cardY4, this.cardsize, this.cardsize);
            image(this.cards[this.cardIndex[4]], this.cardX6 + this.cardsize * 4, this.cardY4, this.cardsize, this.cardsize);
            image(this.cards[this.cardIndex[5]], this.cardX6 + this.cardsize * 5, this.cardY4, this.cardsize, this.cardsize);
        }
        this.keyInput=true;
    }

    flipCard(keyOrdersLength){
        this.cardIndex[keyOrdersLength-1] = 1;
    }

    flipCardFever(){
        this.cardIndex = [2, 2, 2, 2, 2, 2];
    }

    resetCard(){
        this.cardIndex = [0, 0, 0, 0, 0, 0];
    }

    resetScore(){
        this.score = 0;
    }


    displayBattery() {
        if(this.life > 0){
            image(this.batteryImages[this.life-1], 24, height - 170);
        }
    }

    displayTimer() {
        if (this.level < 7) {
            textSize(10);
            textAlign(CENTER);
            textFont(mainstage.gamefont);
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
        } else {
            textSize(10);
            textAlign(CENTER);
            textFont(mainstage.gamefont);
            fill('#E61673');
            text('LOADING', width/2, height - 230);
            fill('#E61673');
            stroke('#E61673');
            fill(230,22,115, 10);
            rectMode(CORNER);
            rect(110, height - 220, this.boardWidth, 3, 10);  //fixed bg bar
            fill('#E61673');
            rect(110, height - 220, this.boardWidth - this.timer, 3, 10);  // timer 속도만큼 move할텐데 속도 한번 봐야함
            this.playTimer();
        }
        
    }

    //title dog  or food 함수, 방해요소 단계에서는 이거 뒤집어진..이미지로 넣어야함
    displayTitle() {
        if (this.level==5) { //방해요소에서는 뒤집어진걸로
            image(this.title[1], 159, 56);
        } else if (this.level==3){ //돌발과제
            image(this.title[2], 220, 56);
        }
        else  {
            image(this.title[0], 159, 56);
        }
    }

    displayBack(){
        if (this.level < 7){
            background(this.background[0]);
        } else {
            background(this.background[1]);
        }
    }

    displayEnter(){ // enter 텍스트 보여줄지 말지 결정
        this.isEnter = !this.isEnter;
    }

    makeFeedback(keyCode){
        if(!this.isEnter) {
            if (keyCode == 68){this.feedback.push('DOG')}
            else if (keyCode == 70){this.feedback.push('FOOD')}
            else if (keyCode == 32){this.feedback.push('SKIP')}
            else {this.feedback.push('Error')}
        }
      
    }

    displayFeedback(){
        if (this.level < 7){
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
        } else { //fever
            textSize(23);
            textAlign(CENTER);
            textFont(this.gamefont);
            fill('#E61673');
            text("FEVER!!", width/2+65, height - 70);
        }
    }

    clearFeedback(){
        this.feedback = [];
    }

    getFeverTimer(){
        if  (this.feverTimer.expired()){
            return true;
        }
    }

    goFever(){
        this.player.playerFever();
        this.feverTimer = new Timer(3000, true);
        this.playTimer();

        if (this.level < 4 || this.level == 5){
            this.returnLevel = this.level;
            this.level = 7;
        }
        else {
            this.returnLevel = this.level;
            this.level = 8;
        }
    }

    endFever(){
        if (this.level >= 7){
            this.level = this.returnLevel;
            this.setImageN();
            this.generateImage2();
            this.feedback = ['END FEVER'];
            this.player.playerLife(this.life);
        }   
    }

    //개발자 이미지로 전환, sketch.js draw함수에서 방해요소 나오기 전 stage인 lev4에서 키 입력 다 끝나고 난 다음에 밑에 displaycomment랑 같이 실행시켜주면 됨
    displayEngineer() {
        this.player.showEngineer();
        this.player.display();
    }
    
    displayPlayer() {
        this.player.display();
    }

    //방해요소 나오기 전 개발자가 방해요소 안내
    displayComment() {
        textSize(10);
        textAlign(CENTER);
        textFont(this.gamefont);
        fill(255);
        text("아 좀 애매한데... 성능을 높이기 위한 테스트를 하나 해봐야겠다 ", width/2, height - 100);
    }

    //돌발 과제 전 개발자가 돌발요소 안내
    discriptOthertask() {
        textSize(10);
        textAlign(CENTER);
        textFont(this.gamefont);
        fill(255);
        text("이것도 못하진 않겠지.", width/2, height - 100);
        textSize(15);
        text("알맞은 체크박스에만 마우스를 클릭하세요", width/2, height - 100);
    }

    displaySudden(suddenPage){
        this.displayTimer();
        if (suddenPage == 0){
        image(this.sudden[suddenPage], 0, 0);
        } else {
        image(this.sudden[suddenPage], 145, 150);
        }
        
    }

    displayScore(){
        textSize(13);
        textFont(this.gamefont);
        fill('#2EA7E0');
        text("SCORE: "+ this.score, 60, 30);
    }

    displayInfo(){
        switch (this.level){
            case 1:
                textSize(20);
                // textAlign(CENTER);
                textFont(this.gamefont);
                fill('#2EA7E0');
                text("press 'D' or 'F'", 240, height-100);
                break;
            case 2:
                textSize(20);
                // textAlign(CENTER);
                textFont(this.gamefont);
                fill('#2EA7E0');
                text("press 'D' or 'F'", 240, height-100);
                break;
            case 3:
                textSize(20);
                // textAlign(CENTER);
                textFont(this.gamefont);
                fill('#2EA7E0');
                text("Click or Not", 230, height-100);
                break;
            case 4:
                textSize(20);
                // textAlign(CENTER);
                textFont(this.gamefont);
                fill('#2EA7E0');
                text("강아지도 음식도 아니라면, press 'Space'", 348, height-100);
                break;
            case 5:
                textSize(20);
                // textAlign(CENTER);
                textFont(this.gamefont);
                fill('#2EA7E0');
                text("press 'D' or 'F'", 240, height-100);
                break;
            case 6:
                textSize(20);
                // textAlign(CENTER);
                textFont(this.gamefont);
                fill('#2EA7E0');
                text("강아지도 음식도 아니라면, press 'Space'", 348, height-100);
                break;
            case 7:
                noTint();
                textSize(20);
                // textAlign(CENTER);
                textFont(this.gamefont);
                fill('#2EA7E0');
                text("Press any key", 240, height-100);
                break;
            case 8:
                noTint();
                textSize(20);
                // textAlign(CENTER);
                textFont(this.gamefont);
                fill('#2EA7E0');
                text("Press any key", 240, height-100);
                break;
        }
    }
}