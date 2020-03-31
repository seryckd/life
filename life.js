/*jshint browser: true, esversion: 6*/

var RULES = [
   {
      "id": 0,
      "name" : "2x2",
      "author": "unknown",
      "survive": "125",
      "born": "36",
      "description": [
            "Similar in character to Conway's Life, but creates completely different patterns.",
            "Many different oscillators occur at random, and a rare glider. Simple block seeds usually lead to oscillators of various periods.",
            "This rule is also a 2x2 block universe. This means that patterns consisting entirely of 2x2 blocks, all aligned, will continue to consist of 2x2 blocks."
         ]
   },
   {
      "id": 1,
      "name": "34 Life",
      "survive": "34",
      "born": "34",
      "description": [""]
   },
   {
      "id": 2,
      "name": "Amoeba",
      "survive": "1358",
      "born": "357",
      "description": [""]
   },
   {
      "id": 3,
      "name": "Assimilation",
      "survive": "4567",
      "born": "345",
      "description":[""]
   },
   {
      "id": 4,
      "name": "Coagulations",
      "survive": "235678",
      "born": "378",
      "description": [""]
   },
   {
      "id": 5,
      "name": "Conway's Life",
      "author": "John Conway",
      "survive": "23",
      "born": "3",
      "description": [
         "This is the most famous cellular automata ever invented. People have been discovering patterns for this rule since around 1970. Large collections are available on the Internet.",
         "The rule definition is very simple: a living cell remains alive only when surrounded by 2 or 3 living neighbors, otherwise it dies of loneliness or overcrowding. A dead cell comes to life when it has exactly 3 living neighbors."
      ]
   },
   {
      "id": 6,
      "name": "Coral",
      "survive": "45678",
      "born": "3",
      "description": [""]
   },
   {
      "id": 7,
      "name": "Day & Night",
      "survive": "34678",
      "born": "3678",
      "description": [""]
   },
   {
      "id": 8,
      "name": "Diamoeba",
      "survive": "5678",
      "born": "35678",
      "description": [""]
   },
   {
      "id": 9,
      "name": "Flakes",
      "survive": "012345678",
      "born": "3",
      "description": [""]
   },
   {
      "id": 10,
      "name": "Gnarl",
      "survive": "1",
      "born": "1",
      "description": [""]
   },
   {
      "id": 11,
      "name": "High Life",
      "survive": "23",
      "born": "36",
      "description": [""]
   },
   {
      "id": 12,
      "name": "Inverse Life",
      "survive": "34678",
      "born": "0123478",
      "description": [""]
   },
   {
      "id": 13,
      "name": "Long Life",
      "survive": "5",
      "born": "345",
      "description": [""]
   },
   {
      "id": 14,
      "name": "Maze",
      "survive": "12345",
      "born": "3",
      "description": [""]
   },
   {
      "id": 15,
      "name": "Mazecrtic",
      "survive": "1234",
      "born": "3",
      "description": [""]
   },
   {
      "id": 16,
      "name": "Move",
      "survive": "245",
      "born": "368",
      "description": [""]
   },
   {
      "id": 17,
      "name": "Pseudo Life",
      "survive": "238",
      "born": "357",
      "description": [""]
   },
   {
      "id": 18,
      "name": "Replicator",
      "survive": "1357",
      "born": "1357",
      "description": [""]
   },
   {
      "id": 19,
      "name": "Seeds (2)",
      "survive": "",
      "born": "2",
      "description": [""]
   },
   {
      "id": 20,
      "name": "Serviettes",
      "survive": "",
      "born": "234",
      "description": [""]
   },
   {
      "id": 21,
      "name": "Stains",
      "survive": "235678",
      "born": "3678",
      "description": [""]
   },
   {
      "id": 22,
      "name": "Walled Cities",
      "survive": "2345",
      "born": "45678",
      "description": [""]
   }
];

class Life {
   
