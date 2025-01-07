const newsSlot = document.getElementById('news-slot');

const oReqNews = new XMLHttpRequest();
oReqNews.addEventListener('progress', updateProgressCourses);
oReqNews.addEventListener('load', transferCompleteCourses);
oReqNews.addEventListener('error', transferFailedCourses);
oReqNews.addEventListener('abort', transferCanceledCourses);
oReqNews.open('GET', '/api/news');
oReqNews.send();

function showNews(data) {
  newsSlot.innerHTML = '';
  data.forEach((obj, idx) => {
    const div = document.createElement('div');
    
    // a - title
    const a = document.createElement('a');
    a.setAttribute('href', 'https://aws.amazon.com/' + obj.headlineUrl);
    a.innerText = obj.headline;
    div.appendChild(a);

    // div - post date (2022-09-09T12:00:00Z)
    const divPostDate = document.createElement('div');
    const postDateArr = obj.postDateTime.split('T')[0].split('-');
    const day = postDateArr[2];
    const month = postDateArr[1];
    const year = postDateArr[0];
    divPostDate.innerText = 'Published: ' + month + '/' + day + '/' + year;
    div.appendChild(divPostDate);

    // p - summary
    const p = document.createElement('p');
    p.innerHTML = obj.postSummary;
    div.appendChild(p);

    newsSlot.appendChild(div);
  });
}

function transferCompleteCourses() {
  showNews(JSON.parse(this.responseText));
}

function updateProgressCourses(oEvent) {
  if (oEvent.lengthComputable) {
    let percentComplete = oEvent.loaded / oEvent.total * 100;
    console.log('percentComplete', percentComplete);
  } else {
    console.log('Unable to compute progress information since the total size is unknown.');
  }
}

function transferFailedCourses(evt) {
  console.log('An error occurred while transferring the file.');
}

function transferCanceledCourses(evt) {
  console.log("The transfer has been canceled by the user.");
}
