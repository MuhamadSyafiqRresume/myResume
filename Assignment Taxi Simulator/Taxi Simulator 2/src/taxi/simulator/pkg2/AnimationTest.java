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
//main file - run this 
//contains jpanel class to show animation of taxi movement
import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.Rectangle;
import java.awt.Shape;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.image.BufferedImage;
import java.awt.image.ImageObserver;
import java.io.File;
import java.io.IOException;
import java.io.PrintStream;
import java.text.AttributedCharacterIterator;
import java.util.ArrayList;
import java.util.Random;
import java.util.Scanner;

import javax.imageio.ImageIO;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;
import javax.swing.Timer;

public class AnimationTest extends JPanel implements ActionListener{
	
	boolean status = false;
	int counter = 1;
	
	static int size;
	int fontSize = 10;
	Timer tm = new Timer(10, this);
	
	int taxiX = 35, vel = 1;
	int taxiY = 35;
	Color clr = Color.BLACK;
       
	
	private BufferedImage imagefetch,imagedrop,imageup,imagedown,imageright,imageleft,jamek;
	
	
	ArrayList<TaxiMovement> taxiMovement;
	
	public AnimationTest(ArrayList<TaxiMovement> taxiMovement) {
		System.out.println("Taxi started");
		this.taxiMovement = taxiMovement;
		try {
			imagefetch = ImageIO.read(new File("fetch.png"));
                        imagedrop = ImageIO.read(new File("drop.png"));
                        imageup = ImageIO.read(new File("up.png"));
                        imagedown = ImageIO.read(new File("down.png"));
                        imageright = ImageIO.read(new File("right.png"));
                        imageleft = ImageIO.read(new File("left.png"));
                        jamek=ImageIO.read(new File("jamek.jpg"));
		} catch (IOException e) {
			System.out.println("Car missing...");
		}
	}
	
	public void paintComponent(Graphics g) {
		super.paintComponent(g);
		g.setColor(clr);
              //  g.fillRect(0, 0, size*9*58, size*9*58);
              
                //g.fillRect(taxiX, taxiY, 60, 60);
		g.drawImage(jamek,0, 0, this);
              
                 
               if(taxiMovement.size() != 0) {
			switch(taxiMovement.get(0).getTrue()) {
		case "fetchPassen":// clr = Color.GREEN;
			g.drawImage(imagefetch, taxiX, taxiY, this);
			break;
		case "dropPassen": //clr = Color.blue;
			g.drawImage(imagedrop, taxiX, taxiY, this);
			break;
		case "up": 
			g.drawImage(imageup, taxiX, taxiY, this);
			break;
		case "down": 
			g.drawImage(imagedown, taxiX, taxiY, this);
			break;
		case "right": 
			g.drawImage(imageright, taxiX, taxiY, this);
			break;
		case "left": 
			g.drawImage(imageleft, taxiX, taxiY, this);
			break;
		}
			
		}
               else {
                   g.drawImage(imagedrop, taxiX, taxiY, this);
                   
                   tm.stop();
               }
		
		g.setFont(new Font("TimesRoman", Font.PLAIN, fontSize));
              //  g.drawImage(imageup, 0, 0, 0, 100*size, 100*size, 0, 100*size, 100*size, clr, this);
//		for (int i = 0; i <= 25; i++) {
//                    g.setColor(clr);
//		        if (i % 3 == 0) {
//		            int coord = i * 30;
//		            coord++;
//		            g.drawLine(coord+10, 0, coord+10, 58*(size*9));
//		            g.drawLine(0, coord+10, 58*(9*size), coord+10);
//		       }
//		   }
//		
//		for (int i = 0; i < size+1; i++) {
//                    g.setColor(clr);
//			g.drawString(Integer.toString(i), i*85, 10);
//			g.drawString(Integer.toString(i), 5, i*85);
//                      //  g.drawString("Masjid Jamek",60 ,60 );
//		}
		
		tm.start();
                
	}

    @Override
    public void actionPerformed(ActionEvent e) {
        if (taxiMovement.size() == 0) {
            System.out.println("end");
            tm.stop();
            return;
        }
        switch (taxiMovement.get(0).getTrue()) {
            case "fetchPassen":
//                clr = Color.GREEN;
                if (status) {
                    System.out.println(taxiMovement.get(0).getTime() + "Taxi fetch Passenger " + taxiMovement.get(0).getName());
                }
                break;
            case "dropPassen":
//                clr = Color.blue;
                if (status) {
                    System.out.println(taxiMovement.get(0).getTime() + "Taxi drop Passenger " + taxiMovement.get(0).getName());
                }
                break;
            case "up":
                taxiY = taxiY - vel;
//                clr = Color.RED;
                if (status) {
                    System.out.println(taxiMovement.get(0).getTime() + "Taxi move up");
                }
                break;
            case "down":
                taxiY = taxiY + vel;
//                clr = Color.RED;
                if (status) {
                    System.out.println(taxiMovement.get(0).getTime() + "Taxi move down");
                }
                break;
            case "right":
                taxiX = taxiX + vel;
//                clr = Color.RED;
                if (status) {
                    System.out.println(taxiMovement.get(0).getTime() + "Taxi move right");
                }
                break;
            case "left":
                taxiX = taxiX - vel;
//                clr = Color.RED;
                if (status) {
                    System.out.println(taxiMovement.get(0).getTime() + "Taxi move left");
                }
                break;
        }

        if (counter != 90) {
            status = false;
        } else {
            status = true;
            counter = 0;
        }

        counter++;
//		System.out.println("X: "+taxiX + " Y: "+taxiY);

        if (status) {
            taxiMovement.remove(0);
        }

        repaint();
    }

    public static int rn(int size) {
        Random rn = new Random();
        return rn.nextInt(size);
    }

    public static void main(String[] args) {
        PassengerNum a = new PassengerNum();
        a.setVisible(true);

        size = 5;

        String[][] mapArr = new String[size][size];
        Taxi taxi = new Taxi(mapArr);

//        Passenger P = new Passenger("A", rn(size), rn(size), rn(size), rn(size), mapArr, taxi);
//        Passenger P1 = new Passenger("B", rn(size), rn(size), rn(size), rn(size), mapArr, taxi);
//        Passenger P2 = new Passenger("C", rn(size), rn(size), rn(size), rn(size), mapArr, taxi);
//        taxi.printMap(mapArr);
//        taxi.sendPassengers();

        //animationPart
//        AnimationTest test = new AnimationTest(taxi.taxiMovement);
//        JFrame jf = new JFrame();
//        jf.setTitle("Test");
//        jf.setSize(size * 100, 20 + size * 100);
//        jf.setVisible(true);
//        jf.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
//        jf.add(test);
//
//        JFrame frame = new JFrame();
//        frame.add(new JLabel(" Output"), BorderLayout.NORTH);
//
//        JTextArea ta = new JTextArea();
//        TextAreaOutputStream taos = new TextAreaOutputStream(ta, 60);
//        PrintStream ps = new PrintStream(taos);
//        System.setOut(ps);
//        System.setErr(ps);
//
//        frame.add(new JScrollPane(ta));
//        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
//        frame.pack();
//        frame.setVisible(true);
//        frame.setSize(500, 600);

    }

}