   constructor() {
      
      this.sheetProps = {
         width: 320, //80,
         height: 80, //80,
         cellSize: 5 //5
      };

      this.canvas = document.getElementById("life");
      this.canvas.width = this.sheetProps.cellSize * this.sheetProps.width;
      this.canvas.height = this.sheetProps.cellSize * this.sheetProps.height;
      
      document.getElementById("width").innerHTML = this.canvas.width;
      document.getElementById("height").innerHTML = this.canvas.height;
      document.getElementById("cell").innerHTML = this.sheetProps.cellSize;


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
      
      let widthSelect = document.getElementById("width");
      widthSelect.addEventListener("input",
         () => this.changeWidth(widthSelect.value));

      let heightSelect = document.getElementById("height");
      heightSelect.addEventListener("input",
         () => this.changeHeight(heightSelect.value));

      let cellSelect = document.getElementById("cell");
      cellSelect.addEventListener("input",
         () => this.changeCell(cellSelect.value));
      
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
      
      let rule = RULES[this.rule];

      document.getElementById("name").innerHTML = rule.name;
      document.getElementById("rule").innerHTML = rule.survive + '/' + rule.born;
      document.getElementById("author").innerHTML = rule.author;
      document.getElementById("description").innerHTML = rule.description.join('\n');
   }

   changeWidth(value) {
      document.getElementById("widthvalue").value = value;
      this.sheetProps.width = value;
   }
   changeHeight(value) {
      document.getElementById("heightvalue").value = value;
      this.sheetProps.height = value;
   }
   changeCell(value) {
      document.getElementById("cellvalue").value = value;
      this.sheetProps.cellSize = value;
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

         // wrapped

         if (nx < 0) {
            nx = this.sheetProps.width - 1;
         }
         if (nx >= this.sheetProps.width) {
            nx = 0;
         }
         if (ny < 0) {
            ny = this.sheetProps.height - 1;
         }
         if (ny >= this.sheetProps.height) {
            ny = 0;
         }

         // Bounded
/*
         if (nx < 0 || nx >= this.sheetProps.width || 
             ny < 0 || ny >= this.sheetProps.height) {
            continue;
         }
*/
         if (sheet[nx][ny] > 0) {
            count++;
         }         
      }
      
      return count;
   }
   
   update() {
      
      var colours = [
         'black',
         'orange',
         'red',
         'blue',
         'green'
         ],

          // green
          colgreen = [
            '#f7fcb9',
            '#d9f0a3',
            '#addd8e',
            '#78c679',
            '#41ab5d',
            '#238443',
            '#006837',
            '#004529 '
             ],
          colpurple = ['#f7fcfd','#e0ecf4','#bfd3e6','#9ebcda','#8c96c6','#8c6bb1','#88419d','#810f7c','#4d004b'],
          coldiverge = ['#c51b7d','#de77ae','#f1b6da','#fde0ef','#f7f7f7','#e6f5d0','#b8e186','#7fbc41','#4d9221'],
          colquat = ['#8dd3c7','#ffffb3','#bebada','#fb8072','#80b1d3','#fdb462','#b3de69','#fccde5','#d9d9d9'],
          col12 = ['#8dd3c7','#ffffb3','#bebada','#fb8072','#80b1d3','#fdb462','#b3de69','#fccde5','#d9d9d9','#bc80bd','#ccebc5','#ffed6f'],

         isModified = false,
          surviveRule = '',
          bornRule = '';
      
      colours = col12;

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      for (let x=0; x< this.sheetProps.width; x++) {
         for (let y=0; y< this.sheetProps.height; y++) {

            let gen = this.topSheet[x][y];
            
            if (gen > 0) {
               this.ctx.fillStyle = colours[gen];
               this.ctx.fillRect(
                  x*this.sheetProps.cellSize, 
                  y*this.sheetProps.cellSize, 
                  this.sheetProps.cellSize - 1,
                  this.sheetProps.cellSize - 1);
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
                  if (gen < colours.length-1) {
                     gen = gen + 1;
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

