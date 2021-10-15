function initAccordion(accordionElem){
  
  //when panel is clicked, handlePanelClick is called.          

  function handlePanelClick(event){
      showPanel(event.currentTarget);
  }

//Hide currentPanel and show new panel.  
  
  function showPanel(panel) {
    // get current img tag
    // let img = panel.children[0].children[1];

    //Hide current one. First time it will be null. 
     var expandedPanel = accordionElem.querySelector(".active");
     if (expandedPanel){
       expandedPanel.classList.remove("active");
     }

     //Show new one
    panel.classList.add("active");
    // img.setAttribute('src', '../assets/img/icons/chevron-circle-up.svg')
  };

  var allPanelElems = accordionElem.querySelectorAll(".panel");
  for (var i = 0, len = allPanelElems.length; i < len; i++){
       allPanelElems[i].addEventListener("click", handlePanelClick);
  }

  //By Default Show first panel
  showPanel(allPanelElems[0])

};

initAccordion(document.getElementById("accordion"));