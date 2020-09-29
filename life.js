/*jshint browser: true, esversion: 6*/

import {Rules} from "./rules.js";
import {Colours} from "./colours.js";

class Life {
   
   constructor() {
      
      this.sheetProps = {
         width: 320, //80,
         height: 80, //80,
         cellSize: 5 //5
      };

      this.canvas = document.getElementById("life");
    //  this.canvas.width = this.sheetProps.cellSize * this.sheetProps.width;
   //   this.canvas.height = this.sheetProps.cellSize * this.sheetProps.height;

      this.canvas.width = 500;
      this.canvas.height = 300;

      
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
            
      for (var i=0; i<Rules.length; i++) {
         var opt = document.createElement('option');
         opt.value = Rules[i].id;
         opt.innerHTML = Rules[i].name;
         ruleSelect.appendChild(opt);         
      }
      
      document.getElementById('begin')
         .addEventListener('change', () => this.changeColours());
      document.getElementById('end')
         .addEventListener('change', () => this.changeColours());

      this.changeCell(4);
      this.changeWidth(200);
      this.changeHeight(100);
      this.changeRule(5);
      this.changeColours();
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
   
   changeColours() {
      let c = new Colours();
      c.starty(document.getElementById('begin').value);
      c.endy(document.getElementById('end').value);
      this.colours = c.range(6);
      for (let i=1; i<=this.colours.length; i++) {
         document.getElementById('Colour' + i).style = 'background-color:' + this.colours[i-1];
      }
   }

   changeRule(value) {
      this.rule = value;
      this.stop();
      this.init();      
      
      let rule = Rules[this.rule];

      document.getElementById("name").innerHTML = rule.name;
      document.getElementById("rule").innerHTML = rule.survive + '/' + rule.born;
      document.getElementById("author").innerHTML = rule.author;
      document.getElementById("description").innerHTML = rule.description.join('\n');
   }

   changeWidth(value) {
      document.getElementById("widthvalue").value = value;
      this.sheetProps.width = +value;
   }
   changeHeight(value) {
      document.getElementById("heightvalue").value = value;
      this.sheetProps.height = +value;
   }
   changeCell(value) {
      document.getElementById("cellvalue").value = value;
      this.sheetProps.cellSize = +value;
   }
   
   start() {
      this.init();      

      this.render();
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
      
      const offset = [
         { x:-1, y:-1 },
         { x:-1, y:0 },
         { x:1, y:1 },
         { x:0, y:-1 },
         { x:0, y:1 },
         { x:1, y:-1 },
         { x:1, y:0 },
         { x:-1, y:1 }
      ];

      var count = 0;
      
      for (let c=0; c<8; c++) {
         
         let nx = x + offset[c].x;
         let ny = y + offset[c].y;

         // wrapped

         if (nx < 0)
            nx += this.sheetProps.width;
         if (nx >= this.sheetProps.width)
            nx -= this.sheetProps.width;
         if (ny < 0)
            ny += this.sheetProps.height;
         if (ny >= this.sheetProps.height)
            ny -= this.sheetProps.height;

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
   
   render() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      for (let x=0; x< this.sheetProps.width; x++) {
         for (let y=0; y< this.sheetProps.height; y++) {

            let gen = this.topSheet[x][y];
            
            if (gen > 0) {
               this.ctx.fillStyle = this.colours[gen];
               this.ctx.fillRect(
                  x*this.sheetProps.cellSize, 
                  y*this.sheetProps.cellSize, 
                  this.sheetProps.cellSize - 1,
                  this.sheetProps.cellSize - 1);
            }
         }         
      }
   }

   update() {
      var isModified = false,
          surviveRule = '',
          bornRule = '';
      
      for (let x=0; x< this.sheetProps.width; x++) {
         for (let y=0; y< this.sheetProps.height; y++) {

            let count = this.neighbours(this.topSheet, x, y);
            let gen = this.topSheet[x][y];
            let oldgen = gen;
            
            if (gen > 0) {
               
               if (Rules[this.rule].survive.includes(count + '')) {
                  if (gen < this.colours.length-1) {
                     gen = gen + 1;
                  }
               } else {
                  gen = 0;
               }
            } else {
               if (Rules[this.rule].born.includes(count + '')) {
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
      this.render();
   }
   
}

new Life();

