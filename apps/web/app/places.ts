import { gql } from "@apollo/client";

export const PLACES = `
    query Places {
        places {
        id
        images
        name
        description
        location {
            country
        }
        }
    }
`

const requestBody = JSON.stringify({
    query: PLACES,
});

export async function placesApli() {
    try {
      const response = await fetch('https://troveed.onrender.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestBody
      });
  
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
    }
  }
  