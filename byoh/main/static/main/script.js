// document.querySelector("#header-user")

// alert('yo');

function nav()
   {
   var w = document.myform.mylist.selectedIndex;
   var url_add = document.myform.mylist.options[w].value;
   window.location.href = url_add;
   }