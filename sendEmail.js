// Access the submit button
var submitBtn = document.querySelector(".btn.btn-primary.submit");

//Get the text fields
var nameInput = document.querySelector(".name");
var dataList1 = document.querySelector(".previous1-options");
var subjectInput = document.querySelector(".subject");
var dataList2 = document.querySelector(".previous2-options");
var emailAddressInput = document.querySelector(".email-address");
var dataList3 = document.querySelector(".previous3-options");
var emailMessageInput = document.querySelector("textarea");

//Maintain a list of 

//Maintain a Hashmap for easy access for Data Lists based on the name of the datalist.
let nameDataList = {};
nameDataList[nameInput] = dataList1;
nameDataList[subjectInput] = dataList2;
nameDataList[emailAddressInput] = dataList3;

var invalid = false; //No invalid message being generated in the beginning. 

var ivmsg = null; //This is the global variable used for the invalid msg.

function loadOptions(tfInputField) {
    const storedOptions = JSON.parse(localStorage.getItem(tfInputField.className)) || [];
    nameDataList[tfInputField].innerHTML = '';
    storedOptions.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        nameDataList[tfInputField].appendChild(optionElement);
    });
}

function saveOption(value, dataListName) {
    const storedOptions = JSON.parse(localStorage.getItem(dataListName)) || [];
    if (!storedOptions.includes(value)) {
        storedOptions.push(value);
        localStorage.setItem(dataListName, JSON.stringify(storedOptions));
    }
}

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
    emailjs.send(window.env.SERVICE_ID, window.env.TEMPLATE_ID, params).then(
        res => {
            console.log(res);
            alert("Your message has been successfully sent!");
        }
    ).catch((err) => console.log(err));
}