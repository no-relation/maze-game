class Api::V1::AttemptsController < Api::V1::ApplicationController
    before_action :define_current_attempt

    skip_before_action :check_authentication, only: [ :index ]
    
    def create
        attempt = Attempt.create(attempt_params)
        render json: attempt
    end
    
    def index
        render json: Attempt.all
    end
    
    def show
        render json: current_attempt
    end
    
    def update
        current_attempt.update(attempt_params)
        render json: current_attempt
    end
    
    def destroy
        current_attempt.destroy
        render json: current_attempt
    end
    
    def attempt_params
        params.permit(:player_id, :maze_id)
    end
    
    def define_current_attempt
        if params[:id]
            @current_attempt = Attempt.find(params[:id])
        else
            @current_attempt = Attempt.new
        end
    end
    
    def current_attempt
        @current_attempt
    end

end
