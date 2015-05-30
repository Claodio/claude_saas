class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  # :The below statement can be interpreted as: User has a plan
  belongs_to :plan
  attr_accessor :stripe_card_token
  
  def  save_with_payement
    if valid?
      customer = Stripe::Customer.create(description: email, plan: plan_name, card: stripe_card_token)
      self.stripe_customer_token = customer.id
      save!
    end
  end
end
