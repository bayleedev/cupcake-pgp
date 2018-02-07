Feature: Manage Keys

  Scenario: Add a public key
  Given the app is launched
  And I am on the "Add Friend" page
  When I add Teddy's public key
  Then I should have 1 friend

  Scenario: Overwrite a public key with a private one
  Given the app is launched
  And I am on the "Add Friend" page
  When I add Teddy's public key
  And I add Teddy's private key
  Then I should have 1 friend
