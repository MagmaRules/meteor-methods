(function () {
  function parseForm (form) {
    var fields = {};
    var fieldArray = $(form).serializeArray();

    _.each(fieldArray, function (field) {
      fields[field.name] = field.value;
    });

    return fields;
  }

  Template.add_message.events({
    "submit form": function (e, tmpl) {
      e.preventDefault();

      var form = tmpl.firstNode;
      var input = tmpl.find("textarea");
      var fields = parseForm(form);

      form.reset();
      input.focus();

      Meteor.call("createMessage", fields, function (err, message) {
        if (err) {
          Session.set("message", err.error + ": " + err.reason);
          console.log(err);
        } else {
          Session.set("message", message); 
        }
      });
    }
  });

  Template.show_message.helpers({
    message: function () {
      return Session.get("message") || "No message yet!";
    }
  });
}());

