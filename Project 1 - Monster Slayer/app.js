new Vue({
    el:'#app',
    data:{
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false
    },
    methods:{
        startGame: function(){
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
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
            this.monsterHealth -= this.calculateDamage(10,3);
        },
        monsterAttack: function(){
            this.playerHealth -= this.calculateDamage(12,3);
        },
        specialAttack: function(){
            this.monsterHealth -= this.calculateDamage(20, 10);
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
            this.monsterAttack();
        },
        giveUp: function(){
            this.playerHealth = 0;
            this.checkWin();
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