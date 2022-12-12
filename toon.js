class Toon{
    /*이 모듈은 정해진 그림들을 순차적으로 보여주고 키보드 인터럽트를 통한 스킵을 구현하기 위한 단순한 클래스
    인트로, A엔딩, B엔딩, C엔딩 툰을 만들 때 사용할 수 있을 것 같음.
    웹상에서 만든 것을 class로 구현하였는데, vscode상에서 돌리는게 잘 안되서 디버깅은 못함... 
    여러번의 키 입력으로 화면을 넘기는 기능이 충분히 편리하다 생각해 mousepressed event는 구현하지 않아도 될듯함.
    */
        myTimer; 
        len;
        duration = 5000;
        counter;
        
        //bgi = loadImage('whatever')
        //bgi(background image) 도 intro와 outro가 다르다면 생성자에 포함시켜야할것
        //click = loadSound('whatever') -> 스킵할 때 나는 소리
        //bgm = loadSound('whatever) -> BGM으로 나오는 소리, 앞과 뒤의 BGM이 다르게 된다면 이것 또한 constructor 인자로 받아야 할 것.
    
    
        constructor(gamefont, imglist, soundEffects){ //gamefont와 관련된 부분은 잘 모르겠음.
            this.gamefont = gamefont;
            this.myTimer = new Timer(80000 + 1000);
            this.img = imglist;
            this.len = imglist.length;
            this.counter = 0;
            this.introEnd = false;
            this.introBGM = soundEffects['introBGM'];
            this.bgmVolume = 0.08;

        }

        initVolume(){
          this.introBGM.setVolume(this.bgmVolume);
        }

        resetIntro(){
            this.myTimer = new Timer(80000 + 1000);
            this.counter = 0;
            this.introEnd = false;
            this.initVolume();
            this.introBGM.stop();
        }

        

        getIdx(){
          return this.counter;
        }

        getIntroEnd(){
          return this.introEnd;
        }
    
        startToon(){
          this.myTimer.start();
          this.initVolume();
          this.introBGM.play();
        }
        endToon(){
          this.myTimer.endTimer();
          this.introBGM.stop();         
          //시계와 BGM의 진행을 멈춤
          //
        }
    
        tint_calc(time_max, time_cur){
          //그림의 투명도를 변화시킨다
          if (time_cur > time_max - 1000){
            return (time_max - time_cur) * 0.25;
          }
          //새로운 그림이 load되고 1초동안은 서서히 드러나게 한다
          if (time_cur < 2000){
            return (time_cur-1000)*0.25;
          }
          //사라지기 1초 전에는 서서히 사라지게 한다
          return 255;
          //나머지는 투명도 0으로
        }

        imageResize(){
          if (this.counter < this.len){ 
              this.img[this.counter].resize(640,480);
        }
      }


      
    
        drawToon(){ //Sketch 상 draw 안에서 실행시키고자 하는 것.
          // image(bgi,0,0)
          //배경은 항상 초기화시켜두어야함. 배경 에셋이 있는 경우 여기에 새로운 그림을 넣을듯.
       /**    
          textSize(32);
          fill(0)
          text('press any key to skip', 0,450)
        //아무 키나 눌러 스킵할 수 있는 것이 플레이경험이 좋다고 생각하였음
      **/ background(0);
          tint(255,this.tint_calc(80000 + 1000, this.myTimer.getRemainingTime()));
          //투명도를 매 프레임마다 계산한다.
          if (this.counter < this.len){ 
          // array index외의 것을 탐색하여 오류가 발생하는 것을 막기 위함
            // this.img[this.counter].resize(640,480);
          //이미지가 지나치게 클 경우 리사이즈를 할 수 있음
            image(this.img[this.counter], 0, 0);
          } 
        
          // if(this.myTimer.getRemainingTime() < 1000){
          //   //1000ms가 남으면 다음 이미지로 넘어가면서 timer를 리셋시킨다.
          //   // this.counter += 1;
          //   this.myTimer.reset();
          // }

          if (keyIsPressed) {
            if(this.myTimer.getRemainingTime() < 80000 + 800){
              //200ms의 여유 시간을 두어 여러번의 중복 클릭이 일어나는 현상을 막는다.
              //실제 플레이시에 이 함수를 사용하게 될 경우 150ms 정도의 제한이 좋을듯함.
              this.counter += 1;
              this.myTimer.reset();
            }
            if(this.counter == this.len){
              this.myTimer.reset();
              this.introEnd = true;
            }  
          }
        } 
          
    
    }
    
    
     