import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
function Popular() {

  const [popular, setPopular] = useState ([]);

  useEffect(()=>{
    getPopular();

  },[])
  
  const getPopular = async () => {
    const appId = process.env.REACT_APP_EDAMAM_APP_ID;
    const appKey = process.env.REACT_APP_EDAMAM_APP_KEY;
    const number = 10;

    const apiUrl = `https://api.edamam.com/search?q=popular&app_id=${appId}&app_key=${appKey}&to=${number}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setPopular(data.hits)
      console.log(data.hits);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
  
  <div>

    <Wrapper>

    <h3>Popular Picks</h3>

      <Splide options={{
        perPage: 4,
        arrows: false,
        pagination: false,
        drag: 'free', 
        gap: "5 rem"

      }}>
    {popular.map((recipe) => {
      
          return(
            <SplideSlide>
            <Card key={recipe.recipe.uri}>
              <p>{recipe.recipe.label}</p>
              <img src={recipe.recipe.image} alt="recipe.label"/>
            </Card>
            </SplideSlide>
          );
        })}
        </Splide>
      </Wrapper>
    </div>        
  );      
}


const Wrapper = styled.div`
  margin: 4rem 0 rem;
`;

const Card = styled.div`
min-height: 25 rem;
border-radius: 2rem;
display: flex;
flex-direction: column;
justify-content: flex-end;

img{
  border-radius: 2rem;
  width: 100%;
  height: auto;
  object-fit: cover;
}

p {
  position:absolute;
  z-index: 10;
  left: 50%;
  bottom: 0%;
  transform: translate(-50%, 0%);
  color: white;
  width: 100%;
  text-align: center;
  font-weight: 600;
  font-size: 2rem;
  height: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
}
`


export default Popular;
