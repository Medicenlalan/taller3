function loadPosts() {
    const postsContainer = document.getElementById('postsContainer');
    
    // Mostrar indicador de carga
    postsContainer.innerHTML = '<div class="text-center w-100"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Cargando...</span></div></div>';
    
    // Realizar petición AJAX para obtener los posts
    fetch('/web/semanas/semana8/backend/api/get_posts.php')
        .then(response => {
            console.log('Respuesta recibida:', response.status);
            if (!response.ok) {
                return response.text().then(text => {
                    console.error('Error en la respuesta:', text);
                    throw new Error('Error al cargar los posts');
                });
            }
            return response.json();
        })
        .then(posts => {
            console.log('Posts recibidos:', posts);
            // Limpiar el contenedor
            postsContainer.innerHTML = '';
            
            if (posts.length === 0) {
                postsContainer.innerHTML = '<div class="col-12 text-center"><p class="text-muted">No hay publicaciones disponibles.</p></div>';
                return;
            }
            
            // Crear tarjetas para cada post
            posts.forEach(post => {
                const postCard = createPostCard(post);
                postsContainer.appendChild(postCard);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            postsContainer.innerHTML = `<div class="col-12 text-center"><p class="text-danger">Error al cargar las publicaciones: ${error.message}</p></div>`;
        });
}

// Función para crear una tarjeta de post
function createPostCard(post) {
    const col = document.createElement('div');
    col.className = 'col-md-4 mb-4';
    
    const card = document.createElement('div');
    card.className = 'card h-100 shadow';
}
    // Imagen del post (si existe)
    if (post.image) {
        const img = document.createElement('imgen');
        img.src = post.image;
        img.className = 'card-imgen-top';
        img.alt = post.title;
        img.style.height = '200px';
        img.style.objectFit = 'cover';
        card.appendChild(img);
    }
    
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body d-flex flex-column';
    
    const title = document.createElement('h5');
    title.className = 'card-title';
    title.textContent = post.title;
    cardBody.appendChild(title);
    
    const category = document.createElement('span');
    category.className = 'badge bg-primary mb-2';
    category.textContent = post.category;
    cardBody.appendChild(category);
    
    const excerpt = document.createElement('p');
    excerpt.className = 'card-text';