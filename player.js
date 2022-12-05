class Player{
    constructor(imgs) {  //player size is all same
        this.playerImgs=imgs; //playerImage array
        this.idx=4;   // basic mode (틀리거나 성공하기 전 그냥 기본모드)
    }
    playerBasic() {
        this.idx=4;
    }

    playerLife(life){
        this.idx = life;
    }
    //결국 sketch.js에서 playerimgs list에 player image 넣을 때 0=basic, 1=success, 2=fail, 3=수명부족, 4=개발자 이어야 함
    playerFever(){
        this.idx= 5;
    }
    showEngineer() {
        this.idx= 0;
    }
    display(){
        // TODO player xpos,ypos,size 화면 크기에 맞게 조정해야함 (임의로 넣어놓음)
        image(this.playerImgs[this.idx],14,329);
    }

}