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

            var damage = this.calculateDamage(10, 3);
            this.monsterHealth -= damage;

            if(this.monsterHealth <= 0){
                alert("You won!");
                this.gameIsRunning = false;
                return;
            }

            if(this.checkWin()){
                return;
            }

            damage = this.calculateDamage(10, 3);
            this.playerHealth -= damage;

            this.checkWin();
        },
        specialAttack: function(){

            var damage = this.calculateDamage(20, 10);
            this.monsterHealth -= damage;

            damage = this.calculateDamage(20, 10);
            this.playerHealth -= damage;
        },
        heal: function(){
            var max = 10;
            var min = 5;

            var heal =  this.calculateHeal(10,5);
            this.monsterHealth += heal;

            heal =  this.calculateHeal(10,5);
            this.playerHealth += Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        giveUp: function(){

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