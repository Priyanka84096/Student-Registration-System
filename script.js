const studentForm = document.getElementById('student-form');
const studentTable = document.getElementById('student-table');
const studentContent = document.getElementById('student-content');

//----function to display student data----
function displayStudents() {
    studentTable.innerHTML = ''; // it will clear previous data

    const studentsFromStorage = localStorage.getItem("students");
    if (studentsFromStorage) {
        const students = JSON.parse(studentsFromStorage);
        if (students.length > 0) {
            const table = document.createElement('table');
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            `;
            const tbody = table.querySelector('tbody');

            students.forEach(student => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${student.name}</td>
                    <td>${student.id}</td>
                    <td>${student.email}</td>
                    <td>${student.contact}</td>
                    <td>
                        <button class="edit-btn" onclick="editStudent('${student.id}')">Edit</button>
                        <button class="delete-btn" onclick="deleteStudent('${student.id}')">Delete</button>
                    </td>
                `;
                tbody.appendChild(row);
            });

            studentTable.appendChild(table);
            addScrollbar(); 
        } else {
            studentTable.innerHTML = '<p>No students registered yet.</p>';
        }
    } else {
        studentTable.innerHTML = '<p>No students registered yet.</p>';
    }


}


//---function to add a new student--
function addStudent(event) {
    event.preventDefault();
    const name = document.getElementById('student-name').value;
    const id = document.getElementById('student-id').value;
    const email = document.getElementById('student-email').value;
    const contact = document.getElementById('student-contact').value;

    // Validation(pop-up msg)
    if (name === "" || id === "" || email === "" || contact === "") {
        alert("Please fill in all the fields.");
        return; //shows an alert if any of the input fields are empty & stop further execution
    }
    if (isNaN(id) || isNaN(contact)) {
        alert("Student ID and Contact No. must be numbers.");
        return; //if either is not a number, it shows an alert
    }

    for (let i = 0; i < name.length; i++) {
        const char = name.charAt(i);
        if (!((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || char === ' ')) {
            alert("Student name can only contain letters and spaces.");
            return; // for student name validation
        }
    }
     //  for email Validation
     if (!email.includes('@') || !email.includes('.') ) {
        alert("Please enter a valid email address.");
        return;
    }



    // store the new student data in localStorage
    const newStudent = { name, id, email, contact };
    const studentsFromStorage = localStorage.getItem("students");
    let students = [];
    if (studentsFromStorage) {
        students = JSON.parse(studentsFromStorage);
    }
    students.push(newStudent);
    localStorage.setItem("students", JSON.stringify(students));

    displayStudents();
    studentForm.reset(); // it will clear the form
}

// function to edit a student record
function editStudent(studentId) {
    const studentsFromStorage = localStorage.getItem("students"); //this retrieves the student data from localStorage.
    let students = [];
    if (studentsFromStorage) {
        students = JSON.parse(studentsFromStorage);
    }

    const studentIndex = students.findIndex(student => student.id === studentId);//find the index of the student in the array that has a matching id.
    if (studentIndex !== -1) {
        const student = students[studentIndex];
        document.getElementById('student-name').value = student.name;
        document.getElementById('student-id').value = student.id;
        document.getElementById('student-email').value = student.email;
        document.getElementById('student-contact').value = student.contact;

        // change the "Add" button to "Save"
        const submitButton = document.querySelector("#student-form button");
        submitButton.textContent = "Save";
        submitButton.onclick = function () { saveStudent(studentId); };
    }
}

// Function to save the edited student record
function saveStudent(studentId) {
    const name = document.getElementById('student-name').value;
    const id = document.getElementById('student-id').value;
    const email = document.getElementById('student-email').value;
    const contact = document.getElementById('student-contact').value;

    // validation
    if (name === "" || id === "" || email === "" || contact === "") {
        alert("Please fill in all the fields.");
        return; 
    }
    if (isNaN(id) || isNaN(contact)) {
        alert("Student ID and Contact No. must be numbers.");
        return; 
    }
    for (let i = 0; i < name.length; i++) {
        const char = name.charAt(i);
        if (!((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || char === ' ')) {
            alert("Student name can only contain letters and spaces.");
            return; 
        }
    }
    //  for  email validation
   if (!email.includes('@') || !email.includes('.') ) {
    alert("Please enter a valid email address.");
    return;
   }


    const studentsFromStorage = localStorage.getItem("students");
    let students = [];
    if (studentsFromStorage) {
        students = JSON.parse(studentsFromStorage);
    }

    const studentIndex = students.findIndex(student => student.id === studentId);
    if (studentIndex !== -1) {
        students[studentIndex] = { name, id, email, contact };
        localStorage.setItem("students", JSON.stringify(students));
        displayStudents();
        studentForm.reset();

        // change the "Save" button back to "Add"
        const submitButton = document.querySelector("#student-form button");
        submitButton.textContent = "Add";
        submitButton.onclick = function () { addStudent(event); };
    }
}

// Function to delete a student record
function deleteStudent(studentId) {
    if (confirm("Are you sure you want to delete this student?")) {
        const studentsFromStorage = localStorage.getItem("students");
        let students = [];
        if (studentsFromStorage) {
            students = JSON.parse(studentsFromStorage);
        }
        const studentIndex = students.findIndex(student => student.id === studentId);//finds the index of the student to delete.
        if (studentIndex !== -1) {
            students.splice(studentIndex, 1);
            localStorage.setItem("students", JSON.stringify(students));
            displayStudents(); // show the updated data.
        }
    }
}



// Function to add a vertical scrollbar
function addScrollbar() {
    const studentContent = document.getElementById('student-content');

    // If the content height exceeds the container height, add a scrollbar
    if (studentContent.scrollHeight > studentContent.clientHeight) {
        studentContent.style.overflowY = 'auto';
    } else {
        studentContent.style.overflowY = 'hidden'; 
    }
}


displayStudents();