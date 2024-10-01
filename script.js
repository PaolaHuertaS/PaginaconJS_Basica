document.addEventListener('DOMContentLoaded', function() {
 
    var clearAllButton = document.getElementById('clearAll');
    
    clearAllButton.addEventListener('click', function() {
        var inputs = document.getElementsByTagName('input');

        for (var i = 0; i < inputs.length; i++) {
            inputs[i].value = '';
        }
    });
});
