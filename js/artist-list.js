var pageNum = 1;
getArtists(pageNum);
// 함수를 호출해야한다.
// 밑에는 함수를 정의한것일뿐 호출하지 않았다.
$('#btnMoreArtists').click(function (){
  // id가 btnMoreArtists인 것을 클릭하면 함수를 실행시킨다.
  clickMoreArtistsButton();
  // 어떤 함수냐면 clickMoreArtistsButton!!!
})

function clickMoreArtistsButton () {
  pageNum += 1;
  getArtists(pageNum);
}

function getArtists(pageNum){
  axios({
    url: "http://localhost:8000/api/artist/" ,
    method: 'get',
    params: {
      page:pageNum
    }
  })
  // axios.get('http://localhost:8000/artist/artist/')
  .then(function(response) {
      console.log(response.data);
      for (
        var i = 0;
        i < response.data.results.length;
        i++
      ) {
        var currentArtist = response.data.results[i];
        console.log(currentArtist);

        var curArtistElement = $("#artist-item-template").clone();

        curArtistElement.find('.artist-name').text(currentArtist.name);
        // curArtistElemet에 artist-name이란 클래스를 찾고
        // 그 text에는 currentArtist.name을 넣는다.
        curArtistElement.find('.artist-img-profile').attr('src', currentArtist.image);
        $('.artist-list').append(curArtistElement);
      }
      if (response.data.next == null) {
        // 만약에 response.data.next가 null이라면
        $('#btnMoreArtists').css("display", "none");
        // btmMoreArtists라는 id를 가진 객체에
        // css의 display를 none해라
      };
    })
    .catch(function(error) {
      console.log(error)
    })
}
