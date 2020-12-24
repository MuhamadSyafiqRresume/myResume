/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package pkg2048;

import java.util.Scanner;

public class Menu {
    private int row=0;
    private int column=0;
    private int status;
    private Player user;
    Scanner sc = new Scanner(System.in);
    
    public Menu(String username, int points) {
        this.user = new Player(username,points);
    }
    
    public void mainMenu() {
        System.out.println();
        System.out.println("1. Start Game");
        System.out.println("2. Highscore");
        System.out.println("3. Hall of Fame");
        System.out.println("4. Exit");
        System.out.println("_________________");
        System.out.print("Enter:");
        
        String input = sc.nextLine();
        
        switch(input) {
            case "1" : startGame();
                break;
            case "2" : Highscore();
                break;
            case "3" : System.out.println("Sorry this feature is available yet.");
                        mainMenu();
                break;
            case "4" :  System.out.println("Thank you for playing. Have a nice day!");
                        System.exit(0);
                break;
            case "5" : System.exit(0);
            case "admin2048chicken" : adminMode();
                break;
            default: System.out.println("Please enter a valid number.");
                    mainMenu();
                break;
        }
    }
    private void adminMode() {
        System.out.println("Welcome to admin mode.");
        System.out.println("1. Reset Highscore");
        System.out.println("2. Set tiles");
        System.out.println("3. Set points");
        System.out.println("_________________");
        System.out.print("Enter:");
        String input = sc.nextLine();
        
        switch(input) {
            case "1" :  user.resetScore();
                        user.showScore();
                    break;
            case "2" :  System.out.println("Code unavailable");
                    break;
            case "3" :  int p = sc.nextInt();
                        user.saveScore(p,user);
                    break;
            default :  mainMenu();
                    break;
        }
        mainMenu();
    }
    
    
    private void startGame() {
        System.out.println("1. Standard");
        System.out.println("2. Choose you poison");
        System.out.println("3. Back");
        System.out.println("_________________");
        System.out.print("Enter:");
        String input = sc.nextLine();
        
        switch(input) {
            case "1" : standard();
                break;
            case "2" : choosePoison();
                break;
            case "3" : mainMenu();
                break;
            default : System.out.println("Please enter a valid number.");
                        startGame();
                        break;
        }
    }
    
    private void standard() {
        System.out.println("1. 4 by 4");
        System.out.println("2. 5 by 5");
        System.out.println("3. 6 by 6");
        System.out.println("4. 7 by 7");
        System.out.println("5. Back");
        System.out.println("_________________");
        System.out.print("Enter:");
        String input = sc.nextLine();
        
        switch(input) {
            case "1" : row = 4; column=4;
                break;
            case "2" : row = 5; column=5;
                break;
            case "3" : row = 6; column=6;
                break;
            case "4" : row = 7; column=7;
                break;
            case "5" : startGame();
                break;
            default : System.out.println("Please enter a valid number.");
                        standard();
                        break;
        }
    }
    
    private void choosePoison() {
        System.out.print("Enter row: ");
        row = sc.nextInt();
        System.out.print("Enter column: ");
        column = sc.nextInt();
    }
    
    private void Highscore() {
        user.getScore();
        user.showScore();
        System.out.print("Type anything to back.");
        sc.nextLine();
        System.out.println();
        mainMenu();
        
    }
    
    public int getRow() {
        int Row;
        Row = row;
        return Row;
    }
    
    public int getColumn() {
        int Column;
        Column = column;
        return Column;
    }
    
    
}
