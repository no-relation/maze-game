class Api::V1::MazesController < Api::V1::ApplicationController

    def show
        render json: Maze.find(params[:id]), methods: [ :nodes, :start_node, :end_node ]
    end
end
