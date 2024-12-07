$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: "./nodes.json",
        dataType: "json",
        success: function(responseData, status){
            var output = "";
            var counter = 0;
            $.each(responseData.machines, function(i, machine){
                var lat = parseFloat(machine.location[0]);
                var lon = parseFloat(machine.location[1]);
                counter++;
                output += 'var marker' + counter + ' = L.marker(['+ lat + ',' + lon +']).addTo(map);';
                
            });
            var scriptTag = document.createElement('script');
            scriptTag.textContent = output;
            document.getElementById('markers').appendChild(scriptTag); // Append the new script to the markers script tag
            
            console.log(output);

        }
    })
})