$(document).ready(function(){

    console.log("script is linked");

    const searchBtn = document.querySelector('#searchBtn');

    function myFunction() {
        let x = document.getElementById("myText");
        let defaultVal = x.defaultValue;
        let currentVal = x.value;

        let url ="https://newsapi.org/v2/everything?q=" + currentVal + "&from=2022-02-27&sortBy=popularity&language=en&pageSize=10&apiKey=" + key;

          $.ajax({
            method: 'GET',
            url: url,
            success: function(data){
                console.log(currentVal);

                for (let i = 0; i < data.articles.length; i++) {
                    console.log(data.articles[i].title);

                    $('#resultsCtn').append(
                        `
                        ${data.articles[i].title}
                        `
                    );
                }
            
            }
        });
    }

    searchBtn.addEventListener("click", myFunction);

    
    // $("#myText").on("keyup", function() {
        
    //     let x = document.getElementById("myText");
    //     let defaultVal = x.defaultValue;
    //     let currentVal = x.value;

    //     let url ="https://newsapi.org/v2/everything?q=" + currentVal + "&from=2022-02-27&sortBy=popularity&language=en&pageSize=10&apiKey=" + key;

    //       $.ajax({
    //         method: 'GET',
    //         url: url,
    //         success: function(data){
    //             console.log(currentVal);

    //             for (let i = 0; i < data.articles.length; i++) {
    //                 console.log(data.articles[i].title);

    //                 $('#resultsCtn').empty().append(
    //                     `
    //                     ${data.articles[i].title}
    //                     `
    //                 );
    //             }
            
    //         }
    //     });

    // });

    

    

});