class Api::V1::ApplicationController < ApplicationController
    # before_action :check_authentication

    # def check_authentication
    #     if !logged_in_player
    #         render json: { error: 'Please log in' }, status: 401
    #     end
    # end

    # def logged_in_player
    #     # split_token = request.headers['Authorization'].split(' ')
    #     # method = split_token[0]
    #     # token = split_token[1]
    #     # \/ Same as above
    #     if request.headers['Authorization']
    #         method, token = request.headers['Authorization'].split(' ')
    #         begin
    #             payload, headers = JWT.decode(token, 'my_apps_secret')
    #             current_player = Player.find(payload['player_id'])
    #         rescue JWT::DecodeError
    #             nil
    #         end
    #     end
    # end

end
