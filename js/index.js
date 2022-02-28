$(document).ready(function(){

    console.log("script is linked");

    const searchBtn = document.querySelector('#searchBtn');

    // default from period (week)
    let fromPeriod = $('#fromDateSelect').val();

    // user setting from period
    $('#fromDateSelect').change(function(){
        fromPeriod = $('#fromDateSelect').val();
    });

    function keyword() {
        $('#resultsCtn').empty();

        // keyword query
        let x = document.getElementById("myText");
        let defaultVal = x.defaultValue;
        let currentVal = x.value;

        // setting date
        let d = new Date();
        let fromDate = "";
        
        console.log(fromPeriod);

        // setting date based on selected from period
        switch (fromPeriod) {
            case "day":
                d.setDate(d.getDate()-1)
                fromDate = d.toLocaleString()
                break;
            case "week":
                d.setDate(d.getDate()-7)
                fromDate = d.toLocaleString()
                break;
            case "month":
                d.setMonth(d.getMonth() - 1);
                fromDate = d.toLocaleString()
                break;
            case "year":
                d.setFullYear(d.getFullYear() - 1);
                fromDate = d.toLocaleString()
        }
        console.log(fromDate);

        // language select
        language = $('#languageSelect').val();
        
        console.log(language);

        let url ="https://newsapi.org/v2/everything?q=" + currentVal + "&from=" + fromDate + "&sortBy=popularity&language=" + language + "&pageSize=10&apiKey=" + key;

          $.ajax({
            method: 'GET',
            url: url,
            success: function(data){
                // console.log(dateLastWeek);

                for (let i = 0; i < data.articles.length; i++) {
                    console.log(data.articles[i]);

                    $('#resultsCtn').append(
                        `
                        ${data.articles[i].title}
                        `
                    );
                }
            
            }
        });
    }

    // when language is changed run search to update
    $('#languageSelect').change(function(){
        keyword();
    });


    

    


    searchBtn.addEventListener("click", keyword);
    

    

    

    

});