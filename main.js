const getBookName=() =>{
    // console.log("clicked");
    const input_field = document.getElementById("input-field");
    const inputValue = input_field.value;
    console.log(inputValue);
    //clear input field
    input_field.value = "";


    const url = `https://openlibrary.org/search.json?q=${inputValue}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>getAllBooks(data))

}

const getAllBooks= (books)=>{
    // console.log(books);

    // total result found display
    const displayBooks = document.getElementById("displayBooks");
    const totalResult = document.getElementById("totalResultFound");
    totalResult.innerHTML=`
    <i class="text-white"> total Book result found:  ${books.numFound}</i>
     
    `;


    books.docs.forEach(book=>{
        // console.log(book);
        const div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML=`
        <div class="card h-100">
            <img class="fluid w-50 h-75 mx-auto mt-2" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="book_cover">
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <p class="card-title"><i>Author: ${book.author_name}</i></p>
                
                <p class="card-text">publisher: ${book.publisher_facet}.</p>
            </div>
            <div class="card-footer">
                <small class="text-muted">first publish year: ${book.first_publish_year}</small>
            </div>
        </div>
        `;
        displayBooks.appendChild(div);

    })
}