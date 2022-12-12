class ScoreBoard {
    constructor() {
      this.scores = [];
      this.loadScoreBoard();
    }
    draw() {
      for (let i = 0; i < 5; i++) {
        let rank = i + 1;
        let rank_name = this.scores[i].name;
        let rank_name_str = rank_name.padEnd(8, "_");
        let rank_score = this.scores[i].score;
        let rank_score_str = nf(rank_score, 2);
        fill(255);
        textSize(20);
        let rank_text = `${rank}. ${rank_name_str} ${rank_score_str}`;
        text(rank_text, width / 2, 140 + 35 * i);
      }
    }
    isNewRank(new_score) {
      let lastScore = this.scores[this.scores.length - 1].score;
      return new_score > lastScore;
    }
    addRank(new_name, new_score) {
      this.scores.push({ name: new_name, score: new_score });
      this.scores.sort((a, b) => a.score - b.score).reverse();
      this.scores = this.scores.slice(0, 5);
      this.saveScoreBoard();
    }
    loadScoreBoard() {
      if (localStorage.getItem("SCORE_BOARD") === null) {
        for (let i = 0; i < 5; i++) {
          this.scores.push({ name: "________", score: 0 });
        }
        return;
      }
      this.scores = JSON.parse(localStorage.getItem("SCORE_BOARD"));
    }
    saveScoreBoard() {
      localStorage.setItem("SCORE_BOARD", JSON.stringify(this.scores));
    }
  }