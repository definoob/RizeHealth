# Online Visit

This is the initial customer flow front-end( Development Mode )

# The overall flow of this project

- Login
  1.  Select state, if valid
  2.  Select Birthdate, if valid
  3.  Enter user email and password.
  4.  Create Account by `GET /new_user_0`
- Verify
  1.  User gets welcome email from the app.
  2.  Enter the verification code.
- Survey
  The app works like below.
  1.  It gets the first question by `GET /first_question?list=(ed or hairloss)`
  2.  User posts the answer for the question by `POST /question_responses`. And it returns the next question.
      If it doesn't return the next question, it means user has finished the survey, and redirect to `Treatment` Page.
  3.  When user goes back to the previous question, it gets the prev question by `GET /previous_question?id`.
- Treatment
  1.  There are two parts for Treatment page - one is for ED, and one is for Hairloss.
  2.  By `GET /products?list`, it returns the products for each treatment.
  3.  User selects the product, usage frequency and shipment frequency.
  4.  Create subscription by `GET /summary?subscription_offering_id`.
  5.  It redirects to `Summary` Page.
