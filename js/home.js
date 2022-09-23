$(document).ready(function() {
    alert("Ready to go!");
    loadItems();
    addMoney();
    selectItem(id);
    returnChange();
    
});
   
    $('#purchaseButton').on('click', function(){
        var id = $('#itemIDOutput').val();
        var amount = $('#moneyIn').val();
            
            $.ajax({
                type: 'POST',
                url: 'http://vending.us-east-1.elasticbeanstalk.com/money/' + amount + '/item/' + id,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                'dataType': 'json',
                
                success: function(change, data){
                    //var change = '';
                    var quarters = change.quarters;
                    var dimes = change.dimes;
                    var nickels = change.nickels;
                    var pennies = change.pennies;

                    $('#changeOutput').val(quarters + ' quarters, ' + nickels + ' nickels, ' + dimes + ' dimes, ' + pennies + ' pennies');
                    $('#messageOutput').val('Thank you!');
                    $('#moneyIn').val(0);
                },
                error: function(data, status) {
                    var message = data.responseJSON.message;
                    $('#messageOutput').val(message);
                }
            });
    });

function loadItems(){
    var contentRows = $('#contentRows');
    $.ajax({
        type: 'GET',
        url: 'http://vending.us-east-1.elasticbeanstalk.com/items',
        headers: {
            "accept": "application/json"
        },
        success:function (itemArray){
            $.each(itemArray, function(index, item){
                var itemId = item.id;
                var name = item.name;
                var price = item.price;
                var quantity = item.quantity;

                var row = '<div  class="col-md-4">' + '<article onclick="selectItem('+itemId+')">' + '<p>' + itemId + '</p>' + '<p>' + name + '</p>' + '<p>' + '$' + price + '</p>' +'<p>'+ 'Quantity Left: ' + quantity +'</p>' + '</article>' + '</div>';
                    
                contentRows.append(row);
            })
        },
        error: function() {
            $('#errorMessages')
                .append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger'})
                .text('Error calling web service. Please try again later.'));

        }
    });
}
function addMoney() {
    $('#moneyIn').val(0);
    $('#changeOutput').val(0);

    $('#addDollar').on('click', function(event){
        var balance = parseFloat($('#moneyIn').val());
            balance += 1;
        $('#moneyIn').val(balance.toFixed(2));
    });

    $('#addQuarter').on('click', function(event){
        var balance = parseFloat($('#moneyIn').val());
            balance += 0.25;
        $('#moneyIn').val(balance.toFixed(2));
        
    });

    $('#addDime').on('click', function(event){
        var balance = parseFloat($('#moneyIn').val());
            balance += 0.10;
        $('#moneyIn').val(balance.toFixed(2));
    });    

    $('#addNickel').on('click', function(event){
        var balance = parseFloat($('#moneyIn').val());
            balance += 0.05;
        $('#moneyIn').val(balance.toFixed(2));
        
    });
}
function returnChange(){
    $('#itemIDOutput').val('');
    $('#messageOutput').val('');

    var change = $('#moneyIn').val();
    var pennies, quarters, dimes, nickels;
     
    if (change > 0) {
        pennies = Math.floor(change * 100);
        quarters = Math.floor(pennies / 25);
        pennies -= Math.floor(quarters * 25);
        dimes = Math.floor(pennies / 10);
        pennies -= Math.floor(dimes * 10);
        nickels = Math.floor(pennies / 5);
        pennies -= Math.floor(nickels * 5);

        $('#changeOutput').val(quarters + ' quarters, ' + nickels + ' nickels, ' + dimes + ' dimes, ' + pennies + ' pennies');
        money = 0;
        $('#moneyIn').val(0);        
    }else{
        $('#moneyIn').val(0);
        $('#changeOutput').val('');
        $('#messageOutput').val('');
        $('#itemIDOutput').val('');
    amount = 0;

    $('#contentRows').empty();
    loadItems();
    }        
}

function selectItem(id){
    $("#itemIDOutput").val(id);
}


  


    

