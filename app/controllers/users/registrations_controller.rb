class Users::RegistrationController < Devise::RegistrationsController
  
  def create
    super do |resource|
      if params[:plan]
        resource.plan_name = params[:plan]
        if resource.plan_name == 'pro'
          resource.save_with_payment
        else
          resource.save
        end
       end
     end
  end
  
end