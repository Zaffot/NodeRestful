function deleteMovie(id) {
    if (confirm("Are you sure that you want to delete this movie?")) {
      fetch(`/movies/${id}`, {
        method: 'DELETE'
      })
      .then(res => {
        if (res.ok) {
          alert("Movie Deleted!");
          location.reload(); // lataa sivu udl.
        } else {
          alert("Delete failed.");
        }
      });
    }
  }

  document.getElementById('add-movie-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
  
    data.available = formData.has('available');
  
    fetch('/movies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(movie => {
        alert("Movie added!");
        location.reload(); // Päivitä lista
      })
      .catch(err => {
        alert("Attembt Failed.");
        console.error(err);
      });
  });