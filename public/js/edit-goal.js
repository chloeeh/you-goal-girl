// TODO: Future functionality
async function editFormHandler(event) {
  event.preventDefault();
  const name = document.querySelector('#goal_name').value;
  const description = document.querySelector('#description').value;
  const start_date = document.querySelector('#start_date').value;
  const end_date = document.querySelector('#end_date').value;

  // window.location gives us access to the URL. We then use the .split() method to access the number at the end of the URL and set that equal to id.
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  // What part of our application will handle this 'put' request?
  // The Controller will handle this 'put' request.
  // check this https://stackoverflow.com/questions/70325186/rendering-username-or-id-in-the-url-with-express-routing

  const response = await fetch(`/api/{{user.username}}/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      name,
      description,
      start_date,
      end_date,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // What happens if the response is ok?
  // If the response is ok, that means that the goal was updated successfully. 
  if (response.ok) {
    document.location.replace(`/{{}}/${id}`);
  } else {
    alert('Failed to edit goal');
  }
}

document.querySelector('.edit-goal-form').addEventListener('submit', editFormHandler);
