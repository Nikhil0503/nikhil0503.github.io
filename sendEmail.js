// Access the submit button
var submitBtn = document.querySelector(".btn.btn-primary.submit");

//Get the text fields
var nameInput = document.querySelector(".name");
var subjectInput = document.querySelector(".subject");
var emailAddressInput = document.querySelector(".email-address");
var emailMessageInput = document.querySelector("textarea");

var count = 0; //Count for the number of times you enter empty fields

var ivmsg = null; //This is the global variable used for the invalid msg.

// Set the event listener for the submit button
submitBtn.addEventListener('click', function(e){
    e.preventDefault();
    // Get the values from the input fields
    var name = nameInput.value;
    var subject = subjectInput.value;
    var emailAddress = emailAddressInput.value;
    var emailMessage = emailMessageInput.value;

    // Check if any of the fields are empty
    if (name == '' ||  subject == '' || emailAddress == '' || emailMessage == '') {
        //Create the text field please fill in all fields below in red.
        //Make the paragraph first.
        if (count == 0){
            ivmsg = generateIVMessage();
        }
        count++;
        return; // Exit the function without sending the email
    } else {
        //Clear the invalid message that was generated, don't keep it there!
        if (count >= 1){
            var form = document.querySelector(".contact-form");
            form.removeChild(ivmsg);
            ivmsg = null;
            count = 0;
        }
        // Send the email using an email service (e.g., Email.js)
        sendingEmail(name, emailAddress, subject, emailMessage);
        nameInput.value = '';
        subjectInput.value = '';
        emailAddressInput.value = '';
        emailMessageInput.value = '';
    }
});

function generateIVMessage() {
    var para = document.createElement("p");
    //Add the following information in the paragraph.
    para.innerHTML = "Please fill in all of the information above!";
    //Make the paragraph red then.
    para.style.color = "red";
    para.style.fontFamily = 'Times New Roman, Times, serif';
    //Then get the parent element where the text will be placed in and append it there.
    var form = document.querySelector(".contact-form");
    form.appendChild(para);
    return para
}

//Function that sends an email using emailJS
function sendingEmail(name, emailAddress, subject, msg){
    var params = {name, emailAddress, subject, msg};
    emailjs.send(window.env.SERVICE_ID, window.env.TEMPLATE_ID, params).then(
        res => {
            console.log(res);
            alert("Your message has been successfully sent!")
        }
    ).catch((err) => console.log(err));
}