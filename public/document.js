$("input").on("change",()=>{
    if($("#custom").is(":checked")){
 $(`input[name="jokeType[]"]`).removeAttr("disabled")
    }else{
       $(`input[name="jokeType[]"]`).attr("disabled",true) 
    }
 
}
)

 const glowBox = document.querySelector(".glow-box");
const current = glowBox.querySelector(".current-text");
const next = glowBox.querySelector(".next-text");

function setBoxSizeTo(el) {
  const temp = document.createElement("div");
  temp.style.position = "absolute";
  temp.style.visibility = "hidden";
  temp.style.whiteSpace = "normal";
  temp.style.fontSize = window.getComputedStyle(el).fontSize;
  temp.style.fontFamily = window.getComputedStyle(el).fontFamily;
  temp.style.lineHeight = window.getComputedStyle(el).lineHeight;
  temp.style.padding = window.getComputedStyle(glowBox).padding;
  temp.style.paddingLeft = "0.6rem"; // Ensure padding is accounted
temp.style.paddingRight = "0.6rem";
temp.style.width = "fit-content";
  temp.style.boxSizing = "border-box";
  temp.style.maxWidth = "90vw";
  temp.style.backgroundColor = window.getComputedStyle(glowBox).backgroundColor;
  temp.innerText = el.innerText;

  document.body.appendChild(temp);
  const width = temp.offsetWidth;
  const height = temp.offsetHeight;
  document.body.removeChild(temp);

  glowBox.style.width = `${width+10}px`;
  glowBox.style.height = `${height}px`;
}

// Initial sizing
setBoxSizeTo(current);

glowBox.addEventListener("mouseenter", () => setBoxSizeTo(next));
glowBox.addEventListener("mouseleave", () => setBoxSizeTo(current));


  $("form").on("submit", function (e) {
    const jokeTypeCheckboxes = $(".joke-type").toArray();
    const anyChecked = Array.from(jokeTypeCheckboxes).some(cb => cb.checked);

     if (!anyChecked && $("#custom").is(":checked")) {
      e.preventDefault();
      alert("Please select at least one joke type.");
    }
  });

