var siteName=document.getElementById('siteName');
var siteUrl=document.getElementById('siteUrl');
var tableBody=document.getElementById('tableContent')
var modaleBody=document.getElementById('modale')
var topPar=document.getElementById('top-par')
var rules=document.getElementById('rules')
var urlList=[];
if(localStorage.getItem('products')){
  urlList=JSON.parse(localStorage.getItem('products'))
  displayData()
}
function addProduct() {
  if (validation(siteName) && validation(siteUrl)) {
    if (!siteUrl.value.startsWith('http://') && !siteUrl.value.startsWith('https://')) {
      siteUrl.value = `http://${siteUrl.value}`;
    }
    var isDuplicate = urlList.some(function (item) {
      return item.websiteUrl.toLowerCase() === siteUrl.value.toLowerCase();
    });
    if (isDuplicate) {
      topPar.innerHTML = "This website already exists in the list!!! Refresh website and add another one";
      modaleBody.classList.replace('d-none', 'd-block');
      rules.classList.add('d-none')
      removeValidMark()
      return;
    }
    var productObj = {
      id: Date.now(),
      websiteName: siteName.value,
      websiteUrl: siteUrl.value
    };
    urlList.push(productObj);
    localStorage.setItem('products', JSON.stringify(urlList));
    displayData();
    clearData();
    removeValidMark()
    closeModale();
  } 
  else {
    modaleBody.classList.replace('d-none', 'd-block');
  }
}
function displayData(){
  var addItem=''
   for(var i=0;i<urlList.length;i++){
    addItem+=`<tr>
    <td>${i+1}</td>
    <td>${urlList[i].websiteName}</td>              
    <td>
      <button class="btn btn-visit" onclick="window.open('${urlList[i].websiteUrl}', '_blank')">
        <i class="fa-solid fa-eye pe-2"></i>Visit
      </button>
    </td>
    <td>
      <button class="btn btn-delete pe-2" onclick="deleteData(${urlList[i].id})" data-index="${i}">
        <i class="fa-solid fa-trash-can"></i>
        Delete
      </button>
    </td>
</tr>`
   }
   tableBody.innerHTML=addItem
}
function deleteData(id){
  urlList=urlList.filter(function(ele){return ele.id !== id})
localStorage.setItem('products',JSON.stringify(urlList));
displayData()
}
function validation(input) {
  var regex = {
    siteName: /^\w{3,}(\s+\w+)*$/,
    siteUrl: /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/
  };
  if (input.value.trim() === '') {
    input.classList.remove('is-invalid', 'is-valid');
    return false;
  }
  if (regex[input.id].test(input.value)) {
    input.classList.add('is-valid');
    input.classList.remove('is-invalid');
    return true;
  } else {
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    return false;
  }
}
function clearData() {
  siteName.value = null;
  siteUrl.value = null;
}
function closeModale() {
  modaleBody.classList.replace('d-block', 'd-none');
}
function removeValidMark(){
  siteName.classList.remove('is-valid');
  siteUrl.classList.remove('is-valid');
}