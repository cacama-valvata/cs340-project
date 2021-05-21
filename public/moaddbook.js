(function () {
  var template = Handlebars.template,
    templates = (Handlebars.templates = Handlebars.templates || {});
  templates["moaddbook"] = template({
    compiler: [8, ">= 4.3.0"],
    main: function (container, depth0, helpers, partials, data) {
      return '<div id="mo-bookids-container" class="mo-bookids field-container">\r\n	<div class="mo-bookids">\r\n	<label for="add-book-prompt" id="add-book-label">Book ID</label>\r\n	</div>\r\n	<input name="add-book-prompt" type="text" class="add-book-prompt">\r\n\r\n	<button type="button" id="remove-book-order"><i class="fas fa-minus"></i></button>\r\n</div>';
    },
    useData: true,
  });
})();
