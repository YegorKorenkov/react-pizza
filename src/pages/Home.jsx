import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Categories from '../components/Categories';
import LoadingBlock from '../components/PizzaBlock/LoadingBlock';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import SortPopup from '../components/SortPopup';
import { setCategory, setSortBy } from '../redux/actions/filters';
import { fetchPizzas } from '../redux/actions/pizzas';
import { addPizzaToCart } from '../redux/actions/cart';

const categoriesNames = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
const sortItems = [
  {name: 'популярности', type: 'popular', order: 'desc'}, 
  {name: 'цене', type: 'price', order: 'desc'}, 
  {name: 'алфавиту', type: 'name', order: 'asc'}
];

function Home() {
  const dispatch = useDispatch();
  const items  = useSelector(({ pizzas }) => pizzas.items);
  const cartItems  = useSelector(({ cart }) => cart.items);
  const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded)
  const { category, sortBy } = useSelector(({ filters }) => filters);
  
  React.useEffect(() => {
    dispatch(fetchPizzas(category, sortBy))
  }, [category, sortBy])

  
  const onSelectCategory = React.useCallback(id => {
    dispatch(setCategory(id))
  }, []);

  const onSelectSortType = React.useCallback(type => {
    dispatch(setSortBy(type))
  }, []);

  const handleAddPizzaToCart = (obj) => {
    dispatch(addPizzaToCart(obj));
  }

    return (

        <div className="container">
          <div className="content__top">
            <Categories
              activeCategory={category}
              items={categoriesNames}
              onClickCategory={onSelectCategory}
            />
        
            <SortPopup
              onClickSortType={onSelectSortType}
              activeSortType={sortBy.type}
              items={sortItems} 
            />

          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            { isLoaded 
            ? items&&items.map((obj) =>  
                <PizzaBlock 
                  onClickAddPizza={handleAddPizzaToCart}
                  key={obj.id} 
                  addedCount={cartItems[obj.id] && cartItems[obj.id].items.length}
                  {...obj} 
                  
                />) 
            : Array(12).fill(0).map((_, index) => <LoadingBlock key={index}/>)
            }
          </div>
        </div>
        
    );
}

export default Home;