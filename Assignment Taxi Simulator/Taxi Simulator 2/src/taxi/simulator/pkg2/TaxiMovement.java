/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package taxi.simulator.pkg2;

/**
 *
 * @author Asus
 */
//get infomation about the taxi for animation jpanel


public class TaxiMovement {
	boolean fetchPassen = false;
	boolean dropPassen = false;
	boolean up = false;
	boolean down = false;
	boolean right = false;
	boolean left = false;
	int time = 0;
	Coordinate coordinate;
	
	public TaxiMovement(Coordinate coordinate, String order, int time) {
		switch(order) {
		case "fetchPassen": this.fetchPassen = true;
			break;
		case "dropPassen": this.dropPassen = true;
			break;
		case "up": this.up = true;	
			break;
		case "down": this.down = true;	
			break;
		case "right": this.right = true;	
			break;
		case "left": this.left = true;	
			break;
		}
		this.time = time;
		this.coordinate = coordinate;
	}
	
	public String getTrue() {
		if(fetchPassen)
			return "fetchPassen";
		else if(dropPassen)
			return "dropPassen";
		else if(up)
			return "up";
		else if(down)
			return "down";
		else if(right)
			return "right";
		else
			return "left";
	}
	
	public String getName() {
		return coordinate.getName();	
	}
	
	public String getTime() {
		return "[ "+ time + " minute ]";
	}
}


