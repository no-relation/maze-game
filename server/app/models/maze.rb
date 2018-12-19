class Maze < ApplicationRecord
    has_many :attempts
    has_many :players, through: :attempts
    has_many :nodes
    belongs_to :start_node, foreign_key: :start_node_id, class_name: "Node"
    belongs_to :end_node, foreign_key: :end_node_id, class_name: "Node"
   
    #
    # A Maze is a container for Nodes, and is responsible for:
    #   - generating a maze by connecting unconnected nodes, and
    #   - finding a solution through an existing maze of connected nodes.
    #
  DIRECTIONS = [[-1, 0], [1, 0], [0, -1], [0, 1]]

  def initialize(attributes = {})
    @rows = attributes[:rows].to_i
    @cols = attributes[:columns].to_i
    nodes = []
    # Initialize the maze with a bunch of un-connected nodes
    @maze = Array.new(@rows) do |r|
      Array.new(@cols) do |c|
        node = Node.new({row: r, col: c})
        nodes << node
        node
      end
    end

    # Pick start and end nodes on opposite ends.
    @start_node = @maze[rand(@rows)][0]
    @end_node = @maze[rand(@rows)][@cols - 1]
    super( { nodes: nodes })
    self.generate
    byebug
    self.start_node = @start_node
    self.end_node = @end_node
    self.save
  end


  # Generate the maze.
  def generate
    # Make a stack of nodes along our walk
    stack = []

    # Visit the first node
    node = @start_node
    node.visited = true
    stack.push(node)

    # Now keep walking and finding nodes.
    while true
      next_node = get_next_unvisited(node)
      if next_node
        next_node.visited = true
        next_node.connect_to(node)
        stack.push(next_node)
        node = next_node
      else
        node = stack.pop
        break if !node
      end
    end
    stack
  end

  def solve
    # Reset visited state on all nodes.
    @maze.each do |row|
      row.each do |node|
        node.visited = false
      end
    end

    stack = []

    # Visit the first node
    node = @start_node
    node.visited = true
    node.on_path = true

    while true
      next_node = get_next_in_graph(node)

      if next_node
        next_node.visited = true
        next_node.on_path = true

        # If we're at the exit, we're done.
        break if next_node == @end_node

        # Otherwise, push onto the stack and keep going.
        stack.push(node)
        node = next_node
      else
        # This would only happen if there were no solution.
        break if stack.size == 0

        # 'node' has no un-visited neighbors, so it can't be on the
        # path.
        node.on_path = false
        node = stack.pop
      end
    end

  end

  # When walking a completed maze, we are doing a random walk of a
  # directed graph, so it's simpler than the random walk to create the
  # maze.
  def get_next_in_graph(node)
    node.neighbors.values.compact.shuffle
      .select {|neighbor| !neighbor.visited }.first
  end

  # When generating a new maze, we need to find the next un-visited
  # neighboring node.
  def get_next_unvisited(node)
    neighbors = []

    DIRECTIONS.each do |dir|
      new_row = node.row + dir[0]
      new_col = node.col + dir[1]

      if new_row >= 0 && new_row < @rows &&
          new_col >= 0 && new_col < @cols &&
          !@maze[new_row][new_col].visited
        neighbors << @maze[new_row][new_col]
      end
    end

    neighbors[rand(neighbors.length)]
  end

end
