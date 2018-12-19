class Api::V1::AuthController < Api::V1::ApplicationController
    skip_before_action :check_authentication

    def create 
        player = Player.find_by(email: params[:email])
        if player && player.authenticate(params[:password])
            render json: {
                token: JWT.encode({ player_id: player.id }, 'my_apps_secret')
            }
        else
            render json: {
                error: 'username or password are incorrect'
            }
        end
    end
end