async function editFormHandler(event) {
  event.preventDefault();
  const goal_name = document.querySelector('#goal_name').value;
  const description = document.querySelector('#description').value;
  const start_date = document.querySelector('#start_date').value;
  const end_date = document.querySelector('#end_date').value;

  // window.location gives us access to the URL. We then use the .split() method to access the number at the end of the URL and set that equal to id.
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  // What part of our application will handle this 'put' request?
  // The Controller will handle this 'put' request.

  const response = await fetch(`/api/{{user.name}}/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      goal_name,
      description,
      start_date,
      end_date,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // What happens if the response is ok?
  // If the response is ok, that means that the dish was updated successfully. 
  if (response.ok) {
    document.location.replace(`/{{}}/${id}`);
  } else {
    alert('Failed to edit dish');
  }
}

document.querySelector('.edit-dish-form').addEventListener('submit', editFormHandler);
