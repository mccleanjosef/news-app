$(document).ready(function(){

    console.log("script is linked");

    const searchBtn = document.querySelector('#searchBtn');
    const hlSearchBtn = document.querySelector('#hlSearchBtn');

    // Full page tab starts
    $("#tab1").click(moveToFirst);
    $("#tab2").click(moveToSecond);

    function moveToFirst() {
        $("#slide").attr('class', 'move-to-first');
        $(".tab").attr('class', 'tab');
        $("#tab1").attr('class', 'tab selected');
    }

    function moveToSecond() {
        $("#slide").attr('class', 'move-to-second');
        $(".tab").attr('class', 'tab');
        $("#tab2").attr('class', 'tab selected');
    }
    // Full page tab ends


    // defualt language
    let language = $('#languageSelect').val();
    console.log(language);

    // default from period (week)
    let fromPeriod = $('#fromDateSelect').val();

    // user setting from period
    $('#fromDateSelect').change(function(){
        fromPeriod = $('#fromDateSelect').val();
    });

    // default from period (week)
    let sortOrder = $('#sortBySelect').val();

    // search is submitted
    function keyword() {
        $('#resultsCtn').empty();

        // keyword query
        let x = document.getElementById("search");
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

        // // setting sort order based on selected sortby option
        sortOrder = $('#sortBySelect').val();
        console.log(sortOrder);

        // language select
        language = $('#languageSelect').val();
        
        console.log(language);

        if (currentVal !== ""){
            let url ="https://newsapi.org/v2/everything?q=" + currentVal + "&from=" + fromDate + "&sortBy=" + sortOrder + "&language=" + language + "&pageSize=10&apiKey=" + key;

              $.ajax({
                method: 'GET',
                url: url,
                success: function(data){

                    for (let i = 0; i < data.articles.length; i++) {
                        console.log(data.articles[i]);

                        if(data.articles[i].urlToImage !== "null"){
                            $('#resultsCtn').append(
                                `
                                <div class="card top-story-select" id="${data.articles[i].publishedAt}" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    <div class="card__img-wrap">
                                        <img src="${data.articles[i].urlToImage}" class="card__img" alt="Article image">
                                    </div>
                                    <div class="card-body card__card-body">
                                        <h5 class="card__title">${data.articles[i].title}</h5>
                                    </div>
                                </div>
                                `
                            );
                        }
                    }
                    modal();
                    
                    // start of search modal
                    function modal(){
                        $(".top-story-select").click(function(){
                            let i = 0;
                            for(i = 0; i < data.articles.length; i++){
                                if(this.id === data.articles[i].publishedAt){
                                    $('#modalHeader').empty().append(
                                        `
                                        <button type="button" class="btn-close tsmodal__btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        <img class="tsmodal__img" src="${data.articles[i].urlToImage}" alt="Article photo">
                                        `
                                    ); 
                                    $('#modalBody').empty().append(
                                        `
                                        <h2 class="tsmodal__title">${data.articles[i].title}</h2>
                                        <h3 class="tsmodal__description">${data.articles[i].description}</h3>
                                        <p class="tsmodal__content">${data.articles[i].content}</p>
                                        `
                                    ); 
                                }
            
                            }
                        });
                    }
                    // end of search modal

                }
            });
        } else {
            $('#resultsCtn').append(
                `
                <p class="search__error-mes">Please type a search term</p>
                `
            );
        }

        
    }

    

    // when language is changed run search to update
    // $('#languageSelect').change(function(){
    //     keyword();
    //     // sourcesList();
    // });

    // headlines search is submitted
    function headlinesSearch(){
        $('#hlResultsCtn').empty();

        // country selection
        let country = $('#countrySelect').val();
        console.log(country);

        // category selection
        let category = document.querySelector('input[name="categorySelect"]:checked').value;
        console.log(category);

        

        let url ="https://newsapi.org/v2/top-headlines?country=" + country + "&category=" + category + "&pageSize=10&apiKey=" + key;

          $.ajax({
            method: 'GET',
            url: url,
            success: function(data){
                // console.log(data);

                for (let i = 0; i < data.articles.length; i++) {
                    // console.log(data.articles[i]);

                    if(data.articles[i].urlToImage !== null){
                        $('#hlResultsCtn').append(
                            `
                            <div class="card top-story-select" id="${data.articles[i].publishedAt}" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                <div class="card__img-wrap">
                                    <img src="${data.articles[i].urlToImage}" class="card__img" alt="Article image">
                                </div>
                                <div class="card-body card__card-body">
                                    <h5 class="card__category">${category}</h5>
                                    <h5 class="card__title">${data.articles[i].title}</h5>
                                </div>
                            </div>
                            `
                        );
                    }
                    
                }
                modal();

                
                // start of top stories modal
                function modal(){
                    $(".top-story-select").click(function(){
                        let i = 0;
                        for(i = 0; i < data.articles.length; i++){
                            if(this.id === data.articles[i].publishedAt){
                                $('#modalHeader').empty().append(
                                    `
                                    <button type="button" class="btn-close tsmodal__btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    <img class="tsmodal__img" src="${data.articles[i].urlToImage}" alt="Article photo">
                                    `
                                ); 
                                $('#modalBody').empty().append(
                                    `
                                    <h2 class="tsmodal__title">${data.articles[i].title}</h2>
                                    <h3 class="tsmodal__description">${data.articles[i].description}</h3>
                                    <p class="tsmodal__content">${data.articles[i].content}</p>
                                    `
                                ); 
                            }
            
                        }
                    });
                }
                // end of top stories modal
            }
        });
    }

    // generate first headline stories
    headlinesSearch();


    




    // // List sources based on language
    // function sourcesList(){
    //     $('#sourcesResultsCtn').empty();

    //     let url ="https://newsapi.org/v2/top-headlines/sources?apiKey=" + key;

    //       $.ajax({
    //         method: 'GET',
    //         url: url,
    //         success: function(data){

    //             for (let i = 0; i < data.sources.length; i++) {
    //                 // console.log(data.sources[i]);

    //                 if (data.sources[i].language === $('#languageSelect').val()){
    //                     // console.log(data.sources[i]);
    //                     $('#sourcesResultsCtn').append(
    //                         `
    //                         ${data.sources[i].name}
    //                         `
    //                     );
    //                 }
                    
    //             }
            
    //         }
    //     });
    // }
    // sourcesList();



    


    searchBtn.addEventListener("click", keyword);
    hlSearchBtn.addEventListener("click", headlinesSearch);
     

});