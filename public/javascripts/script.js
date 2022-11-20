$(document).ready(function () {
  $("#accessbutton1").mouseenter(function () {
    $(this).css({ background: "rgb(54, 51, 51)", color: "white" });
    $("#accessbuttons").css("visibility", "visible");
  });
  $("#accessbutton1").mouseleave(function () {
    $(this).css({ background: "black", color: "white" });
  });

  $("#accessbutton2").mouseenter(function () {
    $(this).css({ background: "rgb(54, 51, 51)", color: "white" });
    $("#accessbuttons").css("visibility", "visible");
  });
  $("#accessbutton2").mouseleave(function () {
    $(this).css({ background: "black", color: "white" });
  });
});
$(document).ready(function () {
  $(".blogs").mouseenter(function () {
    $(this).css({ background: "#b3aa92", color: "white" });
    $(".blogviewbutton").css("visibility", "visible");
  });
  $(".blogs").mouseleave(function () {
    $(this).css({ background: "white", color: "black" });
    $(".blogviewbutton").css("visibility", "hidden");
  });
});

var headerStep = 0;
var codestep = 0;
var subheaderStep = 0;
var ParagraphStep = 0;
var imageStep = 0;

function addImg() {
  // console.log(step);
  var Imgname = "image" + imageStep;
  // console.log(imageStep);
  // console.log(session);
  // if (step == imageStep) {
  $("#form").append(
    "<div style='width: 80%;margin-left: 10%;margin-bottom: 2vh;margin-top:2vh'><input style='height: 40px;width: 60%;' placeholder='Image Url' type='text' name='" +
      Imgname +
      "'/><a class='remove_image'>Remove</a></div>"
  );
  imageStep = imageStep + 1;
  // } else {
  //   alert("no ");
  // }
}
function addHeader() {
  // console.log(step);
  var headerText = "header" + headerStep;
  // console.log(headerStep);
  // if (step == headerStep) {
  $("#form").append(
    "<div style='width: 80%;margin-left: 10%;margin-bottom: 2vh;margin-top:2vh'><input style='height: 50px;width: 40%;' placeholder='Header' type='text' name='" +
      headerText +
      "'/><a class='remove_header'>Remove</a></div>"
  );
  headerStep = headerStep + 1;
  // } else {
  //   alert("no ");
  // }
}
function addSubHeader() {
  var subheadertext = "subHeader" + subheaderStep;
  // if (step == subheaderStep) {
  $("#form").append(
    "<div style='width: 80%;margin-left: 10%;margin-bottom: 2vh;margin-top:2vh'><input style='height: 30px;width: 60%;'  placeholder='Sub Header' type='text' name='" +
      subheadertext +
      "'/><a class='remove_subheader'>Remove</a></div>"
  );
  subheaderStep = subheaderStep + 1;
  // } else {
  //   alert("no ");
  // }
}
function addParagraph() {
  var Paragraph = "paragraph" + ParagraphStep;
  // if (step == upperParagraphStep) {
  $("#form").append(
    "<div name='step' style='width: 80%;margin-left: 10%;margin-bottom: 2vh;'><textarea placeholder='Paragraph' style='width:80%' name=" +
      Paragraph +
      " ></textarea><a class='remove_upperparagraph'>Remove</a></div>"
  );
  ParagraphStep = ParagraphStep + 1;
  // } else {
  //   alert("no ");
  // }
}
function addCode() {
  var code = "code" + codestep;
  // if (step == codestep) {
  $("#form").append(
    "<div name='step' style='width: 80%;margin-left: 10%;margin-bottom: 2vh;'><textarea placeholder='Code' style='width:80%' name=" +
      code +
      " ></textarea><a class='remove_upperparagraph'>Remove</a></div>"
  );
  codestep = codestep + 1;
  // } else {
  //   alert("no ");
  // }
}

