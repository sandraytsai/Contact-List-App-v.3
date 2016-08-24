  $(document).ready(function(){
    $("#newcontactform").on("submit", function(e){
      e.preventDefault();
      console.log("submitted");
      $.ajax({
        method: "POST",
        url: "/contact/new",
        dataType: "json",
        data: {
         firstname: $('input[name=firstname]').val(),
         lastname: $('input[name=lastname]').val(),
         email: $('input[name=email]').val()
        }
      }).done(function(response){
        console.log(response);
        $('tr.contact:first').before('<tr class="contact" id="contact-'+response.id+'"><td>'+response.first_name+'</td><td>'+response.last_name+'</td><td>'+response.email+'</td><td><button type="button" class="edit" style="margin-bottom: 0.5em">Edit</button>'+' '+'<button type="button" class="delete" style="margin-bottom: 0.5em">Delete</button></td></tr>');
      });
    });

    var deleteContact = function(contactId){
      console.log("Delete a contact: ", contactId);
      const c_id = contactId.replace('contact-', '');
      $.ajax({
        method: "DELETE",
        url: "/contact/"+c_id+"/delete",
        dataType: "html",
        success: function(){
          $('#contact-' + c_id).remove();
        }
      });
    };

    $('.contactlist').on('click', 'button.delete', function(e){
      e.preventDefault();
      var $contactId = $(this).closest(".contact").attr("id");
      deleteContact($contactId)
    });

    $('#searchbutton').on('click', function(e){
      e.preventDefault();
      console.log('search');
      $.ajax({
        method: "GET",
        url: "/contacts/search",
        dataType: "json",
        data: {
         search: $('input[name=search]').val(),
        }
      }).done(function(response){
        console.log(response);
        $('.contactlist tr:gt(0)').empty(); 
        $('#showallcontacts').remove();
        response.forEach(function(contact) {
          $('.contactlist').append('<tr class="contact" id="contact-'+contact.id+'"><td>'+contact.first_name+'</td><td>'+contact.last_name+'</td><td>'+contact.email+'</td><td><button type="button" class="edit" style="margin-bottom: 0.5em">Edit</button>'+' '+'<button type="button" class="delete" style="margin-bottom: 0.5em">Delete</button></td></tr>');
        });
        $('.searchfunction').append('<div class="row"><button type="button" id="showallcontacts">Back to All Contacts</button></div>');
        $('#showallcontacts').on('click', function(e){
          e.preventDefault();
          var element = $(this);
          console.log('showall');
          $.ajax({
            method: "GET",
            url: "/contacts",
            dataType: "json",
          }).done(function(response){
            console.log(response);
            element.remove();
            $('.contactlist tr:gt(0)').empty();
            response.reverse().forEach(function(contact) {
              console.log(contact);
              $('.contactlist').append('<tr class="contact" id="contact-'+contact.id+'"><td>'+contact.first_name+'</td><td>'+contact.last_name+'</td><td>'+contact.email+'</td><td><button type="button" class="edit" style="margin-bottom: 0.5em">Edit</button>'+' '+'<button type="button" class="delete" style="margin-bottom: 0.5em">Delete</button></td></tr>')
            })
          })
        });
      });
    });


    $('.contactlist').on('click', 'button.edit', function(){
        $('#headerfunction').text("Update Contact");
        $('#newcontactform').empty();
        $('#newcontactform').append('<form id="newcontactform">First name:<input type="text" name="firstname"><br>Last name:<input type="text" name="lastname"><br>E-mail:<input type="text" name="email"><br><input id="formbutton" type="button" value="Update" style="margin-top:0.5em"></form>')
    });
  });

