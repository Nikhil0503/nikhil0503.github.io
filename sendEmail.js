// Access the submit button
var submitBtn = document.querySelector(".btn.btn-primary.submit");

//Get the text fields
var nameInput = document.querySelector(".name");
var subjectInput = document.querySelector(".subject");
var emailAddressInput = document.querySelector(".email-address");
var emailMessageInput = document.querySelector("textarea");

// Set the event listener for the submit button
submitBtn.addEventListener('click', function(e){
    e.preventDefault();
    // Get the values from the input fields
    var name = nameInput.value;
    var subject = subjectInput.value;

    var emailAddress = emailAddressInput.value;
    var emailMessage = emailMessageInput.value;

    // Check if any of the fields are empty
    if (!name || !subject || !emailAddress || !emailMessage) {
        //Create the text field please fill in all fields below in red.
        //Make the paragraph first.
        const para = document.createElement("p");
        //Add the following information in the paragraph.
        const notFilled = document.createTextNode("Please fill in all of the information above!");
        para.appendChild(notFilled);
        //Make the paragraph red then.
        para.style.color = "red";
        //Then get the parent element where the text will be placed in and append it there.
        const form = document.querySelector("contact-form");
        form.append(para);
        return; // Exit the function without sending the email
    } else {
        // Send the email using an email service (e.g., Email.js)
        Email.send({
            SecureToken : "535bc581-830c-41e9-99e8-1f532cb896df",
            To : 'nikhilsai.munagala@gmail.com',
            From : emailAddress,
            Subject : subject,
            Body : emailMessage
        }).then(
            function(response) {
                alert("Email sent successfully!");
                // Clear the input fields after sending the email
                nameInput.value = '';
                subjectInput.value = '';
                emailAddressInput.value = '';
                emailMessageInput.value = '';
            },
            function(error) {
                alert("Email not sent. Error: " + error);
            }
        );
    }
});