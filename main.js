// Enter button trigger

// Get the input field
let input = document.getElementById("input-field");
let myBtn = document.getElementById("myBtn");
// Execute a function when the user releases a key on the keyboard
input.addEventListener("keypress", function(event) {
    if(event.key=="Enter"){
        myBtn.click();
        event.preventDefault();
    }
});


//error handling 
const errorDisplay = document.getElementById("errorDisplay");

const getBookName = () => {
    const input_field = document.getElementById("input-field");
    let inputValue = input_field.value;
    if (inputValue === "") {
        errorDisplay.innerHTML = "Enter a book name to show result .."

        //clear display Book result 
        displayBooks.textContent = "";

        // clear total result found
        const totalResult = document.getElementById("totalResultFound");
        totalResult.innerHTML = "";
        return;
    }
    else {
        // spinner show
        document.getElementById("spinner").classList.remove("d-none");

        const url = `https://openlibrary.org/search.json?q=${inputValue}`;
        fetch(url)
            .then(res => res.json())
            .then(data => getAllBooks(data))
            .finally(()=>{                
                //clear input field
                input_field.value = "";
            })

    }


//clear error message
errorDisplay.innerHTML = "";

//clear display Book result 
displayBooks.textContent = "";

// clear total result found
const totalResult = document.getElementById("totalResultFound");
totalResult.innerHTML = "";


}

const getAllBooks = (books) => {
     // spinner hidden
     document.getElementById("spinner").classList.add("d-none");

    //error handling (no result found) 
    if (books.numFound === 0) {
        errorDisplay.innerHTML = "no result found .."
        return;
    }

    // total result found display
    const displayBooks = document.getElementById("displayBooks");
    const totalResult = document.getElementById("totalResultFound");
    totalResult.innerHTML = `
    <i class="text-white"> total Book result found:  ${books.numFound}</i>
     
    `;


    books.docs.forEach(book => {
        const div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML = `
        <div class="card h-100">
            <img class="fluid w-50 h-75 mx-auto mt-2" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="book_cover">
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <p class="card-title"><i>Author: ${book.author_name ? book.author_name : "unknown_Author"}</i></p>
                
                <p class="card-text">publisher: ${book.publisher_facet ? book.publisher_facet[0] : "unknown_Publisher"}</p>
            </div>
            <div class="card-footer">
                <small class="text-muted">first publish year: ${book.first_publish_year ? book.first_publish_year : ""}</small>
            </div>
        </div>
        `;
        displayBooks.appendChild(div);

    })
}