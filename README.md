# maze-game
Mod 4 project: a maze game in React

to be cleaned up:
 * don't need row and col attributes in Maze class
 
A new maze is generated with forked ruby code and stored in backend

Tiles know where in the maze they are, what exits they have, and if they are the exit. Users can see a 3x3 set of tiles at any given time.

React Heirarchy:
  * App
    * Maze
      * Tile
    * Player
    
Rails Models:
  * User: name, email, password_digest
  * Maze: layout (array of arrays), shortest route?, leaderboard (hash)
  * Attempts: maze id (foreign key), user id (foreign key), current score(step count or time?)

Relationships: 
* Maze -< Tiles
* Maze -< Attempts >- Player

Attempts keep track of number of steps, lower is better. Low scores are recorded

Authentication: users login, use JWT and bcrypt

Data persistence: PostGres? SQL3?
  * Users can log in and see their best scores, compared to other users

Routing: ~~routes are reflected in the url, e.g. /mazes/35/x3/y7~~
  generated mazes have an ID, which means a permanent, sharable URL

Styling: ???

Stretch goals: 
  * guest users can try mazes but can't post scores
  * visually differentiating the tiles
  * leaderboard for each maze with top times, instead of single best time
  * animated character (Josh sprite?)
