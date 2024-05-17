import ICTKebabAPI from "@/lib/api/ICTKebab";
import Food from "@/components/Food";
import Drinks from "@/components/Drinks";
import Sauces from "@/components/Sauces";

export default function Menu({ foods, drinks, sauces }) {

  return (
    <div>
      <h1>Menu</h1>
      <h2>Food</h2>
      {foods.map((food) => (
        <Food key={food.id} props={food} />
      ))}
      <h2>Drinks</h2>
      {drinks.map((drink) => (
        <Drinks key={drink.id} props={drink} />
      ))}
      <h2>Sauces</h2>
      {sauces.map((sauce) => (
        <Sauces key={sauce.id} props={sauce} />
      ))}
    </div>
  );
}

export async function getStaticProps() {
  try {
    const foods = await ICTKebabAPI.readFood();
    const drinks = await ICTKebabAPI.readDrinks();
    const sauces = await ICTKebabAPI.readSauces();
    
    return {
        props: { foods, drinks, sauces }, 
        revalidate: 1
    };
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return {
      props: {
        foods: [],
        drinks: [],
        sauces: []
      }
    };
  }
}