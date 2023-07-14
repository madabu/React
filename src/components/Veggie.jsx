import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";

function Veggie() {
  
  const [veggie, setVeggie] = useState ([]);

  useEffect(()=>{
    getVeggie();

  },[])
  
  const getVeggie = async () => {

    const storedData = localStorage.getItem("veggie");

    if (storedData) {
      setVeggie(JSON.parse(storedData));
    } else {
      const appId = process.env.REACT_APP_EDAMAM_APP_ID;
      const appKey = process.env.REACT_APP_EDAMAM_APP_KEY;
      const number = 10;
      const apiUrl = `https://api.edamam.com/search?q=popular&app_id=${appId}&app_key=${appKey}&to=${number}`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        localStorage.setItem("veggie", JSON.stringify(data.hits));
        setVeggie(data.hits);
        console.log(data.hits);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  
  
  return (
        
  <div>

  <Wrapper>

  <h3>Vegetarian Picks</h3>

    <Splide options={{
      perPage: 4,
      arrows: false,
      pagination: false,
      drag: 'free', 
      gap: "20px"

    }}>
  {veggie.map((recipe) => {
    
        return(
          <SplideSlide key={recipe.recipe.uri}>
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
min-height: 10 rem;
border-radius: 2rem;
display: flex;
flex-direction: column;
justify-content: center;

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


export default Veggie