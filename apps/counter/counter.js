let drag;
var tx;

function connect(){
 NRF.connect("28:CD:C1:01:8D:5F").then(function(g) {
  return g.getPrimaryService("6e400001-b5a3-f393-e0a9-e50e24dcca9e");
}).then(function(service) {
  return service.getCharacteristic("6e400002-b5a3-f393-e0a9-e50e24dcca9e");
}).then(function(characteristic) {
   g.setColor(0,1,0);
  g.fillCircle(10,145,10); 
   tx = characteristic;
  return;
});
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
					tx.writeValue(0x6c);
					//sendText("left");
				} else {
					tx.writeValue(0x72);
					//sendText("right");
				}
			} else if (Math.abs(dy)>Math.abs(dx)+10) {
				 //vertical
				if (dx < dy) {
					tx.writeValue(0x66);
					//sendText("down");
				} else {
					tx.writeValue(0x62);
					//sendText("up");
				}
			} else {
          if (e.x > 140 && e.y > 140) {tx.writeValue(0x73);}//lower right
			    else if (e.x < 45 && e.y < 45)   {console.log(" "+e.x+" "+e.y);}
			    else if (e.x > 140 && e.y < 45)  {console.log(" "+e.x+" "+e.y);}
			    else if (e.x < 45 && e.y > 140)  {connect();}//lower right
      }
			
		} // else released
});
}
g.clear();
g.setColor(0,0,0);
g.drawString("start swiping...",50,50);
g.setColor(1,0,0);
g.fillCircle(145,145,10);
init();
