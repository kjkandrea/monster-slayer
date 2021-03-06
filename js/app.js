new Vue({
    el: '#app',
    data: {
        playerHealth: 0,
        monsterHealth: 0,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
        },
        attack: function() {
            const damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster for ' + damage
            });
            if(this.checkWin()){
                return;
            }

            this.monsterAttacks();

        },
        specialAttack: function() {
            const damage = this.calculateDamage(10, 20);;
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster for ' + damage
            });
            if(this.checkWin()){
                return;
            }

            this.monsterAttacks();
        },
        heal: function() {
            if (this.playerHealth <= 90){
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }
            this.turns.unshift({
                isPlayer: true,
                text: 'Player heals for 10'
            });
            this.monsterAttacks();
        },
        giveUp: function() {
            if (confirm('Are you Sure?')) {
                this.gameIsRunning = false;
            }else{
                return
            }
        },
        monsterAttacks: function() {
            const damage = this.calculateDamage(7, 13);
            this.playerHealth -= damage;
            this.checkWin();
            this.turns.unshift({
                text: 'Monster hits Player for ' + damage
            });
        },
        calculateDamage: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function() {
            if (this.monsterHealth <= 0) {
                if (confirm('You won! New Game?')) {
                    this.startGame();
                }else{
                    this.gameIsRunning = false;
                }
                return true;
            }else if (this.playerHealth <= 0) {
                if (confirm('You lost! New Game?')) {
                    this.startGame();
                }else{
                    this.gameIsRunning = false;
                }
                return false;
            }
        }
    }
});
