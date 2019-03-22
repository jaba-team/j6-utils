declare var $: any;
declare var jQuery: any;
// export function scrollTo(selector, timeout = 250) {
//   const element = (document as any).querySelector(selector);
//   if (element) {
//     setTimeout(() => {
//       //console.log(element);
//       element.scrollIntoView({ block: 'start', inline: 'nearest', behavior: 'smooth' }); }, timeout);
//     return true;
//   }
//   return false;
// }


export function scrollTo(target:any, opt?:any)  {
  var options = $.extend({ position: "topMargin", marginTop: 120, calculateTop: function ($target) { return $target.offset().top } }, opt);
  var $target = <any>getTarget(target);

  console.log("Target", $target);

  if ($target == null) return false;
  $target.show();
  if ($target.is('.accordion')) {
    //console.log($target.get(0))
    $target.find('.mat-expansion-panel-header').get(0).click();
  }

  var scrollTop = $(window).scrollTop();
  var htmlbody = $('html,body');
  var top = 0;
  var targetTop = options.calculateTop($target);
  if (options.position == "top") {
      top = targetTop;
  } else if (options.position == "topMargin") {
      top = targetTop - options.marginTop/*margin*/;
  } else if (options.position == "topAuto") {
      top = targetTop - Math.floor($(window).height() / 3);
  } else if (options.position == "middle") {
      top = targetTop - $(window).height() / 2;
  } else {
      if ($target.height() > $(window).height())
          top = targetTop - options.marginTop/*margin*/;
      else {
          top = targetTop - Math.floor(($(window).height() - $target.height()) / 2);
      }
  }

  if (options.offset) {
      top += options.offset;
  }

  var duration = (scrollTop - top) * 1;
  if (duration < 0) duration = -duration;
  if (duration > 1000) duration = 1000;

  //htmlbody.animate({ scrollTop: top }, duration, 'easeInOutQuint');
  htmlbody.animate({ scrollTop: top }, duration);
  return true;
}

export function getTarget(target: any, opt?: any) {
  var options = $.extend({ multiple: false }, opt);
  //console.log(options);
  var $target:any = null;


  if (!(target instanceof jQuery)) {
      if (target == null || target == "" || target == "#") return null;
      target = target.replace("#", "").toLowerCase();
      $target = $("[id]").filter(function () { return $(this).attr("id").toLowerCase() == target; });


      if ($target.length == 0)
          $target = $("#" + target);
      if ($target.length == 0)
          $target = $("[data-cms-anchor]").filter(function () { return $(this).attr("data-cms-anchor").toLowerCase() == target; });
      if ($target.length == 0)
          $target = $("[data-cms-anchor-name]").filter(function () { return $(this).attr("data-cms-anchor-name").toLowerCase() == target; });
      if ($target.length == 0)
          $target = $("[data-cms-item-name]").filter(function () { return $(this).attr("data-cms-item-name").toLowerCase() == target + 'panel'; });
      if ($target.length == 0)
          $target = $("[data-cms-item-name]").filter(function () { return $(this).attr("data-cms-item-name").toLowerCase() == target; });
      if ($target.length == 0)
          $target = $("a[name]").filter(function () { return $(this).attr("name").toLowerCase() == target; });


      //    $target = $("#" + target);
      //if ($target.length == 0)
      //    $target = $("[data-cms-anchor='" + target + "']");
      //if ($target.length == 0)
      //	$target = $("[data-cms-item-name='" + target + "Panel']");
      //if ($target.length == 0)
      //    $target = $("[data-cms-item-name='" + target + "']");
      ////if ($target.length == 0 && target.indexOf("#") == 0)
      ////    $target = $(target);
      //if ($target.length == 0)
      //    $target = $("a[name='" + target + "']");
      if ($target.length == 0 && target == "top")
          $target = $("body");
      if ($target.length == 0)
          $target = $(target);
  } else {
      $target = target;
  }
  if ($target instanceof jQuery) {
      if ((<any>$target).length > 1)
          return (<any>$target).first();
      if ((<any>$target).length == 1)
          return (<any>$target);
      else
          return null;
  } else {
      return null;
  }
}
