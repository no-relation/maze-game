# Maze Game
## Can you find the way out?

Mazes are randomly generated from a given size using the [recursive backtracing method](https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_backtracker). You can see [a visualization of the process here](https://cdn.rawgit.com/actsasbuffoon/maze-js/master/index.html), thanks to [actasabuffoon on GitHub](https://github.com/actsasbuffoon/maze-js). I used a Ruby implementation of the method [from sethm on GitHub](https://github.com/sethm/ruby_maze), with modifications to deliver it as a Rails API.

---

### Installation
This project uses PostgreSQL for its database.

1. Clone down the repo
2. Go to the backend directory on the terminal: `cd <DIRECTORY OF CHOICE>/maze-game/server`
3. Run the server: `rails server`
4. In a different terminal, go to the frontend directory: `cd <DIRECTORY OF CHOICE>/maze-game/client`
5. Run `npm install && npm start`. It will prompt if you want to use a port other than 3000; hit Y, or just Enter.

<!--
# maze-game
Mod 4 project: a maze game in React



to be cleaned up:
 * unused routes
 
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
  
  -->
