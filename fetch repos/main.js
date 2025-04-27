//main variables
let theInput = document.querySelector('.get-repos input');
let getButton = document.querySelector('.get-button');
let reposData = document.querySelector('.show-data');


//get button event
getButton.onclick = function() {
getRepos();
}

//get repos function
function getRepos() {
if (theInput.value === "") {
reposData.innerHTML = "<span>Please write Github username.</span>";
}else{
fetch(`https://api.github.com/users/${theInput.value}/repos`)
.then(response => response.json())
.then(data => {
//empty the container
reposData.innerHTML = '';
//loop on repos
data.forEach(repo => {
//create the main div element
let mainDiv = document.createElement("div");
//create repo name text
let repoName = document.createTextNode(repo.name);
//append the text to main div
mainDiv.appendChild(repoName);
//create repo url anchor
let theUrl = document.createElement("a");
//create repo url text
let theUrlText = document.createTextNode("Visit");
//append the text to the url
theUrl.appendChild(theUrlText);
theUrl.href = `https://github.com/${theInput.value}/${repo.name}`;
theUrl.setAttribute('target', '_blank');
mainDiv.appendChild(theUrl);
let starsSpan = document.createElement("span");
let starsSpanText = document.createTextNode(` stars ${repo.stargazers_count}`);
starsSpan.appendChild(starsSpanText);
mainDiv.appendChild(starsSpan);
//add class on main div
mainDiv.className = 'repo-box';
//add the created elements to the container
reposData.appendChild(mainDiv);
})
})
}
};
