# Synonym

Synonym is a timed word game in which users guess possible synonyms of a given keyword. 

Play online at https://synonym.netlify.app/

## Technologies

Synonym uses the following technologies:

### Frontend

React, React Router, JWT Authentication, Microsoft Azure Speech-to-Text API, Custom CSS

### Backend

Ruby, Rails, PostgreSQL, JWT Authentication

## Features

On the homepage, a logged-in user can see their own high scores and a leaderboard with the high scores of all users. They can click to play either Synonym or Antonym.

![Homepage](https://user-images.githubusercontent.com/70274658/111839957-0565cf00-88d2-11eb-9ef3-80e0bddb828c.gif)

On the game play page, a user will be presented with a keyword and a list of anagrams (scrambled versions) of the synonyms of that word. The user types guesses into the guess form. Correct guesses will appear in green text in the "Found Words" section, and each correct guess will trigger a positive audio sound effect.

![Guess_one_word](https://user-images.githubusercontent.com/70274658/111840232-74dbbe80-88d2-11eb-9aad-8af633888a64.gif)

If a user guesses an incorrect word, they will hear a negative audio sound effect, and see the text "Not a valid word" in red.

![Wrong_guess](https://user-images.githubusercontent.com/70274658/111840312-9472e700-88d2-11eb-8306-650dc0601edf.gif)

A user can make guesses verbally by clicking on the microphone button. The app will convert the user's verbal guess to text in the guess form, and automatically submit the guess.

![Microphone_guess](https://user-images.githubusercontent.com/70274658/111840414-bf5d3b00-88d2-11eb-835e-8849caf4002b.gif)

If a user guesses all synonyms in a round, they receive a 500-point bonus, and the round ends.

![Guess_all_words](https://user-images.githubusercontent.com/70274658/111840479-d308a180-88d2-11eb-9a28-db20f3da8758.gif)

The round will automatically end if the timer runs out.

![End_round_modal](https://user-images.githubusercontent.com/70274658/111840510-e287ea80-88d2-11eb-82ef-a04b0abe2f16.gif)

If a user fails to guess at least two synonyms in a single round, they will see a "Game Over" modal pop-up.

![Game_over](https://user-images.githubusercontent.com/70274658/111840569-fe8b8c00-88d2-11eb-82a7-58d4319419f1.gif)
