async function newFormHandler(event) {
  event.preventDefault();

  const goal_name = document.querySelector('#goal_name').value;
  const description = document.querySelector('#description').value;
  const start_date = document.querySelector('#start_date').value;
  const end_date = document.querySelector('#end_dated').value;
  // check this https://stackoverflow.com/questions/70325186/rendering-username-or-id-in-the-url-with-express-routing

  const response = await fetch(`/goal`, {
    method: 'POST',
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

  if (response.ok) {
    document.location.replace('/goal');
  } else {
    alert('Failed to add goal');
  }
}

document
  .querySelector('.new-goal-form')
  .addEventListener('submit', newFormHandler);
