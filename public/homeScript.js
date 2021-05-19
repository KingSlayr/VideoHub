var url = document.querySelector('.URL');
console.log(ROOM_ID);
var pageUrl = document.URL;
var ourRoom = pageUrl+ROOM_ID
url.innerHTML = `${pageUrl}${ROOM_ID}`

const copyUrl = () => {
    var r = document.createRange();
    r.selectNode(document.querySelector('.URL'));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(r);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
}

const enterRoom = () => {
    location.replace(ourRoom)
  }