$("#form").on("click", ".remove_session", function (e) {
  $(this).parent("div").remove();
  step = step - 1;
});
$("#form").on("click", ".remove_image", function (e) {
  $(this).parent("div").remove();
  imageStep = imageStep - 1;
});
$("#form").on("click", ".remove_header", function (e) {
  $(this).parent("div").remove();
  headerStep = headerStep - 1;
});
$("#form").on("click", ".remove_subheader", function (e) {
  $(this).parent("div").remove();
  subheaderStep = subheaderStep - 1;
});
$("#form").on("click", ".remove_upperparagraph", function (e) {
  $(this).parent("div").remove();
  upperParagraphStep = upperParagraphStep - 1;
});
$("#form").on("click", ".remove_footerparagraph", function (e) {
  $(this).parent("div").remove();
  footerparagraphStep = footerparagraphStep - 1;
});

$("#blogForm").submit(function (e) {
  e.preventDefault();
  $.ajax({
    url: "/admin/addblog",
    method: "POST",
    data: $("#blogForm").serialize(),
    success: function (response) {
      if (response.add == "success") {
        window.location.href = "/admin/showBlogs";
      }
    },
  });
});

// Wrap every letter in a span
var textWrapper = document.querySelector(".ml3");
textWrapper.innerHTML = textWrapper.textContent.replace(
  /\S/g,
  "<span class='letter'>$&</span>"
);

anime
  .timeline({ loop: true })
  .add({
    targets: ".ml3 .letter",
    opacity: [0, 1],
    easing: "easeInOutQuad",
    duration: 2250,
    delay: (el, i) => 150 * (i + 1),
  })
  .add({
    targets: ".ml3",
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000,
  });

function copyToClipBoard(codeid,buttonid) {
  
  const body = document.getElementById("copybody");
  const val = document.getElementById(codeid);
  const area = document.createElement("textarea");
  const button = document.getElementById(buttonid);
  body.appendChild(area);
  area.value = val.innerText;

  area.select();
  document.execCommand("copy");
  body.removeChild(area);
  button.innerHTML = "copied!";
  setTimeout(() => {
    button.innerHTML = "copy";
  }, 3000);
  
}

function deleteBlog(blogId) {
  $.ajax({
    type: "get",
    url: "/admin/deleteBlog/" + blogId,

    success: function (response) {
      if (response.state == "deleted") {
        location.reload();
      }
    },
  });
}

function fullIvew(id, admin) {
  if (admin) {
    window.location.href = "/admin/blogfullview/" + id;
  } else {
    window.location.href = "/blogfullview/" + id;
  }
}

function contactMe() {
  $("#contactForm").submit(function (e) {
    e.preventDefault();

    $.ajax({
      url: "/contactMe",
      method: "post",
      data: $("#contactForm").serialize(),

      success: function (response) {
        alert("Thanks For contacting..");
      },
    });
  });
}

function login(url) {
  console.log("url" + url);
  var elmnt = document.getElementById("firstdiv");
  elmnt.scrollIntoView();
  document.getElementById("url").value = url;
  document.getElementById("loginForm1").style.display = "flex";
  document.getElementById("signupForm1").style.display = "none";
}
function signUp() {
  document.getElementById("signupForm1").style.display = "flex";
  document.getElementById("loginForm1").style.display = "none";
}
function closeLogin() {
  document.getElementById("loginForm1").style.display = "none";
}
function closesignup() {
  document.getElementById("signupForm1").style.display = "none";
}




function userLogin(){
  
  $('#userLoginForm').submit(function (e){
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/login",
      data:$('#userLoginForm').serialize() ,
      
      success: function (response) {
        
        console.log(response);
        if(response.admin){
          window.location.href='/admin'
        }else if(response.url){
          window.location.href=response.url
        }else{
          
          document.getElementById('invalidDiv').style.display='flex'
          setTimeout(function() {
            $('#invalidDiv').css({display:'none'})
          }, 5000);
        }
      }
    });
  })
}
function userSignup(){
  $('#userSignupForm').submit(function (e){
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/signup",
      data: $('#userSignupForm').serialize(),
      
      success: function (response) {
        alert('Signup Succeess Login to Continue')
        login()
      }
    });
  })
}
