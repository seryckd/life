/*jshint browser: true, esversion: 6*/

var RULES = [
   {
      "id": 0,
      "name" : "2x2",
      "survive": "125",
      "born": "36",
      "description": "xxx"
   },
   {
      "id": 1,
      "name": "34 Life",
      "survive": "34",
      "born": "34",
      "description": "xxx"
   },
   {
      "id": 2,
      "name": "Amoeba",
      "survive": "1358",
      "born": "357",
      "description": "xxx"
   },
   {
      "id": 3,
      "name": "Assimilation",
      "survive": "4567",
      "born": "345",
      "description": "xxx"
   },
   {
      "id": 4,
      "name": "Coagulations",
      "survive": "235678",
      "born": "378",
      "description": "xxx"
   },
   {
      "id": 5,
      "name": "Conway's Life",
      "survive": "23",
      "born": "3",
      "description": "xxx"
   },
   {
      "id": 6,
      "name": "Coral",
      "survive": "45678",
      "born": "3",
      "description": "xxx"
   },
   {
      "id": 7,
      "name": "Day & Night",
      "survive": "34678",
      "born": "3678",
      "description": "xxx"
   },
   {
      "id": 8,
      "name": "Diamoeba",
      "survive": "5678",
      "born": "35678",
      "description": "xxx"
   },
   {
      "id": 9,
      "name": "Flakes",
      "survive": "012345678",
      "born": "3",
      "description": "xxx"
   },
   {
      "id": 10,
      "name": "Gnarl",
      "survive": "1",
      "born": "1",
      "description": "xxx"
   },
   {
      "id": 11,
      "name": "High Life",
      "survive": "23",
      "born": "36",
      "description": "xxx"
   },
   {
      "id": 12,
      "name": "Inverse Life",
      "survive": "34678",
      "born": "0123478",
      "description": "xxx"
   },
   {
      "id": 13,
      "name": "Long Life",
      "survive": "5",
      "born": "345",
      "description": "xxx"
   },
   {
      "id": 14,
      "name": "Maze",
      "survive": "12345",
      "born": "3",
      "description": "xxx"
   },
   {
      "id": 15,
      "name": "Mazecrtic",
      "survive": "1234",
      "born": "3",
      "description": "xxx"
   },
   {
      "id": 16,
      "name": "Move",
      "survive": "245",
      "born": "368",
      "description": "xxx"
   },
   {
      "id": 17,
      "name": "Pseudo Life",
      "survive": "238",
      "born": "357",
      "description": "xxx"
   },
   {
      "id": 18,
      "name": "Replicator",
      "survive": "1357",
      "born": "1357",
      "description": "xxx"
   },
   {
      "id": 19,
      "name": "Seeds (2)",
      "survive": "",
      "born": "2",
      "description": "xxx"
   },
   {
      "id": 20,
      "name": "Serviettes",
      "survive": "",
      "born": "234",
      "description": "xxx"
   },
   {
      "id": 21,
      "name": "Stains",
      "survive": "235678",
      "born": "3678",
      "description": "xxx"
   },
   {
      "id": 22,
      "name": "Walled Cities",
      "survive": "2345",
      "born": "45678",
      "description": "xxx"
   }
];

class Life {
   
   constructor() {
      
      this.sheetProps = {
         width: 160, //80,
         height: 80, //80,
         cellSize: 5 //5
      };

      this.canvas = document.getElementById("life");
      this.canvas.width = this.sheetProps.cellSize * this.sheetProps.width;
      this.canvas.height = this.sheetProps.cellSize * this.sheetProps.height;
      
      this.isRedraw = true;
      
      this.layers = [{}, {}];
      this.topSheet = this.layers[0];
      this.bottomSheet = this.layers[1];

      this.init();
      
      this.interval = 0;
      
      /*
      this.topSheet[0][0] = 1;
      this.topSheet[0][1] = 1;
      this.topSheet[0][2] = 1;
      this.topSheet[0][3] = 1;

      this.topSheet[1][0] = 1;
      this.topSheet[1][1] = 1;
      this.topSheet[1][2] = 1;
      this.topSheet[1][3] = 1;
*/
      
      // if ctx is null then canvas is not supported
      this.ctx = this.canvas.getContext("2d");
      
      // Track the mouse
      // Only call after setup globals
      this.canvas.addEventListener("mousemove", function (e) {
      });

      // Track clicks
      this.canvas.addEventListener("click", function (/* e */) {
      });      
      
      document.getElementById("start").addEventListener("click", () => this.start());
      document.getElementById("stop").addEventListener("click", () => this.stop());
      
      
      let ruleSelect = document.getElementById("rules");
      ruleSelect.addEventListener("change", 
         () => this.changeRule(ruleSelect.value));
            
      for (var i=0; i<RULES.length; i++) {
         var opt = document.createElement('option');
         opt.value = RULES[i].id;
         opt.innerHTML = RULES[i].name;
         ruleSelect.appendChild(opt);         
      }
      
      this.changeRule(0);
   }
      
