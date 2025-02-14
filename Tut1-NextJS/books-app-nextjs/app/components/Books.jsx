import Link from "next/link";

async function getBooks() {
    const res = await fetch("http://localhost:3000/api/books");
    const json = await res.json();
    return json;
}

const Books = async () => {
    const books = await getBooks();
    return (
        <div>
            <h1>Books</h1>
        </div>
    )
}
export default Books;