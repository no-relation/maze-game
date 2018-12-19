 #
    # A node is both a member of a directed graph, and a cell on an x,y
    # plane of possibly-connected maze passages.
    #
class Node < ApplicationRecord
    belongs_to :maze
    belongs_to :northNeighbor, foreign_key: :north_neighbor, class_name: 'Node', optional: true
    belongs_to :eastNeighbor, foreign_key: :east_neighbor, class_name: 'Node', optional: true
    belongs_to :southNeighbor, foreign_key: :south_neighbor, class_name: 'Node', optional: true
    belongs_to :westNeighbor, foreign_key: :west_neighbor, class_name: 'Node', optional: true
    
    attr_accessor :row, :col, :visited, :neighbors, :on_path

    def initialize(row:, col: )
        @row = row
        @col = col
        @visited = false
        @on_path = false
        # @neighbors = {north: nil, east: nil, south: nil, west: nil}
        super( { row: row, col: col})
    end

    # Connect this node to another node. The other node can only fit
    # in one of four cardinal directions from this node: North, South,
    # East, or West.
    def connect_to(other)
        if other.row == self.row - 1
            self.northNeighbor = other
            other.southNeighbor = self
        # self.neighbors[:north] = other
        # other.neighbors[:south] = self
        elsif other.row == self.row + 1
            self.southNeighbor = other
            other.northNeighbor = self
        # self.neighbors[:south] = other
        # other.neighbors[:north] = self
        elsif other.col == self.col + 1
            self.eastNeighbor = other
            other.westNeighbor = self
        # self.neighbors[:east] = other
        # other.neighbors[:west] = self
        elsif other.col == self.col - 1
            self.westNeighbor = other
            other.eastNeighbor = self
        # self.neighbors[:west] = other
        # other.neighbors[:east] = self
        end
        self.save
        other.save
        # Josh.lifesaver
    end
end