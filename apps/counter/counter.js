let drag;

function sendText(s){
  g.clear();
  g.setFont("6x8:2");
  g.drawString(s,50,50);
}

function init() {
Bangle.on("drag", e => {
		if (!drag) { // start dragging
			drag = {x: e.x, y: e.y};
		} else if (!e.b) { // released
			const dx = e.x-drag.x, dy = e.y-drag.y;
			drag = null;
			if (Math.abs(dx)>Math.abs(dy)+10) {
				// horizontal
				if (dx < dy) {
					console.log("left " + dx + " " + dy);
					sendText("left");
				} else {
					console.log("right " + dx + " " + dy);
					sendText("right");
				}
			} else if (Math.abs(dy)>Math.abs(dx)+10) {
				 //vertical
				if (dx < dy) {
					console.log("down " + dx + " " + dy);
					sendText("down");
				} else {
					console.log("up " + dx + " " + dy);
					sendText("up");
				}
			} else {
          if (e.x > 140 && e.y > 140) {console.log(" "+e.x+" "+e.y);sendText("lower right");}
			    else if (e.x < 45 && e.y < 45)   {console.log(" "+e.x+" "+e.y);sendText("upper left");}
			    else if (e.x > 140 && e.y < 45)  {console.log(" "+e.x+" "+e.y);sendText("upper right");}
			    else if (e.x < 45 && e.y > 140)  {console.log(" "+e.x+" "+e.y);sendText("lower left");}
      }
			
		} // else released
});
}
g.clear();
g.drawString("start swiping...",50,50);
init();
