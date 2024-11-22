$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: "./nodes.json",
        dataType: "json",
        success: function(responseData, status){
            var output = "<ul>";
            $.each(responseData.machines, function(i, machine){
                var lat = parseFloat(machine.location[0]);
                var lon = parseFloat(machine.location[1]);
                output += 'var marker = L.marker(['+ lat + ',' + lon +']).addTo(map);'
                
            });
            $('#current').html(output);
        }
    })
})