require('dotenv').config()
// Access the submit button
var submitBtn = document.querySelector(".btn.btn-primary.submit");

//Get the text fields
var nameInput = document.querySelector(".name");
var dataList1 = document.getElementById('previous1-options');
var emailAddressInput = document.querySelector(".email-address");
var dataList2 = document.getElementById('previous2-options');
var subjectInput = document.querySelector(".subject");
var dataList3 = document.getElementById('previous3-options');
var emailMessageInput = document.querySelector("textarea");

//Maintain a Hashmap for easy access for Data Lists based on the name of the datalist.
let nameDataList = {};
nameDataList[".name"] = dataList1;
nameDataList[".email-address"] = dataList2;
nameDataList[".subject"] = dataList3;

var invalid = false; //No invalid message being generated in the beginning. 

var ivmsg = null; //This is the global variable used for the invalid msg.

function loadOptions(tfInputFieldName) {
    const storedOptions = JSON.parse(localStorage.getItem(tfInputFieldName)) || [];
    nameDataList[tfInputFieldName].innerHTML = "";
    storedOptions.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        nameDataList[tfInputFieldName].appendChild(optionElement);
    });
}

function saveOption(value, dataListName) {
    const storedOptions = JSON.parse(localStorage.getItem(dataListName)) || [];
    if (!storedOptions.includes(value)) {
        storedOptions.push(value);
        localStorage.setItem(dataListName, JSON.stringify(storedOptions));
    }
}

//Load all of the options when you click on the input field.
Object.keys(nameDataList).forEach(key => {
    const tfInputField = document.querySelector(key); 
        tfInputField.addEventListener('click', function(e) {
            e.preventDefault();   
            loadOptions(key);
        });
});   

// Set the event listener for the submit button
submitBtn.addEventListener('click', function(e){
    e.preventDefault();
    // Get the values from the input fields
    var { name, subject, emailAddress, emailMessage } = getInputVals();
    
    // Check if any of the fields are empty
    if (name == '' ||  subject == '' || emailAddress == '' || emailMessage == '') {
        //Create the text field please fill in all fields below in red.
        //Make the paragraph first.
        if (!invalid){
            ivmsg = generateIVMessage();
            invalid = true;
        }
        return; // Exit the function without sending the email
    } else {
        //Clear the invalid message that was generated, don't keep it there!
        if (invalid){
            var form = document.querySelector(".contact-form");
            form.removeChild(ivmsg);
            ivmsg = null;
            count = 0;
            invalid = false;
        }
        //Save the options for name, email address, and subject
        saveOption(name, ".name");
        saveOption(subject, ".subject");
        saveOption(emailAddress, ".email-address");
        // Send the email using an email service (e.g., Email.js)
        sendingEmail(name, emailAddress, subject, emailMessage);
        nameInput.value = '';
        subjectInput.value = '';
        emailAddressInput.value = '';
        emailMessageInput.value = '';
    }
});

function getInputVals() {
    var name = nameInput.value;
    var subject = subjectInput.value;
    var emailAddress = emailAddressInput.value;
    var emailMessage = emailMessageInput.value;
    return { name, subject, emailAddress, emailMessage };
}

function generateIVMessage() {
    var para = document.createElement("p");
    para.innerHTML = "Please fill in all of the information above!";
    para.style.color = "red";
    para.style.fontFamily = 'Times New Roman, Times, serif';
    //Get the parent element where the text will be placed in and append it there.
    var form = document.querySelector(".contact-form");
    form.appendChild(para);
    return para
}

//Function that sends an email using emailJS
function sendingEmail(name, emailAddress, subject, msg){
    var params = {name, emailAddress, subject, msg};
    emailjs.send(process.env.SERVICE_ID, process.env.TEMPLATE_ID, params).then(
        res => {
            console.log(res);
            alert("Your message has been successfully sent!");
        }
    ).catch((err) => console.log(err));
}