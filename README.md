# maze-game
Mod 4 project: a maze game in React

A maze is generated with random tiles. Tiles are generated/fetched from the backend

Tiles know where in the maze they are, what exits they have, and if they are the exit. Users can see a 3x3 set of tiles at any given time.

Heirarchy:
  * App
    * Maze
      * Tile
    * Player
    
Relationships: 
Maze -< Tiles
Maze -< Attempts >- Player

Attempts keep track of number of steps, lower is better. Low scores are recorded

Authentication: to be determined

Data persistence: PostGres? SQL3?
  * Users can log in and see their best scores, compared to other users

Routing: routes are reflected in the url, e.g. /mazes/35/x3/y7

Styling: ???

Stretch goals: 
  * visually differentiating the tiles
  * animated character (Josh sprite?)
