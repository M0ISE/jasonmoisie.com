$(document).ready(function () {
  $("#hideButton").click(function () {
    $("#artWorkImages").slideUp(700);
    $("#hideButton").hide();
    $("#showButton").show();
  });

  $("#showButton").click(function () {
    $("#artWorkImages").slideDown(700);
    $("#showButton").hide();
    $("#hideButton").show();
  });

  $("#hideButtonEssay").click(function () {
    $("#fullEssayText").slideUp(700);
    $("#hideButtonEssay").hide();
    $("#showButtonEssay").show();
  });

  $("#showButtonEssay").click(function () {
    $("#fullEssayText").slideDown(700);
    $("#showButtonEssay").hide();
    $("#hideButtonEssay").show();
  });

  $(document).mousemove(function () {
    if (
      $("#artWorkImages").is(":hidden") &&
      $("#fullEssayText").is(":hidden")
    ) {
      $("#blankSpaceSuperposition").show();
    } else {
      $("#blankSpaceSuperposition").hide();
    }
  });
});
