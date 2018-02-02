function loadRepositories() {
   const req = new XMLHttpRequest();
   req.addEventListener('load', showRepositories)
   req.open('GET', 'https://api.github.com/users/yehudamakarov/repos')
   req.send()
 }

 function showRepositories() {
   const arrOfRepos = JSON.parse(this.responseText)
   let repoList = '<ul>'

   for (var i = 0; i < arrOfRepos.length; i++) {
     repoList += '<li>' + arrOfRepos[i].name + ' - <a href="#" data-repo="' + arrOfRepos[i].name +  '" onclick="getCommits(this)">Get Commits</a></li>';
   }

   repoList += '</ul>'

   document.getElementById('repositories').innerHTML = repoList
 }

 function getCommits(linkEl) {
   const name = linkEl.dataset.repo
   const req = new XMLHttpRequest()
   req.addEventListener('load', showCommits)
   req.open('GET', 'https://api.github.com/repos/yehudamakarov/' + name + '/commits')
   req.send()
 }

 function showCommits() {
   const commitsArray = JSON.parse(this.responseText)
   let commitsHTML = '<ul>'


   for (var i = 0; i < commitsArray.length; i++) {
     if (commitsArray[i].author) {
       commitsHTML += '<li>' + commitsArray[i].author.login + ' - Meaasage: ' + commitsArray[i].commit.message + '</li>'
     } else {
       commitsHTML += '<li>---Anonymous - Meaasage: ' + commitsArray[i].commit.message + '</li>'
     }

   }

   commitsHTML += '</ul>'

   document.getElementById('commits').innerHTML = commitsHTML
 }
