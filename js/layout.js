async function mount(id,url){const target=document.getElementById(id);if(!target)return;try{const response=await fetch(url);if(!response.ok)throw Error(response.status);target.innerHTML=await response.text()}catch{target.remove()}}
mount('site-header','partials/header.html');
mount('site-footer','partials/footer.html');
