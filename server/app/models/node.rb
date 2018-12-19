 #
    # A node is both a member of a directed graph, and a cell on an x,y
    # plane of possibly-connected maze passages.
    #
class Node < ApplicationRecord
    attr_accessor :row, :col, :visited, :neighbors, :on_path
    belongs_to :northNeighbor

    def initialize(row, col, maze)
        @row = row
        @col = col
        @visited = false
        @on_path = false
        @neighbors = {north: nil, east: nil, south: nil, west: nil}
        super( { maze: maze, row: row, col: col})
    end

    # Connect this node to another node. The other node can only fit
    # in one of four cardinal directions from this node: North, South,
    # East, or West.
    def connect_to(other)
        if other.row == self.row - 1
        self.neighbors[:north] = other
        other.neighbors[:south] = self
        elsif other.row == self.row + 1
        self.neighbors[:south] = other
        other.neighbors[:north] = self
        elsif other.col == self.col + 1
        self.neighbors[:east] = other
        other.neighbors[:west] = self
        elsif other.col == self.col - 1
        self.neighbors[:west] = other
        other.neighbors[:east] = self
        end
        self.save
    end
end