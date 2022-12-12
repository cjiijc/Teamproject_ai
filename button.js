class Button {
    constructor(text, x, y, w, h, onClick, font) {
      this.text = text;
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.onClick = onClick;
      this.font = font;
    }
    draw() {
      stroke(255, 150);
      fill(0);
      if (this.isMouseOn()) {
        fill(255, 50);
      }
      rect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
      textFont(this.font);
      textSize(10);
      textAlign(CENTER, CENTER);
      fill(255);
      text(this.text, this.x, this.y);
    }
    isMouseOn() {
      let xIn = mouseX > this.x - this.w / 2 && mouseX < this.x + this.w / 2;
      let yIn = mouseY > this.y - this.h / 2 && mouseY < this.y + this.h / 2;
      return xIn && yIn;
    }
    mousePressed() {
      if (this.isMouseOn()) {
        this.onClick();
      }
    }
  }
  