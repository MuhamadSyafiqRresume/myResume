/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package pkg2048;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.PrintWriter;

public class Player {
    private String user = "noname";
    private String[] names = new String[10];
    private int[] scores = new int[10];
    private int score=0;
    private int adminScore=0;
    
    public Player(String player,int points) {
        user = player;
        score = points;
    }
    
    public void saveScore(int points, Player user) {
        adminScore=points;
    }
    
    public void saveScore(int points) {
        score=points+adminScore;
    }
    
    public void changeName(String newname) {
        user = newname;
    }
    
    public void test() {
        System.out.println(score);
        System.out.println(user);
    }
    
    public void resetScore() {
        for(int i=0; i<10; i++) {
            names[i] = "-";
            scores[i] = 0;
        }
        saveHighscoreToDat();
        System.out.println("Highscore reset.");
    }
    
    public void saveHighscoreToDat() {
        checkScore();
        try {
            ObjectOutputStream highscore = new ObjectOutputStream( new FileOutputStream("highscore.dat"));
            for(int i=0; i<10; i++) {
                highscore.writeUTF(names[i]);
                highscore.writeInt(scores[i]);
            }
            highscore.close();
       } catch(IOException e) {
           System.out.println("Problem with score saving.");
       }
        
        saveHighscoreToNote();
    }
    
    private void saveHighscoreToNote () {
        try {
            PrintWriter highscores = new PrintWriter (new FileOutputStream("highscore.txt"));
            highscores.println("Users \t\t\tScores");
            for(int i=0; i<10; i++) {
                highscores.print(names[i] + "\t\t\t") ;
                highscores.println(scores[i]);
            }
            highscores.close();
        } catch (IOException e) {
            System.out.println("Ops. Something didn't go as planned.");
        }
    }
    
    public void getScore() {
        
        for(int i=0; i<10; i++) {
            names[i] = "-";
            scores[i] = 0;
        }
        
        try {
            ObjectInputStream highscores = new ObjectInputStream ( new FileInputStream("highscore.dat"));
            for(int i=0; i<10; i++) {
                names[i] = highscores.readUTF();
                scores[i] = highscores.readInt();
            }
            highscores.close();
        } catch (FileNotFoundException e) {
            System.out.println("Fetching highscore data.");
            saveHighscoreToDat();
        } catch (IOException e) {
            System.out.println("Can't seem to retrieve something important.");
        }
    }
    
    public void showScore() {
        System.out.println("User \t\t\tScore");
        for(int i=0; i<10; i++) {
            System.out.print(names[i]+"\t\t\t");
            System.out.print(scores[i]);
            System.out.println();
        }
    }
    
    private void checkScore() {
        if (score > scores[9]) {
            names[9]=user;
            scores[9] = score;
            
            for(int i=8; i>=0; i--) {
            if (scores[i+1] > scores[i]) {
                int temp = scores[i];
                scores[i] = scores[i+1];
                scores[i+1] = temp;
                
                String temp1 = names[i];
                names[i] = names[i+1];
                names[i+1] = temp1;
            }
        }
        
        }
    }

    
}
