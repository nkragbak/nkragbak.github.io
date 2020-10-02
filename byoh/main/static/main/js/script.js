// document.querySelector("#header-user")

// alert('yo');

function sortBy()
   {
   var w = document.sortForm.sortList.selectedIndex;
   var url_add = document.sortForm.sortList.options[w].value;
   window.location.href = url_add;
   }

function eIHover() {
   document.getElementById("explainers").style.color = "red";
}

function seedict(){
   alert('yo2');
}
   // userconfig


   // Quests and Achievements

//function onselect(){
//   pseudo: show description field of quest on div beneath listbox 
//}

document.addEventListener('DOMContentLoaded', () => {


      //    format stats ex. '03'   //     
   var stats = document.getElementsByClassName("table-values");

   Array.prototype.forEach.call(stats, function(stat) {
      x = stat.innerHTML;
      x = ~~x;
      if (x < 10 ) {
         x = '0' + x
      }
      stat.innerHTML = x;
   });

});