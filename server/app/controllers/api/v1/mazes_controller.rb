class Api::V1::MazesController < Api::V1::ApplicationController

    before_action :define_current_maze

    skip_before_action :check_authentication
    
    def create
        maze = Maze.create(maze_params)
        render json: maze
    end
    
    def index
        render json: Maze.all, methods: [ :nodes, :start_node, :end_node ]
    end
    
    def show
        render json: Maze.find(params[:id]), methods: [ :nodes, :start_node, :end_node ]
    end
    
    def update
        current_maze.update(maze_params)
        render json: current_maze
    end
    
    def destroy
        current_maze.destroy
        render json: current_maze
    end
    
    def maze_params
        params.permit(:rows, :columns, :high_score)
    end
    
    def define_current_maze
        if params[:id]
            @current_maze = Maze.find(params[:id])
        else
            @current_maze = Maze.new
        end
    end
    
    def current_maze
        @current_maze
    end

end