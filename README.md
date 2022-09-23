# Vending-Machine-REST-API
Dynamic user-interface consuming a REST API.
Using the Vending Machine Adding Money Users should add money to the vending machine by pressing one of the four 'Add *' buttons in the form on the right side. Each button should update the total input field by the appropriate amount to keep a running total.

Selecting an Item The user can select an item to be purchased by clicking on the desired item element within the item list on the left side of the page. This should then update the middle form to display the ID of the selected item.

Purchasing an Item A user may attempt to make a purchase at any time by clicking the "Make Purchase" button. If pressed, and no item selection has been made, the "Messages" input should display "Please make a selection". When the "Make Purchase" button is pressed and there is an item selected, the purchase request is made using the "money" API request using the specification below.

If the purchase request is sent and succeeds, the machine should refresh the item stock, selection, and money, as well as display "Thank You!!" and any change returned by the web service. However, if the purchase request instead returns in an error, the error message should be displayed in the "Messages" input without changing the selection or "Total $ In". In addition to the error message display, the items list should also be refreshed to show current stock and quantities.

Returning Change When the "Change Return" button is pressed, the amount of money displayed in "Total $ In" should be returned in a correct number of quarters, dimes, nickels, and pennies and the "Total $ In" should be zeroed. If the "Total $ In" is zero, then the "Change" input field should be cleared.

The format of the returned change will be "yy coin(s)" where yy is the number of a specific coin and coin is quarter, dime, nickel, or penny. If multiple coin types are needed, they will be separated by a comma and space.

After a successful purchase, selecting any item, depositing money, or pressing "Change Return" should clear the input fields before processing.