   init() {
      this.initSheet(this.topSheet);
      this.initSheet(this.bottomSheet);
      this.layers = this.topSheet;
   }
   
   initSheet(sheet) {
      for (let x=0; x< this.sheetProps.width; x++) {
         sheet[x] = {};
         for (let y=0; y< this.sheetProps.height; y++) {
            sheet[x][y] = Math.round(Math.random(0, 1));
            //sheet[x][y] = 0;
         }         
      }      
   }
      
   flip() {
      var t = this.bottomSheet;
      this.bottomSheet = this.topSheet;
      this.topSheet = t;
   }
   
   get properties() {
      return {
         updateStep: 1/60,
         renderStep: 1
      };
   }
   
   changeRule(value) {
      this.rule = value;
      this.stop();
      this.init();      
      
      document.getElementById("name").innerHTML = RULES[this.rule].name;
      document.getElementById("rule").innerHTML = RULES[this.rule].survive + '/' + RULES[this.rule].born;
   }
   
   start() {
      this.init();      

      this.interval = setInterval(() => this.update(), 200);        
      document.getElementById("start").disabled = true;
      document.getElementById("stop").disabled = false;
   }
   
   stop() {
      clearInterval(this.interval);
      document.getElementById("start").disabled = false;
      document.getElementById("stop").disabled = true;      
   }
   
   neighbours(sheet, x, y) {
      
      var offset = [
         { x:-1, y:-1 },
         { x:-1, y:0 },
         { x:1, y:1 },
         { x:0, y:-1 },
         { x:0, y:1 },
         { x:1, y:-1 },
         { x:1, y:0 },
         { x:-1, y:1 }
      ],
          count = 0;
      
      for (let c=0; c<8; c++) {
         
         let nx = x + offset[c].x;
         let ny = y + offset[c].y;

         if (nx < 0 || nx >= this.sheetProps.width || 
             ny < 0 || ny >= this.sheetProps.height) {
            continue;
         }

         if (sheet[nx][ny] > 0) {
            count++;
         }         
      }
      
      return count;
   }
   
   update() {
      
      var col = [
         'black',
         'orange',
         'red',
         'blue',
         'green'
         ],
         isModified = false,
          surviveRule = '',
          bornRule = '';
      
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      for (let x=0; x< this.sheetProps.width; x++) {
         for (let y=0; y< this.sheetProps.height; y++) {

            let gen = this.topSheet[x][y];
            
            if (gen > 0) {
               this.ctx.fillStyle = col[gen];
               this.ctx.fillRect(
                  x*this.sheetProps.cellSize, 
                  y*this.sheetProps.cellSize, 
                  this.sheetProps.cellSize-1, 
                  this.sheetProps.cellSize-1);
            }
         }         
      }
      
      for (let x=0; x< this.sheetProps.width; x++) {
         for (let y=0; y< this.sheetProps.height; y++) {

            let count = this.neighbours(this.topSheet, x, y);
            let gen = this.topSheet[x][y];
            let oldgen = gen;
            
            if (gen > 0) {
               
               if (RULES[this.rule].survive.includes(count + '')) {
                  gen = gen+1;
                  if (gen > 4) {
                     gen = 4;
                  }
               } else {
                  gen = 0;
               }
            } else {
               if (RULES[this.rule].born.includes(count + '')) {
                  gen = 1;
               }
            }
                        
            this.bottomSheet[x][y] = gen;
            
            if (oldgen !== gen) {
               isModified = true;
            }
            
         }         
      }
      
      if (isModified === false) {
         this.stop();
      }

      this.flip();
   }
   
}

new Life();

