/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package pkg2048;

/**
 *
 * @author Asus
 */
import java.util.Scanner;
public class AbcdThegame {
    
    private static int row;
    private static int column;



    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int points=0;
        String username;
        
        System.out.println("Welcome! Press enter to start!");
        sc.nextLine();
        
        System.out.print("Enter your username: ");
        username = sc.nextLine();
        Menu menu = new Menu(username,points);
        Movement move = new Movement(points);
        Player user = new Player(username,points);
        
        while (true) {
        menu.mainMenu();
        user.getScore();
        row = menu.getRow();            //from menu
        column = menu.getColumn();      //from menu
        Tile abcd = new Tile(row,column);
        
        int[][] tiles = new int[row][column];
        int[][] undo = new int[row][column];
        
        move.mainMovemonet(abcd, user, row, column, tiles, undo);
        }

    }
    
}

