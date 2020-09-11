new Vue({
    el:'#app',
    data:{
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods:{
        startGame: function(){
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function(){

            this.playerAttack();

            if(this.checkWin()){
                return;
            }

            this.monsterAttack();

            this.checkWin();
        },
        playerAttack: function(){
            var damage = this.calculateDamage(10,3);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'player hits Monster for ' + damage
            });
        },
        monsterAttack: function(){
            var damage = this.calculateDamage(12,3);
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits Player for ' + damage
            });

        },
        specialAttack: function(){
            var damage = this.calculateDamage(20, 10);
            this.monsterHealth -= damage
            this.turns.unshift({
                isPlayer: true,
                text: 'Player critically hits Monster for ' + damage
            });

            if(this.checkWin()){
                return;
            }

            this.monsterAttack();
            this.checkWin();

            
        },
        heal: function(){
            if(this.playerHealth >= 90){
                this.playerHealth = 100;
            }
            else{
                this.playerHealth += 10;
            }

            this.turns.unshift({
                isPlayer: true,
                text: 'Player heals for ' + 10
            });

            this.monsterAttack();
        },
        giveUp: function(){
            this.gameIsRunning = false;
        },
        calculateDamage: function(max,min){
            return  Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        calculateHeal: function(max,min){
            return  Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function(){
            if(this.playerHealth <= 0){
                if(confirm("You lost! New Game?")){
                    this.startGame();
                }
                else{
                    this.gameIsRunning = false;
                }
                return true;
            }
            else if(this.monsterHealth <= 0){
                if(confirm("You won! New Game?")){
                    this.startGame();
                }
                else{
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }

    }
});