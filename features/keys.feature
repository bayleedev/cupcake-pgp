Feature: Manage Keys

  Scenario: Add a public key
  Given the app is launched
  When I add Teddy Bear's public key
  Then I should have 1 friends named "Teddy Bear"

  Scenario: Overwrite a public key with a private one
  Given the app is launched
  And I have Teddy Bear as a friend
  When I add Teddy Bear's private key
  Then I should have 1 friends named "Teddy Bear"

  Scenario: Delete a key
  Given the app is launched
  And I have Teddy Bear as a friend
  When I delete Teddy Bear's key
  Then I should have 0 friends named "Teddy Bear"
