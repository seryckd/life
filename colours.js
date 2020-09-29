/*jshint browser: true, esversion: 6*/
export class Colours {

   constructor() {
      this.start = { r:0, g:0, b:0};
      this.end = {r:255, g:255, b:255};
   }

   startx(r, g, b) {
      this.start = { r:r, g:g, b:b };
   }

   starty(rgb) {
      this.start = this.hexToRgb(rgb);
   }

   endx(r, g, b) {
      this.end = { r:r, g:g, b:b };
   }

   endy(rgb) {
      this.end = this.hexToRgb(rgb);
   }

   componentToHex(c) {
     var hex = c.toString(16);
     return hex.length == 1 ? "0" + hex : hex;
   }

   rgbToHex(colour) {
     return "#" + this.componentToHex(colour.r) + this.componentToHex(colour.g) + this.componentToHex(colour.b);
   }

   hexToRgb(hex) {
     var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
     return result ? {
       r: parseInt(result[1], 16),
       g: parseInt(result[2], 16),
       b: parseInt(result[3], 16)
     } : null;
   }

   range(count) {
      var rint = (this.end.r - this.start.r) / count,
         gint = (this.end.g - this.start.g) / count,
         bint = (this.end.b - this.start.b) / count,
         colours = [ this.rgbToHex(this.start) ],
         c = 0;

      for (c=1; c<count-1; c++) {
         colours.push(this.rgbToHex({
            r: Math.round(this.start.r + c*rint),
            g: Math.round(this.start.g + c*gint),
            b: Math.round(this.start.b + c*bint)
         }));
      }

      colours.push(this.rgbToHex(this.end));

      return colours;
   }
}
