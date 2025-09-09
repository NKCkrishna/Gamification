class Cell {
    isCorrect = false;
    isIncorrect = false;
    isCrossed = false;
    constructor(x, y, d) {
        this.isObjective = random(1) < objectiveFrequency;
        this.x = x;
        this.y = y;
        this.d = d;
        this.r = d / 2;
        this.xPx = x * d;
        this.yPx = y * d;
    }

    show() {
        // Cells differ slightly in color so that lines are clearer
        if (this.x % 2 == 1 && this.y % 2 == 1) {
            // x and y odd: darkest
            fill(170);
        } else if (this.x % 2 == 1 || this.y % 2 == 1) {
            // x or y odd: dark
            fill(185);
        } else {
            // x and y even: lightest
            fill(200);
        }
        rect(this.xPx, this.yPx, this.d, this.d);

        if (this.isCorrect) {
            // Left clicked - discovered target - blue circle
            noStroke();
            fill("blue");
            ellipse(this.xPx + this.r, this.yPx + this.r, this.r);
        } else if (this.isIncorrect) {
            // Left clicked - missed target - red exclamation point
            stroke("red");
            strokeWeight(8);
            line(this.xPx + this.d * 0.5, this.yPx + this.d * 0.2, this.xPx + this.d * 0.5, this.yPx + this.d * 0.6);
            line(this.xPx + this.d * 0.5, this.yPx + this.d * 0.8, this.xPx + this.d * 0.5, this.yPx + this.d * 0.8);
        } else if (this.isCrossed) {
            // Right clicked - marked tile as clear - green cross
            stroke("green");
            strokeWeight(8);
            // ellipse(this.xPx + this.r, this.yPx + this.r, this.r);
            line(this.xPx + this.d * 0.25, this.yPx + this.d * 0.25, this.xPx + this.d * 0.75, this.yPx + this.d * 0.75);
            line(this.xPx + this.d * 0.75, this.yPx + this.d * 0.25, this.xPx + this.d * 0.25, this.yPx + this.d * 0.75);
        }
        stroke("black");
        strokeWeight(1);
    }

    onLeftClick() {
        if (this.isObjective) {
            this.isCorrect = true;
            // Check for victory
            let won = true;
            loopGrid((x, y) => {
                if (grid[x][y].isObjective && !grid[x][y].isCorrect) {
                    won = false;
                }
            });
            if (won) {
                setTimeout(win, 100);
            }
        } else if (!this.isIncorrect) {
            this.isIncorrect = true;
            strike();
        }
    }

    onRightClick() {
        this.isCrossed = !this.isCrossed;
    }
}
